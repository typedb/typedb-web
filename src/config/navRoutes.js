
const graknRoutes = require('config/graknRoutes');

export const internalRoutes =  [
  'Services', 'Support', 'Grakn Core', 'Grakn KBMS & Workbase', 'Deployment', 'Community', 'About', 'Careers', 'Financial Services',
  'Health & Life Sciences', 'Intelligent Bots', 'Semantic Search', 'Security'
];

export const externalRoutes = [
  'Github', 'Blog'
];

export const navRoutes = {
  'Download 1.0': {
    type: 'single',
    link: `${graknRoutes.download}`,
  },
  Products: {
    type: 'multi',
    links: {
      'Grakn Core': '/grakn-core',
      'Grakn KBMS & Workbase': '/grakn-kbms',
    }
  },
  Solutions: {
    type: 'multi',
    links: {
      Deployment: '/deployment',
      Services: '/services',
      Support: '/support'
    }
  },
  // 'Use Cases': {
  //   type: 'multi',
  //   links: {
  //     'Intelligent Bots': '/usecase-bots',
  //     'Semantic Search': '/usecase-search',
  //     'Financial Services': '/usecase-finance',
  //     'Health & Life Sciences': '/usecase-health',
  //     'Security': '/usecase-security'
  //   }
  // },
  Developer: {
    type: 'multi',
    links: {
      Academy: `${graknRoutes.academy}`,
      Documentation: `${graknRoutes.docs}`,
      Discussion: `${graknRoutes.discuss}`
    }
  },
  Community: {
    type: 'single',
    link: '/community',
  },
  Blog: {
    type: 'single',
    link: `${graknRoutes.blog}`
  },
  Github: {
    type: 'single',
    link: `${graknRoutes.github}`,
  },
};
