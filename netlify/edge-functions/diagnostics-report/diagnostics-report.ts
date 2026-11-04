// /netlify/edge-functions/diagnostics-report/diagnostics-report.ts
//
// Crash report relay for TypeDB products (Console today; server and enterprise can follow).
// Clients post a provider-neutral payload here; this function maps it to the current error
// tracking backend (PostHog error tracking) and forwards it. Swapping the backend later is
// a change here only, with no client release needed.
//
// Env vars (Netlify site settings):
//   POSTHOG_DEPLOYMENTS_TOKEN   required; the function 503s without it
//   DIAGNOSTICS_POSTHOG_HOST    default "https://us.i.posthog.com"
//
// Request: POST application/json
//   {
//     "product": "console",            // console | server | enterprise
//     "version": "3.13.6",
//     "install_id": "<opaque hash>",   // stable anonymous id per install
//     "os": "macos", "arch": "aarch64",
//     "error": {
//       "kind": "panic",               // exception type shown in the tracker
//       "message": "...",
//       "lang": "rust",                // optional, default rust
//       "frames": [{ "function": "...", "file": "...", "line": 12, "in_app": true }],  // innermost first
//       "backtrace": "..."             // optional raw text
//     },
//     "properties": { ... }            // optional extra event properties
//   }
// Response: 202 on accept, 400 on a malformed payload, 503 when not configured.

export const config = {
    path: "/api/diagnostics/v1/report",
    rateLimit: {
        windowLimit: 30,
        windowSize: 60,
        aggregateBy: ["ip", "domain"],
    },
};

declare const Netlify: { env: { get(name: string): string | undefined } };

const DEFAULT_POSTHOG_HOST = "https://us.i.posthog.com";
const PRODUCTS = new Set(["console", "server", "enterprise"]);
const MAX_BODY_BYTES = 256 * 1024;
const MAX_FRAMES = 200;
const MAX_STRING_CHARS = 16 * 1024;
const FORWARD_TIMEOUT_MS = 5000;

type Frame = { function: string; file?: string; line?: number; in_app?: boolean };
type Report = {
    product: string;
    version: string;
    install_id: string;
    os?: string;
    arch?: string;
    error: { kind: string; message: string; lang?: string; frames?: Frame[]; backtrace?: string };
    properties?: Record<string, unknown>;
};

const respond = (status: number, body?: string) => new Response(body ?? null, { status });

const isString = (value: unknown, max = MAX_STRING_CHARS): value is string =>
    typeof value === "string" && value.length > 0 && value.length <= max;

const parseReport = (raw: unknown): Report | string => {
    if (typeof raw !== "object" || raw === null) return "body must be a JSON object";
    const body = raw as Record<string, unknown>;
    if (!isString(body.product, 32) || !PRODUCTS.has(body.product)) return "unknown product";
    if (!isString(body.version, 64)) return "missing version";
    if (!isString(body.install_id, 128)) return "missing install_id";
    if (typeof body.error !== "object" || body.error === null) return "missing error";
    const error = body.error as Record<string, unknown>;
    if (!isString(error.kind, 128)) return "missing error.kind";
    if (!isString(error.message)) return "missing error.message";
    const frames: Frame[] = [];
    if (error.frames !== undefined) {
        if (!Array.isArray(error.frames) || error.frames.length > MAX_FRAMES) return "invalid error.frames";
        for (const frame of error.frames) {
            if (typeof frame !== "object" || frame === null) return "invalid frame";
            const f = frame as Record<string, unknown>;
            if (!isString(f.function, 1024)) return "frame missing function";
            frames.push({
                function: f.function,
                file: isString(f.file, 1024) ? f.file : undefined,
                line: typeof f.line === "number" && Number.isInteger(f.line) ? f.line : undefined,
                in_app: f.in_app === true,
            });
        }
    }
    return {
        product: body.product,
        version: body.version,
        install_id: body.install_id,
        os: isString(body.os, 64) ? body.os : undefined,
        arch: isString(body.arch, 64) ? body.arch : undefined,
        error: {
            kind: error.kind,
            message: error.message,
            lang: isString(error.lang, 32) ? error.lang : "rust",
            frames,
            backtrace: isString(error.backtrace) ? error.backtrace : undefined,
        },
        properties:
            typeof body.properties === "object" && body.properties !== null
                ? (body.properties as Record<string, unknown>)
                : undefined,
    };
};

// https://posthog.com/docs/error-tracking/installation/manual
const toPostHogEvent = (report: Report, token: string) => ({
    api_key: token,
    event: "$exception",
    distinct_id: report.install_id,
    properties: {
        ...(report.properties ?? {}),
        $process_person_profile: false,
        $lib: `typedb-${report.product}`,
        $lib_version: report.version,
        $os: report.os,
        $arch: report.arch,
        $exception_level: "fatal",
        $exception_list: [
            {
                type: report.error.kind,
                value: report.error.message,
                mechanism: { handled: false, synthetic: false },
                stacktrace: {
                    type: "raw",
                    frames: (report.error.frames ?? []).map((frame) => ({
                        platform: "custom",
                        lang: report.error.lang,
                        function: frame.function,
                        filename: frame.file,
                        lineno: frame.line,
                        in_app: frame.in_app ?? false,
                    })),
                },
            },
        ],
        backtrace: report.error.backtrace,
    },
});

export default async (request: Request) => {
    if (request.method !== "POST") return respond(405);
    const token = Netlify.env.get("POSTHOG_DEPLOYMENTS_TOKEN");
    if (!token) {
        console.error("diagnostics-report: POSTHOG_DEPLOYMENTS_TOKEN is not set");
        return respond(503);
    }
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) return respond(413);
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return respond(413);
    let raw: unknown;
    try {
        raw = JSON.parse(text);
    } catch {
        return respond(400, "body is not valid JSON");
    }
    const report = parseReport(raw);
    if (typeof report === "string") return respond(400, report);

    const host = (Netlify.env.get("DIAGNOSTICS_POSTHOG_HOST") ?? DEFAULT_POSTHOG_HOST).replace(/\/+$/, "");
    try {
        const response = await fetch(`${host}/i/v0/e/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toPostHogEvent(report, token)),
            signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
        });
        if (!response.ok) {
            console.error(`diagnostics-report: upstream responded ${response.status}: ${await response.text()}`);
            return respond(502);
        }
    } catch (err) {
        console.error(`diagnostics-report: upstream request failed: ${err}`);
        return respond(502);
    }
    console.log(`diagnostics-report: forwarded ${report.product} ${report.version} ${report.error.kind}`);
    return respond(202);
};
