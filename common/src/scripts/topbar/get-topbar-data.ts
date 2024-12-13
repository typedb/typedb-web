import { SANITY_QUERY_URL } from "../sanity-config";
import { TopnavData, topbarQuery } from "./schema";

export const getTopbarData = async (): Promise<TopnavData> => {
    const url = new URL(SANITY_QUERY_URL);
    url.searchParams.set("query", topbarQuery);
    url.searchParams.set("perspective", "published");

    const response = await fetch(url);
    const json = await response.json();

    return json.result;
};
