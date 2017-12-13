import React from 'react';
import PagingComponent from './PagingComponent';

const testimonials = [
  {name: 'Michael Bishop', company: 'CTO, Alpha Vertex', img: '/assets/img/bishop.jpg', review: '“Grakn significantly streamlines our knowledge engineering process. Grakn’s expressive schema allows us to verify the logical consistency of patterns detected by our learning algorithms and improve accuracy”'},
  {name: 'Radouane Oudrhiri', company: 'CTO, Eagle Genomics', img: '/assets/img/oudrhiri.jpg', review: '“Grakn\'s query language, Graql, should be the de facto language for any graph representation because of two things: the semantic expressiveness of the language and the optimisation of query execution.”'},
  {name: 'Gunnar Kleemann', company: 'Co-Founder, Berkeley Data Science Group', img: '/assets/img/gunnar.jpg', review: '“When working with network structures, such as gene networks, interactions between objects are complex and nuanced. Grakn interprets these structures natively, and allow us to discover novel answers very quickly”'},
];

const Testimonials = () => (
  <section className="testimonials">
    <div className="testimonials__container container section__container">
      <div className="testimonials__header">
        <img className="testimonials__headerimg" src="/assets/svg/testimonials.svg" alt="testimonials" />
        <span className="home__header">
          Building on the shoulders of <strong>Grakn</strong>
        </span>
      </div>
      <PagingComponent className="testimonials__items">
        {
          testimonials.map((item, index) => {
            return (
              <div className="testimonials__item" key={`${index}__testimonals`}>
                <div className="testimonials__item__text">{item.review}</div>
                <div className="testimonials__item__details">
                  <div className="testimonials__item__details__img"><img src={item.img} alt={`${item.name}'s picture`} /></div>
                  <div className="testimonials__item__details__text">
                    <span>{item.name}</span>
                    <span>{item.company}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </PagingComponent>
      <a href="mailto:enterprise@grakn.ai" className="button button--red">Get in touch with our team</a>
    </div>
  </section>
);

export default Testimonials;