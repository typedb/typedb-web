import { getStore } from "@netlify/blobs";

// Alert when account bandwidth is consumed faster than this rate.
const DEFAULT_ALERT_GB_PER_HOUR = 2;

const ACCOUNT_SLUG = "typedb";

export default async () => {
    const apiToken = process.env.NETLIFY_ADMIN_API_TOKEN;
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    if (!apiToken || !discordWebhook) {
        console.error("Environment variables 'NETLIFY_ADMIN_API_TOKEN' and 'DISCORD_WEBHOOK_URL' must be set");
        return;
    }
    const thresholdGbPerHour = Number(process.env.BANDWIDTH_ALERT_GB_PER_HOUR) || DEFAULT_ALERT_GB_PER_HOUR;

    const response = await fetch(`https://api.netlify.com/api/v1/accounts/${ACCOUNT_SLUG}/bandwidth`, {
        headers: { Authorization: `Bearer ${apiToken}` },
    });
    if (!response.ok) {
        console.error(`Netlify bandwidth API responded ${response.status}`);
        return;
    }
    const bandwidth = await response.json();
    const usedBytes = bandwidth.used;
    const updatedAt = new Date(bandwidth.last_updated_at).getTime();

    const store = getStore("bandwidth-monitor");
    const previous = await store.get("last-reading", { type: "json" });
    await store.setJSON("last-reading", { usedBytes, updatedAt });

    if (!previous || previous.updatedAt >= updatedAt) return; // first run, or the API has no fresh data yet
    if (usedBytes < previous.usedBytes) return; // counter reset at the start of a new billing period

    const elapsedHours = (updatedAt - previous.updatedAt) / (1000 * 60 * 60);
    const deltaGb = (usedBytes - previous.usedBytes) / 1e9;
    const gbPerHour = deltaGb / elapsedHours;
    console.log(`Bandwidth: ${deltaGb.toFixed(2)}GB over ${elapsedHours.toFixed(2)}h (${gbPerHour.toFixed(2)}GB/hour)`);

    // Record the reading in the PostHog 'web' project for dashboarding.
    // Scheduled functions only run in production, hence the production project key.
    try {
        await fetch("https://us.i.posthog.com/capture/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api_key: "phc_w6b3dE1UxM9LKE2FLbDP9yiHFEXegbtxv1feHm0yigA",
                event: "netlify_bandwidth_reading",
                distinct_id: "netlify-bandwidth-monitor",
                timestamp: new Date(updatedAt).toISOString(),
                properties: {
                    $process_person_profile: false,
                    gb_delta: Number(deltaGb.toFixed(3)),
                    gb_per_hour: Number(gbPerHour.toFixed(3)),
                    elapsed_hours: Number(elapsedHours.toFixed(2)),
                    gb_used_in_billing_period: Number((usedBytes / 1e9).toFixed(2)),
                },
            }),
        });
    } catch (error) {
        console.error("Failed to record reading in PostHog:", error);
    }

    if (gbPerHour < thresholdGbPerHour) return;

    await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: "<@708327677165043833>",
            embeds: [
                {
                    title: "🚨 Netlify bandwidth usage anomaly",
                    description:
                        `Account bandwidth is being consumed at **${gbPerHour.toFixed(1)}GB/hour** ` +
                        `(${deltaGb.toFixed(1)}GB over the last ${elapsedHours.toFixed(1)}h). ` +
                        `${(usedBytes / 1e9).toFixed(0)}GB used so far this billing period.`,
                    color: 0xe96464,
                    timestamp: new Date().toISOString(),
                },
            ],
        }),
    });
};

export const config = { schedule: "@hourly" };
