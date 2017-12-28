import React from 'react';
import Testimonials from 'components/Testimonials';

const UseCase = ({ title, text, img }) => (
  <div className="usecase-page">
    <section className="usecase-page__splash">
      <div className="usecase-page__splash__text">
        <span className="usecase-page__splash__text__header"><strong>Grakn helps</strong> every domain with complex networks of information </span>
      </div>
    </section>
    <section className="usecase-page__info">
      <div className="usecase-page__info__container container section__container">
        <div className="usecase-page__info__details">
          <div className="usecase-page__info__details__header">
          {title}
          </div>
          <div className="usecase-page__info__details__text" dangerouslySetInnerHTML={{__html: text}} />
        </div>
        <div className="usecase-page__info__img">
          <img src={img} alt={title} />
        </div>
      </div>
    </section>
    <Testimonials />
  </div>
);

export default UseCase;