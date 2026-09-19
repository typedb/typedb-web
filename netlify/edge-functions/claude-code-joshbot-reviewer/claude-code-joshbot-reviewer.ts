/* Receives GitHub's pull_request webhook for repos in the JoshBot review rotation, and fires the
 * "JoshBot PR Reviewer" Claude Code routine (via its API trigger) when a PR is marked ready for review.
 *
 * GitHub webhook config (Settings -> Webhooks, per repo or org-wide):
 *   Payload URL:  https://typedb.com/api/claude-code-joshbot-reviewer
 *   Content type: application/json
 *   Secret:       same value as the GITHUB_PR_WEBHOOK_SECRET env var below
 *   Events:       Pull requests (anything else is ignored, so "send me everything" also works)
 *
 * Every ready-for-review PR is forwarded regardless of repository; the routine's own prompt
 * ignores repositories it does not have checked out.
 *
 * Only PRs authored by members or owners of the repository's organisation are forwarded. The
 * routine runs with Joshua's GitHub identity and reads the PR's text, so an outsider's PR must
 * not be able to start it.
 */

declare const Netlify: { env: { get(name: string): string | undefined } };

const ORG_MEMBER_ASSOCIATIONS = ["OWNER", "MEMBER"];

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

        const env: Record<string, string> = {};
        for (const name of ["GITHUB_PR_WEBHOOK_SECRET", "JOSHBOT_CLAUDE_ROUTINE_URL", "JOSHBOT_CLAUDE_ROUTINE_TOKEN"]) {
            const value = Netlify.env.get(name);
            if (!value) {
                console.error(`Environment variable '${name}' must be set`);
                return new Response(`Environment variable '${name}' must be set`, { status: 500 });
            }
            env[name] = value;
        }
        const webhookSecret = env.GITHUB_PR_WEBHOOK_SECRET;
        const routineFireUrl = env.JOSHBOT_CLAUDE_ROUTINE_URL;
        const routineFireToken = env.JOSHBOT_CLAUDE_ROUTINE_TOKEN;

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
        if (!ORG_MEMBER_ASSOCIATIONS.includes(pr.author_association)) {
            console.log(`Ignoring PR #${pr.number} by ${pr.user?.login} (author_association: ${pr.author_association})`);
            return new Response("Author ignored", { status: 200 });
        }

        const repoFullName = payload.repository?.full_name ?? "unknown repository";
        const fireText =
            `PR #${pr.number} "${pr.title}" by ${pr.user?.login} in ${repoFullName} was just marked ready for review: ${pr.html_url}\n` +
            `Head: ${pr.head?.label} -> Base: ${pr.base?.ref}\n` +
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
