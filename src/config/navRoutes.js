
const graknRoutes = require('config/graknRoutes');

export const internalRoutes =  [
  'Services', 'Support', 'Grakn Core', 'Grakn KGMS & Workbase', 'Deployment', 'Community', 'About', 'Careers', 'Financial Services',
  'Health & Life Sciences', 'Intelligent Bots', 'Semantic Search', 'Security', 'Download'
];

export const externalRoutes = [
  'Github', 'Blog'
];

export const navRoutes = {
  'Download': {
    type: 'single',
    link: `/download`,
  },
  Products: {
    type: 'multi',
    links: {
      'Grakn Core': '/grakn-core',
      'Grakn KGMS & Workbase': '/grakn-kgms',
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
  'Use Cases': {
    type: 'multi',
    links: {
      'Biotechnology': '/biotechnology',
    }
  },
  Developer: {
    type: 'multi',
    links: {
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
