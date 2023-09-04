import { registerPlugin, getPluginConfig, HandledRoute } from '@scullyio/scully';
import axios from "axios";

const validator = async () => [];

export const pageRoutes = "pageRoutes";
export const blogPostRoutes = "blogPostRoutes";

const SANITY_URL = "https://xndl14mc.api.sanity.io/";
const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production`;

async function pageRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    const sanityToken = process.env["SANITY_TOKEN"];
    if (!sanityToken) throw "Environment variable SANITY_TOKEN must be set";
    const { data } = await axios.get<{ result: string[] }>(SANITY_QUERY_URL, {
        headers: { "Authorization": `Bearer ${sanityToken}` },
        params: { "query": "*[_type == 'page'].route.current" },
    });
    return data.result.map(x => ({ route: x }));
}

async function blogPostRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return [{ route: "/blog/the-need-for-subtyping-and-polymorphism-in-databases" }];
}

registerPlugin("router", pageRoutes, pageRoutesPlugin, validator);
registerPlugin("router", blogPostRoutes, blogPostRoutesPlugin, validator);
