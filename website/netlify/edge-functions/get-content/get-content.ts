import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    const queryString = request.url.includes("?") ? request.url.split("?")[1] : null;
    const params = queryString ? new URLSearchParams(queryString) : null;
    const draft = params?.get("draft") === "true";

    if (draft) {
        return await fetch(`${Netlify.env.get("SANITY_URL")}/v2021-10-21/data/query/production?query=*[!(_type match 'system.**')]`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Netlify.env.get("SANITY_TOKEN")}`
            }
        });
    } else {
        return await fetch(`${Netlify.env.get("SANITY_URL")}/v2021-10-21/data/query/production?query=*[!(_id in path('drafts.**')) && !(_type match 'system.**')]`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Netlify.env.get("SANITY_TOKEN")}`
            }
        });
    }
};
