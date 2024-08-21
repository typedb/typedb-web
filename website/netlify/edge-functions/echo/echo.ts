/* This endpoint exists for debugging purposes - e.g. to view the payload of a webhook invocation. */

import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    console.log("BODY");
    console.log(await request.json());
    console.log("HEADERS['sanity-operation']");
    console.log(request.headers.get("sanity-operation"));
    return new Response(null, { status: 202 });
};
