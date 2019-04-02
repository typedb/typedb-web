import React, { Component } from 'react';
import TrackedPage from './TrackedPage';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SupportFormModal from 'components/SupportFormModal';
import ReactGA from 'react-ga';

class KGMSPage extends Component {
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
      <TrackedPage>
        <div className="kgms-page">
          <section className="kgms-page__splash">
            <div className="kgms-page__splash__container container section__container">
              <div className="kgms-page__splash__text">
                <h1 className="kgms-page__splash__text__header">Grakn Enterprise <strong>KGMS</strong><br /> and <strong>Workbase</strong></h1>
                <span className="kgms-page__splash__text__tag">
                  Grakn Enterprise KGMS is the Knowledge Graph Management System designed to scale with your enterprise, and Workbase is the visual platform to control everything from development to production
              </span>
              </div>
            </div>
            <img className="kgms-page__splash__kgms" src="/assets/img/workbase-preview.png" alt="KGMS Preview" />
          </section>

          <section className="kgms-page__info">
            <div className="kgms-page__info__container container section__container">
              <div className="kgms-page__info__item">
                <img src="/assets/svg/kgms-simplicity.svg" alt="Simplicity" />
                <span className="kgms-page__info__item__header">Simplicity</span>
                <span className="kgms-page__info__item__text">
                  Simplify your system architecture by having Grakn take care of everything knowledge graph related
              </span>
              </div>
              <div className="kgms-page__info__item">
                <img src="/assets/svg/kgms-scale.svg" alt="Scale" />
                <span className="kgms-page__info__item__header">Scale</span>
                <span className="kgms-page__info__item__text">
                  Rest assured that Grakn’s knowledge graph will scale with the growth of your data and system workload
              </span>
              </div>
              <div className="kgms-page__info__item">
                <img src="/assets/svg/kgms-control.svg" alt="Control" />
                <span className="kgms-page__info__item__header">Control</span>
                <span className="kgms-page__info__item__text">
                  Develop and deploy your system with all the tools required to take you from development to production
              </span>
              </div>
            </div>
          </section>

          <section className="kgms-page__features">
            <div className="kgms-page__features__container container section__container">
              <span className="kgms-page__features__header">
                Simplify your data architecture and scale your knowledge graph into production
            </span>
              {
                this.props.kgmsfeatures.length > 0 ?
                  <div className="kgms-page__features__col">
                    {
                      this.props.kgmsfeatures.sort((a, b) => a.sort - b.sort).slice(0, Math.ceil(this.props.kgmsfeatures.length / 2)).map((item, index) => {
                        const parentClass = classNames({
                          'kgms-page__features__col__item': true,
                          'kgms-page__features__col__item--purple': index == 0,
                          'kgms-page__features__col__item--red': index == 1,
                          'kgms-page__features__col__item--yellow': index == 2,
                          'kgms-page__features__col__item--green': index == 3,
                          'kgms-page__features__col__item--blue': index == 4,
                        });
                        return (
                          <div className={parentClass} key={`${item.name}__key__kgms`}>
                            <div className="kgms-page__features__col__item__img">
                              <img src={item.img} alt={item.name} />
                            </div>
                            <div className="kgms-page__features__col__item__details">
                              <span className="kgms-page__features__col__item__details__header">{item.name}</span>
                              <div className="kgms-page__features__col__item__details__text">
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
              <div className="kgms-page__features__col__divider">
                <img src="/assets/svg/kgms-divider.svg" alt="Divider" />
              </div>
              {
                this.props.kgmsfeatures.length > 1 ?
                  <div className="kgms-page__features__col">
                    {
                      this.props.kgmsfeatures.sort((a, b) => a.sort - b.sort).slice(Math.ceil(this.props.kgmsfeatures.length / 2)).map((item, index) => {
                        const parentClass = classNames({
                          'kgms-page__features__col__item': true,
                          'kgms-page__features__col__item--purple': index == 0,
                          'kgms-page__features__col__item--red': index == 1,
                          'kgms-page__features__col__item--yellow': index == 2,
                          'kgms-page__features__col__item--green': index == 3,
                          'kgms-page__features__col__item--blue': index == 4,
                        });
                        return (
                          <div className={parentClass} key={`${item.name}__key__kgms`}>
                            <div className="kgms-page__features__col__item__img">
                              <img src={item.img} alt={item.name} />
                            </div>
                            <div className="kgms-page__features__col__item__details">
                              <span className="kgms-page__features__col__item__details__header">{item.name}</span>
                              <div className="kgms-page__features__col__item__details__text">
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
              <div className="kgms-page__features__buttons">
                <Link className="button button--red" to={{ pathname: "/download", hash: '#kgms' }} onClick={() => {
                  ReactGA.initialize('UA-72414051-1');
                  ReactGA.event({
                    category: 'KGMS_Features_GET_KGMSPage',
                    action: 'Button Click',
                  });
                }}>Get KGMS / Workbase</Link>
                <Link to="/deployment" className="button button--transparent"
                  onClick={() => {
                    ReactGA.initialize('UA-72414051-1');
                    ReactGA.event({
                      category: 'KGMS_Features_Cloud_DeploymentPage',
                      action: 'Button Click',
                    });
                  }}>Cloud Deployment</Link>
              </div>
            </div>
          </section>
          <SupportFormModal isOpen={this.state.supportModal} onClose={this.switchSupportModal} />
        </div>
      </TrackedPage>
    );
  }
}

const mapStateToProps = (state) => (
  {
    kgmsfeatures: state.kgmsfeatures.items
  }
)

export default connect(mapStateToProps)(KGMSPage);
