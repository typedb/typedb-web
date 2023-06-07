import type { Context } from "https://edge.netlify.com";

const AIRMEET_API_URL = `https://api-gateway-prod.us.airmeet.com/prod`;
const internalServerError = () => new Response(null, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });

export default async (request: Request, context: Context) => {
    // console.log(request.url);
    const requestBody = await request.json();
    console.log(requestBody);

    const [accessKey, secretKey] = [Netlify.env.get("AIRMEET_API_ACCESS_KEY"), Netlify.env.get("AIRMEET_API_SECRET_KEY")];
    let startTime = Date.now();
    const authResponse = await fetch(`${AIRMEET_API_URL}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Airmeet-Access-Key": accessKey,
            "X-Airmeet-Secret-Key": secretKey,
        },
    });
    if (!authResponse.ok) {
        console.error(authResponse);
        return internalServerError();
    }
    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;
    let endTime = Date.now();
    console.log("POST /auth: completed in " + (endTime - startTime) + "ms");

    startTime = Date.now();
    const registerResponse = await fetch(`${AIRMEET_API_URL}/airmeet/${requestBody.airmeetID}/attendee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Airmeet-Access-Token": token,
        },
        body: JSON.stringify({
            email: requestBody.email,
            firstName: requestBody.firstName,
            lastName: requestBody.lastName,
            attendance_type: "VIRTUAL",
            city: requestBody.city,
            country: requestBody.country,
            designation: requestBody.jobTitle,
            organisation: requestBody.companyName,
            registerAttendee: true,
        }),
    });
    if (!registerResponse.ok) {
        console.error(registerResponse);
        return internalServerError();
    }
    const registerResponseBody = await registerResponse.json();
    console.log(registerResponseBody);
    const entryLink: string = registerResponseBody.entryLink;
    endTime = Date.now();
    console.log(`POST /airmeets/${requestBody.airmeetID}/attendee: completed in ${(endTime - startTime)}ms`);

    return new Response(JSON.stringify({ entryLink: entryLink }), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
};
