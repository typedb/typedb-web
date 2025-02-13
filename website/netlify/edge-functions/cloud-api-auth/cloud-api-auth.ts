import type { Context } from "https://edge.netlify.com";
import { authApi } from "../../cloud-api-auth-common/cloud-api-auth-common.ts";

export default async (request: Request, context: Context) => {
    const tenantId = "platform-api-utdw2";
    const apiKey = "AIzaSyBwx6DlQYNejTVUtjzQetj15frQ_FblVT8";
    return authApi(request, tenantId, apiKey);
};
