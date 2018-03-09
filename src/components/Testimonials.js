import React from 'react';
import { Link } from 'react-router-dom';
import PagingComponent from 'components/PagingComponent';
import { connect } from 'react-redux';

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
const Testimonials = ({ buttonCallback, hidden, testimonials }) => (
  <section className="testimonials">
    <div className="testimonials__container container section__container">
      <div className="testimonials__header">
        <img className="testimonials__headerimg" src="/assets/svg/testimonials.svg" alt="testimonials" />
        <span className="home__header">
          Building on the shoulders of <strong>Grakn</strong>
        </span>
      </div>
      {
        testimonials.length > 0?
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
      :
      null
      }
      {
        renderButton(buttonCallback, hidden)
      }
    </div>
  </section>
);

const mapStateToProps = (state) => (
  {
    testimonials: state.testimonials.items
  }
)
export default connect(mapStateToProps, null)(Testimonials);