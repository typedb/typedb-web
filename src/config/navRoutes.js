
const graknRoutes = require('config/graknRoutes');

module.exports = {
  Enterprise: {
    type: 'multi',
    links: {
      Services: '/services',
      Support: '/support'
    }
  },
  Developer: {
    type: 'multi',
    links: {
      Overview: `${graknRoutes.overview}`,
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
