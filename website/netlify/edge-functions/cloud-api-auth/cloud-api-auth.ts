/*
 * This unpublished material is proprietary to Vaticle.
 * All rights reserved. The methods and
 * techniques described herein are considered trade secrets
 * and/or confidential. Reproduction or distribution, in whole
 * or in part, is forbidden except by express written permission
 * of Vaticle.
 */

export default async (request: Request) => {
    const apiKey = Netlify.env.get("API_KEY")
    const tenantId = Netlify.env.get("TENANT_ID")
    const auth = request.headers.get("Authorization")!.replace("Basic ", "")
    const clientID = auth.split(":")[0]
    const clientSecret = auth.split(":"[1])
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            body: JSON.stringify({
                email: `${clientID}@serviceaccounts.cloud.typedb.com`,
                password: clientSecret,
                tenantId,
                returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
        }
    ).then((res) => {
        res.json().then((body) => {
            return new Response(body.idToken as string)
        })
    })
};
