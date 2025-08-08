export default async (request: Request, context) => {
    try {
        console.log(`${request.method} ${request.url}`);
        
        // Access env var from context.env
        const secret = Netlify.env.get("NETLIFY_WEBHOOK_SECRET");
        if (!secret) {
            const msg = `Environment variable 'NETLIFY_WEBHOOK_SECRET' must be set`;
            console.error(msg);
            return new Response(msg, { status: 500 });
        }

        // Your Discord webhook URL
        const discordWebhook = Netlify.env.get("DISCORD_WEBHOOK_URL");
        if (!discordWebhook) {
            const msg = "Environment variable 'DISCORD_WEBHOOK_URL' must be set";
            console.error(msg);
            return new Response("Environment variable 'DISCORD_WEBHOOK_URL' must be set", { status: 500 });
        }

        const signature = request.headers.get("X-Webhook-Signature");
        if (!signature) {
            const msg = `Request header 'X-Webhook-Signature' must be set`;
            console.warn(msg);
            return new Response(msg, { status: 401 });
        }

        // Read raw body as text
        const bodyText = await request.text();

        // Verify signature using Web Crypto API
        // Create a key from the secret
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);

        const cryptoKey = await crypto.subtle.importKey(
            "raw",
            keyData,
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign", "verify"]
        );

        // Decode signature from hex to Uint8Array
        function hexToUint8Array(hex: string) {
            const arr = new Uint8Array(hex.length / 2);
            for (let i = 0; i < arr.length; i++) {
                arr[i] = parseInt(hex.substr(i * 2, 2), 16);
            }
            return arr;
        }

        const signatureBytes = hexToUint8Array(signature);
        const data = encoder.encode(bodyText);

        // Verify the signature
        const valid = await crypto.subtle.verify(
            "HMAC",
            cryptoKey,
            signatureBytes,
            data
        );

        if (!valid) {
            return new Response("Invalid signature", { status: 401 });
        }

        // Parse the payload JSON
        const payload = JSON.parse(bodyText);

        // Build deploy log URL if possible
        const deployLogUrl =
            payload.admin_url && payload.id
                ? `${payload.admin_url}/deploys/${payload.id}`
                : null;

        // Choose color and title based on deploy state
        let color;
        let title;
        let mention = ""; // for personal ping
        switch (payload.state) {
            case "ready":
                color = 0x00ff99;
                title = `🚀 Deploy succeeded: ${payload.name}`;
                break;
            case "error":
                color = 0xff0000;
                title = `❌ Deploy failed: ${payload.name}`;
                mention = `<@708327677165043833>`;
                break;
            default:
                color = 0xffcc00;
                title = `⚠️ Deploy status: ${payload.name}`;
        }

        // Extract commit info
        const branch = payload.branch || "unknown";
        const siteUrl = payload.url || "No URL";
        const state = payload.state || "unknown";
        const commitMessage = payload.commit_message || "No commit message";
        const commitUrl = payload.commit_url || null;
        const commitRef = payload.commit_ref
            ? payload.commit_ref.substring(0, 7)
            : null;
        const committer = payload.committer || "Unknown author";
        const createdAt = payload.created_at
            ? new Date(payload.created_at).toLocaleString()
            : "Unknown";

        // Construct Discord payload
        const discordMsg = {
            content: mention,
            embeds: [
                {
                    title,
                    description:
                        `Branch: **${branch}**\n[View Site](${siteUrl})` +
                        (deployLogUrl ? `\n[View Logs](${deployLogUrl})` : ""),
                    color,
                    fields: [
                        {
                            name: "Commit",
                            value: commitUrl
                                ? `[${commitRef}](${commitUrl}) — ${commitMessage}`
                                : commitMessage,
                            inline: false,
                        },
                        {
                            name: "Author",
                            value: committer,
                            inline: true,
                        },
                        {
                            name: "Deployed At",
                            value: createdAt,
                            inline: true,
                        },
                    ],
                    footer: {
                        text: `State: ${state}`,
                    },
                    timestamp: new Date().toISOString(),
                },
            ],
        };

        // Send message to Discord
        await fetch(discordWebhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(discordMsg),
        });

        return new Response("Notification sent to Discord", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error sending to Discord", { status: 500 });
    }
};
