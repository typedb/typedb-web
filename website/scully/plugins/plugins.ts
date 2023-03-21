import { registerPlugin, getPluginConfig, HandledRoute } from '@scullyio/scully';
import axios from "axios";

const validator = async () => [];

export const pageRoutes = "pageRoutes";

const SANITY_PROJECT_ID = "xndl14mc";
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/production`;

async function pageRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    const sanityToken = process.env["SANITY_TOKEN"];
    if (!sanityToken) throw "Environment variable SANITY_TOKEN must be set";
    const { data } = await axios.get<{ result: string[] }>(SANITY_URL, {
        headers: { "Authorization": `Bearer ${sanityToken}` },
        params: { "query": "*[_type == 'page'].route.current" },
    });
    return data.result.map(x => ({ route: x }));
}

registerPlugin("router", pageRoutes, pageRoutesPlugin, validator);
