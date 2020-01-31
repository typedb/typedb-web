import React, { Component } from 'react';
import TrackedPage from './TrackedPage';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Visualiser from 'components/Visualiser';
import PagingComponent from 'components/PagingComponent';
import ContactFormModal from 'components/ContactFormModal';
import Testimonials from 'components/Testimonials';
import graknRoutes from 'config/graknRoutes';
import KGMSFeatures from 'components/KGMSFeatures';
import CompanyLogos from 'components/CompanyLogos';
import ReactGA from 'react-ga';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supportModal: false,
    };
    this.switchSupportModal = this.switchSupportModal.bind(this);
  }

  switchSupportModal() {
    this.setState({
      supportModal: !this.state.supportModal
    });
  }

  render() {
    return (
      <TrackedPage pageTitle="Home">
        <div className="home-page">
          <section className="home-page__splash">
            <div className="home-page__splash__text container section__container">
              <h1 className="home-page__splash__text__headline home-page__header">Building intelligent systems starts at the database</h1>
              <span className="home-page__splash__text__tag">Grakn is an intelligent database - <i>a knowledge graph</i></span>
              <Link to="/grakn-core" className="home-page__splash__text__install" onClick={() => {
                ReactGA.initialize('UA-72414051-1');
                ReactGA.event({
                  category: 'Home-page_Splash_LearnMore_GraknPage',
                  action: 'Button Click',
                });
              }}>
                Learn more<i className="fa fa-arrow-right" aria-hidden={true}></i>
              </Link>
            </div>
            <Visualiser />
          </section>
          <section className="home-page__links">
            <div className="home-page__links__container container section__container">
              <div className="home-page__links__container__item">
                <img src="/assets/svg/github.svg" alt="github" />
                <span><a className="github-link" href={graknRoutes.github} target="_blank"
                  onClick={() => {
                    ReactGA.initialize('UA-72414051-1');
                    ReactGA.event({
                      category: 'Home-page_Splash_Button_Github',
                      action: 'Button Click',
                    });
                  }}>Grakn {this.props.downloads.length > 0 ? this.props.downloads.filter(item => item.latest === "True")[0].version : null}</a> on Github</span>
              </div>
              <div className="home-page__links__container__item">
                <img src="/assets/svg/discord-mark.svg" alt="discord" />
                <span><Link className="discord-link" to="/discord" onClick={() => {
                  ReactGA.initialize('UA-72414051-1');
                  ReactGA.event({
                    category: 'Home-page_Splash_Button_Discord',
                    action: 'Button Click',
                  });
                }}>Grakn</Link> on Discord</span>
              </div>
              <div className="home-page__links__container__item">
                <img src="/assets/svg/twitter_1.svg" alt="twitter" />
                <span><a className="twitter-link" href={graknRoutes.twitter} target="_blank"
                  onClick={() => {
                    ReactGA.initialize('UA-72414051-1');
                    ReactGA.event({
                      category: 'Home-page_Splash_Button_Twitter',
                      action: 'Button Click',
                    });
                  }}>@GraknLabs</a> on Twitter</span>
              </div>
            </div>
          </section>
          <section className="home-page__features home-page__features--coloured">
            <div className="home-page__features__container container section__container">
              <span className="home-page__features__headline home-page__header">
                Intelligent systems need a unified <strong>knowledge representation</strong>
              </span>
              <div className="home-page__features__item">
                <div className="home-page__features__item__text">
                  <div className="home-page__features__item__text__logo home-page__features__item__text__logo--red">
                    <img src="/assets/svg/schema.svg" alt="schema" />
                  </div>
                  <span className="home-page__features__item__text__headline">Knowledge Schema</span>
                  <span className="home-page__features__item__text__paragraph">
                    An insanely intuitive &amp; expressive data schema, with constructs to define hierarchies, hyper-entities, hyper-relations and rules, to build rich knowledge models.
                </span>
                  <Link to="/grakn-core" className="animated__link animated__link--purple"
                    onClick={() => {
                      ReactGA.initialize('UA-72414051-1');
                      ReactGA.event({
                        category: 'Home-page_Features_LearnMore1_GraknPage',
                        action: 'Button Click',
                      });
                    }}
                  >Learn More</Link>
                </div>
                <div className="home-page__features__item__img">
                  <img src="/assets/img/hyper-expressive_schema.png" alt="Hyper Expressive Schema" />
                </div>
              </div>
              <div className="home-page__features__item">
                <div className="home-page__features__item__img">
                  <img src="/assets/svg/real-time-inference.svg" alt="Real Time Inference" />
                </div>
                <div className="home-page__features__item__text">
                  <div className="home-page__features__item__text__logo home-page__features__item__text__logo--purple">
                    <img src="/assets/svg/inference.svg" alt="inference" />
                  </div>
                  <span className="home-page__features__item__text__headline">Automated Reasoning</span>
                  <span className="home-page__features__item__text__paragraph">
                    An intelligent language that performs logical inference of data types, relationships, attributes and complex patterns, during runtime, and over distributed &amp; persisted data.
                </span>
                  <Link to="/grakn-core" className="animated__link animated__link--purple"
                    onClick={() => {
                      ReactGA.initialize('UA-72414051-1');
                      ReactGA.event({
                        category: 'Home-page_Features_LearnMore2_GraknPage',
                        action: 'Button Click',
                      });
                    }}
                  >Learn More</Link>
                </div>
              </div>
            </div>
            <div className="home-page__features__circle"><img src="/assets/svg/bot.svg" alt="grakn bot" /></div>
          </section>
          <section className="home-page__features home-page__features--alternate">
            <div className="home-page__features__container container section__container">
              <div className="home-page__features__item">
                <div className="home-page__features__item__text">
                  <div className="home-page__features__item__text__logo home-page__features__item__text__logo--blue">
                    <img src="/assets/svg/analytics.svg" alt="analytics" />
                  </div>
                  <span className="home-page__features__item__text__headline">Distributed Analytics</span>
                  <span className="home-page__features__item__text__paragraph">
                    Out-of-the-box distributed analytics (Pregel and MapReduce) algorithms, accessible through the language through simple queries.
                </span>
                  <Link to="/grakn-core" className="animated__link animated__link--purple"
                    onClick={() => {
                      ReactGA.initialize('UA-72414051-1');
                      ReactGA.event({
                        category: 'Home-page_Features_LearnMore3GraknPage',
                        action: 'Button Click',
                      });
                    }}
                  >Learn More</Link>
                </div>
                <div className="home-page__features__item__img">
                  <img src="/assets/img/distributed_analytics.png" alt="Distributed Analytics" />
                </div>
              </div>
              <div className="home-page__features__item">
                <div className="home-page__features__item__img">
                  <img src="/assets/svg/high-level-query.svg" alt="High Query Language" />
                </div>
                <div className="home-page__features__item__text">
                  <div className="home-page__features__item__text__logo home-page__features__item__text__logo--green">
                    <img src="/assets/svg/high_level.svg" alt="high level" />
                  </div>
                  <span className="home-page__features__item__text__headline">Higher-Level Language</span>
                  <span className="home-page__features__item__text__paragraph">
                    Strong abstraction over low-level patterns, enabling simpler expressions of complex constructs, while the system figures out the most optimal query execution.
                </span>
                  <Link to="/grakn-core" className="animated__link animated__link--purple"
                    onClick={() => {
                      ReactGA.initialize('UA-72414051-1');
                      ReactGA.event({
                        category: 'Home-page_Features_LearnMore4_GraknPage',
                        action: 'Button Click',
                      });
                    }}
                  >Learn More</Link>
                </div>
              </div>
            </div>
          </section>
          <section className="home-page__production">
            <img src="/assets/img/background_2.png" alt="background curved" />
            <div className="home-page__production__container container section__container">
              <span className="home-page__production__headline home-page__header container section__container">
                Scale your enterprise Knowledge Graph with Grakn <strong>KGMS</strong> and <strong>Workbase</strong>
              </span>
              <KGMSFeatures />
            </div>
            <Link to="/grakn-kgms" className="button button--transparent home-page__production__button"
              onClick={() => {
                ReactGA.initialize('UA-72414051-1');
                ReactGA.event({
                  category: 'Home-page_Carousel_LearnMore_KGMSPage',
                  action: 'Button Click',
                });
              }}>Learn More</Link>
          </section>
          <section className="home-page__deployment">
            <div className="home-page__deployment__container container section__container">
              <span className="home-page__deployment__headline home-page__header">
                Deploy Grakn KGMS <strong>on-premise</strong>,<br />or in the <strong>cloud</strong>
              </span>
              <div className="home-page__deployment__items--desktop">
                <div className="home-page__deployment__items--desktop__row">
                  {
                    this.props.deployment.sort((a, b) => a.sort - b.sort).map((item, index) => {
                      return (
                        <Link to="/deployment" className="home-page__deployment__items__item" key={`${index}--develop`}
                        >
                          <img src={item.img} alt={item.name} />
                        </Link>
                      )
                    })
                  }
                </div>
              </div>
              <Link to='/deployment' className="button button--transparent"
                onClick={() => {
                  ReactGA.initialize('UA-72414051-1');
                  ReactGA.event({
                    category: 'Home-page_Deployment_ChooseYourButton_DeploymentPage',
                    action: 'Button Click',
                  });
                }}
              >Choose your deployment option</Link>
            </div>
          </section>
          <section className="home-page__usecases">
            <div className="home-page__usecases__container container section__container">
              <span className="home-page__usecases__header">
                <strong>Grakn</strong> can help every domain with complex networks of information
            </span>
              <Tabs className="home-page__usecases__tabcontainer">
                <TabPanel className="home-page__usecases__tabpanel" selectedClassName="home-page__usecases__tabpanel--selected">
                  <div className="home-page__usecases__tabpanel__container">
                    <div className="home-page__usecases__tabpanel__img home-page__usecases__tabpanel__img--scaled">
                      <img src="/assets/img/financial_services.png" alt="financial services " />
                    </div>
                    <div className="home-page__usecases__tabpanel__text">
                      <span className="home-page__usecases__tabpanel__text__title">
                        Financial Services
                    </span>
                      <span className="home-page__usecases__tabpanel__text__content">
                        Across the financial service industry, changes in technology, policy, and geopolitics have radically altered the data landscape in the past few years. By taking advantage of Grakn's cutting-edge knowledge graph technology, financial service firms can take full strategic advantage of the changing data landscape.
                    </span>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="home-page__usecases__tabpanel" selectedClassName="home-page__usecases__tabpanel--selected">
                  <div className="home-page__usecases__tabpanel__container">
                    <div className="home-page__usecases__tabpanel__img">
                      <img src="/assets/img/health_life.png" alt="Health Science" />
                    </div>
                    <div className="home-page__usecases__tabpanel__text">
                      <span className="home-page__usecases__tabpanel__text__title">
                        Health and Life Science
                    </span>
                      <span className="home-page__usecases__tabpanel__text__content">
                        From pharmaceutical R&D and biomedical research to frontline healthcare delivery, contemporary health and life science industries rely on data to power insight and improve care. Using Grakn to effectively manage data can help organisations advance scientific research and deliver best practice medicine.
                    </span>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="home-page__usecases__tabpanel" selectedClassName="home-page__usecases__tabpanel--selected">
                  <div className="home-page__usecases__tabpanel__container">
                    <div className="home-page__usecases__tabpanel__img">
                      <img src="/assets/img/bots.png" alt="bots" />
                    </div>
                    <div className="home-page__usecases__tabpanel__text">
                      <span className="home-page__usecases__tabpanel__text__title">
                        Intelligent Bots
                    </span>
                      <span className="home-page__usecases__tabpanel__text__content">
                        As devices have become more intelligent, the way we interact with them evolved to natural language through conversation. Grakn is the ideal platform for developing chat bots because it is capable of interpreting complex and ambiguous questions by performing inference over your knowledge graph.
                    </span>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="home-page__usecases__tabpanel" selectedClassName="home-page__usecases__tabpanel--selected">
                  <div className="home-page__usecases__tabpanel__container">
                    <div className="home-page__usecases__tabpanel__img">
                      <img src="/assets/img/search.png" alt="search" />
                    </div>
                    <div className="home-page__usecases__tabpanel__text">
                      <span className="home-page__usecases__tabpanel__text__title">
                        Semantic Search
                    </span>
                      <span className="home-page__usecases__tabpanel__text__content">
                        Performing an effective search for relevant results is becoming increasingly difficult as volumes of data grow. By using Grakn to power a search platform that understands a query’s intent and the meaning of its terms, data’s meaning can be unlocked, and organizations can free themselves from being lost in data.
                    </span>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="home-page__usecases__tabpanel" selectedClassName="home-page__usecases__tabpanel--selected">
                  <div className="home-page__usecases__tabpanel__container">
                    <div className="home-page__usecases__tabpanel__img home-page__usecases__tabpanel__img--scaled">
                      <img src="/assets/img/security.png" alt="Security" />
                    </div>
                    <div className="home-page__usecases__tabpanel__text">
                      <span className="home-page__usecases__tabpanel__text__title">
                        Security
                    </span>
                      <span className="home-page__usecases__tabpanel__text__content">
                        As technology permeates deeper into every aspect of our lives—with constant digital footprints and interconnected devices proliferating—the growth in potential damage and disruption from bad actors grows. Grakn allows firms to leverage their digital defences against increasingly sophisticated cyber criminals.
                    </span>
                    </div>
                  </div>
                </TabPanel>

                <TabList className="home-page__usecases__tablist">
                  <Tab className="home-page__usecases__tablist__item" selectedClassName="home-page__usecases__tablist__item--selected">
                    <img src="/assets/svg/services.svg" alt="services" />
                    <span className="home-page__usecase__tablist__item__text home-page__usecase__tablist__item__text--services">Financial Services</span>
                  </Tab>
                  <Tab className="home-page__usecases__tablist__item" selectedClassName="home-page__usecases__tablist__item--selected">
                    <img src="/assets/svg/science.svg" alt="science" />
                    <span className="home-page__usecase__tablist__item__text home-page__usecase__tablist__item__text--science">Health & Life Science</span>
                  </Tab>
                  <Tab className="home-page__usecases__tablist__item" selectedClassName="home-page__usecases__tablist__item--selected">
                    <img src="/assets/svg/bot-tab.svg" alt="bots" />
                    <span className="home-page__usecase__tablist__item__text home-page__usecase__tablist__item__text--bots">Intelligent Bots</span>
                  </Tab>
                  <Tab className="home-page__usecases__tablist__item" selectedClassName="home-page__usecases__tablist__item--selected">
                    <img src="/assets/svg/search.svg" alt="search" />
                    <span className="home-page__usecase__tablist__item__text home-page__usecase__tablist__item__text--search">Semantic Search</span>
                  </Tab>
                  <Tab className="home-page__usecases__tablist__item" selectedClassName="home-page__usecases__tablist__item--selected">
                    <img src="/assets/svg/security.svg" alt="security" />
                    <span className="home-page__usecase__tablist__item__text home-page__usecase__tablist__item__text--security">Security</span>
                  </Tab>
                </TabList>
              </Tabs>
            </div>
          </section>
          <Testimonials buttonCallback={this.switchSupportModal} />
          {
            /* Comment out to get the company logos component - remove this to get it working
              <CompanyLogos />
            */
          }
          <ContactFormModal pageTitle="Home" pageUri="https://grakn.ai" isOpen={this.state.supportModal} onClose={this.switchSupportModal} />
          <section className="home-page__world">
            <div className="home-page__world__container container section__container">
              <span className="home-page__world__headline">THE WORLD NEEDS TO <strong>GRAKN</strong></span>
              <Link to="/community" className="home__world__link"
                onClick={() => {
                  ReactGA.initialize('UA-72414051-1');
                  ReactGA.event({
                    category: 'Home_Map_LearnMore_CommunityPage',
                    action: 'Button Click',
                  });
                }}
              >Join Grakn engineers around the world</Link>
            </div>
          </section>
        </div>
      </TrackedPage>
    );
  }
}

const mapStateToProps = (state) => (
  {
    downloads: state.downloads.items,
    deployment: state.deployment.items,
  }
);
export default connect(mapStateToProps)(HomePage);
