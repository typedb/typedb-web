const SANITY_PROJECT_ID = `xndl14mc`;
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io`;
export const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production`;
const SANITY_CDN_URL = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io`;
export const SANITY_CDN_QUERY_URL = `${SANITY_CDN_URL}/v2021-10-21/data/query/production`;
// Edge function that holds the draft read token server-side; see
// netlify/edge-functions/sanity-draft-query. Absolute so local builds can use it too.
export const SANITY_DRAFT_QUERY_URL = `https://development.typedb.com/api/sanity-draft-query`;
