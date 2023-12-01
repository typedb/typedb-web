import axios from "axios";

import { dynamicPages, genericPages, staticPages } from "../src/website-routes";

const SANITY_URL = "https://xndl14mc.api.sanity.io/";
const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production`;

const genericPageRoute = async (route: string, pageId: string) => {
    const { data } = await axios.get<{ result: boolean }>(SANITY_QUERY_URL, {
        params: { query: `defined(*[_type == 'genericPage' && _id == '${pageId}'][0])` },
    });
    return data.result ? [`/${route}`] : [];
};

const staticPageRoute = async (route: string, schemaName: string) => {
    const { data } = await axios.get<{ result: boolean }>(SANITY_QUERY_URL, {
        params: { query: `defined(*[_type == '${schemaName}'][0])` },
    });
    return data.result ? [`/${route}`] : [];
};

const dynamicPageRoutes = async (route: string, schemaName: string, schemaSlugAccessor = "slug.current") => {
    const { data } = await axios.get<{ result: string[] }>(SANITY_QUERY_URL, {
        params: { query: `*[_type == '${schemaName}'].${schemaSlugAccessor}` },
    });
    return data.result.map((slug) => `/${route.replace(":slug", slug)}`);
};

export const getWebsiteRoutes = async () => {
    const staticPageRoutePromises = staticPages.map(({ path, schemaName }) => staticPageRoute(path, schemaName));
    const genericPageRoutePromises = genericPages.map(({ path, documentID }) => genericPageRoute(path, documentID));
    const dynamicPageRoutePromises = dynamicPages.map((page) => {
        if ("slugs" in page) {
            return Promise.resolve(page.slugs.map((slug) => `/${page.path.replace(":slug", slug)}`));
        }

        // if ("schemaSlugAccessor" in page) {
        //     return dynamicPageRoutes(page.path, page.schemaName, page.schemaSlugAccessor);
        // } else {
        return dynamicPageRoutes(page.path, page.schemaName);
        // }
    });

    const allRoutes = (
        await Promise.all([...genericPageRoutePromises, ...staticPageRoutePromises, ...dynamicPageRoutePromises])
    ).flat();

    return allRoutes;
};
