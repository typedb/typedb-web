import axios from "axios";
import apiKey from "./credential/apiKey.mjs";

const resp = await axios.get(`https://app.posthog.com/api/organizations/`, { headers: { "Authorization": `Bearer ${apiKey}` } });
console.log(resp.data);
