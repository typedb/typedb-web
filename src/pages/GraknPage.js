import React from 'react';
import TrackedPage from './TrackedPage';
import { Link } from 'react-router-dom';
const graknRoutes = require('config/graknRoutes');
import GraknPageCodeBlock from 'components/GraknPageCodeBlock';
import ReactGA from 'react-ga';

const GraknPage = () => (
  <TrackedPage>
    <div className="grakn-page">
      <section className="grakn-page__splash">
        <div className="grakn-page__splash__container container section__container">
          <div className="grakn-page__splash__text">
            <h1 className="grakn-page__splash__text__header">Meet <strong>Grakn</strong> and <strong>Graql</strong></h1>
            <span className="grakn-page__splash__text__tag">Grakn is the knowledge graph, and Graql is the query language.</span>
          </div>
          <GraknPageCodeBlock />
        </div>
      </section>
      <section className="grakn-page__github">
        <div className="grakn-page__github__container container section__container">
          <span className="grakn-page__github__header"><strong>Grakn</strong> and <strong>Graql</strong> are open source!</span>
          <div className="grakn-page__github__buttons">
            <Link to="/download" className="button button--red"
              onClick={() => {
                ReactGA.initialize('UA-72414051-1');
                ReactGA.event({
                  category: 'Grakn_Links_Install_DownloadPage',
                  action: 'Button Click',
                });
              }}>INSTALL</Link>
            <a href={graknRoutes.github} className="button button--transparent"
              onClick={() => {
                ReactGA.initialize('UA-72414051-1');
                ReactGA.event({
                  category: 'Grakn_Links_Star_Github',
                  action: 'Button Click',
                });
              }}
            >STAR ON GITHUB <i className="fa fa-2x fa-github" /></a>
          </div>
        </div>
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
                  Whether you are new to programming or an experienced developer, it's easy to learn and use Grakn. Get set up in a matter of minutes. Go to a <a href={graknRoutes.quickstart} className="animated__link animated__link--purple">quickstart tutorial</a>.
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
                  When you’re stuck, the most effective remedy is to collaborate. Ask your question on <a href={graknRoutes.stack} className="animated__link animated__link--purple">StackOverflow</a> or discuss it in our <a href={graknRoutes.discuss} className="animated__link animated__link--purple">Discussion forum.</a>
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
              Grakn is the knowledge graph engine to organise complex networks of data and making it queryable, by performing knowledge engineering. Rooted in <a href="https://en.wikipedia.org/wiki/Knowledge_representation_and_reasoning" target="_blank" className="animated__link animated__link--purple">Knowledge Representation and Automated Reasoning</a>, Grakn provides the <a href="https://en.wikipedia.org/wiki/Knowledge_base" target="_blank" className="animated__link animated__link--purple">knowledge foundation</a> for cognitive and intelligent (e.g. AI) systems, by providing an intelligent language for modelling, transactions and analytics. Being a distributed database, Grakn is designed to scale over a network of computers through partitioning and replication.
          </span>
          </div>
          <div className="grakn-page__graql__img">
            <img src="/assets/svg/grakn-hex.svg" alt="Hexcomb" />
          </div>
        </div>
      </section>
      <section className="grakn-page__features">
        <div className="grakn-page__features__circle"><img src="/assets/svg/bot.svg" alt="grakn bot" /></div>
        <div className="grakn-page__features__container container section__container">
          <div className="grakn-page__features__col">
            <div className="grakn-page__features__col__item grakn-page__features__col__item--red">
              <img src="/assets/svg/schema.svg" alt="Schema" className="grakn-page__features__col__item__img" />
              <span className="grakn-page__features__col__item__header">Knowledge Schema</span>
              <span className="grakn-page__features__col__item__text">
                Through Graql, Grakn provides an enhanced <a href="https://en.wikipedia.org/wiki/Entity–relationship_model" target="_blank" className="animated__link animated__link--purple">entity-relationship</a> <a href="https://en.wikipedia.org/wiki/Database_schema" target="_blank" className="animated__link animated__link--purple">schema</a> to model complex datasets. The schema allows users to model <a href="https://en.wikipedia.org/wiki/Class_hierarchy" target="_blank" className="animated__link animated__link--purple">type hierarchies</a>, hyper-entities, hyper-relationships and rules. The schema can be updated and extended at any time in the database lifecycle. Hyper-entities are entities with multiple instances of a given attribute, and hyper-relationships are nested relationships, cardinality-restricted relationships, or relationships between any number of entities. This enables the creation of complex knowledge models that can evolve flexibly.
            </span>
            </div>
            <div className="grakn-page__features__col__item grakn-page__features__col__item--blue">
              <img src="/assets/svg/analytics.svg" alt="Analytics" className="grakn-page__features__col__item__img" />
              <span className="grakn-page__features__col__item__header">Distributed Analytics</span>
              <span className="grakn-page__features__col__item__text">
                Graql natively performs distributed <a href="https://kowshik.github.io/JPregel/pregel_paper.pdf" target="_blank" className="animated__link animated__link--purple">Pregel</a> and <a href="https://en.wikipedia.org/wiki/MapReduce" target="_blank" className="animated__link animated__link--purple">MapReduce (BSP)</a> computations on Grakn through its abstraction of <a href="https://en.wikipedia.org/wiki/Online_analytical_processing" target="_blank" className="animated__link animated__link--purple">OLAP queries</a>. These types of queries usually require custom development of distributed algorithms for every use case. However, Grakn creates an abstraction of these distributed algorithms and incorporates them as part of the language API. This enables large scale computation of BSP algorithms through a declarative language without the need of implementing the algorithms.            </span>
            </div>
          </div>
          <div className="grakn-page__features__col__divider">
            <img src="/assets/svg/grakn-divider.svg" alt="Divider" />
          </div>
          <div className="grakn-page__features__col">
            <div className="grakn-page__features__col__item grakn-page__features__col__item--purple">
              <img src="/assets/svg/inference.svg" alt="Inference" className="grakn-page__features__col__item__img" />
              <span className="grakn-page__features__col__item__header">Automated Reasoning</span>
              <span className="grakn-page__features__col__item__text">
                Grakn’s query language, Graql, performs <a href="https://en.wikipedia.org/wiki/Inference" target="_blank" className="animated__link animated__link--purple">logical inference</a> through <a href="https://en.wikipedia.org/wiki/Deductive_reasoning" target="_blank" className="animated__link animated__link--purple">deductive reasoning</a> of data patterns and relationships, in order to derive implicit facts, associations and conclusions in real-time, during runtime of <a href="https://en.wikipedia.org/wiki/Online_transaction_processing" target="_blank" className="animated__link animated__link--purple">OLTP queries</a>. The inference is performed through entity and relationship type reasoning, as well as <a href="https://en.wikipedia.org/wiki/Rule_of_inference" target="_blank" className="animated__link animated__link--purple">rule-based</a> reasoning. This allows the discovery of facts and patterns that would otherwise be too hard to find, the abstraction of complex relationships into its simper conclusion, as well as translation of higher level queries into lower level and more complex data representation.            </span>
            </div>
            <div className="grakn-page__features__col__item grakn-page__features__col__item--green">
              <img src="/assets/svg/high_level.svg" alt="High Level" className="grakn-page__features__col__item__img" />
              <span className="grakn-page__features__col__item__header">Higher-Level Language</span>
              <span className="grakn-page__features__col__item__text">
                With the expressivity of the schema, inference through <a href="https://en.wikipedia.org/wiki/Online_transaction_processing" target="_blank" className="animated__link animated__link--purple">OLTP</a> and distributed algorithms through <a href="https://en.wikipedia.org/wiki/Online_analytical_processing" target="_blank" className="animated__link animated__link--purple">OLAP</a>, Grakn's language provides a strong abstraction over low-level data constructs and complex relationships. Graql not only simplifies and reduces lines of code, but it also automatically performs optimisation of query execution. When developers can achieve so much more by writing even less code, productivity rates increase by orders of magnitude.
            </span>
            </div>
          </div>
        </div>
        <div className="grakn-page__kgms">
          <div className="grakn-page__features__circle grakn-page__features__circle--kgms"><img src="/assets/svg/grakn-KGMS.svg" alt="Grakn KGMS" /></div>
          <div className="grakn-page__kgms__container container section__container">
            <span className="grakn-page__kgms__header">MEET GRAKN ENTERPRISE KGMS AND WORKBASE</span>
            <span className="grakn-page__kgms__text">
              The enterprise knowledge graph management system is designed to scale with the growth of your data and application workload, equipped with all the functionalities you need to deploy and operate in a production environment.          </span>
            <Link to="/grakn-kgms" className="grakn-page__kgms__button button button--charcoal" onClick={() => {
              ReactGA.initialize('UA-72414051-1');
              ReactGA.event({
                category: 'Grakn_Enterprise_LearnMore_KGMSPage',
                action: 'Button Click',
              });
            }}>Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  </TrackedPage>
);

export default GraknPage;
