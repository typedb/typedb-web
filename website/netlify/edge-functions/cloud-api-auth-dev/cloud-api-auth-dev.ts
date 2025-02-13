import type { Context } from "https://edge.netlify.com";
import { authApi } from "../../cloud-api-auth-common/cloud-api-auth-common.ts";

export default async (request: Request, context: Context) => {
    const tenantId = "platform-api-kjfbu";
    const apiKey = "AIzaSyDJHINOCzIvZpr-_CC8dtvWj4un_uuVysE";
    return authApi(request, tenantId, apiKey);
};
