import React from 'react';
import { Link } from 'react-router-dom';
import Testimonials from 'components/Testimonials';
import SupportForm from 'components/SupportForm';

const graknRoutes = require('config/graknRoutes');

const SupportPage = () => (
  <div className="support-page">
    <section className="support-page__splash">
      <div className="support-page__splash__container container section__container">
        <div className="support-page__splash__text">
          <span className="support-page__splash__text__header">Focus on your <strong>business,</strong> not infrastructure</span>
          <span className="support-page__splash__text__tag">From development to production, we’re with you every step of the way,  so you can focus on building your application and your business</span>
          <button className="button support-page__splash__text__button">Get help now</button>
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
          <a href="" className="animated__link animated__link--purple support-page__features__item__link">Learn more</a>          
        </div>
        <div className="support-page__features__item">
          <img src="/assets/svg/support_resources.svg" className="support-page__features__item__img" alt="Grakn Resources" />
          <span className="support-page__features__item__header">Resources</span>
          <span className="support-page__features__item__text">
          Engage with the Grakn <Link to="/community" className="animated__link animated__link--purple">community</Link> from around the world, and make sure you make the best of our <a href={graknRoutes.discuss} className="animated__link animated__link--purple">documentation portal</a> and the <a href={graknRoutes.discuss} className="animated__link animated__link--purple">discussion forum.</a>
          </span>
          <a href="" className="animated__link animated__link--purple support-page__features__item__link">Learn more</a>          
        </div>
        <div className="support-page__features__item">
          <img src="/assets/svg/support_services.svg" className="support-page__features__item__img" alt="Grakn Services" />
          <span className="support-page__features__item__header">Services</span>
          <span className="support-page__features__item__text">
          Extend your team by collaborating with our experienced knowledge engineers at Grakn Labs. We’re ready to help you in every way we can.
          </span>
          <a href="" className="animated__link animated__link--purple support-page__features__item__link">Learn more</a>
        </div>
      </div>
    </section>
    <Testimonials />
    <section className="services__support">
      <div className="services__support__container container section__container">
        <span className="services__support__header">Get in touch with our team!</span>
        <SupportForm />
      </div>
    </section>
  </div>
);

export default SupportPage;