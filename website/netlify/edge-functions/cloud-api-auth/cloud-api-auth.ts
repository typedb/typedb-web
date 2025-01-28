/*
 * This unpublished material is proprietary to Vaticle.
 * All rights reserved. The methods and
 * techniques described herein are considered trade secrets
 * and/or confidential. Reproduction or distribution, in whole
 * or in part, is forbidden except by express written permission
 * of Vaticle.
 */

import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    if (request.method !== "POST") return undefined;
    const apiKey = "AIzaSyDJHINOCzIvZpr-_CC8dtvWj4un_uuVysE"// Netlify.env.get("CLOUD_API_AUTH_API_KEY");
    const tenantId = "platform-api-kjfbu"// Netlify.env.get("CLOUD_API_AUTH_TENANT_ID");
    const auth = request.headers.get("Authorization")!.replace("Basic ", "");
    const clientID = auth.split(":")[0];
    const clientSecret = auth.split(":")[1];
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: "POST",
        body: JSON.stringify({
            email: `${clientID}@serviceaccounts.cloud.typedb.com`,
            password: clientSecret,
            tenantId,
            returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) return response;
    const body = await response.json();
    return new Response(body.idToken);
};
