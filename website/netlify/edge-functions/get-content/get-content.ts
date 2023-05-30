import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    return await fetch(`${process.env["SANITY_URL"]}/v2021-10-21/data/query/production?query=*[!(_type match 'system.**')]`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env["SANITY_TOKEN"]}`
        }
    });
};
