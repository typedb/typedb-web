
const graknRoutes = require('config/graknRoutes');

export const internalRoutes =  [
  'Services', 'Support', 'The Grakn', 'The KBMS', 'Deployment', 'Community', 'About', 'Careers', 'Financial Services',
  'Health & Life Sciences', 'Intelligent Bots', 'Semantic Search', 'Security'
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
  'Use Cases': {
    type: 'multi',
    links: {
      'Financial Services': '/usecase-finance',
      'Health & Life Sciences': '/usecase-health',
      'Intelligent Bots': '/usecase-bots',
      'Semantic Search': '/usecase-search',
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
    link: 'https://discuss.grakn.ai/',
  },
  Blog: {
    type: 'single',
    link: 'https://discuss.grakn.ai/'
  },
  Github: {
    type: 'single',
    link: 'https://github.com/graknlabs/grakn',
  },
};
