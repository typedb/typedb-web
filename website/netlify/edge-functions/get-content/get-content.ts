import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    console.log(request.url);
    const queryString = request.url.includes("?") ? request.url.split("?")[1] : null;
    console.log(queryString);
    const params = queryString ? new URLSearchParams(queryString) : null;
    console.log(params);
    const draft = params?.get("draft") === "true";
    console.log(draft);
    const sanityQuery = draft ? "*[!(_type match 'system.**')]" : "*[!(_id in path('drafts.**')) %26%26 !(_type match 'system.**')]";

    const resp = await fetch(`${Netlify.env.get("SANITY_URL")}/v2021-10-21/data/query/production?query=${sanityQuery}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${Netlify.env.get("SANITY_TOKEN")}`
        },
    });
    const body = await resp.text();
    return new Response(body, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
};
