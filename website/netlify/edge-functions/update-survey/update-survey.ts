/* This endpoint exists for debugging purposes - e.g. to view the payload of a webhook invocation. */

import type { Context } from "https://edge.netlify.com";
// import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const POSTHOG_PROJECT_ID_DEV = 84216;

const invalidId = (id: string) => new Response(`The value of _id [${id}] is invalid`, { status: 400 });

export default async (request: Request, context: Context) => {
    const bodyRaw = await request.text();
    // const signature = request.headers.get(SIGNATURE_HEADER_NAME);
    const secret = Netlify.env["SANITY_WEBHOOK_SECRET"];

    if (!secret) {
        console.error(`The environment variable SANITY_WEBHOOK_SECRET is not set`);
        return new Response(`Internal error`, { status: 500 });
    }

    // if (!(await isValidSignature(bodyRaw, signature || "", secret))) {
    //     console.warn(`Received survey update with invalid signature`);
    //     return new Response(`Unauthenticated`, { status: 401 });
    // }

    // TODO: strengthen security by using Sanity's signature check once Netlify supports the @sanity/webhook module
    if (request.headers.get("X-Secret") !== secret) {
        console.warn(`Received survey update with missing or incorrect secret value`);
        return new Response(`Unauthenticated`, { status: 401 });
    }

    const body = JSON.parse(bodyRaw);
    console.log("Received survey update:");
    console.log(body);

    const idFieldRaw = body._id;
    if (typeof body._id !== "string" || !/^(drafts\.)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(body._id)) {
        return invalidId(body._id);
    }
    const isDraft = (idFieldRaw as string).startsWith("drafts.");

    const targetEnvs = (isDraft ? ["development"] : ["development", "production"]) as ("development" | "production")[];

    // console.log("Sending survey to PostHog ...");
    // await sendSurveyToPosthog(body, targetEnvs);
    // console.log("Success");

    return new Response(null, { status: 202 });
};

async function sendSurveyToPosthog(data: any, targetEnvs: ("development" | "production")[]) {
    const survey = surveyOf(data);
    const surveyIdDev = data.posthogConfig.developmentId;
    const surveyIdProd = data.posthogConfig.productionId;
    for (const env of targetEnvs) {
        if (env === "production") break; // TODO
        else {
            await fetch(
                `https://app.posthog.com/api/projects/${POSTHOG_PROJECT_ID_DEV}/surveys/${surveyIdDev}`,
                {
                    method: "PATCH",
                    headers: { "Authorization": `Bearer ${process.env["POSTHOG_API_KEY_DEV"]}` },
                    body: JSON.stringify(survey),
                },
            );
        }
    }
}

function surveyOf(data: any) {
    return {
        name: data.name,
        description: data.description,
        type: "api",
        questions: data.questions.map(q => questionOf(q)),
    };
}

function questionOf(data: any) {
    return {
        type: data.isMultiSelect ? "multiple_choice" : "single_choice",
        question: data.body,
        choices: data.options,
        hasOpenChoice: data.hasOpenEndedOption,
    };
}
