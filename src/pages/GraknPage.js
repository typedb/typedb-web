import React from 'react';
import PagingComponent from 'components/PagingComponent';
const graknRoutes = require('config/graknRoutes');

const GraknPage = () => (
  <div className="grakn-page">
    <section className="grakn-page__splash">
      <div className="grakn-page__splash__container container section__container">
        <div className="grakn-page__splash__text">
          <h1 className="grakn-page__splash__text__header">Meet Grakn and Graql</h1>
          <span className="grakn-page__splash__text__tag">Grakn is a hyper-relational database for knowledge engineering, and Graql is Grakn’s query language.</span>
        </div>
      </div>
    </section>
    <section className="grakn-page__github">
    </section>
    <section className="grakn-page__links">
      <div className="grakn-page__links__container container section__container">
        <div className="grakn-page__links__grid">

          <div className="grakn-page__links__item">
            <div className="grakn-page__links__item__img">
              <img src="/assets/svg/grakn-started.svg" alt="Get Started" />
            </div>
            <div className="grakn-page__links__item__details">
              <span className="grakn-page__links__item__details__header">Get Started</span>
              <div className="grakn-page__links__item__details__text">
              Whether you are new to programming or an experienced developer, it’s easy to learn and use Grakn. Get set up a matter of minutes. Go to <a href={graknRoutes.quickstart} className="animated__link animated__link--purple">quickstart tutorial</a>
              </div>
            </div>
          </div>

          <div className="grakn-page__links__item">
            <div className="grakn-page__links__item__img">
              <img src="/assets/svg/grakn-documentation.svg" alt="Documentation" />
            </div>
            <div className="grakn-page__links__item__details">
              <span className="grakn-page__links__item__details__header">Documentation</span>
              <div className="grakn-page__links__item__details__text">
              Documentation for Grakn’s development library and Graql language API, along with tutorials and guides, are available online. Visit our <a href={graknRoutes.docs} className="animated__link animated__link--purple">documentation portal</a>
              </div>
            </div>
          </div>

          <div className="grakn-page__links__item">
            <div className="grakn-page__links__item__img">
              <img src="/assets/svg/grakn-discussion.svg" alt="Discussion" />
            </div>
            <div className="grakn-page__links__item__details">
              <span className="grakn-page__links__item__details__header">Discussion</span>
              <div className="grakn-page__links__item__details__text">
              When you’re stuck on a problem, often the most effective remedy is to collaborate. Ask your question on <a href={graknRoutes.stack} className="animated__link animated__link--charcoal animated__link--italic">StackOverflow</a> or discuss it in our <a href={graknRoutes.discuss} className="animated__link animated__link--charcoal animated__link--italic">Discussion forum.</a>
              </div>
            </div>
          </div>

          <div className="grakn-page__links__item">
            <div className="grakn-page__links__item__img">
              <img src="/assets/svg/grakn-academy.svg" alt="Academy" />
            </div>
            <div className="grakn-page__links__item__details">
              <span className="grakn-page__links__item__details__header">Join the Academy!</span>
              <div className="grakn-page__links__item__details__text">
              Learn everything from the basic foundations to advanced topics of knowledge engineering and be an expert in the field. Join <a href={graknRoutes.academy} className="animated__link animated__link--purple">Grakn Academy.</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    <section className="grakn-page__graql">
      <div className="grakn-page__graql__container container section__container">
        <div className="grakn-page__graql__text">
          <span className="grakn-page__graql__text__header">
          Grakn and Graql
          </span>
          <span className="grakn-page__graql__text__paragraph">
          Grakn is a hyper-relational database for knowledge engineering, i.e. a knowledge base. Being a distributed system, Grakn is design to be sharded and replicated over a network of computers. Under the hood, Grakn has built an expressive knowledge representation system with a transactional query interface, Graql. Graql is Grakn’s reasoning (through OLTP) and analytics (through OLAP) declarative query language. 
          </span>
        </div>
        <div className="grakn-page__graql__img">
          <img src="/assets/svg/grakn-hex.svg" alt="Hexcomb" />
        </div>
      </div>
    </section>
  </div>
);

export default GraknPage;