import React from 'react';
import { Link } from 'react-router-dom';
import graknRoutes from 'config/graknRoutes'
const HomePage = () => (
  <div className="home">
    <section className="home__splash">
      <div className="home__splash__text container home__container">
        <span className="home__splash__text__headline home__header">THE <strong>DATABASE</strong> FOR AI</span>
        <span className="home__splash__text__tag">AI systems process knowledge that is too complex for current databases. Grakn is a distributed hyper-relational database for knowledge-oriented systems, i.e. a distributed knowledge base.</span>
        <a className="home__splash__text__install" href={graknRoutes.download} target="_blank">
        Install Grakn<i className="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
        <Link className="home__splash__text__community" to="/community">Join our Community!</Link>        
      </div>
    </section>
    <section className="home__links">
      <div className="home__links__container container home__container">
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
    <section className="home__features home__features--coloured">
      <div className="home__features__container container home__container">
        <span className="home__features__headline home__header">
          <strong>Grakn</strong> is a hyper-relational database for knowledge-oriented systems
        </span>
        <div className="home__features__item">
          <div className="home__features__item__text">
            <div className="home__features__item__text__logo home__features__item__text__logo--red">
              <img src="/assets/svg/schema.svg" alt="schema" />
            </div>
            <span className="home__features__item__text__headline">Hyper-expressive schema</span>
            <span className="home__features__item__text__paragraph">
            Enhanced Entity-Relationship schema, with constructs to define hyper-objects, hyper-relations and functions, to build complex knowledge models
            </span>
          </div>
          <div className="home__features__item__img">
            <img src="/assets/img/hyper-expressive_schema.png" alt="Hyper Expressive Schema" />
          </div>
        </div>
        <div className="home__features__item">
          <div className="home__features__item__img">
            <img src="/assets/img/real-time_inference.png" alt="Real Time Inference" />
          </div>
          <div className="home__features__item__text">
            <div className="home__features__item__text__logo home__features__item__text__logo--purple">
              <img src="/assets/svg/inference.svg" alt="inference" />
            </div>
            <span className="home__features__item__text__headline">Real-time inference</span>
            <span className="home__features__item__text__paragraph">
            Automatic deduction of data types and relationships during runtime (OLTP), enabling the retrieval of implicit associations between points
            </span>
          </div>
        </div>
      </div>
    </section>
    <section className="home__features home__features--alternate">
      <div className="home__features__container container home__container">
        <div className="home__features__item">
          <div className="home__features__item__text">
            <div className="home__features__item__text__logo home__features__item__text__logo--blue">
              <img src="/assets/svg/analytics.svg" alt="analytics" />
            </div>
            <span className="home__features__item__text__headline">Distributed analytics</span>
            <span className="home__features__item__text__paragraph">
            Automated Pregel and MapReduce distributed algorithms abstracted as a language (OLAP), enabling large scale computation through database queries            </span>
          </div>
          <div className="home__features__item__img">
            <img src="/assets/img/distributed_analytics.png" alt="Distributed Analytics" />
          </div>
        </div>
        <div className="home__features__item">
          <div className="home__features__item__img">
            <img src="/assets/img/high-level_query.png" alt="High Query Language" />
          </div>
          <div className="home__features__item__text">
            <div className="home__features__item__text__logo home__features__item__text__logo--green">
              <img src="/assets/svg/high_level.svg" alt="high level" />
            </div>
            <span className="home__features__item__text__headline">High-level query language</span>
            <span className="home__features__item__text__paragraph">
            Strong abstraction over low-level constructs, enabling you to express questions at a higher level and let the system figure out how to do the navigation            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
