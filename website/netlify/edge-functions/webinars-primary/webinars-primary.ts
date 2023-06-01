import type { Context } from "https://edge.netlify.com";

const AIRMEET_API_URL = `https://api-gateway-prod.us.airmeet.com/prod`;
const internalServerError = () => new Response(null, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });

async function fetchSession(airmeetID: string, token: string): Promise<any> {
    const sessionsResponse = await fetch(`${AIRMEET_API_URL}/airmeet/${airmeetID}/info`, {
        method: "GET",
        headers: {
            "X-Airmeet-Access-Token": token,
        },
    });
    if (!sessionsResponse.ok) {
        console.error(sessionsResponse);
        throw internalServerError();
    }
    const sessionsResponseBody = await sessionsResponse.json();
    return sessionsResponseBody.sessions[0];
}

export default async (request: Request, context: Context) => {
    console.log(request.url);
    const queryString = request.url.includes("?") ? request.url.split("?")[1] : null;
    console.log(queryString);
    const params = queryString ? new URLSearchParams(queryString) : null;
    console.log(params);
    // const draft = params?.get("draft") === "true";
    // console.log(draft);
    // const sanityQuery = draft ? "*[!(_type match 'system.**')]" : "*[!(_id in path('drafts.**')) %26%26 !(_type match 'system.**')]";

    const authResponse = await fetch(`${AIRMEET_API_URL}/auth`, {
        method: "POST",
        headers: {
            "X-Airmeet-Access-Key": Netlify.env.get("AIRMEET_API_ACCESS_KEY"),
            "X-Airmeet-Secret-Key": Netlify.env.get("AIRMEET_API_SECRET_KEY"),
        },
    });
    if (!authResponse.ok) {
        console.error(authResponse);
        return internalServerError();
    }
    const authResponseBody = await authResponse.json();
    const token = authResponseBody.data.token;

    const airmeetsResponse = await fetch(`${AIRMEET_API_URL}/airmeets`, {
        method: "GET",
        headers: {
            "X-Airmeet-Access-Token": token,
        },
    });
    if (!airmeetsResponse.ok) {
        console.error(airmeetsResponse);
        return internalServerError();
    }
    const airmeetsResponseBody = await airmeetsResponse.json();
    const airmeetIDs: any[] = airmeetsResponseBody.data.map((x: any) => x.uid);

    let sessions;
    try {
        sessions = await Promise.all(airmeetIDs.map(x => fetchSession(x, token)));
    } catch (e) {
        return internalServerError();
    }

    return new Response(JSON.stringify(sessions), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
};
