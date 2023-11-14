import { HandledRoute, registerPlugin } from "@scullyio/scully";
import axios from "axios";

const defaultValidator = async () => [];

export const fundamentalArticleRoutes = "fundamentalArticleRoutes";
export const applicationArticleRoutes = "applicationArticleRoutes";
export const blogCategoryRoutes = "blogCategoryRoutes";
export const blogPostRoutes = "blogPostRoutes";
export const solutionRoutes = "solutionRoutes";
export const lectureRoutes = "lectureRoutes";
export const whitePaperRoutes = "whitePaperRoutes";
export const eventRoutes = "eventRoutes";

const SANITY_URL = "https://xndl14mc.api.sanity.io/";
const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production`;

async function resourceRoutesPluginBase(props: {
    resourceType: string;
    resourcePath: string;
}): Promise<HandledRoute[]> {
    const { data } = await axios.get<{ result: string[] }>(SANITY_QUERY_URL, {
        params: { query: `*[_type == '${props.resourceType}'].slug.current` },
    });
    return data.result.map((x) => ({ route: `/${props.resourcePath}/${x}` }));
}

async function fundamentalArticleRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return await resourceRoutesPluginBase({ resourceType: "fundamentalArticle", resourcePath: "fundamentals" });
}

async function applicationArticleRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return await resourceRoutesPluginBase({ resourceType: "applicationArticle", resourcePath: "applications" });
}

async function blogCategoryRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return ["announcements", "engineering", "applications", "philosophy", "tutorials"].map((x) => ({
        route: `/blog/category/${x}`,
    }));
}

async function blogPostRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return await resourceRoutesPluginBase({ resourceType: "blogPost", resourcePath: "blog" });
}

async function solutionRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    const { data } = await axios.get<{ result: string[] }>(SANITY_QUERY_URL, {
        params: { query: `*[_type == 'solutionPage'].route.current` },
    });
    return data.result.map((x) => ({ route: `/solutions/${x}` }));
}

async function lectureRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return await resourceRoutesPluginBase({ resourceType: "lecture", resourcePath: "lectures" });
}

async function whitePaperRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return await resourceRoutesPluginBase({ resourceType: "whitePaper", resourcePath: "white-papers" });
}

async function eventRoutesPlugin(route: string, config = {}): Promise<HandledRoute[]> {
    return await resourceRoutesPluginBase({ resourceType: "event", resourcePath: "events" });
}

registerPlugin("router", fundamentalArticleRoutes, fundamentalArticleRoutesPlugin, defaultValidator);
registerPlugin("router", applicationArticleRoutes, applicationArticleRoutesPlugin, defaultValidator);
registerPlugin("router", blogCategoryRoutes, blogCategoryRoutesPlugin, defaultValidator);
registerPlugin("router", blogPostRoutes, blogPostRoutesPlugin, defaultValidator);
// registerPlugin("router", solutionRoutes, solutionRoutesPlugin, defaultValidator);
registerPlugin("router", lectureRoutes, lectureRoutesPlugin, defaultValidator);
registerPlugin("router", whitePaperRoutes, whitePaperRoutesPlugin, defaultValidator);
registerPlugin("router", eventRoutes, eventRoutesPlugin, defaultValidator);
