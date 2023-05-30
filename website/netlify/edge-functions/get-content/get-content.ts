import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    return await fetch(`${Netlify.env.get("SANITY_URL")}/v2021-10-21/data/query/production?query=*[!(_type match 'system.**')]`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${Netlify.env.get("SANITY_TOKEN")}`
        }
    });
};
