import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SupportFormModal from 'components/SupportFormModal';
import ReactGA from 'react-ga';

class KBMSPage extends Component {
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
      <div className="kbms-page">
        <Helmet>
          {
            // Override Page Title
          }
          <title>Grakn KBMS | GRAKN.AI</title>
        </Helmet>
        <section className="kbms-page__splash">
          <div className="kbms-page__splash__container container section__container">
            <div className="kbms-page__splash__text">
              <h1 className="kbms-page__splash__text__header">Grakn Enterprise <strong>KBMS</strong><br /> and <strong>Workbase</strong></h1>
              <span className="kbms-page__splash__text__tag">
              Grakn Enterprise KBMS is the Knowledge Base Management System designed to scale with your enterprise, and Workbase is the visual platform to control everything from development to production
              </span>
            </div>
            </div>
          <img className="kbms-page__splash__kbms" src="/assets/img/kbms-preview.png" alt="KBMS Preview" />
        </section>
    
        <section className="kbms-page__info">
          <div className="kbms-page__info__container container section__container">
            <div className="kbms-page__info__item">
              <img src="/assets/svg/kbms-simplicity.svg" alt="Simplicity" />
              <span className="kbms-page__info__item__header">Simplicity</span>
              <span className="kbms-page__info__item__text">
              Simplify your system architecture by having Grakn take care of everything knowledge base related
              </span>
            </div>
            <div className="kbms-page__info__item">
              <img src="/assets/svg/kbms-scale.svg" alt="Scale" />
              <span className="kbms-page__info__item__header">Scale</span>
              <span className="kbms-page__info__item__text">
              Rest assured that Grakn’s knowledge base will scale with the growth of your data and system workload
              </span>
            </div>
            <div className="kbms-page__info__item">
              <img src="/assets/svg/kbms-control.svg" alt="Control" />
              <span className="kbms-page__info__item__header">Control</span>
              <span className="kbms-page__info__item__text">
              Develop and deploy your system with all the tools required to take you from development to production
              </span>
            </div>
          </div>
        </section>
    
        <section className="kbms-page__features">
          <div className="kbms-page__features__container container section__container">
            <span className="kbms-page__features__header">
            Simplify your data architecture and scale your knowledge base into production
            </span>
            <div className="kbms-page__features__col">
    
              <div className="kbms-page__features__col__item kbms-page__features__col__item--purple">
                <div className="kbms-page__features__col__item__img">
                <img src="/assets/svg/kbms-storage.svg" alt="Scalable Storage" />
                </div>
                <div className="kbms-page__features__col__item__details">
                  <span className="kbms-page__features__col__item__details__header">Scalabale Storage</span>
                  <div className="kbms-page__features__col__item__details__text">
                  A scalable system designed to be partitioned and replicated over a network of distributed machines
                  </div>
                </div>
              </div>

              <div className="kbms-page__features__col__item kbms-page__features__col__item--red">
              <div className="kbms-page__features__col__item__img">
              <img src="/assets/svg/kbms-cluster.svg" alt="Cluster Management" />
              </div>
              <div className="kbms-page__features__col__item__details">
                <span className="kbms-page__features__col__item__details__header">Cluster Management</span>
                <div className="kbms-page__features__col__item__details__text">
                Easily deploy and scale your database with tools that automate the provisioning of your cluster
                </div>
              </div>
            </div>

             { // <div className="kbms-page__features__col__item kbms-page__features__col__item--red">
              //   <div className="kbms-page__features__col__item__img">
              //     <img src="/assets/svg/kbms-schema.svg" alt="Extensible Schema" />
              //   </div>
              //   <div className="kbms-page__features__col__item__details">
              //     <span className="kbms-page__features__col__item__details__header">Extensible Schema</span>
              //     <div className="kbms-page__features__col__item__details__text">
              //     Schema definition can be updated and extended flexibly, during runtime, without any need for database migration              
              //     </div>
              //   </div>
              // </div>
              }
              <div className="kbms-page__features__col__item kbms-page__features__col__item--yellow">
                <div className="kbms-page__features__col__item__img">
                  <img src="/assets/svg/kbms-secured.svg" alt="Secured Authentication" />
                </div>
                <div className="kbms-page__features__col__item__details">
                  <span className="kbms-page__features__col__item__details__header">Secured Authentication</span>
                  <div className="kbms-page__features__col__item__details__text">
                  Ensuring only authenticated access and appropriately privileged users are allowed to access the database
                  </div>
                </div>
              </div>
              
              <div className="kbms-page__features__col__item kbms-page__features__col__item--green">
                <div className="kbms-page__features__col__item__img">
                <img src="/assets/svg/kbms-tools.svg" alt="Migration Tools" />
                </div>
                <div className="kbms-page__features__col__item__details">
                  <span className="kbms-page__features__col__item__details__header">Migration Tools</span>
                  <div className="kbms-page__features__col__item__details__text">
                  Tools to help migrate large datasets from various formats and database sources, easily and quickly
                  </div>
                </div>
              </div>

              {
                /* <div className="kbms-page__features__col__item kbms-page__features__col__item--green">
                <div className="kbms-page__features__col__item__img">
                <img src="/assets/svg/kbms-IDE.svg" alt="Dedicated IDE" />
                </div>
                <div className="kbms-page__features__col__item__details">
                  <span className="kbms-page__features__col__item__details__header">Dedicated IDE</span>
                  <div className="kbms-page__features__col__item__details__text">
                  An integrated development environment for knowledge engineering and modelling at scale              
                  </div>
                </div>
              </div> */
            }
            
            <div className="kbms-page__features__col__item kbms-page__features__col__item--blue">
              <div className="kbms-page__features__col__item__img">
              <img src="/assets/svg/kbms-search.svg" alt="Full-text Search" />
              </div>
              <div className="kbms-page__features__col__item__details">
                <span className="kbms-page__features__col__item__details__header">Full-text Search</span>
                <div className="kbms-page__features__col__item__details__text">
                Advanced full-text search capabilities, by enabling powerful string matching techniques over any body of text 
                </div>
              </div>
            </div>
    
            </div>
            <div className="kbms-page__features__col__divider">
              <img src="/assets/svg/kbms-divider.svg" alt="Divider" />
            </div>
            <div className="kbms-page__features__col">
            
            <div className="kbms-page__features__col__item kbms-page__features__col__item--purple">
                <div className="kbms-page__features__col__item__img">
                <img src="/assets/svg/kbms-elastic.svg" alt="Elastic Throughput" />
                </div>
                <div className="kbms-page__features__col__item__details">
                  <span className="kbms-page__features__col__item__details__header">Elastic Throughput</span>
                  <div className="kbms-page__features__col__item__details__text">
                  Read and write throughput scales linearly as new machines are added to the Grakn cluster, without any downtime
                  </div>
                </div>
              </div>
    
    
              <div className="kbms-page__features__col__item kbms-page__features__col__item--red">
                <div className="kbms-page__features__col__item__img">
                <img src="/assets/svg/kbms-performance.svg" alt="Performance Monitoring" />
                </div>
                <div className="kbms-page__features__col__item__details">
                  <span className="kbms-page__features__col__item__details__header">Performance Monitoring</span>
                  <div className="kbms-page__features__col__item__details__text">
                  Monitor your database performance in real-time through a dedicated and configurable dashboard
                  </div>
                </div>
              </div>

              <div className="kbms-page__features__col__item kbms-page__features__col__item--yellow">
                <div className="kbms-page__features__col__item__img">
                <img src="/assets/svg/kbms-access.svg" alt="Custom Access" />
                </div>
                <div className="kbms-page__features__col__item__details">
                  <span className="kbms-page__features__col__item__details__header">Custom Access Rights</span>
                  <div className="kbms-page__features__col__item__details__text">
                  Granular restrictions on user access rights to different groups of datasets within the database, as defined by the schema                   </div>
                </div>
              </div>

              <div className="kbms-page__features__col__item kbms-page__features__col__item--green">
                <div className="kbms-page__features__col__item__img">
                <img src="/assets/svg/kbms-backup.svg" alt="Backup" />
                </div>
                <div className="kbms-page__features__col__item__details">
                  <span className="kbms-page__features__col__item__details__header">Backup and Recovery</span>
                  <div className="kbms-page__features__col__item__details__text">
                  Protect your database from data loss through automatic periodic backups and reconstruction tools 
                  </div>
                </div>
              </div>
    
    
              <div className="kbms-page__features__col__item kbms-page__features__col__item--blue">
                <div className="kbms-page__features__col__item__img">
                <img src="/assets/svg/kbms-enterprise.svg" alt="Enterprise Grade Support" />
                </div>
                <div className="kbms-page__features__col__item__details">
                  <span className="kbms-page__features__col__item__details__header">Enterprise Grade Support</span>
                  <div className="kbms-page__features__col__item__details__text">
                  Access to advance support SLA with faster response time and problem resolution. <Link to="/support" className="animated__link animated__link--purple">Learn more</Link>
                  </div>
                </div>
              </div>
    
            </div>
            <div className="kbms-page__features__buttons">
              <Link className="button button--red" to={{pathname: "/download", hash:'#kbms'}} onClick={() => {
                ReactGA.initialize('UA-72414051-1');
                ReactGA.event({
                  category: 'KBMS_Features_GET_KBMSPage',
                  action: 'Button Click',
                });
              }}>Get KBMS / Workbase</Link>
              <Link to="/deployment" className="button button--transparent"
              onClick={() => {
                ReactGA.initialize('UA-72414051-1');
                ReactGA.event({
                  category: 'KBMS_Features_Cloud_DeploymentPage',
                  action: 'Button Click',
                });
              }}>Cloud Deployment</Link>
            </div>
          </div>
        </section>
        <SupportFormModal isOpen={this.state.supportModal} onClose={this.switchSupportModal}/>
      </div>
    );
  }
}

export default KBMSPage;