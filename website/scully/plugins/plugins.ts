import { registerPlugin, getPluginConfig, HandledRoute } from '@scullyio/scully';
import axios from "axios";
import { SANITY_TOKEN } from "../../src/service/credentials/token";

const validator = async () => [];

export const pageRoutes = "pageRoutes";

const SANITY_PROJECT_ID = "xndl14mc";
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/production`;

async function pageRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    const { data } = await axios.get<{ result: string[] }>(SANITY_URL, {
        headers: { "Authorization": `Bearer ${SANITY_TOKEN}` },
        params: { "query": "*[_type == 'page'].route.current" },
    });
    return data.result.map(x => ({ route: x }));
}

registerPlugin("router", pageRoutes, pageRoutesPlugin, validator);
