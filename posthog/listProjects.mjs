import axios from "axios";
import apiKey from "./credential/apiKey.mjs";

const organizationId = "01913325-4cd9-0000-1503-0b093ba95c51";

const resp = await axios.get(`https://app.posthog.com/api/organizations/${organizationId}/projects`, { headers: { "Authorization": `Bearer ${apiKey}` } });
console.log(resp.data);
