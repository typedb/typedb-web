import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Testimonials from 'components/Testimonials';
import SupportForm from 'components/SupportForm';

const zenscroll = require('zenscroll');
const graknRoutes = require('config/graknRoutes');

const comparisson = [
  { item: 'Access to Grakn Community', advance: 'true', premium: 'true'},
  { item: 'Support hours', advance: '24x7', premium: '10x5'},
  { item: 'Response time', advance: '1 business day', premium: '1 business day'},
  { item: 'Urgent ticket SLA', advance: '1 hour', premium: '1 hour'},
  { item: 'Priority queueing', advance: 'true', premium: 'true'},
  { item: 'Direct access to our engineers', advance: 'true', premium: 'true'},
  { item: 'Release upgrades', advance: 'true', premium: 'true'},
  { item: 'Bug Patches', advance: 'true', premium: 'true'},
  { item: 'Hot fixes and bug escalation', advance: 'true', premium: 'false'},
  { item: 'Architecture and performance reviews', advance: 'true', premium: 'false'},
  { item: 'Migration and capacity Planning', advance: 'true', premium: 'false'},
  { item: 'Launch day assistance', advance: 'true', premium: 'false'}
];

class SupportPage extends Component {
  constructor(props) {
    super(props);
    this.renderTableMobile = this.renderTableMobile.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  renderTable() {
    return (
      <div className="support-page__comparisson__table">
        <div className="support-page__comparisson__table__header">
          <span className="support-page__comparisson__table__header__item support-page__comparisson__table__header__item--empty" />
          <span className="support-page__comparisson__table__header__item">Premium Support</span>
          <span className="support-page__comparisson__table__header__item">Advance Support</span>
        </div>
      {
        comparisson.map((elem, index) => {
          let premiumContent = '';
          let advanceContent = '';        
          if (elem.premium === 'true') {
            premiumContent = <i className="fa fa-check support-page__comparisson__table__row__item__green" />;
          }
          else if (elem.premium !== 'false') {
            premiumContent = elem.premium;
          }
          if (elem.advance === 'true') {
            advanceContent = <i className="fa fa-check support-page__comparisson__table__row__item__purple" />;
          }
          else if (elem.advance !== 'false') {
            advanceContent = elem.advance;
          }
          return (
            <div className="support-page__comparisson__table__row" key={`${elem.item}__table__desktop`}>
              <span className="support-page__comparisson__table__row__item">{elem.item}</span>
              <span className="support-page__comparisson__table__row__item">{premiumContent}</span>
              <span className="support-page__comparisson__table__row__item">{advanceContent}</span>
            </div>
          );
        })
      }
      </div>
    )
  }

  renderTableMobile()  {
    return (
      <div className="support-page__comparisson__table__mobile">
      {
        comparisson.map((elem, index) => {
          let premiumContent = '';
          let advanceContent = '';        
          if (elem.premium === 'true') {
            premiumContent = 'Yes';
          }
          else if (elem.premium !== 'false') {
            premiumContent = elem.premium;
          }
          if (elem.advance === 'true') {
            advanceContent = 'Yes';
          }
          else if (elem.advance !== 'false') {
            advanceContent = elem.advance;
          }
          return (
            <div className="support-page__comparisson__table__mobile__row" key={`${elem.item}__table__desktop`}>
              <span className="support-page__comparisson__table__mobile__row__item">{elem.item}</span>
              <div className="support-page__comparisson__table__mobile__row__item support-page__comparisson__table__mobile__row__item--split">
                <span>Premium Support</span>
                <span>{premiumContent}</span>
              </div>
              <div className="support-page__comparisson__table__mobile__row__item support-page__comparisson__table__mobile__row__item--split">
                <span>Advance Support</span>
                <span>{advanceContent}</span>
              </div>
            </div>
          );
        })
      }
      </div>
    );
  }

  scroll() {
    zenscroll.setup(1000, 50);
    zenscroll.to(this.supportform);   
  }

  render() {
    return (
      <div className="support-page">
        <section className="support-page__splash">
          <div className="support-page__splash__container container section__container">
            <div className="support-page__splash__text">
              <h1 className="support-page__splash__text__header">Focus on your <strong>business,</strong> not infrastructure</h1>
              <span className="support-page__splash__text__tag">From development to production, we’re with you every step of the way,  so you can focus on building your application and your business</span>
              <button className="button support-page__splash__text__button" onClick={() => this.scroll()}>Get help now</button>
            </div>
          </div>
        </section>
        <section className="support-page__features">
          <div className="support-page__features__container container section__container">
            <div className="support-page__features__item">
              <img src="/assets/svg/support_support.svg" className="support-page__features__item__img" alt="Grakn Support" />
              <span className="support-page__features__item__header">Grakn Support</span>
              <span className="support-page__features__item__text">
                We are committed to making sure your business succeeds. Whether your application is an emerging startup or a fortune 500 company, we got your back.
              </span>
            </div>
            <div className="support-page__features__item">
              <img src="/assets/svg/support_resources.svg" className="support-page__features__item__img" alt="Grakn Resources" />
              <span className="support-page__features__item__header">Resources</span>
              <span className="support-page__features__item__text">
              Engage with the Grakn <Link to="/community" className="animated__link animated__link--purple">community</Link> from around the world, and make sure you make the best of our <a href={graknRoutes.discuss} className="animated__link animated__link--purple">documentation portal</a> and the <a href={graknRoutes.discuss} className="animated__link animated__link--purple">discussion forum.</a>
              </span>
            </div>
            <div className="support-page__features__item">
              <img src="/assets/svg/support_services.svg" className="support-page__features__item__img" alt="Grakn Services" />
              <span className="support-page__features__item__header">Services</span>
              <span className="support-page__features__item__text">
              Extend your team by collaborating with our experienced knowledge engineers at Grakn Labs. We’re ready to help you in every way we can. <a href="" className="animated__link animated__link--purple support-page__features__item__link">Learn more</a>
              </span>
            </div>
          </div>
        </section>
        <section className="support-page__comparisson">
          <img src="/assets/img/support-curve.png" alt="support comparisson background" />
          <div className="support-page__comparisson__container container section__container">
            <span className="support-page__comparisson__header">Whatever stage and size of your company is, we got a support plan that fits your team</span>
            {this.renderTable()}
            {this.renderTableMobile()}
            <span className="button button--red" onClick={() => this.scroll()}>Contact sales to upgrade your support plan</span>
          </div>
        </section>
        <Testimonials buttonCallback={this.scroll}/>
        <section className="support-form__section" ref={(elem) => this.supportform = elem}>
          <div className="support-form__section__container container section__container">
            <span className="support-form__section__header">Get in touch with our team!</span>
            <SupportForm />
          </div>
        </section>
      </div>
    );
  }
}


export default SupportPage;
