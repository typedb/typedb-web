import React, { Component } from 'react';
import SupportForm from 'components/SupportForm';

const zenscroll = require('zenscroll');
const graknRoutes = require('config/graknRoutes');

const languageDrivers = [
  {
    url: 'http://dev.grakn.ai/docs/java-library/setup',
    name: 'Grakn-java',
    img: '/assets/svg/java-logo.svg'
  },
  {
    url: 'https://github.com/graknlabs/grakn-python',
    name: 'Grakn-python',
    img: '/assets/svg/python-logo.svg'
  },
  {
    url: 'https://github.com/graknlabs/grakn-node',
    name: 'Grakn-node',
    img: '/assets/svg/nodejs-logo.svg'
  }
];

class DownloadCenterPage extends Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this);
  }

  scroll() {
    zenscroll.intoView(this.supportform);
  }

  render() {
    return (
      <div className="downloads">
      <section className="downloads__splash">
        <div className="downloads__splash__container container section__container">
          <div className="downloads__splash__text">
            <h1 className="downloads__splash__text__header"><strong>Grakn Download Centre</strong></h1>
          </div>
          </div>
      </section>
      <section className="downloads__language">
          <div className="downloads__language__container container section__container">
            <span className="downloads__language__headline home__header">
            Develop with <strong>Grakn</strong>,<br />in a language of <strong>your choice</strong>
            </span>
            <div className="downloads__language__items--desktop">
              <div className="downloads__language__items--desktop__row">
              {
                languageDrivers.map((item, index) => {
                  return (
                    <a href={item.url} className="downloads__language__items__item" key={`${index}--language--driver`}
                    >
                      <img src={item.img} alt={item.name} />
                    </a>
                  )
                })
              }
              </div>
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
        <section className="support-form__section" ref={(elem) => this.supportform = elem}>
          <div className="support-form__section__container container section__container">
            <span className="support-form__section__header support-form__section__header--with-tag">Get your Grakn!</span>
            <span className="support-form__section__tag">Get your Grakn commercial licenses and we’ll help you quickly get up to speed.</span>
            <SupportForm />
          </div>
        </section>
      </div>
    )
  }
}

export default DownloadCenterPage;