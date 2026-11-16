// /netlify/edge-functions/form-submit/form-submit.ts
//
// Relay for website form submissions. The browser posts here with no credential; this function
// holds the Customer.io private key and forwards to the Customer.io Forms API, which rejects
// public keys.
//
// Env vars (Netlify site settings, scoped per deploy context):
//   CIO_PRIVATE_KEY   required (sk_...); production workspace key in the production
//                     context, development workspace key everywhere else
//
// Request: POST /forms/<formId>/submit, application/json
//   { "data": { "email": "...", "<field>": "<string>", ... } }
// Response: 204 on accept, 400 on a malformed payload, 502 on upstream failure, 503 when not configured.

export const config = {
    path: "/forms/*",
    rateLimit: {
        windowLimit: 10,
        windowSize: 60,
        aggregateBy: ["ip", "domain"],
    },
};

declare const Netlify: { env: { get(name: string): string | undefined } };

const PATH_PATTERN = /^\/forms\/([\w-]{1,64})\/submit\/?$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 16 * 1024;
const MAX_FIELDS = 30;
const MAX_FIELD_NAME_CHARS = 64;
const FORWARD_TIMEOUT_MS = 5000;

// Local and deploy-preview builds post here cross-origin
const corsHeaders = (request: Request): Record<string, string> =>
    request.headers.get("origin")
        ? {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, OPTIONS",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Max-Age": "86400",
          }
        : {};

const parseFields = (raw: unknown): Record<string, string> | string => {
    const data = (raw as { data?: unknown } | null)?.data;
    if (typeof data !== "object" || data === null || Array.isArray(data)) return "missing data";
    const entries = Object.entries(data);
    if (entries.length > MAX_FIELDS) return "too many fields";
    for (const [name, value] of entries) {
        if (!name.length || name.length > MAX_FIELD_NAME_CHARS) return "invalid field name";
        if (typeof value !== "string") return `field ${name} must be a string`;
    }
    const fields = data as Record<string, string>;
    if (!EMAIL_PATTERN.test(fields.email ?? "")) return "missing or invalid email";
    return fields;
};

export default async (request: Request) => {
    const cors = corsHeaders(request);
    const respond = (status: number, body?: string) => new Response(body ?? null, { status, headers: cors });

    if (request.method === "OPTIONS") return respond(204);
    if (request.method !== "POST") return respond(405);
    const formId = PATH_PATTERN.exec(new URL(request.url).pathname)?.[1];
    if (!formId) return respond(404);
    const key = Netlify.env.get("CIO_PRIVATE_KEY");
    if (!key) {
        console.error("form-submit: CIO_PRIVATE_KEY is not set");
        return respond(503);
    }

    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return respond(413);
    let raw: unknown;
    try {
        raw = JSON.parse(text);
    } catch {
        return respond(400, "body is not valid JSON");
    }
    const fields = parseFields(raw);
    if (typeof fields === "string") return respond(400, fields);

    try {
        const response = await fetch(`https://track.customer.io/api/v1/forms/${formId}/submit`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({ data: fields }),
            signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
        });
        if (!response.ok) {
            console.error(`form-submit: upstream responded ${response.status}: ${await response.text()}`);
            return respond(502);
        }
    } catch (err) {
        console.error(`form-submit: upstream request failed: ${err}`);
        return respond(502);
    }
    return respond(204);
};
