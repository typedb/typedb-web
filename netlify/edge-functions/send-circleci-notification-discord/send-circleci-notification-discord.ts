/* Webhook receiver for CircleCI outbound webhooks. Relays workflow-completed events to Discord.
 *
 * Setup (per CircleCI project): Project Settings > Webhooks > Add Webhook
 *   Receiver URL: https://typedb.com/api/send-circleci-notification-discord
 *   Events:       Workflow Completed
 *   Secret:       the value of CIRCLECI_WEBHOOK_SECRET
 *
 * Required environment variables:
 *   CIRCLECI_WEBHOOK_SECRET      - signing secret shared with CircleCI
 *   DISCORD_CIRCLECI_WEBHOOK_URL - Discord channel webhook URL
 *
 * Optional environment variables:
 *   CIRCLECI_NOTIFY_ON_SUCCESS   - set to "true" to also notify on successful workflows
 *   CIRCLECI_FAILURE_MENTION     - Discord mention(s) pinged on every failure, regardless of project
 *   CIRCLECI_DISCORD_SUBSCRIBERS - per-person routing table; see below
 *
 * PER-PERSON PINGS
 *
 * Pings only ever fire on a genuine failure ('failed' or 'error'); a success, cancellation or
 * unauthorized run never pings anyone, no matter who is subscribed.
 *
 * Subscribers can be named two ways, and both are additive (the union is pinged, deduplicated):
 *
 * 1. CIRCLECI_DISCORD_SUBSCRIBERS, a routing table of 'pattern=id,id;pattern=id' where the pattern is
 *    matched against '<project>/<workflow>' and may use '*' as a wildcard. Preferred for anything
 *    long-lived, since editing it needs no CircleCI admin rights. For example:
 *
 *      typedb/release=708327677165043833;typedb-driver/*=123,456;*=789
 *
 * 2. A '?ping=' query parameter appended to the receiver URL in CircleCI, holding a comma-separated
 *    list of Discord user IDs. Handy for a one-off subscription to a single project, though adding
 *    it requires org admin rights on CircleCI. For example:
 *
 *      https://typedb.com/api/send-circleci-notification-discord?ping=708327677165043833
 *
 * A Discord user ID is the raw number (Discord > Settings > Advanced > Developer Mode, then
 * right-click a user > Copy User ID). Role IDs work too, via the 'role:' prefix: 'role:12345'.
 */

import type { Context } from "https://edge.netlify.com";

/* Discord embed colours, matching those used by send-deploy-notification-discord. */
const COLOR_SUCCESS = 0x02dac9;
const COLOR_FAILURE = 0xe96464;
const COLOR_NEUTRAL = 0xffe49e;

/* CircleCI sends one of 'success' | 'failed' | 'error' | 'canceled' | 'unauthorized'. */
const STATUS_DISPLAY: Record<string, { color: number; emoji: string; label: string }> = {
    success: { color: COLOR_SUCCESS, emoji: "✅", label: "succeeded" },
    failed: { color: COLOR_FAILURE, emoji: "❌", label: "failed" },
    error: { color: COLOR_FAILURE, emoji: "❌", label: "errored" },
    canceled: { color: COLOR_NEUTRAL, emoji: "🚫", label: "was canceled" },
    unauthorized: { color: COLOR_NEUTRAL, emoji: "🔒", label: "was unauthorized" },
};

/* Successful workflows run constantly and would drown the channel, so they are dropped unless
 * CIRCLECI_NOTIFY_ON_SUCCESS is set. */
const MUTED_STATUSES = ["success"];

/* The only statuses that may ping a person. This is the single gate on pinging: no subscription, from
 * any source, can cause a green build to ping anyone. */
const PINGABLE_STATUSES = ["failed", "error"];

/* Discord rejects a message whose content exceeds 2000 characters, and a wall of mentions helps nobody. */
const MAX_MENTIONS = 25;

const encoder = new TextEncoder();

/* Accepts a raw Discord snowflake ('708327677165043833') or a role ('role:708327677165043833'), and
 * renders it as a mention. Anything else is discarded: unvalidated input reaching Discord could
 * otherwise inject '@everyone' into a message we send. */
const toMention = (subscriber: string): string | null => {
    const trimmed = subscriber.trim();
    const role = trimmed.startsWith("role:");
    const id = role ? trimmed.slice("role:".length) : trimmed;
    if (!/^\d{5,32}$/.test(id)) return null;
    return role ? `<@&${id}>` : `<@${id}>`;
};

/* Matches a 'project/workflow' pattern that may use '*' as a wildcard. */
const patternMatches = (pattern: string, target: string): boolean => {
    const escaped = pattern
        .trim()
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*");
    return new RegExp(`^${escaped}$`, "i").test(target);
};

/* Parses CIRCLECI_DISCORD_SUBSCRIBERS ('pattern=id,id;pattern=id') and returns the ids whose
 * pattern matches this project and workflow. */
const subscribersFromTable = (table: string, project: string, workflow: string): string[] => {
    const target = `${project}/${workflow}`;
    const matched: string[] = [];
    for (const entry of table.split(";")) {
        if (!entry.trim()) continue;
        const separator = entry.indexOf("=");
        if (separator === -1) {
            console.warn(
                `Ignoring malformed CIRCLECI_DISCORD_SUBSCRIBERS entry '${entry.trim()}' (expected 'pattern=ids')`,
            );
            continue;
        }
        const pattern = entry.slice(0, separator);
        if (patternMatches(pattern, target)) matched.push(...entry.slice(separator + 1).split(","));
    }
    return matched;
};

/* Collects everyone to ping for this event: the always-on mention, the routing table, and the URL's
 * '?ping=' list. Returns '' for any status that must not ping. */
const resolveMentions = (request: Request, payload: any, status: string): string => {
    if (!PINGABLE_STATUSES.includes(status)) return "";

    const project = payload.project?.name ?? "";
    const workflow = payload.workflow?.name ?? "";

    const candidates = [
        ...(Netlify.env.get("CIRCLECI_FAILURE_MENTION") ?? "").split(","),
        ...subscribersFromTable(Netlify.env.get("CIRCLECI_DISCORD_SUBSCRIBERS") ?? "", project, workflow),
        ...(new URL(request.url).searchParams.get("ping") ?? "").split(","),
    ];

    const mentions: string[] = [];
    for (const candidate of candidates) {
        if (!candidate.trim()) continue;
        /* CIRCLECI_FAILURE_MENTION was historically set to a rendered '<@id>', so accept that form too. */
        const rendered = /^<@&?\d{5,32}>$/.test(candidate.trim()) ? candidate.trim() : toMention(candidate);
        if (!rendered) {
            console.warn(`Ignoring invalid Discord mention '${candidate.trim()}'`);
            continue;
        }
        if (!mentions.includes(rendered)) mentions.push(rendered);
    }

    if (mentions.length > MAX_MENTIONS) {
        console.warn(`Truncating ${mentions.length} mentions to ${MAX_MENTIONS}`);
        mentions.length = MAX_MENTIONS;
    }

    return mentions.join(" ");
};

/* Constant-time comparison, so that response timing does not leak the expected signature. */
const timingSafeEqual = (a: string, b: string): boolean => {
    if (a.length !== b.length) return false;
    let mismatch = 0;
    for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return mismatch === 0;
};

const toHex = (buffer: ArrayBuffer): string =>
    Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

/* CircleCI sends 'circleci-signature: v1=<hex>,v2=<hex>,...'. Only the newest version we understand is
 * checked, so that an attacker cannot force a downgrade to a weaker scheme. */
const parseSignature = (header: string, version: string): string | null => {
    for (const part of header.split(",")) {
        const [key, value] = part.trim().split("=");
        if (key === version && value) return value;
    }
    return null;
};

const verifySignature = async (body: string, header: string, secret: string): Promise<boolean> => {
    const provided = parseSignature(header, "v1");
    if (!provided) return false;

    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    );
    const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(body));

    return timingSafeEqual(provided.toLowerCase(), toHex(signed));
};

/* Discord rejects oversized embed fields with a 400 rather than truncating them itself. */
const truncate = (text: string, maxLength: number): string =>
    text.length <= maxLength ? text : `${text.slice(0, maxLength - 1)}…`;

const formatDuration = (millis: number): string => {
    const totalSeconds = Math.round(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes ? `${minutes}m ${seconds}s` : `${seconds}s`;
};

const buildDiscordMessage = (payload: any, mentions: string) => {
    const workflow = payload.workflow ?? {};
    const pipeline = payload.pipeline ?? {};
    const project = payload.project ?? {};
    const vcs = pipeline.vcs ?? {};
    const commit = vcs.commit ?? {};

    const status = workflow.status ?? "unknown";
    const display = STATUS_DISPLAY[status] ?? {
        color: COLOR_NEUTRAL,
        emoji: "⚠️",
        label: `finished with status '${status}'`,
    };

    const projectName = project.name ?? "unknown project";
    const workflowName = workflow.name ?? "unknown workflow";
    const branch = vcs.branch ?? vcs.tag ?? "unknown";

    /* CircleCI does not send a commit URL, so it is derived from the repository URL and revision. */
    const revision = vcs.revision ?? null;
    const shortRevision = revision ? revision.substring(0, 7) : null;
    const repositoryUrl = vcs.target_repository_url ?? vcs.origin_repository_url ?? null;
    const commitUrl = repositoryUrl && revision ? `${repositoryUrl}/commit/${revision}` : null;
    const commitSubject = commit.subject ?? "No commit message";
    const commitValue = commitUrl
        ? `[${shortRevision}](${commitUrl}) — ${commitSubject}`
        : shortRevision
          ? `${shortRevision} — ${commitSubject}`
          : commitSubject;

    const author = commit.author?.name ?? pipeline.trigger?.actor?.login ?? "Unknown author";

    const startedAt = workflow.created_at ? Date.parse(workflow.created_at) : NaN;
    const stoppedAt = workflow.stopped_at ? Date.parse(workflow.stopped_at) : NaN;

    /* Discord renders this timestamp in each reader's own timezone. */
    const finishedAt = Number.isNaN(stoppedAt) ? null : `<t:${Math.floor(stoppedAt / 1000)}:f>`;
    const duration =
        Number.isNaN(startedAt) || Number.isNaN(stoppedAt) ? null : formatDuration(stoppedAt - startedAt);

    const fields: { name: string; value: string; inline: boolean }[] = [
        { name: "Commit", value: truncate(commitValue, 1024), inline: false },
        { name: "Author", value: truncate(author, 1024), inline: true },
    ];
    if (duration) fields.push({ name: "Duration", value: duration, inline: true });
    if (finishedAt) fields.push({ name: "Finished At", value: finishedAt, inline: true });

    const description =
        `Branch: **${branch}**` +
        (workflow.url ? `\n[View Workflow](${workflow.url})` : "") +
        (pipeline.number != null ? `\nPipeline #${pipeline.number}` : "");

    return {
        content: mentions,
        embeds: [
            {
                title: truncate(`${display.emoji} ${projectName} / ${workflowName} ${display.label}`, 256),
                description: truncate(description, 4096),
                color: display.color,
                fields,
                footer: { text: `Status: ${status}` },
                timestamp: new Date().toISOString(),
            },
        ],
    };
};

export default async (request: Request, context: Context) => {
    try {
        console.log(`${request.method} ${request.url}`);

        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
        }

        const secret = Netlify.env.get("CIRCLECI_WEBHOOK_SECRET");
        if (!secret) {
            const msg = "Environment variable 'CIRCLECI_WEBHOOK_SECRET' must be set";
            console.error(msg);
            return new Response(msg, { status: 500 });
        }

        const discordWebhook = Netlify.env.get("DISCORD_CIRCLECI_WEBHOOK_URL");
        if (!discordWebhook) {
            const msg = "Environment variable 'DISCORD_CIRCLECI_WEBHOOK_URL' must be set";
            console.error(msg);
            return new Response(msg, { status: 500 });
        }

        const signature = request.headers.get("circleci-signature");
        if (!signature) {
            const msg = "Request header 'circleci-signature' must be set";
            console.warn(msg);
            return new Response(msg, { status: 401 });
        }

        /* The signature covers the raw body, so it must be read as text and parsed only afterwards. */
        const body = await request.text();

        if (!(await verifySignature(body, signature, secret))) {
            const msg = "Invalid signature";
            console.warn(msg);
            return new Response(msg, { status: 401 });
        }

        /* Signed but unparseable: retrying will not help, so this is a 400 rather than a 500. */
        let payload: any;
        try {
            payload = JSON.parse(body);
        } catch {
            console.warn("Request body is not valid JSON");
            return new Response("Request body is not valid JSON", { status: 400 });
        }

        /* CircleCI sends a ping when the webhook is created, plus job-completed events if subscribed. */
        if (payload.type !== "workflow-completed") {
            console.log(`Ignoring event of type '${payload.type}'`);
            return new Response(`Ignored event of type '${payload.type}'`, { status: 202 });
        }

        const status = payload.workflow?.status;
        const notifyOnSuccess = Netlify.env.get("CIRCLECI_NOTIFY_ON_SUCCESS") === "true";
        if (!notifyOnSuccess && MUTED_STATUSES.includes(status)) {
            console.log(`Ignoring workflow '${payload.workflow?.name}' with status '${status}'`);
            return new Response(`Ignored workflow with status '${status}'`, { status: 202 });
        }

        const mentions = resolveMentions(request, payload, status);
        const discordResponse = await fetch(discordWebhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buildDiscordMessage(payload, mentions)),
        });

        if (!discordResponse.ok) {
            const detail = await discordResponse.text();
            console.error(`Discord rejected the notification: ${discordResponse.status} ${detail}`);
            return new Response("Discord rejected the notification", { status: 502 });
        }

        console.log(`${request.method} ${request.url} 200 OK`);
        return new Response("Notification sent to Discord", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error sending to Discord", { status: 500 });
    }
};
