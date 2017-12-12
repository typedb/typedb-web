import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Visualiser from 'components/Visualiser';
import PagingComponent from 'components/PagingComponent';
import graknRoutes from 'config/graknRoutes';


const deploymentOptions = [
  { name: 'Google Cloud Platform', url: '/assets/img/cloud_platform.png'},
  //{ name: 'Oracle', url: '/assets/img/oracle.png'},
  //{ name: 'IBM Bluemix', url: '/assets/img/IBM.png'},
  //{ name: 'Microsoft Azure', url: '/assets/img/azure.png'},
  { name: 'premise', url: '/assets/img/on_premise.png'},
  { name: 'Amazon Web Services', url: '/assets/img/amazon.png'}
];

const testimonials = [
  {name: 'Michael Bishop', company: 'CTO, Alpha Vertex', img: '/assets/img/bishop.jpg', review: '“Grakn significantly streamlines our knowledge engineering process. Grakn’s expressive schema allows us to verify the logical consistency of patterns detected by our learning algorithms and improve accuracy”'},
  {name: 'Radouane Oudrhiri', company: 'CTO, Eagle Genomics', img: '/assets/img/oudrhiri.jpg', review: '“Grakn\'s query language, Graql, should be the de facto language for any graph representation because of two things: the semantic expressiveness of the language and the optimisation of query execution.”'},
  {name: 'Gunnar Kleemann', company: 'Co-Founder, Berkeley Data Science Group', img: '/assets/img/gunnar.jpg', review: '“When working with network structures, such as Biology, interactions between objects are complex and nuanced. Grakn interprets these structures natively, and allow us to discover novel answers very quickly.”'},
]

const HomePage = () => (
  <div className="home">
    <section className="home__splash">
      <div className="home__splash__text container section__container">
        <span className="home__splash__text__headline home__header">THE <strong>DATABASE</strong> FOR AI</span>
        <span className="home__splash__text__tag">Grakn is a hyper-relational database for knowledge engineering. Rooted in Knowledge Representation and  Automated Reasoning, Grakn provides the knowledge base foundation for intelligent/cognitive systems.</span>
        <a className="home__splash__text__install" href={graknRoutes.download}>
        Install Grakn<i className="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
      <Visualiser />            
    </section>
    <section className="home__links">
      <div className="home__links__container container section__container">
        <div className="home__links__container__item">
          <img src="/assets/svg/github.svg" alt="github" />
          <span><a className="github-link" href={graknRoutes.github} target="_blank" >Grakn</a> on Github</span>
        </div>
        <div className="home__links__container__item">
          <img src="/assets/svg/slack-mark.svg" alt="slack" />
          <span><Link className="slack-link" to="/slack">Grakn</Link> on Slack</span>
        </div>
        <div className="home__links__container__item">
          <img src="/assets/svg/twitter_1.svg" alt="twitter" />
          <span><a className="twitter-link" href={graknRoutes.twitter} target="_blank">@GraknLabs</a> on Twitter</span>
        </div>
      </div>
    </section>
    <section className="home__features home__features--coloured">
      <div className="home__features__container container section__container">
        <span className="home__features__headline home__header">
          <strong>Grakn</strong> is a hyper-relational database for knowledge engineering
        </span>
        <div className="home__features__item">
          <div className="home__features__item__text">
            <div className="home__features__item__text__logo home__features__item__text__logo--red">
              <img src="/assets/svg/schema.svg" alt="schema" />
            </div>
            <span className="home__features__item__text__headline">Knowledge Schema</span>
            <span className="home__features__item__text__paragraph">
            Enhanced Entity-Relationship schema, with constructs to define hyper-objects, hyper-relations and functions, to build complex knowledge models
            </span>
              <a href={graknRoutes.overview} className="animated__link animated__link--purple">Learn More</a>                        
          </div>
          <div className="home__features__item__img">
            <img src="/assets/img/hyper-expressive_schema.png" alt="Hyper Expressive Schema" />
          </div>
        </div>
        <div className="home__features__item">
          <div className="home__features__item__img">
            <img src="/assets/svg/real-time-inference.svg" alt="Real Time Inference" />
          </div>
          <div className="home__features__item__text">
            <div className="home__features__item__text__logo home__features__item__text__logo--purple">
              <img src="/assets/svg/inference.svg" alt="inference" />
            </div>
            <span className="home__features__item__text__headline">Logical Inference</span>
            <span className="home__features__item__text__paragraph">
            Automatic deduction of data types and relationships during runtime (OLTP), enabling the retrieval of implicit associations between points
            </span>
            <a href={graknRoutes.overview} className="animated__link animated__link--purple">Learn More</a>                                    
          </div>
        </div>
      </div>
      <div className="home__features__circle"><img src="/assets/svg/bot.svg" alt="grakn bot" /></div>
     </section>
    <section className="home__features home__features--alternate">
      <div className="home__features__container container section__container">
        <div className="home__features__item">
          <div className="home__features__item__text">
            <div className="home__features__item__text__logo home__features__item__text__logo--blue">
              <img src="/assets/svg/analytics.svg" alt="analytics" />
            </div>
            <span className="home__features__item__text__headline">Distributed Analytics</span>
            <span className="home__features__item__text__paragraph">
            Automated Pregel and MapReduce distributed algorithms abstracted as a language (OLAP), enabling large scale computation through database queries
            </span>
            <a href={graknRoutes.overview} className="animated__link animated__link--purple">Learn More</a>                        
          </div>
          <div className="home__features__item__img">
            <img src="/assets/img/distributed_analytics.png" alt="Distributed Analytics" />
          </div>
        </div>
        <div className="home__features__item">
          <div className="home__features__item__img">
            <img src="/assets/svg/high-level-query.svg" alt="High Query Language" />
          </div>
          <div className="home__features__item__text">
            <div className="home__features__item__text__logo home__features__item__text__logo--green">
              <img src="/assets/svg/high_level.svg" alt="high level" />
            </div>
            <span className="home__features__item__text__headline">Higher-level Language</span>
            <span className="home__features__item__text__paragraph">
            Strong abstraction over low-level constructs, enabling you to express questions at a higher level and let the system figure out how to do the navigation
            </span>
            <a href={graknRoutes.overview} className="animated__link animated__link--purple">Learn More</a>                        
          </div>
        </div>
      </div>
    </section>
    <section className="home__production">
      <img src="/assets/img/background_2.png" alt="background curved" />
      <div className="home__production__container container section__container">
        <span className="home__production__headline home__header container section__container">
          Simplify your data architecture and scale your knowledge base into production 
        </span>
        <PagingComponent>
          <div className="home__production__slider__item">
            <div className="home__production__slider__item__container">
              <span className="home__production__slider__item__header"><i className="fa fa-check" aria-hidden="true"/>Scalabale Storage</span>   
              <span className="home__production__slider__item__text">A scalable system designed to be partitioned and replicated over a network of distributed machines</span>          
            </div>
          </div>
          <div className="home__production__slider__item">
            <div className="home__production__slider__item__container">
              <span className="home__production__slider__item__header"><i className="fa fa-check" aria-hidden="true"/>Elastic throughput</span>         
              <span className="home__production__slider__item__text">Read and write throughput scales linearly as new machines are added to the Grakn cluster, without  any downtime</span>                    
            </div>
          </div>
          <div className="home__production__slider__item">
            <div className="home__production__slider__item__container">
              <span className="home__production__slider__item__header"><i className="fa fa-check" aria-hidden="true"/>Extensible Schema</span>                  
              <span className="home__production__slider__item__text">Schema definition can be updated and extended flexibly, during runtime, without any need for database migration</span>                       
            </div>
          </div>
          <div className="home__production__slider__item">
            <div className="home__production__slider__item__container">
              <span className="home__production__slider__item__header"><i className="fa fa-check" aria-hidden="true"/>Secured Authentication </span>                  
              <span className="home__production__slider__item__text">Ensuring only authenticated access and appropriately privileged users are allowed to access specific datasets</span>                       
            </div>
          </div>
          <div className="home__production__slider__item">
            <div className="home__production__slider__item__container">
              <span className="home__production__slider__item__header"><i className="fa fa-check" aria-hidden="true"/>Full-string indexing</span>
              <span className="home__production__slider__item__text">Advanced full-text search capabilities, by enabling powerful string matching techniques over any body of text</span>
            </div>
          </div>
          <div className="home__production__slider__item">
            <div className="home__production__slider__item__container">
              <span className="home__production__slider__item__header"><i className="fa fa-check" aria-hidden="true"/>Migration Tools</span>                  
              <span className="home__production__slider__item__text">Tools to help migrate large datasets from various formats and database sources, easily and quickly</span>                       
            </div>
          </div>       
          <div className="home__production__slider__item">
            <div className="home__production__slider__item__container">
              <span className="home__production__slider__item__header"><i className="fa fa-check" aria-hidden="true"/>Dedicated IDE</span>                  
              <span className="home__production__slider__item__text">An integrated development environment for knowledge engineering and modelling at scale</span>                       
            </div>
          </div>       
          <div className="home__production__slider__item">
            <div className="home__production__slider__item__container">
              <span className="home__production__slider__item__header"><i className="fa fa-check" aria-hidden="true"/>Monitoring</span>                  
              <span className="home__production__slider__item__text">Monitor your database performance in real-time through a dedicated and configurable dashboard</span>                       
            </div>
          </div>       
          <div className="home__production__slider__item">
            <div className="home__production__slider__item__container">
              <span className="home__production__slider__item__header"><i className="fa fa-check" aria-hidden="true"/>Cluster Management</span>                  
              <span className="home__production__slider__item__text">Easily deploy and scale your database with tools that automate the of provisioning your cluster</span>                       
            </div>
          </div>       
        </PagingComponent>
      </div>
      <a href={graknRoutes.overview} className="button button--transparent home__production__button">Learn More</a>      
    </section>
    <section className="home__deployment">
      <div className="home__deployment__container container section__container">
        <span className="home__deployment__headline home__header">
          Run <strong>Grakn</strong> on premise, or in the cloud
        </span>
        <div className="home__deployment__items--desktop">
          <div className="home__deployment__items--desktop__row">
          {
            deploymentOptions.slice(0,3).map((item, index) => {
              return (
                <div className="home__deployment__items__item" key={`${index}--develop`} onClick={() => location.href='mailto:enterprise@grakn.ai'}>
                  <img src={item.url} alt={item.name} />
                </div>
              )
            })
          }
          </div>
          <div className="home__deployment__items--desktop__row">
          {
            deploymentOptions.slice(3,).map((item, index) => {
              return (
                <div className="home__deployment__items__item" key={`${index}__develop`}>
                  <img src={item.url} alt={item.name} />
                </div>
              )
            })
          }
          </div>
        </div>
        <a href="mailto:enterprise@grakn.ai" className="button button--transparent">Choose your deployment option</a>
      </div>
    </section>
    <section className="home__usecases">
      <div className="home__usecases__container container section__container">
        <span className="home__usecases__header">
          <strong>Grakn</strong> can help every domain with complex networks of information
        </span>
        <Tabs className="home__usecases__tabcontainer">
          <TabPanel className="home__usecases__tabpanel" selectedClassName="home__usecases__tabpanel--selected">
            <div className="home__usecases__tabpanel__container">
              <div className="home__usecases__tabpanel__img">
                <img src="/assets/img/bots.png" alt="bots"/>
              </div>
              <div className="home__usecases__tabpanel__text">
                <span className="home__usecases__tabpanel__text__title">
                Intelligent Bots
                </span>
                <span className="home__usecases__tabpanel__text__content">
                As devices have become more intelligent, the way we interact with them evolved to natural language through conversation. GRAKN.AI is the ideal platform for developing chat bots because it is capable of interpreting complex and ambiguous questions by performing inference over your knowledge base.
                </span>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="home__usecases__tabpanel" selectedClassName="home__usecases__tabpanel--selected">
            <div className="home__usecases__tabpanel__container">
              <div className="home__usecases__tabpanel__img">
                <img src="/assets/img/search.png" alt="search"/>
              </div>
              <div className="home__usecases__tabpanel__text">
                <span className="home__usecases__tabpanel__text__title">
                Semantic Search
                </span>
                <span className="home__usecases__tabpanel__text__content">
                With ever more massive volumes of stored data, it becomes increasingly difficult for organizations to effectively search for relevant results. By using a search platform that understands a query’s intent and the meaning of its terms, data’s meaning can be unlocked, and organizations can free themselves.
                </span>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="home__usecases__tabpanel" selectedClassName="home__usecases__tabpanel--selected">
            <div className="home__usecases__tabpanel__container">
              <div className="home__usecases__tabpanel__img home__usecases__tabpanel__img--scaled">
                <img src="/assets/img/financial_services.png" alt="financial services "/>
              </div>
              <div className="home__usecases__tabpanel__text">
                <span className="home__usecases__tabpanel__text__title">
                Financial Services
                </span>
                <span className="home__usecases__tabpanel__text__content">
                Across the financial service industry, changes in technology, policy, and geopolitics have radically altered the data landscape in the past few years. By taking advantage of the most cutting-edge data infrastructure technologies, financial service firms can take full strategic advantage of the changing data landscape.
                </span>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="home__usecases__tabpanel" selectedClassName="home__usecases__tabpanel--selected">
            <div className="home__usecases__tabpanel__container">
              <div className="home__usecases__tabpanel__img">
                <img src="/assets/img/health_life.png" alt="Health Science"/>
              </div>
              <div className="home__usecases__tabpanel__text">
                <span className="home__usecases__tabpanel__text__title">
                Health and Life Science
                </span>
                <span className="home__usecases__tabpanel__text__content">
                From pharmaceutical R&D and biomedical research to frontline healthcare delivery, the contemporary health and life science industries rely on data to power insight and improve care. Yet, despite advances in scientific knowledge and healthcare technologies, effective use of data remains a challenge.
                </span>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="home__usecases__tabpanel" selectedClassName="home__usecases__tabpanel--selected">
            <div className="home__usecases__tabpanel__container">
              <div className="home__usecases__tabpanel__img home__usecases__tabpanel__img--scaled">
                <img src="/assets/img/security.png" alt="Security"/>
              </div>
              <div className="home__usecases__tabpanel__text">
                <span className="home__usecases__tabpanel__text__title">
                Security
                </span>
                <span className="home__usecases__tabpanel__text__content">
                As technology permeates deeper into every aspect of our lives—with constant digital footprints and interconnected devices proliferating—the growth in potential damage and disruption from bad actors grows. Both individuals and firms must leverage their digital defences against an onslaught of increasingly.
                </span>
              </div>
            </div>
          </TabPanel>
          
          <TabList className="home__usecases__tablist">
            <Tab className="home__usecases__tablist__item" selectedClassName="home__usecases__tablist__item--selected">
              <img src="/assets/svg/bot-tab.svg" alt="bots"/>       
              <span className="home__usecase__tablist__item__text home__usecase__tablist__item__text--bots">Intelligent Bots</span>
            </Tab>
            <Tab className="home__usecases__tablist__item" selectedClassName="home__usecases__tablist__item--selected">
              <img src="/assets/svg/search.svg" alt="search"/>             
              <span className="home__usecase__tablist__item__text home__usecase__tablist__item__text--search">Semantic Search</span>         
            </Tab>
            <Tab className="home__usecases__tablist__item" selectedClassName="home__usecases__tablist__item--selected">
              <img src="/assets/svg/services.svg" alt="services"/>                      
              <span className="home__usecase__tablist__item__text home__usecase__tablist__item__text--services">Financial Services</span>       
            </Tab>
            <Tab className="home__usecases__tablist__item" selectedClassName="home__usecases__tablist__item--selected">
              <img src="/assets/svg/science.svg" alt="science"/>                        
              <span className="home__usecase__tablist__item__text home__usecase__tablist__item__text--science">Health & Life Science</span>           
            </Tab>
            <Tab className="home__usecases__tablist__item" selectedClassName="home__usecases__tablist__item--selected">
              <img src="/assets/svg/security.svg" alt="security"/>                                
              <span className="home__usecase__tablist__item__text home__usecase__tablist__item__text--security">Security</span>   
            </Tab>
          </TabList>
        </Tabs>
      </div>
    </section>
    <section className="home__reviews">
        <div className="home__reviews__container container section__container">
          <div className="home__reviews__header">
            <img className="home__reviews__headerimg" src="/assets/svg/testimonials.svg" alt="testimonials" />
            <span className="home__header">
              Building on the shoulders of <strong>Grakn</strong>
            </span>
          </div>
          <PagingComponent className="home__reviews__items">
            {
              testimonials.map((item, index) => {
                return (
                  <div className="home__reviews__item" key={`${index}__testimonals`}>
                    <div className="home__reviews__item__text">{item.review}</div>
                    <div className="home__reviews__item__details">
                      <div className="home__reviews__item__details__img"><img src={item.img} alt={`${item.name}'s picture`} /></div>
                      <div className="home__reviews__item__details__text">
                        <span>{item.name}</span>
                        <span>{item.company}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </PagingComponent>
          <a href="mailto:enterprise@grakn.ai" className="button button--red">Get in touch with our team</a>
        </div>
    </section>
    <section className="home__world">
      <div className="home__world__container container section__container">         
        <span className="home__world__headline">THE WORLD NEEDS TO <strong>GRAKN</strong></span>
        <Link to="/community" className="home__world__link">Join the Grakn open source community around the world</Link>
      </div>
    </section>
  </div>
);

export default HomePage;
