import React from 'react';
import { Link } from 'react-router-dom';
const graknRoutes = require('config/graknRoutes');
import GraknPageCodeBlock from 'components/GraknPageCodeBlock';

const GraknPage = () => (
  <div className="grakn-page">
    <section className="grakn-page__splash">
      <div className="grakn-page__splash__container container section__container">
        <div className="grakn-page__splash__text">
          <h1 className="grakn-page__splash__text__header">Meet <strong>Grakn</strong> and <strong>Graql</strong></h1>
          <span className="grakn-page__splash__text__tag">Grakn is a hyper-relational database for knowledge engineering,<br /> and Graql is Grakn’s query language.</span>
        </div>
        <GraknPageCodeBlock />
      </div>
    </section>
    <section className="grakn-page__github">
      <div className="grakn-page__github__container container section__container">
        <span className="grakn-page__github__header"><strong>Grakn</strong> and <strong>Graql</strong> is open source!</span>
        <div className="grakn-page__github__buttons">
          <Link to="/download" className="button button--red">INSTALL</Link>
          <a href={graknRoutes.github} className="button button--transparent">STAR ON GITHUB <i className="fa fa-2x fa-github" /></a>
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
              When you’re stuck, the most effective remedy is to collaborate. Ask your question on <a href={graknRoutes.stack} className="animated__link animated__link--purple">StackOverflow</a> or discuss it in our <a href={graknRoutes.discuss} className="animated__link animated__link--purple">Discussion forum.</a>
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
          Grakn is a hyper-relational database for knowledge engineering, i.e. a knowledge base. Being a distributed system, Grakn is design to be sharded and replicated over a network of computers. Under the hood, Grakn has built an expressive <a href="https://en.wikipedia.org/wiki/Knowledge_representation_and_reasoning" target="_blank" className="animated__link animated__link--purple">knowledge representation system</a> with a transactional query interface, Graql. Graql is Grakn’s reasoning (through <a href="https://en.wikipedia.org/wiki/Online_transaction_processing" target="_blank" className="animated__link animated__link--purple">OLTP</a>) and analytics (through <a href="https://en.wikipedia.org/wiki/Online_analytical_processing" target="_blank" className="animated__link animated__link--purple">OLAP</a>) declarative query language. 
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
            <img src="/assets/svg/schema.svg" alt="Schema" className="grakn-page__features__col__item__img"/>
            <span className="grakn-page__features__col__item__header">Knowledge Schema</span>
            <span className="grakn-page__features__col__item__text">
            Through Graql, Grakn provides an enhanced <a href="https://en.wikipedia.org/wiki/Entity–relationship_model" target="_blank" className="animated__link animated__link--purple">entity-relationship</a> <a href="https://en.wikipedia.org/wiki/Database_schema" target="_blank" className="animated__link animated__link--purple">schema</a> to model complex datasets. The schema allows users to model <a href="https://en.wikipedia.org/wiki/Class_hierarchy" target="_blank" className="animated__link animated__link--purple">type hierarchies</a>, hyper-entities, hyper-relationships and rules. The schema can be updated and extended at any time in the database lifecycle. Hyper-entities are entities with multiple instances of a given attribute, and hyper-relationships are nested relationships, cardinality-restricted relationships, or relationships between any number of entities. This enables the creation of complex knowledge models that can evolve flexibly.
            </span>
          </div>
          <div className="grakn-page__features__col__item grakn-page__features__col__item--blue">
            <img src="/assets/svg/analytics.svg" alt="Analytics" className="grakn-page__features__col__item__img"/>
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
            <img src="/assets/svg/inference.svg" alt="Inference" className="grakn-page__features__col__item__img"/>
            <span className="grakn-page__features__col__item__header">Logical Inference</span>
            <span className="grakn-page__features__col__item__text">
            Grakn’s query language, Graql, performs <a href="https://en.wikipedia.org/wiki/Inference" target="_blank" className="animated__link animated__link--purple">logical inference</a> through <a href="https://en.wikipedia.org/wiki/Deductive_reasoning" target="_blank" className="animated__link animated__link--purple">deductive reasoning</a> of entity types and relationships, in order to infer implicit facts, associations and conclusions in real-time, during runtime of <a href="https://en.wikipedia.org/wiki/Online_transaction_processing" target="_blank" className="animated__link animated__link--purple">OLTP queries</a>. The inference is performed through entity and relationship type reasoning, as well as <a href="https://en.wikipedia.org/wiki/Rule_of_inference" target="_blank" className="animated__link animated__link--purple">rule-based</a> reasoning. This allows the discovery of facts that would otherwise be too hard to find, the abstraction of complex relationships into its simper conclusion, as well as translation of higher level queries into lower level and more complex data representation.            </span>
          </div>
          <div className="grakn-page__features__col__item grakn-page__features__col__item--green">
            <img src="/assets/svg/high_level.svg" alt="High Level" className="grakn-page__features__col__item__img"/>
            <span className="grakn-page__features__col__item__header">Higher-Level Language</span>
            <span className="grakn-page__features__col__item__text">
            With the expressivity of the schema, inference through <a href="https://en.wikipedia.org/wiki/Online_transaction_processing" target="_blank" className="animated__link animated__link--purple">OLTP</a> and distributed algorithms through <a href="https://en.wikipedia.org/wiki/Online_analytical_processing" target="_blank" className="animated__link animated__link--purple">OLAP</a>, Grakn’s language provides a strong abstraction over low-level data constructs and complex relationships. Graql not only simplifies and reduce lines of code, but it also automatically performs optimisation of query execution.  When developers can achieve so much more by writing even less code, productivity rate increases by orders of magnitude. </span>
          </div>
        </div>
      </div>
      <div className="grakn-page__kbms">
        <div className="grakn-page__features__circle grakn-page__features__circle--kbms"><img src="/assets/svg/grakn-KBMS.svg" alt="Grakn KBMS" /></div>
        <div className="grakn-page__kbms__container container section__container">
          <span className="grakn-page__kbms__header">MEET GRAKN ENTERPRISE KBMS AND WORKBASE</span>
          <span className="grakn-page__kbms__text">
          The enterprise knowledge base management system is designed to scale with the growth of your data and application workload, equipped with all the functionalities you need to deploy and operate in a production environment.          </span>
          <Link to="/grakn-kbms" className="grakn-page__kbms__button button button--charcoal">Learn More</Link>
        </div>
      </div>
    </section>
  </div>
);

export default GraknPage;