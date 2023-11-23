import { SANITY_QUERY_URL } from "../sanityConfig";
import { TopbarData, topbarQuery } from "./topbarQuery";

export const getTopbarData = async (): Promise<TopbarData> => {
    const url = new URL(SANITY_QUERY_URL);
    url.searchParams.set("query", topbarQuery);

    const response = await fetch(url);
    const json = await response.json();

    return json.result;
};
