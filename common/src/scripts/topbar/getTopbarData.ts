import { TopbarData, topbarQuery } from "./topbarQuery";

const SANITY_URL = "https://xndl14mc.api.sanity.io/";
const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production`;
// Read-only API token that must be provided to read draft content
const SANITY_TOKEN =
    "skIRNgnaiMLWn9XUwl20yvPaUODDE4P6kNWiRicQEthG2J4wvcCA1vRaCkTC9y4SChNzoq8BAw2vRuDEKvXRayMbVgUFsuER7otBti0zDzDk6mrEPze4oDfEPYyiw9eklL352jwFXVELvHNESrvkRiAm5IDxECjN3aYM3JjNH7bWbp5czrw3";

export const getTopbarData = async (): Promise<TopbarData> => {
    const url = new URL(SANITY_QUERY_URL);
    url.searchParams.set("query", topbarQuery);

    const response = await fetch(url, { headers: { Authorization: `Bearer ${SANITY_TOKEN}` } });
    const json = await response.json();

    return json.result;
};
