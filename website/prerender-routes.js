const fs = require("fs");
const axios = require("axios");

// Sanity API configuration
const SANITY_QUERY_URL = "https://xndl14mc.api.sanity.io/v2021-10-21/data/query/production";

// Import your page schemas
const { staticPageSchemas, genericPageSchemas, dynamicPageSchemas } = require("./src/website-routes");

// Function to fetch static pages
const staticPageRoute = async (route, schemaName) => {
    const { data } = await axios.get(SANITY_QUERY_URL, {
        params: { query: `defined(*[_type == '${schemaName}'][0])` },
    });
    return data.result ? [`/${route}`] : [];
};

// Function to fetch generic pages
const genericPageRoute = async (route, pageId) => {
    const { data } = await axios.get(SANITY_QUERY_URL, {
        params: { query: `defined(*[_type == 'genericPage' && _id == '${pageId}'][0])` },
    });
    return data.result ? [`/${route}`] : [];
};

// Function to fetch dynamic routes
const dynamicPageRoutes = async (route, schemaName, schemaSlugAccessor = "slug.current") => {
    const { data } = await axios.get(SANITY_QUERY_URL, {
        params: { query: `*[_type == '${schemaName}'].${schemaSlugAccessor}` },
    });
    return data.result.map((slug) => `/${route.replace(":slug", slug)}`);
};

// Main function to generate the routes
const getWebsiteRoutes = async () => {
    try {
        console.log("Fetching routes for prerender...");

        // Prerendering schemas
        const staticPagePromises = staticPageSchemas.map((schema) =>
            staticPageRoute(schema.path, schema.schemaName)
        );

        const genericPagePromises = genericPageSchemas.map((schema) =>
            genericPageRoute(schema.path, schema.documentID)
        );

        const dynamicPagePromises = dynamicPageSchemas.map((schema) => {
            if ("slugs" in schema) {
                return Promise.resolve(schema.slugs.map((slug) => `/${schema.path.replace(":slug", slug)}`));
            }
            return dynamicPageRoutes(schema.path, schema.schemaName);
        });

        const allRoutes = (
            await Promise.all([...staticPagePromises, ...genericPagePromises, ...dynamicPagePromises])
        ).flat();

        // Ensure at least the homepage is included
        allRoutes.push("/");

        // Write to prerender-routes.json
        fs.writeFileSync("prerender-routes.json", JSON.stringify(allRoutes, null, 2));
        console.log("Routes successfully saved to prerender-routes.json:", allRoutes);
    } catch (error) {
        console.error("Error generating prerender routes:", error);
        process.exit(1);
    }
};

// Run the script
getWebsiteRoutes();
