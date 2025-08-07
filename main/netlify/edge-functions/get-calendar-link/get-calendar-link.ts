import type { Context } from "https://edge.netlify.com";

const CALNDR_API_URL = `https://calndr.link/d/event`;

const badRequest = (missingParamName: string) =>
    new Response(`The request URL is missing the required query parameter '${missingParamName}'`, {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
    });
const internalServerError = () => new Response(null, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });

export default async (request: Request, context: Context) => {
    if (request.method.toLowerCase() === "options") {
        console.log("OPTIONS /api/get-calendar-link");
        return new Response(null, {
            status: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS, POST",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
    const params = new URL(request.url).searchParams;
    const startTime = Date.now();
    for (const param of ["title", "service", "startTime", "timezone", "durationMins", "location"]) {
        if (!params.has(param)) return badRequest(param);
    }
    const title = params.get("title")!;
    const icsName = title.replace(/\s/g, "-").toLowerCase();
    const endTime = Date.now();
    console.log("GET /api/get-calendar-link: completed in " + (endTime - startTime) + "ms");
    const calndrURL = `${CALNDR_API_URL}/?service=${params.get("service")}&start=${params.get(
        "startTime",
    )}&duration=${params.get("durationMins")}&timezone=${params.get("timezone")}&title=${title}&description=${
        params.get("description") || title
    }&location=${params.get("location")}&calname=${icsName}`;

    return Response.redirect(calndrURL, 302);
};
