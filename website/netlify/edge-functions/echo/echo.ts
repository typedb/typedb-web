/* This endpoint exists for debugging purposes - e.g. to view the payload of a webhook invocation. */

import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    console.log(await request.json());
    return new Response(null, { status: 202 });
};
