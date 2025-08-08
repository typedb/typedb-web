import { RenderMode, ServerRoute } from "@angular/ssr";
import { dynamicPageSchemas, genericPageSchemas, staticPageSchemas } from "./routes";
import axios from "axios";

// Sanity.io configuration
const SANITY_URL = "https://xndl14mc.api.sanity.io/v2021-10-21/data/query/production";

/**
 * Fetches document slugs from Sanity.io
 * @param schemaName The document type in Sanity
 * @param slugField The field containing the slug (defaults to 'slug.current')
 */
async function fetchSanitySlugs(schemaName: string, slugField = 'slug.current'): Promise<Array<{ slug: string }>> {
    try {
        const { data } = await axios.get<{ result: Array<{ [key: string]: string }> }>(SANITY_URL, {
            params: { 
                query: `*[_type == '${schemaName}']{"slug": ${slugField}}`
            },
        });
        return data.result.map(item => ({ slug: item["slug"] }));
    } catch (error) {
        console.error(`Error fetching ${schemaName} slugs from Sanity:`, error);
        return [];
    }
}

/**
 * Checks if a document exists in Sanity
 */
async function documentExists(schemaName: string, id?: string): Promise<boolean> {
    try {
        const query = id 
            ? `defined(*[_type == '${schemaName}' && _id == '${id}'][0])`
            : `defined(*[_type == '${schemaName}'][0])`;
            
        const { data } = await axios.get<{ result: boolean }>(SANITY_URL, {
            params: { query }
        });
        return data.result;
    } catch (error) {
        console.error(`Error checking if ${schemaName} exists in Sanity:`, error);
        return false;
    }
}

// Blog posts
async function fetchBlogPostSlugs(): Promise<Array<{ slug: string }>> {
    return fetchSanitySlugs('blogPost');
}

// Events
async function fetchEventSlugs(): Promise<Array<{ slug: string }>> {
    return fetchSanitySlugs('liveEvent');
}

// Lectures
async function fetchLectureSlugs(): Promise<Array<{ slug: string }>> {
    return fetchSanitySlugs('lecture');
}

// Legal documents
async function fetchLegalDocumentSlugs(): Promise<Array<{ slug: string }>> {
    return fetchSanitySlugs('legalDocument');
}

// Papers
async function fetchPaperSlugs(): Promise<Array<{ slug: string }>> {
    return fetchSanitySlugs('paper');
}

// Application articles
async function fetchApplicationArticleSlugs(): Promise<Array<{ slug: string }>> {
    return fetchSanitySlugs('applicationArticle');
}

// Fundamental articles
async function fetchFundamentalArticleSlugs(): Promise<Array<{ slug: string }>> {
    return fetchSanitySlugs('fundamentalArticle');
}

export const getDynamicRoutes = () => {
    const routes: ServerRoute[] = [];

    for (const schema of dynamicPageSchemas) {
        if ('slugs' in schema) {
            // Handle routes with predefined slugs (like blog categories)
            routes.push({
                path: schema.path,
                renderMode: RenderMode.Prerender,
                getPrerenderParams: () => Promise.resolve(
                    schema.slugs.map(slug => ({ slug }))
                ),
            });
        } else {
            // Handle routes that need to be fetched from WordPress
            routes.push({
                path: schema.path,
                renderMode: RenderMode.Prerender,
                getPrerenderParams: async () => {
                    try {
                        switch (schema.schemaName) {
                            case 'blogPost':
                                return await fetchBlogPostSlugs();
                            case 'liveEvent':
                                return await fetchEventSlugs();
                            case 'lecture':
                                return await fetchLectureSlugs();
                            case 'legalDocument':
                                return await fetchLegalDocumentSlugs();
                            case 'paper':
                                return await fetchPaperSlugs();
                            case 'applicationArticle':
                                return await fetchApplicationArticleSlugs();
                            case 'fundamentalArticle':
                                return await fetchFundamentalArticleSlugs();
                            default:
                                console.warn(`No slug fetcher implemented for schema: ${JSON.stringify(schema)}`);
                                return [];
                        }
                    } catch (error) {
                        console.error(`Error fetching slugs for ${schema.path}:`, error);
                        return [];
                    }
                },
            });
        }
    }

    return routes;
};

// Helper function to get static routes that should be pre-rendered
async function getStaticRoutes(): Promise<ServerRoute[]> {
    const routes: ServerRoute[] = [];
    
    // Add all static pages that exist in Sanity
    for (const { path, schemaName } of staticPageSchemas) {
        const exists = await documentExists(schemaName);
        if (exists) {
            routes.push({
                path: path || '',  // Handle home route
                renderMode: RenderMode.Prerender,
            });
        }
    }
    
    // Add all generic pages that exist in Sanity
    for (const { path, documentID } of genericPageSchemas) {
        const exists = await documentExists('genericPage', documentID);
        if (exists) {
            routes.push({
                path,
                renderMode: RenderMode.Prerender,
            });
        }
    }
    
    return routes;
}

// Function to initialize routes asynchronously
export async function getServerRoutes(): Promise<ServerRoute[]> {
    const staticRoutes = await getStaticRoutes();
    const dynamicRoutes = getDynamicRoutes();
    
    return [
        // Static routes from Sanity
        ...staticRoutes,
        // Dynamic routes with parameters
        ...dynamicRoutes,
        // Fallback route - render 404 for unknown routes
        {
            path: '**',
            renderMode: RenderMode.Prerender,
        },
    ];
}

// Export a promise that resolves to the routes
export const serverRoutesPromise = getServerRoutes();