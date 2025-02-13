import type { Context } from "https://edge.netlify.com";
import { authApi } from "../../cloud-api-auth-common/cloud-api-auth-common.ts";

export default async (request: Request, context: Context) => {
    const tenantId = "platform-api-tnz9v";
    const apiKey = "AIzaSyBUcSa59YGemKHQb1UVT9nBk7H-yZCdJQ4";
    return authApi(request, tenantId, apiKey);
};
