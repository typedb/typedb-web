import type { Context } from "https://edge.netlify.com";

const SANITY_QUERY_URL = `https://xndl14mc.api.sanity.io/v2021-10-21/data/query/production`;

// Open CORS so local and cloud.typedb.dev instances can query drafts too.
const CORS_HEADERS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS" };

// Proxies draft-perspective GROQ queries for the dev site, so the read token stays
// server-side instead of shipping in the browser bundle.
export default async (request: Request, context: Context) => {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });

    const token = Netlify.env.get("SANITY_DRAFTS_TOKEN");
    // Unset on production/staging, where only the published perspective is used.
    if (!token) return new Response("Draft preview is not enabled for this deployment", { status: 404, headers: CORS_HEADERS });

    const query = new URL(request.url).searchParams.get("query");
    if (!query) return new Response("The request URL is missing the required query parameter 'query'", { status: 400, headers: CORS_HEADERS });

    const url = new URL(SANITY_QUERY_URL);
    url.searchParams.set("query", query);
    url.searchParams.set("perspective", "previewDrafts");

    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) {
        console.log(`GET /api/sanity-draft-query: upstream responded ${response.status}`);
        return new Response(null, { status: 502, headers: CORS_HEADERS });
    }
    return new Response(response.body, {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
};
