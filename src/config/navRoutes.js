const docBase = process.env.NODE_ENV === 'production'? 'https://docs.grakn.ai/' : 'http://127.0.0.1:3001/';

module.exports = {
  Overview: `${docBase}overview/index.html`,
  Academy: `${docBase}academy/index.html`,
  Documentation: `${docBase}index.html`,
  Discussion: 'https://discuss.grakn.ai/',
  Blog: 'https://blog.grakn.ai/',
  Github: 'https://github.com/graknlabs/grakn',
};
