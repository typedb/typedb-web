import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import KBMSFeatures from 'components/KBMSFeatures';
import SupportForm from 'components/SupportForm';

class DeploymentPage extends Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this);
  }

  scroll() {
    this.supportform.scrollIntoView({behavior: 'smooth'});    
  }

  render() {
    return (
      <div className="deployment-page">
        <section className="deployment-page__splash">
          <div className="deployment-page__splash__container container section__container">
            <div className="deployment-page__splash__text">
              <span className="deployment-page__splash__text__header">Grakn KBMS in the <strong>Cloud</strong> and <strong>On-Premise</strong></span>
              <span className="deployment-page__splash__text__tag">Easily deploy and manage Grakn KBMS on one machine, or a thousand node cluster</span>
            </div>
          </div>
        </section>
        <section className="deployment-page__info">
          <div className="deployment-page__info__container container section__container">
            <div className="deployment-page__info__details">
              <div className="deployment-page__info__details__text">
              <strong>Grakn KBMS</strong> is the enterprise Knowledge Base Management System designed to scale with your enterprise. Whether you have a growing dataset, application workload, or user request, the Grakn KBMS will scale with your business. With all the tools you need to take you from development to production and scale, Grakn KBMS allows you to simplify your data architecture while maintaining full control over your knowledge base.
              </div>
              <Link to="/kbms" className="button button--transparent deployment-page__info__details__button">LEARN MORE ABOUT GRAKN KBMS</Link>
            </div>
            <div className="deployment-page__info__img">
              <img src="/assets/svg/deployment-info.svg" alt="Deployment Info" />
            </div>
          </div>
        </section>

        <section className="deployment-page__kbms">
          <img src="/assets/img/deployment-kbms-bg.png" alt="KBMS Background" />
          <div className="deployment-page__kbms__container container section__container">
            <KBMSFeatures />
            <div className="deployment-page__kbms__buttons">
              <a href="" className="button button--transparent">IN THE CLOUD</a>
              <a href="" className="button button--red">ON PREMISE</a>
            </div>
          </div>
        </section>

        <section className="deployment-page__coming">
          <div className="deployment-page__coming__container container section__container">
            <span className="deployment-page__coming__header"><strong>Grakn KBMS</strong> is Coming Soon!</span>
            <img src="assets/img/logo.png" alt="logo" />
            <span className="button button--red " onClick={() => this.scroll()}>Get in touch</span>                  
          </div>
        </section>

        <section className="support-form__section" ref={(elem) => this.supportform = elem}>
          <div className="support-form__section__container container section__container">
            <span className="support-form__section__header support-form__section__header--with-tag">Get Grakn KBMS for the cloud or on-premise</span>
            <span className="support-form__section__tag">Get in touch with our team for KBMS Enterprise License and we’ll help you get everything set up.</span>
            <SupportForm />
          </div>
        </section>
      </div>
    )
  }
}

export default DeploymentPage;