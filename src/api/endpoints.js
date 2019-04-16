const serverBase = process.env.NODE_ENV === 'production'? '' : 'http://localhost:3001';
const cmsBase = 'https://cms.grakn.ai/api/1.1/tables';
const cmsAccessTokenTag = '?access_token=m7CBWmCjTog1OcNifMcM1TNlOYuztSyL';

export default {
  careers: `${cmsBase}/careers/rows${cmsAccessTokenTag}`,
  newsletter: `${serverBase}/invite/mailchimp`,
  support: `${serverBase}/email/enterprise`,
  hubspot: `${serverBase}/hubspot/recordContact`,
  team: `${cmsBase}/team/rows${cmsAccessTokenTag}`,
  downloads: `${cmsBase}/version/rows${cmsAccessTokenTag}`,
  events: `${cmsBase}/events/rows${cmsAccessTokenTag}`,
  meetups: `${cmsBase}/meetups/rows${cmsAccessTokenTag}`,
  testimonials: `${cmsBase}/testimonials/rows${cmsAccessTokenTag}`,
  kgmsfeatures: `${cmsBase}/kbmsfeatures/rows${cmsAccessTokenTag}`,
  cloudproviders: `${cmsBase}/cloudproviders/rows${cmsAccessTokenTag}`,
  deployment: `${cmsBase}/deployment/rows${cmsAccessTokenTag}`,
  supporttable: `${cmsBase}/supporttable/rows${cmsAccessTokenTag}`,
  kgmstable: `${cmsBase}/kbmstable/rows${cmsAccessTokenTag}`,
  companies: `${cmsBase}/companies/rows${cmsAccessTokenTag}`,
  workbasetable: `${cmsBase}/workbasetable/rows${cmsAccessTokenTag}`,
  track: `${serverBase}/hsengt`,

  downloadCount: 'https://api.github.com/repos/graknlabs/grakn/releases'
};
