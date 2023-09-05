import { registerPlugin, getPluginConfig, HandledRoute } from '@scullyio/scully';
import axios from "axios";
import { solutionPageSchemaName } from "typedb-web-schema";

const validator = async () => [];

export const pageRoutes = "pageRoutes";
export const blogCategoryRoutes = "blogCategoryRoutes";
export const blogPostRoutes = "blogPostRoutes";
export const solutionRoutes = "solutionRoutes";

const SANITY_URL = "https://xndl14mc.api.sanity.io/";
const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production`;
const BLOG_URL = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com";
const BLOG_POSTS_URL = `${BLOG_URL}/posts`;
const BLOG_CATEGORIES_URL = `${BLOG_URL}/categories`;

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
    const { data } = await axios.get<{ found: number, posts: { slug: string }[] }>(BLOG_POSTS_URL, {
        params: { "fields": "slug" },
    });
    return data.posts.map(x => ({ route: `/blog/${x.slug}` }));
}

async function blogCategoryRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    const { data } = await axios.get<{ found: number, categories: { slug: string }[] }>(BLOG_CATEGORIES_URL, {
        params: { "fields": "slug" },
    });
    return data.categories.map(x => ({ route: `/blog/category/${x.slug}` }));
}

async function solutionRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    const { data } = await axios.get<{ result: string[] }>(SANITY_QUERY_URL, {
        params: { "query": `*[_type == '${solutionPageSchemaName}'].route.current` },
    });
    return data.result.map(x => ({ route: `/solutions/${x}` }));
}

registerPlugin("router", blogCategoryRoutes, blogCategoryRoutesPlugin, validator);
registerPlugin("router", blogPostRoutes, blogPostRoutesPlugin, validator);
registerPlugin("router", solutionRoutes, solutionRoutesPlugin, validator);
