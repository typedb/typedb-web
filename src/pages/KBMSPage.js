import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
            {
              this.props.kbmsfeatures.length > 0?
              <div className="kbms-page__features__col">
                  {
                    this.props.kbmsfeatures.sort((a,b) => a.sort - b.sort).slice(0, Math.ceil(this.props.kbmsfeatures.length / 2) ).map((item, index) => {
                      const parentClass = classNames({
                        'kbms-page__features__col__item': true,
                        'kbms-page__features__col__item--purple': index == 0,
                        'kbms-page__features__col__item--red': index == 1,
                        'kbms-page__features__col__item--yellow': index == 2,
                        'kbms-page__features__col__item--green': index == 3,
                        'kbms-page__features__col__item--blue': index == 4,
                      });
                      return (
                        <div className={parentClass} key={`${item.name}__key__kbms`}>
                          <div className="kbms-page__features__col__item__img">
                          <img src={item.img} alt={item.name} />
                          </div>
                          <div className="kbms-page__features__col__item__details">
                            <span className="kbms-page__features__col__item__details__header">{item.name}</span>
                            <div className="kbms-page__features__col__item__details__text">
                            {item.description}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
              </div>
              :
              null
            }
            <div className="kbms-page__features__col__divider">
              <img src="/assets/svg/kbms-divider.svg" alt="Divider" />
            </div>
            {
              this.props.kbmsfeatures.length > 1?
              <div className="kbms-page__features__col">
              {
                this.props.kbmsfeatures.sort((a,b) => a.sort - b.sort).slice(Math.ceil(this.props.kbmsfeatures.length / 2) ).map((item, index) => {
                  const parentClass = classNames({
                    'kbms-page__features__col__item': true,
                    'kbms-page__features__col__item--purple': index == 0,
                    'kbms-page__features__col__item--red': index == 1,
                    'kbms-page__features__col__item--yellow': index == 2,
                    'kbms-page__features__col__item--green': index == 3,
                    'kbms-page__features__col__item--blue': index == 4,
                  });
                  return (
                    <div className={parentClass} key={`${item.name}__key__kbms`}>
                      <div className="kbms-page__features__col__item__img">
                      <img src={item.img} alt={item.name} />
                      </div>
                      <div className="kbms-page__features__col__item__details">
                        <span className="kbms-page__features__col__item__details__header">{item.name}</span>
                        <div className="kbms-page__features__col__item__details__text">
                        {item.description}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              </div>
              :
              null
            }        
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

const mapStateToProps = (state) => (
  {
    kbmsfeatures: state.kbmsfeatures.items
  }
)

export default connect(mapStateToProps)(KBMSPage);