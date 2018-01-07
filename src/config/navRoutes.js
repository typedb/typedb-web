
const graknRoutes = require('config/graknRoutes');

export const internalRoutes =  [
  'Services', 'Support', 'The Grakn', 'The KBMS', 'Deployment', 'Community', 'About', 'Careers', 'Financial Services',
  'Health & Life Sciences', 'Intelligent Bots', 'Semantic Search', 'Security'
];

export const externalRoutes = [
  'Github', 'Blog'
];

export const navRoutes = {
  Database: {
    type: 'multi',
    links: {
      'The Grakn': '/grakn',
      'The KBMS': '/kbms',
    }
  },
  Enterprise: {
    type: 'multi',
    links: {
      Deployment: '/deployment',
      Services: '/services',
      Support: '/support'
    }
  },
  'Use Case': {
    type: 'multi',
    links: {
      'Intelligent Bots': '/usecase-bots',
      'Semantic Search': '/usecase-search',
      'Financial Services': '/usecase-finance',
      'Health & Life Sciences': '/usecase-health',
      'Security': '/usecase-security'
    }
  },
  Developer: {
    type: 'multi',
    links: {
      Academy: `${graknRoutes.academy}`,
      Docs: `${graknRoutes.docs}`,
      Community: '/community'
    }
  },
  Discuss: {
    type: 'single',
    link: `${graknRoutes.discuss}`,
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
