/* Receives GitHub's pull_request webhook for repos in the JoshBot review rotation, and fires the
 * "JoshBot PR Reviewer" Claude Code routine (via its API trigger) when a PR is marked ready for review.
 *
 * GitHub webhook config (Settings -> Webhooks on each subscribed repo):
 *   Payload URL:  https://typedb.com/api/claude-code-joshbot-reviewer
 *   Content type: application/json
 *   Secret:       same value as the GITHUB_WEBHOOK_SECRET env var below
 *   Events:       Pull requests only
 */

declare const Netlify: { env: { get(name: string): string | undefined } };

const timingSafeEqual = (a: string, b: string): boolean => {
    if (a.length !== b.length) return false;
    let mismatch = 0;
    for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return mismatch === 0;
};

const verifySignature = async (secret: string, body: string, signatureHeader: string): Promise<boolean> => {
    const [scheme, hexDigest] = signatureHeader.split("=");
    if (scheme !== "sha256" || !hexDigest) return false;

    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    );
    const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
    const expectedHexDigest = Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    return timingSafeEqual(hexDigest, expectedHexDigest);
};

export default async (request: Request) => {
    try {
        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405 });
        }

        const webhookSecret = Netlify.env.get("GITHUB_WEBHOOK_SECRET");
        if (!webhookSecret) {
            console.error("Environment variable 'GITHUB_WEBHOOK_SECRET' must be set");
            return new Response("Environment variable 'GITHUB_WEBHOOK_SECRET' must be set", { status: 500 });
        }
        const routineFireUrl = Netlify.env.get("ROUTINE_FIRE_URL");
        const routineFireToken = Netlify.env.get("ROUTINE_FIRE_TOKEN");
        if (!routineFireUrl || !routineFireToken) {
            console.error("Environment variables 'ROUTINE_FIRE_URL' and 'ROUTINE_FIRE_TOKEN' must be set");
            return new Response("Environment variables 'ROUTINE_FIRE_URL' and 'ROUTINE_FIRE_TOKEN' must be set", { status: 500 });
        }

        const signature = request.headers.get("x-hub-signature-256");
        if (!signature) {
            console.warn("Request header 'x-hub-signature-256' must be set");
            return new Response("Request header 'x-hub-signature-256' must be set", { status: 401 });
        }

        const body = await request.text();
        if (!(await verifySignature(webhookSecret, body, signature))) {
            console.warn("Invalid webhook signature");
            return new Response("Invalid signature", { status: 401 });
        }

        const githubEvent = request.headers.get("x-github-event");

        if (githubEvent === "ping") {
            console.log("Received GitHub ping event");
            return new Response("pong", { status: 200 });
        }

        if (githubEvent !== "pull_request") {
            console.log(`Ignoring GitHub event '${githubEvent}'`);
            return new Response("Event ignored", { status: 200 });
        }

        const payload = JSON.parse(body);

        if (payload.action !== "ready_for_review") {
            console.log(`Ignoring pull_request action '${payload.action}'`);
            return new Response("Action ignored", { status: 200 });
        }

        const pr = payload.pull_request;
        const repoFullName = payload.repository?.full_name ?? "unknown repository";
        const fireText =
            `PR #${pr.number} "${pr.title}" by ${pr.user?.login} in ${repoFullName} was just marked ready for review: ${pr.html_url}\n` +
            `Review this specific PR.`;

        console.log(`Firing JoshBot routine for ${repoFullName}#${pr.number}`);

        const fireResponse = await fetch(routineFireUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${routineFireToken}`,
                "anthropic-beta": "experimental-cc-routine-2026-04-01",
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: fireText }),
        });

        if (!fireResponse.ok) {
            const errorBody = await fireResponse.text();
            console.error(`Routine fire failed: ${fireResponse.status} ${errorBody}`);
            return new Response("Failed to fire routine", { status: 500 });
        }

        console.log(`Routine fired for ${repoFullName}#${pr.number}`);
        return new Response("Routine fired", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error handling webhook", { status: 500 });
    }
};
