import type { Context } from "https://edge.netlify.com";

const CALNDR_API_URL = `https://calndr.link/d/event`;

const badRequest = (missingParamName: string) =>
    new Response(`The request URL is missing the required query parameter '${missingParamName}'`, {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
    });

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
    const endTime = Date.now();
    console.log("GET /event: completed in " + (endTime - startTime) + "ms");
    return Response.redirect(
        `${CALNDR_API_URL}/?service=${params.get("service")}&start=${params.get("startTime")}&duration=${params.get(
            "durationMins",
        )}&title=${title}&location=${params.get("location")}&calname=${icsName}`,
        302,
    );
};
