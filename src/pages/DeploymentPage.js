import React, { Component } from 'react';
import TrackedPage from './TrackedPage';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import KGMSFeatures from 'components/KGMSFeatures';
import SupportForm from 'components/SupportForm';
import ReactGA from 'react-ga';

const zenscroll = require('zenscroll');

class DeploymentPage extends Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this);
  }

  scroll() {
    zenscroll.setup(1000, 50);
    zenscroll.to(this.supportform);
  }

  render() {
    return (
      <TrackedPage>
        <div className="deployment-page">
          <section className="deployment-page__splash">
            <div className="deployment-page__splash__container container section__container">
              <div className="deployment-page__splash__text">
                <h1 className="deployment-page__splash__text__header">Grakn KGMS in the <strong>Cloud</strong> and <strong>On-Premise</strong></h1>
                <span className="deployment-page__splash__text__tag">Easily deploy and manage Grakn KGMS on one machine, or a thousand-node cluster</span>
              </div>
            </div>
          </section>
          <section className="deployment-page__info">
            <div className="deployment-page__info__container container section__container">
              <div className="deployment-page__info__details">
                <div className="deployment-page__info__details__text">
                  <strong>Grakn KGMS</strong> is the enterprise Knowledge Graph Management System designed to scale with your enterprise. Whether you have a growing dataset, application workload, or user request, Grakn KGMS will scale with your business. With all the tools you need to take you from development to production and scale, Grakn KGMS allows you to simplify your data architecture while maintaining full control over your knowledge graph.
              </div>
                <div className="deployment-page__info__details__buttons">
                  <Link to="/grakn-kgms" className="button button--red deployment-page__info__details__buttons__item" onClick={() => {
                    ReactGA.initialize('UA-72414051-1');
                    ReactGA.event({
                      category: 'Deployment_Info_LearnMore_KGMSPage',
                      action: 'Button Click',
                    });
                  }}>Learn about Grakn KGMS</Link>
                  <Link to={{ pathname: "/download", hash: '#kgms' }} className="button button--transparent deployment-page__info__details__button__item"
                    onClick={() => {
                      ReactGA.initialize('UA-72414051-1');
                      ReactGA.event({
                        category: 'Deployment_Info_OnPremise_DownloadPage',
                        action: 'Button Click',
                      });
                    }}>Get On-Premise</Link>
                </div>
              </div>
              <div className="deployment-page__info__img">
                <img src="/assets/svg/deployment-info.svg" alt="Deployment Info" />
              </div>
            </div>
          </section>

          <section className="deployment-page__kgms">
            <img src="/assets/img/deployment-kgms-bg.png" alt="KGMS Background" />
            <div className="deployment-page__kgms__container container section__container">
              <KGMSFeatures />
              <div className="deployment-page__kgms__buttons">
                <a href="" className="button button--transparent">IN THE CLOUD</a>
                <a href="" className="button button--red">ON PREMISE</a>
              </div>
            </div>
          </section>

          <section className="deployment-page__deploy">
            <div className="grakn-page__features__circle"><img src="/assets/svg/bot.svg" alt="grakn bot" /></div>
            <div className="deployment-page__deploy__container container section__container">
              <span className="deployment-page__deploy__header">Deploy <strong>Grakn KGMS</strong> in the Cloud today!</span>
              <span className="deployment-page__deploy__tag">Deploy Grakn KGMS on any of your favourite cloud provider and pay only for what you use with our simple and easy pricing model.
            Sign up below and learn more about each of the leading cloud providers.</span>
              {
                this.props.cloudproviders.length > 0 ?
                  <div className="deployment-page__deploy__col">{
                    this.props.cloudproviders.sort((a, b) => a.sort - b.sort).filter((item, index) => (index % 2 == 0)).map((item, index) => {
                      return (
                        <div className="deployment-page__deploy__col__item" key={`${item.name}__key__deployment`}>
                          <div className="deployment-page__deploy__col__item__img">
                            <img src={item.img} alt={item.name} />
                          </div>
                          <div className="deployment-page__deploy__col__item__details">
                            <span className="deployment-page__deploy__col__item__details__header">{item.name}</span>
                            <div className="deployment-page__deploy__col__item__details__text">
                              {item.description}
                            </div>
                          </div>
                          {item.available == 1 ?
                            <a href={item.link} target="_blank"><div className="deployment-page__deploy__col__item__deploy-button" style={{ backgroundColor: item.colour }}>DEPLOY</div></a>
                            :
                            <div className="deployment-page__deploy__col__item__deploy-button disabled"><span>COMING SOON</span></div>
                          }
                        </div>
                      )
                    })
                  }</div>
                  :
                  null
              }
              <div className="deployment-page__deploy__col__divider"></div>
              {
                this.props.cloudproviders.length > 0 ?
                  <div className="deployment-page__deploy__col">{
                    this.props.cloudproviders.sort((a, b) => a.sort - b.sort).filter((item, index) => (index % 2 !== 0)).map((item, index) => {
                      return (
                        <div className="deployment-page__deploy__col__item" key={`${item.name}__key__deployment`}>
                          <div className="deployment-page__deploy__col__item__img">
                            <img src={item.img} alt={item.name} />
                          </div>
                          <div className="deployment-page__deploy__col__item__details">
                            <span className="deployment-page__deploy__col__item__details__header">{item.name}</span>
                            <div className="deployment-page__deploy__col__item__details__text">
                              {item.description}
                            </div>
                          </div>
                          {item.available == 1 ?
                            <a href={item.link} target="_blank"><div className="deployment-page__deploy__col__item__deploy-button" style={{ backgroundColor: item.colour }}>DEPLOY</div></a>
                            :
                            <div className="deployment-page__deploy__col__item__deploy-button disabled"><span>COMING SOON</span></div>
                          }
                        </div>
                      )
                    })
                  }</div>
                  :
                  null
              }
              <span className="button button--red " onClick={() => this.scroll()}>Get in touch</span>
            </div>
          </section>

          <section className="support-form__section" ref={(elem) => this.supportform = elem}>
            <div className="support-form__section__container container section__container">
              <span className="support-form__section__header support-form__section__header--with-tag">Get Grakn KGMS for the cloud or on-premise</span>
              <span className="support-form__section__tag">Get in touch with our team and we'll help you get everything set up.</span>
              <SupportForm />
            </div>
          </section>
        </div>
      </TrackedPage>
    )
  }
}

const mapStateToProps = (state) => (
  {
    cloudproviders: state.cloudproviders.items
  }
)

export default connect(mapStateToProps)(DeploymentPage);