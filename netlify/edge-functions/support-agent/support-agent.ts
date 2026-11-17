// /netlify/edge-functions/support-agent/support-agent.ts
//
// ChatKit custom backend for the "Ask TypeDB AI" widgets (docs, main site, Cloud, Studio).
// Implements the ChatKit server protocol (modelled on openai/chatkit-python) with
// threads persisted in Netlify Blobs, and answers via the OpenAI Responses API with
// web search enabled so the model can look up live information.
//
// Each thread is backed by an OpenAI Conversation, which holds the model-side history: we send only
// the new user message per turn, OpenAI appends the output, and the dashboard shows the whole thread
// as one conversation with no 30-day expiry. The Blobs record remains the source of ChatKit's thread
// list and item history for the visitor, since conversations cannot be listed via the API.
//
// Env vars (Netlify site settings):
//   SUPPORT_AGENT_OPENAI_API_KEY                      required; the function 500s without it
//   SUPPORT_AGENT_MODEL                 default "gpt-5.6-terra"
//   SUPPORT_AGENT_REASONING_EFFORT      default "none"
//   SUPPORT_AGENT_MAX_OUTPUT_TOKENS     default 4000
//   SUPPORT_AGENT_INSTRUCTIONS          overrides the per-source INSTRUCTIONS for every client;
//                                       today's date is always appended
//   SUPPORT_AGENT_OPENAI_DOMAIN_KEY     ChatKit domain key, served to cross-origin widgets
//                                       (Studio) via GET; the docs widget gets it at build time

import { getStore } from "@netlify/blobs";

export const config = {
    path: "/api/support-agent",
    rateLimit: {
        windowLimit: 15,
        windowSize: 60,
        aggregateBy: ["ip", "domain"],
    },
};

declare const Netlify: { env: { get(name: string): string | undefined } };

const OPENAI_API_URL = "https://api.openai.com/v1";
const STORE_NAME = "support-agent";
// How long a thread stays in the visitor's ChatKit history. The OpenAI conversation behind it is kept
// until the visitor deletes the thread.
const RETENTION_MS = 30 * 24 * 60 * 60 * 1000;
const DEFAULT_PAGE_SIZE = 20;
const CONVERSATION_ITEMS_BATCH = 20;
const MAX_MESSAGE_CHARS = 8000;
const MAX_TITLE_CHARS = 60;
const USER_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;
const STREAMING_OPS = new Set(["threads.create", "threads.add_user_message", "threads.retry_after_item"]);
// Which client embeds the widget, from the `source` query parameter. Docs is the default so the docs
// widget, which calls the bare path, needs no change.
const SOURCES = ["docs", "web", "cloud", "studio"] as const;
type Source = (typeof SOURCES)[number];
const DEFAULT_SOURCE: Source = "docs";
const WEBSITE_INSTRUCTIONS =
    "You are the assistant on the TypeDB website at typedb.com. Assume questions are about TypeDB unless clearly otherwise. Keep responses brief.";
const INSTRUCTIONS: Record<Source, string> = {
    docs: WEBSITE_INSTRUCTIONS,
    web: WEBSITE_INSTRUCTIONS,
    cloud: "You are the assistant on the TypeDB Cloud portal at cloud.typedb.com. Assume questions are about TypeDB or TypeDB Cloud unless clearly otherwise. Keep responses brief.",
    studio: "You are the assistant in the TypeDB Studio app. Assume questions are about TypeDB or TypeDB Studio unless clearly otherwise. Keep responses brief.",
};
// ChatKit protocol types, trimmed to what this backend produces

type Page<T> = { data: T[]; has_more: boolean; after?: string };
type ThreadStatus = { type: "active" } | { type: "locked"; reason?: string } | { type: "closed"; reason?: string };
type ThreadMetadata = { id: string; title?: string; created_at: string; status: ThreadStatus };
type ThreadResponse = ThreadMetadata & { items: Page<ThreadItem> };
type UserContent =
    | { type: "input_text"; text: string }
    | { type: "input_tag"; id: string; text: string; data: Record<string, unknown>; group?: string; interactive?: boolean };
type UserMessageInput = {
    content: UserContent[];
    attachments?: string[];
    quoted_text?: string;
    inference_options?: Record<string, unknown>;
};
type Annotation = { type: "annotation"; source: { type: "url"; title: string; url: string }; index?: number };
type AssistantContent = { type: "output_text"; text: string; annotations: Annotation[] };
type UserMessageItem = {
    type: "user_message";
    id: string;
    thread_id: string;
    created_at: string;
    content: UserContent[];
    attachments: never[];
    quoted_text?: string;
    inference_options: Record<string, unknown>;
};
type AssistantMessageItem = { type: "assistant_message"; id: string; thread_id: string; created_at: string; content: AssistantContent[] };
type ThreadItem = UserMessageItem | AssistantMessageItem;
type StreamEvent = { type: string } & Record<string, unknown>;

// Storage records

type ThreadRecord = {
    thread: ThreadMetadata;
    items: ThreadItem[];
    /** OpenAI Conversation holding the model-side history. Absent on threads created before conversations were introduced. */
    conversation_id?: string;
    /** Per user message id: the id of the last conversation item the model produced in reply. Marks where a retry prunes from. */
    turn_ends?: Record<string, string>;
};
type ThreadSummary = ThreadMetadata & { updated_at: string };
type UserIndex = { threads: ThreadSummary[] };

class RequestError extends Error {
    constructor(readonly status: number, message: string) {
        super(message);
    }
}

const now = () => new Date().toISOString();

const generateId = (prefix: string) => `${prefix}_${crypto.randomUUID().replace(/-/g, "")}`;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
    });

function parseSource(request: Request): Source {
    const source = new URL(request.url).searchParams.get("source");
    return (SOURCES as readonly string[]).includes(source ?? "") ? (source as Source) : DEFAULT_SOURCE;
}

function corsHeaders(request: Request): Record<string, string> {
    if (!request.headers.get("origin")) return {};
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Max-Age": "86400",
    };
}

// One blob per thread (metadata + items) and one index blob per visitor for the history list.
class ThreadStore {
    private readonly store = getStore({ name: STORE_NAME, consistency: "strong" });

    constructor(private readonly userId: string) {}

    private threadKey(threadId: string) {
        return `${this.userId}/thread/${threadId}`;
    }

    private indexKey() {
        return `${this.userId}/index`;
    }

    async loadThread(threadId: string): Promise<ThreadRecord | null> {
        if (!/^thr_[a-f0-9]{32}$/.test(threadId)) return null;
        const entry = await this.store.getWithMetadata(this.threadKey(threadId), { type: "json" });
        if (!entry) return null;
        const expiresAt = Number(entry.metadata?.expiresAt ?? 0);
        if (expiresAt && expiresAt < Date.now()) {
            await this.deleteThread(threadId);
            return null;
        }
        return entry.data as ThreadRecord;
    }

    async saveThread(record: ThreadRecord): Promise<void> {
        const updatedAt = now();
        await this.store.setJSON(this.threadKey(record.thread.id), record, {
            metadata: { expiresAt: Date.now() + RETENTION_MS },
        });
        await this.updateIndex((threads) => [
            { ...record.thread, updated_at: updatedAt },
            ...threads.filter((t) => t.id !== record.thread.id),
        ]);
    }

    async deleteThread(threadId: string): Promise<void> {
        await this.store.delete(this.threadKey(threadId));
        await this.updateIndex((threads) => threads.filter((t) => t.id !== threadId));
    }

    async listThreads(): Promise<ThreadSummary[]> {
        const index = (await this.store.get(this.indexKey(), { type: "json" })) as UserIndex | null;
        const cutoff = Date.now() - RETENTION_MS;
        return (index?.threads ?? []).filter((t) => Date.parse(t.updated_at) > cutoff);
    }

    private async updateIndex(update: (threads: ThreadSummary[]) => ThreadSummary[]): Promise<void> {
        const threads = update(await this.listThreads());
        await this.store.setJSON(this.indexKey(), { threads } satisfies UserIndex);
    }
}

function threadResponse(thread: ThreadMetadata, items: ThreadItem[]): ThreadResponse {
    return {
        id: thread.id,
        title: thread.title,
        created_at: thread.created_at,
        status: thread.status,
        items: { data: items, has_more: false },
    };
}

function paginate<T extends { id: string; created_at: string }, R>(
    all: T[],
    params: { limit?: number | null; order?: "asc" | "desc"; after?: string | null } | undefined,
    map: (item: T) => R,
): Page<R> {
    const limit = Math.min(Math.max(params?.limit ?? DEFAULT_PAGE_SIZE, 1), 100);
    const sorted = [...all].sort((a, b) => a.created_at.localeCompare(b.created_at) || a.id.localeCompare(b.id));
    if (params?.order === "desc") sorted.reverse();
    const start = params?.after ? sorted.findIndex((item) => item.id === params.after) + 1 : 0;
    const data = sorted.slice(start, start + limit);
    const hasMore = start + limit < sorted.length;
    return { data: data.map(map), has_more: hasMore, after: hasMore ? data[data.length - 1]?.id : undefined };
}

function parseInput(input: unknown): UserMessageInput {
    const candidate = input as Partial<UserMessageInput> | undefined;
    if (!candidate || !Array.isArray(candidate.content)) throw new RequestError(400, "Message content is missing");
    if (candidate.attachments && candidate.attachments.length > 0) throw new RequestError(400, "Attachments are not supported");
    const content = candidate.content.filter(
        (part): part is UserContent => (part?.type === "input_text" || part?.type === "input_tag") && typeof part.text === "string",
    );
    const text = messageText(content);
    if (!text.trim()) throw new RequestError(400, "Message is empty");
    if (text.length > MAX_MESSAGE_CHARS) throw new RequestError(400, `Message is too long (max ${MAX_MESSAGE_CHARS} characters)`);
    return {
        content,
        quoted_text: candidate.quoted_text ?? undefined,
        inference_options: candidate.inference_options ?? {},
    };
}

const messageText = (content: UserContent[]) => content.map((part) => part.text).join("");

function titleFrom(input: UserMessageInput): string {
    const text = messageText(input.content).replace(/\s+/g, " ").trim();
    if (text.length <= MAX_TITLE_CHARS) return text;
    const cut = text.slice(0, MAX_TITLE_CHARS);
    return cut.slice(0, Math.max(cut.lastIndexOf(" "), 20)).trim();
}

const errorEvent = (message: string, allowRetry: boolean): StreamEvent => ({
    type: "error",
    code: "custom",
    message,
    allow_retry: allowRetry,
});

// OpenAI API

type ConversationMessage = { type: "message"; role: "user" | "assistant"; content: string };

function toConversationMessage(item: ThreadItem): ConversationMessage | null {
    if (item.type === "user_message") {
        const quoted = item.quoted_text ? `> ${item.quoted_text}\n\n` : "";
        return { type: "message", role: "user", content: quoted + messageText(item.content) };
    }
    const text = item.content.map((part) => part.text).join("\n\n");
    return text ? { type: "message", role: "assistant", content: text } : null;
}

class OpenAI {
    constructor(private readonly apiKey: string) {}

    async request(method: string, path: string, body?: unknown): Promise<Response> {
        const response = await fetch(`${OPENAI_API_URL}${path}`, {
            method,
            headers: { Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json" },
            body: body === undefined ? undefined : JSON.stringify(body),
        });
        if (!response.ok) {
            console.error(`support-agent: OpenAI ${method} ${path} responded ${response.status}: ${await response.text().catch(() => "")}`);
            throw new Error(`OpenAI responded ${response.status}`);
        }
        return response;
    }

    async json<T = any>(method: string, path: string, body?: unknown): Promise<T> {
        return (await this.request(method, path, body)).json();
    }

    /** Creates a conversation, seeded with the thread's existing items so threads that predate conversations keep their context. */
    async createConversation(record: ThreadRecord, metadata: Record<string, string>): Promise<string> {
        const seed = record.items.map(toConversationMessage).filter((m): m is ConversationMessage => m !== null);
        const conversation = await this.json("POST", "/conversations", { metadata, items: seed.slice(0, CONVERSATION_ITEMS_BATCH) });
        for (let i = CONVERSATION_ITEMS_BATCH; i < seed.length; i += CONVERSATION_ITEMS_BATCH) {
            await this.json("POST", `/conversations/${conversation.id}/items`, { items: seed.slice(i, i + CONVERSATION_ITEMS_BATCH) });
        }
        return conversation.id;
    }

    async deleteConversation(conversationId: string): Promise<void> {
        await this.request("DELETE", `/conversations/${conversationId}`);
    }

    /** Removes every conversation item after `afterItemId`, or all items when it is undefined. */
    async pruneConversation(conversationId: string, afterItemId: string | undefined): Promise<void> {
        const params = new URLSearchParams({ order: "asc", limit: "100" });
        if (afterItemId) params.set("after", afterItemId);
        while (true) {
            const page = await this.json("GET", `/conversations/${conversationId}/items?${params}`);
            for (const item of page.data ?? []) {
                await this.request("DELETE", `/conversations/${conversationId}/items/${item.id}`);
            }
            if (!page.has_more || !page.last_id) break;
            params.set("after", page.last_id);
        }
    }

    async *streamResponse(source: Source, conversationId: string, input: ConversationMessage): AsyncGenerator<Record<string, any>> {
        const today = new Date().toISOString().slice(0, 10);
        const response = await this.request("POST", "/responses", {
            model: Netlify.env.get("SUPPORT_AGENT_MODEL") || "gpt-5.6-terra",
            instructions: `${Netlify.env.get("SUPPORT_AGENT_INSTRUCTIONS") || INSTRUCTIONS[source]}\nToday's date is ${today}.`,
            conversation: conversationId,
            input: [input],
            tools: [{ type: "web_search" }],
            truncation: "auto",
            max_output_tokens: Number(Netlify.env.get("SUPPORT_AGENT_MAX_OUTPUT_TOKENS")) || 4000,
            reasoning: { effort: Netlify.env.get("SUPPORT_AGENT_REASONING_EFFORT") || "none" },
            stream: true,
        });
        if (!response.body) throw new Error("OpenAI response has no body");
        yield* parseSse(response.body);
    }
}

async function* parseSse(body: ReadableStream<Uint8Array>): AsyncGenerator<Record<string, any>> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            let separator: number;
            while ((separator = buffer.indexOf("\n\n")) !== -1) {
                const block = buffer.slice(0, separator);
                buffer = buffer.slice(separator + 2);
                const data = block
                    .split("\n")
                    .filter((line) => line.startsWith("data:"))
                    .map((line) => line.slice(5).trim())
                    .join("\n");
                if (data && data !== "[DONE]") yield JSON.parse(data);
            }
        }
    } finally {
        reader.releaseLock();
    }
}

function toAnnotation(raw: any): Annotation | null {
    if (raw?.type !== "url_citation" || typeof raw.url !== "string") return null;
    let title = typeof raw.title === "string" && raw.title.trim() ? raw.title : "";
    if (!title) {
        try {
            title = new URL(raw.url).hostname;
        } catch {
            title = raw.url;
        }
    }
    return { type: "annotation", source: { type: "url", title, url: raw.url }, index: raw.end_index };
}

function toContent(raw: any): AssistantContent {
    if (raw?.type === "output_text") {
        const annotations = ((raw.annotations ?? []) as unknown[]).map(toAnnotation).filter((a): a is Annotation => a !== null);
        return { type: "output_text", text: raw.text ?? "", annotations };
    }
    return { type: "output_text", text: raw?.refusal ?? "", annotations: [] };
}

// Server

class SupportAgentServer {
    constructor(
        private readonly store: ThreadStore,
        private readonly openai: OpenAI,
        private readonly source: Source,
        private readonly userId: string,
    ) {}

    async handle(req: any): Promise<unknown> {
        switch (req.type) {
            case "threads.get_by_id": {
                const record = await this.requireThread(req.params?.thread_id);
                return threadResponse(record.thread, record.items);
            }
            case "threads.list": {
                const threads = await this.store.listThreads();
                return paginate(threads, req.params, (thread) => threadResponse(thread, []));
            }
            case "items.list": {
                const record = await this.requireThread(req.params?.thread_id);
                return paginate(record.items, req.params, (item) => item);
            }
            case "threads.update": {
                const record = await this.requireThread(req.params?.thread_id);
                if (typeof req.params?.title !== "string") throw new RequestError(400, "Title is missing");
                record.thread.title = req.params.title.slice(0, 200);
                await this.store.saveThread(record);
                return threadResponse(record.thread, []);
            }
            case "threads.delete": {
                if (typeof req.params?.thread_id !== "string") throw new RequestError(400, "Thread id is missing");
                const record = await this.store.loadThread(req.params.thread_id);
                await this.store.deleteThread(req.params.thread_id);
                if (record?.conversation_id) {
                    await this.openai.deleteConversation(record.conversation_id).catch((e) => console.error("support-agent: conversation delete failed:", e));
                }
                return {};
            }
            case "items.feedback": {
                console.log(`support-agent: feedback ${JSON.stringify(req.params)}`);
                return {};
            }
            case "attachments.create":
            case "attachments.delete":
                throw new RequestError(400, "Attachments are not supported");
            default:
                throw new RequestError(400, `Unsupported operation: ${req.type}`);
        }
    }

    async *stream(req: any): AsyncGenerator<StreamEvent> {
        try {
            switch (req.type) {
                case "threads.create": {
                    const input = parseInput(req.params?.input);
                    const thread: ThreadMetadata = {
                        id: generateId("thr"),
                        title: titleFrom(input),
                        created_at: now(),
                        status: { type: "active" },
                    };
                    yield { type: "thread.created", thread: threadResponse(thread, []) };
                    yield* this.respondToUser({ thread, items: [] }, input);
                    break;
                }
                case "threads.add_user_message": {
                    const input = parseInput(req.params?.input);
                    const record = await this.requireThread(req.params?.thread_id);
                    yield* this.respondToUser(record, input);
                    break;
                }
                case "threads.retry_after_item": {
                    const record = await this.requireThread(req.params?.thread_id);
                    const index = record.items.findIndex((item) => item.id === req.params?.item_id);
                    const retried = record.items[index];
                    if (!retried || retried.type !== "user_message") {
                        throw new RequestError(400, "Only user messages can be retried");
                    }
                    record.items.splice(index + 1);
                    // The conversation already holds the retried message and whatever the failed turn produced.
                    // Drop everything after the previous turn's reply so the resend starts clean.
                    const previousUserMessage = record.items.slice(0, index).reverse().find((item) => item.type === "user_message");
                    if (record.conversation_id) {
                        await this.openai.pruneConversation(record.conversation_id, previousUserMessage && record.turn_ends?.[previousUserMessage.id]);
                    }
                    delete record.turn_ends?.[retried.id];
                    await this.store.saveThread(record);
                    yield* this.respond(record, retried);
                    break;
                }
                default:
                    throw new RequestError(400, `Unsupported operation: ${req.type}`);
            }
        } catch (e) {
            console.error(`support-agent: ${req.type} failed:`, e);
            yield e instanceof RequestError
                ? errorEvent(e.message, false)
                : errorEvent("Something went wrong while answering. Please try again.", true);
        }
    }

    private async requireThread(threadId: unknown): Promise<ThreadRecord> {
        if (typeof threadId !== "string") throw new RequestError(400, "Thread id is missing");
        const record = await this.store.loadThread(threadId);
        if (!record) throw new RequestError(404, "Thread not found");
        return record;
    }

    private async *respondToUser(record: ThreadRecord, input: UserMessageInput): AsyncGenerator<StreamEvent> {
        const userMessage: UserMessageItem = {
            type: "user_message",
            id: generateId("msg"),
            thread_id: record.thread.id,
            created_at: now(),
            content: input.content,
            attachments: [],
            quoted_text: input.quoted_text,
            inference_options: input.inference_options ?? {},
        };
        record.items.push(userMessage);
        // Persist before answering so a failed model call still leaves a retryable message.
        await this.store.saveThread(record);
        yield { type: "thread.item.done", item: userMessage };
        yield* this.respond(record, userMessage);
    }

    // Translates the Responses stream into ChatKit thread events, mirroring chatkit-python's agents helper.
    private async *respond(record: ThreadRecord, userMessage: UserMessageItem): AsyncGenerator<StreamEvent> {
        if (!record.conversation_id) {
            // Seed from every item except the message being answered, which goes in as this turn's input.
            const seed = { ...record, items: record.items.filter((item) => item !== userMessage) };
            record.conversation_id = await this.openai.createConversation(seed, {
                thread_id: record.thread.id,
                user_id: this.userId,
                source: this.source,
            });
            await this.store.saveThread(record);
        }

        const pending = new Map<string, AssistantMessageItem>();
        let lastOutputItemId: string | undefined;
        const finish = (item: AssistantMessageItem): StreamEvent => {
            pending.delete(item.id);
            record.items.push(item);
            return { type: "thread.item.done", item };
        };

        const input = toConversationMessage(userMessage)!;
        for await (const event of this.openai.streamResponse(this.source, record.conversation_id, input)) {
            switch (event.type) {
                case "response.output_item.added": {
                    if (event.item?.type === "web_search_call") {
                        yield { type: "progress_update", text: "Searching the web" };
                    } else if (event.item?.type === "message") {
                        const item: AssistantMessageItem = {
                            type: "assistant_message",
                            id: event.item.id,
                            thread_id: record.thread.id,
                            created_at: now(),
                            content: (event.item.content ?? []).map(toContent),
                        };
                        pending.set(item.id, item);
                        yield { type: "thread.item.added", item };
                    }
                    break;
                }
                case "response.content_part.added": {
                    const item = pending.get(event.item_id);
                    if (!item || event.part?.type === "reasoning_text") break;
                    const content = toContent(event.part);
                    item.content[event.content_index] = content;
                    yield {
                        type: "thread.item.updated",
                        item_id: item.id,
                        update: { type: "assistant_message.content_part.added", content_index: event.content_index, content },
                    };
                    break;
                }
                case "response.output_text.delta": {
                    const part = pending.get(event.item_id)?.content[event.content_index];
                    if (!part) break;
                    part.text += event.delta;
                    yield {
                        type: "thread.item.updated",
                        item_id: event.item_id,
                        update: { type: "assistant_message.content_part.text_delta", content_index: event.content_index, delta: event.delta },
                    };
                    break;
                }
                case "response.output_text.annotation.added": {
                    const part = pending.get(event.item_id)?.content[event.content_index];
                    const annotation = toAnnotation(event.annotation);
                    if (!part || !annotation) break;
                    part.annotations.push(annotation);
                    yield {
                        type: "thread.item.updated",
                        item_id: event.item_id,
                        update: {
                            type: "assistant_message.content_part.annotation_added",
                            content_index: event.content_index,
                            annotation_index: part.annotations.length - 1,
                            annotation,
                        },
                    };
                    break;
                }
                case "response.output_text.done": {
                    const part = pending.get(event.item_id)?.content[event.content_index];
                    if (!part) break;
                    part.text = event.text ?? part.text;
                    yield {
                        type: "thread.item.updated",
                        item_id: event.item_id,
                        update: {
                            type: "assistant_message.content_part.done",
                            content_index: event.content_index,
                            content: { type: "output_text", text: part.text, annotations: [] },
                        },
                    };
                    break;
                }
                case "response.output_item.done": {
                    if (typeof event.item?.id === "string") lastOutputItemId = event.item.id;
                    const item = pending.get(event.item?.id);
                    if (!item) break;
                    item.content = (event.item.content ?? []).map(toContent);
                    yield finish(item);
                    break;
                }
                case "response.failed":
                    throw new Error(event.response?.error?.message ?? "Response failed");
                case "error":
                    throw new Error(event.message ?? "Response stream error");
            }
        }

        // An incomplete response (e.g. max_output_tokens hit) can end without output_item.done.
        for (const item of [...pending.values()]) yield finish(item);
        if (lastOutputItemId) (record.turn_ends ??= {})[userMessage.id] = lastOutputItemId;
        await this.store.saveThread(record);
    }
}

function sse(events: AsyncGenerator<StreamEvent>, headers: Record<string, string>): Response {
    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
        async pull(controller) {
            const { value, done } = await events.next();
            if (done) {
                controller.close();
                return;
            }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(value)}\n\n`));
        },
        cancel() {
            events.return(undefined);
        },
    });
    return new Response(body, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-store", "X-Accel-Buffering": "no", ...headers },
    });
}

export default async (request: Request) => {
    const cors = corsHeaders(request);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    // Widget bootstrap config for cross-origin hosts that cannot bake the domain key in at build time.
    if (request.method === "GET") {
        const domainKey = Netlify.env.get("SUPPORT_AGENT_OPENAI_DOMAIN_KEY");
        if (!domainKey) return json({ error: "The support agent is not configured for this deployment" }, 500, cors);
        return json({ domainKey }, 200, cors);
    }

    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);

    const apiKey = Netlify.env.get("SUPPORT_AGENT_OPENAI_API_KEY");
    if (!apiKey) return json({ error: "The support agent is not configured for this deployment" }, 500, cors);

    const userId = request.headers.get("x-support-agent-user") ?? "";
    if (!USER_ID_PATTERN.test(userId)) return json({ error: "Missing or invalid x-support-agent-user header" }, 400, cors);

    let req: any;
    try {
        req = await request.json();
    } catch {
        return json({ error: "Request body is not valid JSON" }, 400, cors);
    }
    if (typeof req?.type !== "string") return json({ error: "Request is missing 'type'" }, 400, cors);

    const server = new SupportAgentServer(new ThreadStore(userId), new OpenAI(apiKey), parseSource(request), userId);
    if (STREAMING_OPS.has(req.type)) return sse(server.stream(req), cors);
    try {
        return json(await server.handle(req), 200, cors);
    } catch (e) {
        if (e instanceof RequestError) return json({ error: e.message }, e.status, cors);
        console.error(`support-agent: ${req.type} failed:`, e);
        return json({ error: "Internal error" }, 500, cors);
    }
};
