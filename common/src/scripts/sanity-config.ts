const SANITY_PROJECT_ID = `xndl14mc`;
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io`;
export const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production`;
const SANITY_CDN_URL = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io`;
export const SANITY_CDN_QUERY_URL = `${SANITY_CDN_URL}/v2021-10-21/data/query/production`;
// Edge function that holds the draft read token server-side; see
// netlify/edge-functions/sanity-draft-query. Only enabled on dev deployments.
export const SANITY_DRAFT_QUERY_URL = `/api/sanity-draft-query`;
