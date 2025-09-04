import { RenderMode, ServerRoute } from "@angular/ssr";
import { dynamicPageSchemas, genericPageSchemas, staticPageSchemas } from "./routes";
import axios from "axios";

// Sanity.io configuration
const SANITY_URL = "https://xndl14mc.api.sanity.io/v2025-09-02/data/query/production";

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

/**
 * Fetches all document slugs from Sanity.io in a single request
 */
async function fetchAllSanitySlugs(): Promise<Record<string, Array<{ slug: string }>>> {
    try {
        const schemaQueries = dynamicPageSchemas
            .filter(schema => 'schemaName' in schema)
            .map(schema => {
                const slugField = "schemaSlugAccessor" in schema ? schema.schemaSlugAccessor : 'slug.current';
                return `"${schema.schemaName}": *[_type == '${schema.schemaName}']{"slug": ${slugField}}`;
            });

        const query = `{${schemaQueries.join(',')}}`;

        const { data } = await axios.get<{ result: Record<string, Array<{ slug: string }>> }>(SANITY_URL, {
            params: { query },
        });

        console.log(query);
        console.log(JSON.stringify(data.result, null, 2));
        return data.result;
    } catch (error) {
        console.error('Error fetching all slugs from Sanity:', error);
        return {};
    }
}

// Cache the results to avoid multiple API calls
let slugCache: Record<string, Array<{ slug: string }>> | null = null;

async function getCachedSlugs(): Promise<Record<string, Array<{ slug: string }>>> {
    if (!slugCache) {
        slugCache = await fetchAllSanitySlugs();
    }
    return slugCache;
}

// Updated individual fetch functions
async function fetchPaperSlugs(): Promise<Array<{ slug: string }>> {
    const allSlugs = await getCachedSlugs();
    return allSlugs["paper"] || [];
}

async function fetchBlogPostSlugs(): Promise<Array<{ slug: string }>> {
    const allSlugs = await getCachedSlugs();
    return allSlugs["blogPost"] || [];
}

async function fetchEventSlugs(): Promise<Array<{ slug: string }>> {
    const allSlugs = await getCachedSlugs();
    return allSlugs["liveEvent"] || [];
}

async function fetchLectureSlugs(): Promise<Array<{ slug: string }>> {
    const allSlugs = await getCachedSlugs();
    return allSlugs["lecture"] || [];
}

async function fetchLegalDocumentSlugs(): Promise<Array<{ slug: string }>> {
    const allSlugs = await getCachedSlugs();
    return allSlugs["legalDocument"] || [];
}

async function fetchApplicationArticleSlugs(): Promise<Array<{ slug: string }>> {
    const allSlugs = await getCachedSlugs();
    return allSlugs["applicationArticle"] || [];
}

async function fetchFundamentalArticleSlugs(): Promise<Array<{ slug: string }>> {
    const allSlugs = await getCachedSlugs();
    return allSlugs["fundamentalArticle"] || [];
}

async function fetchUseCasePageInstanceSlugs(): Promise<Array<{ slug: string }>> {
    const allSlugs = await getCachedSlugs();
    return allSlugs["useCasePage"] || [];
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
                            // case "useCasePage":
                            //     return await fetchUseCasePageInstanceSlugs();
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