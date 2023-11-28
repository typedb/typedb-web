import { SANITY_QUERY_URL } from "../sanity-config";
import { FooterData, footerQuery } from "./footer-query";

export const getFooterData = async (): Promise<FooterData> => {
    const url = new URL(SANITY_QUERY_URL);
    url.searchParams.set("query", footerQuery);
    url.searchParams.set("perspective", "published");

    const response = await fetch(url);
    const json = await response.json();

    return json.result;
};
