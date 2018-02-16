const serverBase = process.env.NODE_ENV === 'production'? '' : 'http://localhost:3001';
const cmsBase = 'https://cms.grakn.ai/api/1.1/tables';
const cmsAccessTokenTag = '?access_token=lWNH29aBLZBooT4Q6yvDtmXv07Vls5R2'
export default {
  careers: `${cmsBase}/careers/rows${cmsAccessTokenTag}`,
  newsletter: `${serverBase}/invite/mailchimp`,
  support: `${serverBase}/api/support`,
  team: `${cmsBase}/team/rows${cmsAccessTokenTag}`,
  downloads: `${cmsBase}/version/rows${cmsAccessTokenTag}`
};