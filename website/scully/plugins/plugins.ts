import { registerPlugin, getPluginConfig, HandledRoute } from '@scullyio/scully';
import axios from "axios";

const defaultValidator = async () => [];

export const blogCategoryRoutes = "blogCategoryRoutes";
export const blogPostRoutes = "blogPostRoutes";
export const solutionRoutes = "solutionRoutes";
export const webinarRoutes = "webinarRoutes";
export const whitePaperRoutes = "whitePaperRoutes";
export const eventRoutes = "eventRoutes";

const SANITY_URL = "https://xndl14mc.api.sanity.io/";
const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production`;
const BLOG_URL = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com";
const BLOG_POSTS_URL = `${BLOG_URL}/posts`;
const BLOG_CATEGORIES_URL = `${BLOG_URL}/categories`;

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

async function resourceRoutesPluginBase(props: { resourceType: string, resourcePath: string }): Promise<HandledRoute[]> {
    const { data } = await axios.get<{ result: string[] }>(SANITY_QUERY_URL, {
        params: { "query": `*[_type == '${props.resourceType}'].slug.current` },
    });
    return data.result.map(x => ({ route: `/${props.resourcePath}/${x}` }));
}

async function solutionRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    const { data } = await axios.get<{ result: string[] }>(SANITY_QUERY_URL, {
        params: { "query": `*[_type == 'solutionPage'].route.current` },
    });
    return data.result.map(x => ({ route: `/solutions/${x}` }));
}

async function webinarRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return await resourceRoutesPluginBase({ resourceType: "webinar", resourcePath: "webinars" });
}

async function whitePaperRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return await resourceRoutesPluginBase({ resourceType: "whitePaper", resourcePath: "white-papers" });
}

async function eventRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return await resourceRoutesPluginBase({ resourceType: "event", resourcePath: "events" });
}

registerPlugin("router", blogCategoryRoutes, blogCategoryRoutesPlugin, defaultValidator);
registerPlugin("router", blogPostRoutes, blogPostRoutesPlugin, defaultValidator);
registerPlugin("router", solutionRoutes, solutionRoutesPlugin, defaultValidator);
registerPlugin("router", webinarRoutes, webinarRoutesPlugin, defaultValidator);
registerPlugin("router", whitePaperRoutes, whitePaperRoutesPlugin, defaultValidator);
registerPlugin("router", eventRoutes, eventRoutesPlugin, defaultValidator);
