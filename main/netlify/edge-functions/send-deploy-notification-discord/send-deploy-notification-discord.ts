export async function handler(event) {
    try {
        const payload = JSON.parse(event.body);

        // Get your Discord webhook URL from environment variable
        const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

        if (!discordWebhook) {
            return {
                statusCode: 500,
                body: "No Discord webhook URL configured"
            };
        }

        // Build deploy log URL if possible
        const deployLogUrl =
            payload.admin_url && payload.id
                ? `${payload.admin_url}/deploys/${payload.id}`
                : null;

        // Choose color and title based on deploy state
        let color;
        let title;
        switch (payload.state) {
            case "ready": // successful deploy
                color = 0x00ff99;
                title = `🚀 Deploy succeeded: ${payload.name}`;
                break;
            case "error": // failed deploy
                color = 0xff0000;
                title = `❌ Deploy failed: ${payload.name}`;
                break;
            default: // other states like building, canceled
                color = 0xffcc00;
                title = `⚠️ Deploy status: ${payload.name}`;
        }

        // Extract details from payload
        const siteName = payload.name || "Unknown site";
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
            : null;

        // Build the message for Discord
        const msg = {
            embeds: [
                {
                    title: title,
                    description: `Branch: **${branch}**\n[View Site](${siteUrl})` +
                        (deployLogUrl ? `\n[View Logs](${deployLogUrl})` : ""),
                    color: color,
                    fields: [
                        {
                            name: "Commit",
                            value: commitUrl
                                ? `[${commitRef}](${commitUrl}) — ${commitMessage}`
                                : commitMessage,
                            inline: false
                        },
                        {
                            name: "Author",
                            value: committer,
                            inline: true
                        },
                        {
                            name: "Deployed At",
                            value: createdAt || "Unknown",
                            inline: true
                        }
                    ],
                    footer: {
                        text: `State: ${state}`
                    },
                    timestamp: new Date().toISOString()
                }
            ]
        };

        // Send to Discord
        await fetch(discordWebhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(msg)
        });

        return { statusCode: 200, body: "Notification sent to Discord" };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: "Error sending to Discord" };
    }
}
