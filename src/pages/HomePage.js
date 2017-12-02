import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Slider from 'react-slick';
import Visualiser from 'components/Visualiser';

import graknRoutes from 'config/graknRoutes';
const prodSectionSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  initialSlide: 2,
  swipeToSlide: true,
  className: 'home__production__slider',
  variableWidth: true,
  centerMode: true,
  responsive: [
     { breakpoint: 500, settings: { centerMode: false, slidesToShow: 1, slidesToScroll: 1 } },
     { breakpoint: 1000, settings: { slidesToShow: 3, slidesToScroll: 1 } },
  ]
};

const deploymentSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
  arrows: false,
  initialSlide: 0,
  centerMode: true,
  swipeToSlide: true,
  className: 'home__deployment__items--slider',
  responsive: [
     { breakpoint: 400, settings: {   slidesToShow: 1, slidesToScroll: 1    } },
     { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
  ]
}

const testimonialsSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  initialSlide: 1,
  swipeToSlide: true,
  centerMode: true,
  className: 'home__reviews__slider',
  variableWidth: true,
  responsive: [
     { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: false} },
     { breakpoint: 1300, settings: { slidesToShow: 2, slidesToScroll: 1 } },
  ]
}

const deploymentOptions = [
  { name: 'Google Cloud Platform', url: '/assets/img/cloud_platform.png'},
  { name: 'Oracle', url: '/assets/img/oracle.png'},
  { name: 'IBM Bluemix', url: '/assets/img/IBM.png'},
  { name: 'Microsoft Azure', url: '/assets/img/azure.png'},
  { name: 'premise', url: '/assets/img/on_premise.png'},
  { name: 'Amazon Web Services', url: '/assets/img/amazon.png'}
];

const testimonials = [
  {name: 'John Doe', company: 'Corp Inc.', img: '/assets/img/Testimonials_1.png', review: '“Nulla ut sem lacus. Morbi dapibus lacus eu pharetra blandit. Donec arcu turpis, viverra eu volutpat ac. Phasellus consectetur vestibulum. Vestibulum lectust.”'},
  {name: 'Random Adam', company: 'Corp Inc.', img: '/assets/img/testimonials_2.png', review: '“Nulla ut sem lacus. Morbi dapibus lacus eu pharetra blandit. Donec arcu turpis, viverra eu volutpat ac. Phasellus consectetur vestibulum. Vestibulum lectust.”'},
  {name: 'Alpha Sam', company: 'Corp Inc.', img: '/assets/img/testimonials_3.png', review: '“Nulla ut sem lacus. Morbi dapibus lacus eu pharetra blandit. Donec arcu turpis, viverra eu volutpat ac. Phasellus consectetur vestibulum. Vestibulum lectust.”'}
]

const HomePage = () => (
  <div className="home">
    <section className="home__splash">
      <div className="home__splash__text container section__container">
        <span className="home__splash__text__headline home__header">THE <strong>DATABASE</strong> FOR AI</span>
        <span className="home__splash__text__tag">AI systems process knowledge that is too complex for current databases. Grakn is a distributed hyper-relational database for knowledge-oriented systems, i.e. a distributed knowledge base.</span>
        <a className="home__splash__text__install" href={graknRoutes.download} target="_blank">
        Install Grakn<i className="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
        <Link className="home__splash__text__community" to="/community">Join our Community!</Link>
      </div>
      <Visualiser />            
    </section>
    <section className="home__links">
      <div className="home__links__container container section__container">
        <div className="home__links__container__item">
          <img src="/assets/svg/github.svg" alt="github" />
          <span><a className="github-link" href={graknRoutes.github} target="_blank" >Grakn 0.17</a> on Github</span>
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
            <Link to="/" className="animated__link animated__link--purple">Learn More</Link>                        
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
            <Link to="/" className="animated__link animated__link--purple">Learn More</Link>                        
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
            <span className="home__features__item__text__headline">Distributed analytics</span>
            <span className="home__features__item__text__paragraph">
            Automated Pregel and MapReduce distributed algorithms abstracted as a language (OLAP), enabling large scale computation through database queries
            </span>
            <Link to="/" className="animated__link animated__link--purple">Learn More</Link>                        
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
            Strong abstraction over low-level constructs, enabling you to express questions at a higher level and let the system figure out how to do the navigation
            </span>
            <Link to="/" className="animated__link animated__link--purple">Learn More</Link>            
          </div>
        </div>
      </div>
    </section>
    <section className="home__production">
      <span className="home__production__headline home__header container section__container">
        Simplify your data architecture and scale your knowledge base into production 
      </span>
      <Slider {...prodSectionSettings}>
        <div className="home__production__slider__item">
          <div className="home__production__slider__item__container">
            <span className="home__production__slider__item__header"><i className="fa fa-check" aria-hidden="true"/>Full-string indexing</span>
            <span className="home__production__slider__item__text">Advanced full-text search capabilities, by enabling powerful string matching techniques over any body of text</span>
          </div>
        </div>
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
      </Slider>
      <Link to="/" className="button button--transparent">Learn More</Link>      
    </section>
    <section className="home__deployment">
      <div className="home__deployment__container container section__container">
        <span className="home__deployment__headline home__header">
          Deploy and run <strong>Grakn</strong> on premise, or any cloud platform
        </span>
        <div className="home__deployment__items--desktop">
          <div className="home__deployment__items--desktop__row">
          {
            deploymentOptions.slice(0,3).map((item, index) => {
              return (
                <div className="home__deployment__items__item" key={`${index}--develop`}>
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
        <Slider {...deploymentSettings}>
          {
            deploymentOptions.map((item, index) => {
              return (
                <div className="home__deployment__items__item home__deployment__items__item--slider" key={`${index}__deployment`}>
                  <img src={item.url} alt={item.name} />
                </div>
              )
            })
          }
        </Slider>
        <Link to="/" className="button button--transparent">Choose your deployment option</Link>
      </div>
    </section>
    <section className="home__usecases">
      <div className="home__usecases__container container section__container">
        <span className="home__usecases__header">
          <strong>Grakn</strong> helps every domain with complex networks of information
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
                <Link to="/" className="animated__link animated__link--purple">Learn More</Link>
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
                <Link to="/" className="animated__link animated__link--purple">Learn More</Link>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="home__usecases__tabpanel" selectedClassName="home__usecases__tabpanel--selected">
            <div className="home__usecases__tabpanel__container">
              <div className="home__usecases__tabpanel__img">
                <img src="/assets/img/financial_services.png" alt="financial services "/>
              </div>
              <div className="home__usecases__tabpanel__text">
                <span className="home__usecases__tabpanel__text__title">
                Financial Services
                </span>
                <span className="home__usecases__tabpanel__text__content">
                Across the financial service industry, changes in technology, policy, and geopolitics have radically altered the data landscape in the past few years. By taking advantage of the most cutting-edge data infrastructure technologies, financial service firms can take full strategic advantage of the changing data landscape.
                </span>
                <Link to="/" className="animated__link animated__link--purple">Learn More</Link>
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
                <Link to="/" className="animated__link animated__link--purple">Learn More</Link>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="home__usecases__tabpanel" selectedClassName="home__usecases__tabpanel--selected">
            <div className="home__usecases__tabpanel__container">
              <div className="home__usecases__tabpanel__img">
                <img src="/assets/img/security.png" alt="Security"/>
              </div>
              <div className="home__usecases__tabpanel__text">
                <span className="home__usecases__tabpanel__text__title">
                Security
                </span>
                <span className="home__usecases__tabpanel__text__content">
                As technology permeates deeper into every aspect of our lives—with constant digital footprints and interconnected devices proliferating—the growth in potential damage and disruption from bad actors grows. Both individuals and firms must leverage their digital defences against an onslaught of increasingly.
                </span>
                <Link to="/" className="animated__link animated__link--purple">Learn More</Link>
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
          <Slider {...testimonialsSettings}>
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
          </Slider>
          <Link to="/" className="button button--red">Schedule a call with our team</Link>
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
