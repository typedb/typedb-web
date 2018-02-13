const serverBase = process.env.NODE_ENV === 'production'? '' : 'http://localhost:3001';
const cmsBase = 'http://138.68.184.58/api/1.1/tables';
const cmsAccessTokenTag = '\?access_token\=lWNH29aBLZBooT4Q6yvDtmXv07Vls5R2'
export default {
  careers: 'http://api.angel.co/1/jobs?access_token=f6f53a1fff9962abd8e3d54a6b489b2ee3e5285f9c33d19d',
  newsletter: `${serverBase}/invite/mailchimp`,
  support: `${serverBase}/api/support`,
  team: `${cmsBase}/team/rows${cmsAccessTokenTag}`
};