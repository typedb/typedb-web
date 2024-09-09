import axios from "axios";
import apiKey from "./credential/apiKey.mjs";

const projectId = 84216; // 84216 is the development project ID. Run listProjects.mjs to get the production project ID

const resp = await axios.get(`https://app.posthog.com/api/projects/${projectId}/surveys`, { headers: { "Authorization": `Bearer ${apiKey}` } });
console.log(resp.data);
