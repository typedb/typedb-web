
const graknRoutes = require('config/graknRoutes');

module.exports = {
  Overview: {
    type: 'single',
    link: `${graknRoutes.overview}`
  },
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
