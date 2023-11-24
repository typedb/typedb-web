import { SANITY_QUERY_URL } from "../sanity-config";
import { TopbarData, topbarQuery } from "./topbar-query";

export const getTopbarData = async (): Promise<TopbarData> => {
    const url = new URL(SANITY_QUERY_URL);
    url.searchParams.set("query", topbarQuery);
    url.searchParams.set("perspective", "published");

    const response = await fetch(url);
    const json = await response.json();

    return json.result;
};
