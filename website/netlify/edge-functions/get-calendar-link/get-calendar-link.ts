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
        console.log("OPTIONS /api/airmeet/register");
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
    for (const param of ["title", "service", "startTime", "durationMins", "location"]) {
        if (!params.has(param)) return badRequest(param);
    }
    const title = params.get("title")!;
    const icsName = title.replace(/\s/g, "-").toLowerCase();
    const eventResponse = await fetch(
        `${CALNDR_API_URL}/?service=${params.get("service")}&start=${params.get("startTime")}&duration=${params.get(
            "durationMins",
        )}&title=${title}&location=${params.get("location")}&calname=${icsName}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    if (!eventResponse.ok) {
        console.error(eventResponse);
        return internalServerError();
    }
    const isRedirected = await eventResponse.redirected;
    if (isRedirected) {
        return new Response(JSON.stringify({ redirectTo: eventResponse.url }), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
    const eventResponseBody = await eventResponse.json();
    const endTime = Date.now();
    console.log("GET /event: completed in " + (endTime - startTime) + "ms");

    return new Response(JSON.stringify(eventResponseBody), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
};
