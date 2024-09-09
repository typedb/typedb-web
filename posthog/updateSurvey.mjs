import axios from "axios";
import apiKey from "./credential/apiKey.mjs";

const projectId = 84216; // development: 84216; production: 85206
const surveyId = "019170b8-0940-0000-60bb-6f2537fd2726"; // development: 019170b8-0940-0000-60bb-6f2537fd2726; production: 01917a23-5fd5-0000-6964-e4ce37232e5b

const requestBody = {
    name: "TypeDB Cloud Onboarding",
    description: "Shown to TypeDB Cloud users as part of their onboarding process.",
    type: "api",
    questions: [{
        type: "single_choice",
        question: "What brings you to TypeDB Cloud?",
        choices: [
            "Migrating from self-managed TypeDB",
            "Migrating from SQL",
            "Migrating from a different DB (not SQL)",
            "New company project",
            "Learning or personal project",
            "Other",
        ],
        hasOpenChoice: true
    }, {
        type: "single_choice",
        question: "How long have you been developing with TypeDB?",
        choices: [
            "Less than 1 month",
            "1-6 months",
            "6-12 months",
            "More than 1 year",
            "Learning or personal project",
            "Other",
            "asdf",
            "dsfhjg",
        ],
        hasOpenChoice: true
    }],
};

const resp = await axios.patch(`https://app.posthog.com/api/projects/${projectId}/surveys/${surveyId}`, requestBody, { headers: { "Authorization": `Bearer ${apiKey}` } });
console.log(resp.data);
