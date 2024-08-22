import axios from "axios";
import apiKey from "./credential/apiKey.mjs";

const projectId = 84216; // development: 84216; production: 85206

const requestBody = {
    name: "TypeDB Cloud Onboarding",
    description: "Shown to TypeDB Cloud users as part of their onboarding process.",
    type: "api",
    questions: [],
};

const resp = await axios.post(`https://app.posthog.com/api/projects/${projectId}/surveys`, requestBody, { headers: { "Authorization": `Bearer ${apiKey}` } });
console.log(resp.data);
