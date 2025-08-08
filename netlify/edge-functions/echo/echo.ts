/* This endpoint exists for debugging purposes - e.g. to view the payload of a webhook invocation. */

import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    console.log("Received request body:");
    console.log(await request.json());

    /* NOTE: Netlify refuses to print all headers for security reasons. To print a specific header, log request.headers.get("header-key"). */
    return new Response(null, { status: 202 });
};
