import React from 'react';
import { Link } from 'react-router-dom';
import graknRoutes from 'config/graknRoutes'
const HomePage = () => (
  <div className="home">
    <section className="home__splash">
      <div className="home__splash__text container">
        <span className="home__splash__text__headline">THE <strong>DATABASE</strong> FOR AI</span>
        <span className="home__splash__text__tag">AI systems process knowledge that is too complex for current databases. Grakn is a distributed hyper-relational database for knowledge-oriented systems, i.e. a distributed knowledge base.</span>
        <a className="home__splash__text__install" href={graknRoutes.download} target="_blank">
        Install Grakn<i className="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
        <Link className="home__splash__text__community" to="/community">Join our Community!</Link>        
      </div>
    </section>
    <section className="home__links">
      <div className="home__links__container container">
        <div className="home__links__container__item">
          <img src="/assets/svg/github.svg" alt="github" />
          <span><a className="github-link" href={graknRoutes.github} target="_blank" >Grakn 0.17</a> on Github</span>
        </div>
        <div className="home__links__container__item">
          <img src="/assets/svg/slack.svg" alt="slack" />
          <span><Link className="slack-link" to="/slack">Grakn</Link> on Slack</span>
        </div>
        <div className="home__links__container__item">
          <img src="/assets/svg/twitter_1.svg" alt="twitter" />
          <span><a className="twitter-link" href={graknRoutes.twitter} target="_blank">@GraknLabs</a> on Slack</span>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
