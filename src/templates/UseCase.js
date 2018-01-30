import React, { Component } from 'react';
import Testimonials from 'components/Testimonials';
import SupportFormModal from 'components/SupportFormModal';

class UseCase extends Component {
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
    const { title, img, text} = this.props;
    return (
      <div className="usecase-page">
        <section className="usecase-page__splash">
          <div className="usecase-page__splash__text">
            <h1 className="usecase-page__splash__text__header"><strong>Grakn helps</strong> every domain with complex networks of information </h1>
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
        <Testimonials buttonCallback={this.switchSupportModal} />
        <SupportFormModal isOpen={this.state.supportModal} onClose={this.switchSupportModal}/>
      </div>
    )
  }
}

export default UseCase;