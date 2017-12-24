import React from 'react';
import { Link } from 'react-router-dom';
import PagingComponent from 'components/PagingComponent';

const testimonials = [
  {name: 'Michael Bishop', company: 'CTO, Alpha Vertex', img: '/assets/img/testimonials/bishop.jpg', review: '“Grakn significantly streamlines our knowledge engineering process. Grakn’s expressive schema allows us to verify the logical consistency of patterns detected by our learning algorithms and improve accuracy”'},
  {name: 'Radouane Oudrhiri', company: 'CTO, Eagle Genomics', img: '/assets/img/testimonials/oudrhiri.jpg', review: '“Grakn\'s query language, Graql, should be the de facto language for any graph representation because of two things: the semantic expressiveness of the language and the optimisation of query execution.”'},
  {name: 'Gunnar Kleemann', company: 'Co-Founder, Berkeley Data Science Group', img: '/assets/img/testimonials/gunnar.jpg', review: '“When working with network structures, such as gene networks, interactions between objects are complex and nuanced. Grakn interprets these structures natively, and allow us to discover novel answers very quickly”'},
  {name: 'Enzo Martoglio', company: 'AI Architect, Infosys', img: '/assets/img/testimonials/enzo.jpg', review: '“No business-centric implementation of AI can avoid having a knowledge base at its core. Grakn is one of the few companies developing this tool that any AI business solution will require.”'},
  {name: 'Samuel Pouyt', company: 'Software Architect, European Respiratory Society', img: '/assets/img/testimonials/samuel.jpg', review: '“Whether it is for content recommendation, managing GDPR or text classification, more I use GRAKN.AI, more I discover suited use cases. Power and simplicity make it an everyday tool.”'},
];

const renderButton = (buttonCallback, hidden ) => {
  if (hidden) {
    return null;
  }
  else if(buttonCallback) {
    return <span className="button button--red" onClick={() => buttonCallback()}>Get in touch with our team</span>
  }
  else {
    return <Link to="/support" className="button button--red">Get in touch with our team</Link>
  }
}
const Testimonials = ({ buttonCallback, hidden }) => (
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
      {
        renderButton(buttonCallback, hidden)
      }
    </div>
  </section>
);

export default Testimonials;