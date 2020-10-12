import React, { Component } from 'react';

import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import PagingComponent from 'components/PagingComponent';
import ReactGA from 'react-ga';
import TrackedPage from './TrackedPage';
import api from 'api';
import { connect } from 'react-redux';
import { fetchEvents } from 'actions/events';
import { fetchMeetups } from 'actions/meetups';
import { sortBy } from 'lodash';
import validator from 'validator';
import events from './events';

const graknRoutes = require('config/graknRoutes');


const moment = require('moment');

const email = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="support-form__error">{value} is not a valid email.</span>;
  }
};
class CommunityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      subscriptionButtonLabel: 'Subscribe',
      subscribed: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.onGetEvents();
    this.props.onGetMeetups();
    console.log(this.props);
  }

  handleChange(key, val) {
    this.setState({
      [key]: val,
      subscriptionButtonLabel: "Subscribe",
      subscribed: false,
    });
  }

  onSubmitNewsletter() {
    const formValues = this.state;

    if (!validator.isEmail(formValues.email)) {
      this.setState({
        subscriptionButtonLabel: "Email is invalid!",
        subscribed: false,
      });
      return false;
    }

    if (!formValues.firstname.toString().trim().length || !formValues.lastname.toString().trim().length) {
      this.setState({
        subscriptionButtonLabel: "First Name & Last Name are required!",
        subscribed: false,
      });
      return false;
    }

    api.sendHubspot({
      ref: {
        targetFormId: "0e3ea363-5f45-44fe-b291-be815a1ca4fc",
        utk: Cookies.get('hubspotutk'),
        pageUri: 'https://grakn.ai/community',
        pageName: 'Community'
      },
      formFields: { ...formValues }
    }).then(() => {
      api.track({
        "utk": Cookies.get('hubspotutk'),
        "platform": "website",
        "action": "formSubmission",
        "subject": "newsletter",
        "subjectSpecific": {
          "pageTitle": "Community"
        }
      }).then(() => { Cookies.set(`known`, true); });
    });

    api.sendSupport({
      emailTitle: "New Newsletter Signup!",
      ...formValues
    });


    this.clearForm();
    this.setState({
      subscriptionButtonLabel: "Subscription was successful",
      subscribed: true,
    })
  }

  clearForm() {
    this.setState({
      firstname: "",
      lastname: "",
      email: ""
    })
  }

  render() {
    const today = moment();
    const upcomingEvents = events.filter(event => event.slots && event.slots.some(slot => slot.date >= Date.now())).map(event => {
      const updatedEvent = event;
      event.date = event.slots.sort((a, b) => a.date - b.date)[0].date
      // delete event.slots;
      return updatedEvent
    });

    console.log(upcomingEvents);
    // console.log(upcomingEventss);
    // const upcomingEvents = this.props.events.length > 0 ? this.props.events.filter(item => today.isSameOrBefore(item.date)) : []
    const pastEvents = this.props.events.length > 0 ? this.props.events.filter(item => today.isSameOrAfter(item.date)) : []

    return (
      <TrackedPage pageTitle="Community">
        <div className="community-page">
          <section className="community-page__splash">
            <div className="community-page__splash__container container section__container">
              <h1>Get in <strong>touch</strong> with Grakn developers and join our global community</h1>
              <div className="community-page__splash__form">
                <span className="community-page__splash__form__header">Subscribe to our newsletter</span>
                <span className="community-page__splash__form__tag">Stay updated with our community news and development releases!</span>
                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e.target.value)} />
                <input type="text" name="firstname" placeholder="First Name" value={this.state.firstname} onChange={(e) => this.handleChange('firstname', e.target.value)} />
                <input type="text" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={(e) => this.handleChange('lastname', e.target.value)} />
                <button className={"button--" + (this.state.subscribed ? "green" : "red")} onClick={() => this.onSubmitNewsletter()}>{this.state.subscriptionButtonLabel}</button>
                <span className="support-form__consent">By submitting your personal data, you consent to emails from Grakn. See our <Link to="/privacy-policy" className="animated__link animated__link--purple">Privacy Policy</Link></span>
              </div>
            </div>
          </section>
          <section className="community-page__content">
            <div className="container section__container">
              <div className="community-page__content__links">
                <div className="community-page__content__links__col">
                  <div className="community-page__content__links__col__item">
                    <span className="community-page__content__links__col__item__header"><img src="/assets/svg/discord-mark.svg" alt="Discord" style={{height: "38px", marginLeft: "-5px", paddingRight: "0.5rem"}}/>Talk to us on Discord</span>
                    <span className="community-page__content__links__col__item__text">
                      We’d love to help you get up to speed with Grakn. Get in touch with the team and community on <a href="https://grakn.ai/discord" className="animated__link animated__link--purple">Discord.</a>
                    </span>
                  </div>
                  <div className="community-page__content__links__col__item">
                    <span className="community-page__content__links__col__item__header">
                      <i className="fa fa-github" aria-hidden={true} />
                      Get involved on GitHub
                  </span>
                    <span className="community-page__content__links__col__item__text">
                      Report a bug, request new features, submit a patch and follow our development on our <a href={graknRoutes.github} target="_blank" className="animated__link animated__link--purple">GitHub Repository.</a>
                    </span>
                  </div>
                </div>
                <div className="community-page__content__links__row">
                  <div className="community-page__content__links__row__col community-page__content__links__col__item">
                    <span className="community-page__content__links__col__item__header">
                      <img src="/assets/svg/grakn-discussion.svg" alt="Discussion" />
                      Start a discussion
                  </span>
                    <span className="community-page__content__links__col__item__text">
                      When you’re stuck on a problem, often the most effective remedy is to collaborate. Ask your question on <a href={graknRoutes.stack} target="_blank" className="animated__link animated__link--purple">Stackoverflow</a> or discuss your problem in our <a href={graknRoutes.discuss} target="_blank" className="animated__link animated__link--purple">Discussion Forum</a>.
                  </span>
                  </div>
                  <div className=" community-page__content__links__row__col community-page__content__links__col__item">
                    <span className="community-page__content__links__col__item__header">
                      <i className="fa fa-comments" aria-hidden={true} />
                      Stay Connected
                  </span>
                    <span className="community-page__content__links__col__item__text">
                      Don't miss any Grakn moment! Connect with us online by following us on
                  <a href={graknRoutes.twitter} target="_blank" className="animated__link animated__link--purple"> Twitter </a>
                      and join our groups on
                  <a href={graknRoutes.facebook} target="_blank" className="animated__link animated__link--purple"> Facebook </a>
                      and
                  <a href={graknRoutes.linkedin} target="_blank" className="animated__link animated__link--purple"> LinkedIn</a>.
                  </span>
                  </div>
                  <div className="community-page__content__links__row__col community-page__content__links__col__item">
                    <span className="community-page__content__links__col__item__header">
                      {/* <img src="/assets/svg/bot.svg" alt="Grakn" /> */}
                      <i className="fa fa-file-text" aria-hidden={true} />
                      Share What You've Built
                  </span>
                    <span className="community-page__content__links__col__item__text">
                      Built something cool with Grakn? We'd love to share your project! Get in touch with us via <a href="mailto:info@grakn.ai" className="animated__link animated__link--purple">email</a> or <Link to="/discord" className="animated__link animated__link--purple">Discord</Link> to become a writer or speaker at our events and we'll spread the word about what you've built!
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="community-page__fancy">
            <div className="container community-page__fancy__container">
              <span className="kgms-page__features__header">
                Join Grakn engineers<br /> around the world
          </span>
            </div>
            {
              this.props.meetups.length > 0 ?
                <PagingComponent className="community-page__fancy__container container section__container">
                  {
                    this.props.meetups.sort((a, b) => a.sort - b.sort).map((item, index) => {
                      return (
                        <div className="community-page__fancy__item" key={`${index}__meetups`}>
                          <a href={item.link} target="_blank">
                            <img src={`https://cms.grakn.ai/${item.img.data.url}`} alt={item.name} />
                            <span>{item.name}</span>
                          </a>
                        </div>
                      )
                    })
                  }
                </PagingComponent>
                :
                null
            }
            <div className="container">
              <a href="mailto:community@grakn.ai?subject=We would like to start a new Meetup group" className="button button--transparent community-page__fancy__newlink"
                onClick={() => {
                  ReactGA.initialize('UA-72414051-1');
                  ReactGA.event({
                    category: 'Community_Meetups_StartNew_Mail',
                    action: 'Button Click',
                  });
                }}>Start a new group in your city!</a>
            </div>
          </section>
          <section className="community__events community__events--upcoming">
            <div className="community__events__container container section__container">
              <span className="kgms-page__features__header" style={{padding: '40px 0'}}>
                Upcoming Events
              </span>
              {
                upcomingEvents.length > 0 ?
                  <PagingComponent className="community-page__events__items">
                    {
                      sortBy(upcomingEvents, function (o) { return new moment(o.date).format('YYYYMMDD'); }).map((item, index) => {
                        return (
                          <a className="community-page__events__item" key={`${index}__events`} href={item.path} target="_blank">
                            <div className="community-page__events__item__img">
                              {
                                item.imageUrl ?
                                  <img src={item.imageUrl} alt="" />
                                  :
                                  <img src='/assets/img/logo.png' alt="" className="community__events__item__img--none" />
                              }
                            </div>
                            <div className="community-page__events__item__title">{item.title}</div>
                            <div className="community-page__events__item__description">{item.description}</div>
                            <div className="community-page__events__item__place"><strong>{moment(item.date).format("DD MMMM YYYY")}</strong></div>
                          </a>
                        )
                      })
                    }
                  </PagingComponent>
                  :
                  null
              }
            </div>
          </section>
          {/* <section className="community-page__events community-page__events--past">
            <div className="community-page__events__container container section__container">
              <span className="kgms-page__features__header">
                Past Events
          </span>
              {
                pastEvents.length > 0 ?
                  <PagingComponent className="community-page__events__items">
                    {
                      sortBy(pastEvents, function (o) { return new moment(o.date).format('YYYYMMDD'); }).reverse().map((item, index) => {
                        return (
                          <a className="community-page__events__item" key={`${index}__events`} href={item.link} target="_blank">
                            <div className="community-page__events__item__img">
                              {
                                item.img ?
                                  <img src={`https://cms.grakn.ai/${item.img.data.url}`} alt="" />
                                  :
                                  <img src='/assets/img/logo.png' alt="" className="community-page__events__item__img--none" />
                              }
                            </div>
                            <div className="community-page__events__item__title">{item.title}</div>
                            <div className="community-page__events__item__description">{item.description}</div>
                            <div className="community-page__events__item__place"><strong>{moment(item.date).format("DD MMMM YYYY")}:</strong> {item.address}, {item.city}, {item.country}</div>
                          </a>
                        )
                      })
                    }
                  </PagingComponent>
                  :
                  null
              }
            </div>
          </section> */}
        </div>
      </TrackedPage>
    )
  }
}

const mapStateToProps = (state) => (
  {
    events: state.events.items,
    meetups: state.meetups.items,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onGetEvents: () => dispatch(fetchEvents()),
    onGetMeetups: () => dispatch(fetchMeetups()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CommunityPage);
