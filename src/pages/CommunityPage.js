import React, { Component } from 'react';
import TrackedPage from './TrackedPage';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newsletter } from 'actions/invitations';
import { fetchEvents } from 'actions/events';
import { fetchMeetups } from 'actions/meetups';
import PagingComponent from 'components/PagingComponent';
const graknRoutes = require('config/graknRoutes');
import { sortBy } from 'lodash';
import ReactGA from 'react-ga';

const moment = require('moment');
class CommunityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.onGetEvents();
    this.props.onGetMeetups();
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  render() {
    const today = moment();
    const upcomingEvents = this.props.events.length > 0 ? this.props.events.filter(item => today.isSameOrBefore(item.date)) : []
    const pastEvents = this.props.events.length > 0 ? this.props.events.filter(item => today.isSameOrAfter(item.date)) : []

    return (
      <TrackedPage>
        <div className="community">
          <section className="community__splash">
            <div className="community__splash__container container section__container">
              <h1>Get in <strong>touch</strong> with Grakn developers and join our global community</h1>
              <div className="community__splash__form">
                <span className="community__splash__form__header">Subscribe to our newsletter</span>
                <span className="community__splash__form__tag">Stay updated with our community news and development releases!</span>
                <input type="text" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e.target.value)} />
                <input type="text" placeholder="First Name" value={this.state.name} onChange={(e) => this.handleChange('name', e.target.value)} />
                <input type="text" placeholder="Last Name" value={this.state.surname} onChange={(e) => this.handleChange('surname', e.target.value)} />
                <button className="button--red" onClick={() => this.props.onSubmitNewsletter(this.state)}>Subscribe</button>
                <span className="support-form__consent">By submitting your personal data, you consent to emails from Grakn. See our <Link to="/privacy-policy" className="animated__link animated__link--purple">Privacy Policy</Link></span>
              </div>
            </div>
          </section>
          <section className="community__content">
            <div className="container section__container">
              <div className="community__content__links">
                <div className="community__content__links__col">
                  <div className="community__content__links__col__item">
                    <span className="community__content__links__col__item__header"><img src="/assets/svg/slack-mark.svg" alt="Slack" />Talk to us on Slack</span>
                    <span className="community__content__links__col__item__text">
                      We’d love to help you get up to speed with Grakn. Get in touch with the team and community on our <Link to="/slack" className="animated__link animated__link--purple">Slack Channel.</Link>
                    </span>
                  </div>
                  <div className="community__content__links__col__item">
                    <span className="community__content__links__col__item__header">
                      <i className="fa fa-github" aria-hidden={true} />
                      Get involved on GitHub
                  </span>
                    <span className="community__content__links__col__item__text">
                      Report a bug, request new features, submit a patch and follow our development on our <a href={graknRoutes.github} target="_blank" className="animated__link animated__link--purple">GitHub Repository.</a>
                    </span>
                  </div>
                </div>
                <div className="community__content__links__row">
                  <div className="community__content__links__row__col community__content__links__col__item">
                    <span className="community__content__links__col__item__header">
                      <img src="/assets/svg/grakn-discussion.svg" alt="Discussion" />
                      Start a discussion
                  </span>
                    <span className="community__content__links__col__item__text">
                      When you’re stuck on a problem, often the most effective remedy is to collaborate. Ask your question on <a href={graknRoutes.stack} target="_blank" className="animated__link animated__link--purple">Stackoverflow</a> or discuss your problem in our <a href={graknRoutes.discuss} target="_blank" className="animated__link animated__link--purple">Discussion Forum</a>.
                  </span>
                  </div>
                  <div className=" community__content__links__row__col community__content__links__col__item">
                    <span className="community__content__links__col__item__header">
                      <i className="fa fa-comments" aria-hidden={true} />
                      Stay Connected
                  </span>
                    <span className="community__content__links__col__item__text">
                      Don't miss any Grakn moment! Connect with us online by following us on
                  <a href={graknRoutes.twitter} target="_blank" className="animated__link animated__link--purple"> Twitter </a>
                      and join our groups on
                  <a href={graknRoutes.facebook} target="_blank" className="animated__link animated__link--purple"> Facebook </a>
                      and
                  <a href={graknRoutes.linkedin} target="_blank" className="animated__link animated__link--purple"> LinkedIn</a>.
                  </span>
                  </div>
                  <div className="community__content__links__row__col community__content__links__col__item">
                    <span className="community__content__links__col__item__header">
                      {/* <img src="/assets/svg/bot.svg" alt="Grakn" /> */}
                      <i className="fa fa-file-text" aria-hidden={true} />
                      Share What You've Built
                  </span>
                    <span className="community__content__links__col__item__text">
                      Built something cool with Grakn? We'd love to share your project! Get in touch with us via <a href="mailto:info@grakn.ai" className="animated__link animated__link--purple">email</a> or <Link to="/slack" className="animated__link animated__link--purple">Slack</Link> to become a writer or speaker at our events and we'll spread the word about what you've built!
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="community__fancy">
            <div className="container community__fancy__container">
              <span className="kgms-page__features__header">
                Join Grakn engineers<br /> around the world
          </span>
            </div>
            {
              this.props.meetups.length > 0 ?
                <PagingComponent className="community__fancy__container container section__container">
                  {
                    this.props.meetups.sort((a, b) => a.sort - b.sort).map((item, index) => {
                      return (
                        <div className="community__fancy__item" key={`${index}__meetups`}>
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
              <a href="mailto:community@grakn.ai?subject=We would like to start a new Meetup group" className="button button--transparent community__fancy__newlink"
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
              <span className="kgms-page__features__header">
                Upcoming Events
          </span>
              {
                upcomingEvents.length > 0 ?
                  <PagingComponent className="community__events__items">
                    {
                      sortBy(upcomingEvents, function (o) { return new moment(o.date).format('YYYYMMDD'); }).map((item, index) => {
                        return (
                          <a className="community__events__item" key={`${index}__events`} href={item.link} target="_blank">
                            <div className="community__events__item__img">
                              {
                                item.img ?
                                  <img src={`https://cms.grakn.ai/${item.img.data.url}`} alt="" />
                                  :
                                  <img src='/assets/img/logo.png' alt="" className="community__events__item__img--none" />
                              }
                            </div>
                            <div className="community__events__item__title">{item.title}</div>
                            <div className="community__events__item__description">{item.description}</div>
                            <div className="community__events__item__place"><strong>{moment(item.date).format("DD MMMM YYYY")}:</strong> {item.address}, {item.city}, {item.country}</div>
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
          <section className="community__events community__events--past">
            <div className="community__events__container container section__container">
              <span className="kgms-page__features__header">
                Past Events
          </span>
              {
                pastEvents.length > 0 ?
                  <PagingComponent className="community__events__items">
                    {
                      sortBy(pastEvents, function (o) { return new moment(o.date).format('YYYYMMDD'); }).reverse().map((item, index) => {
                        return (
                          <a className="community__events__item" key={`${index}__events`} href={item.link} target="_blank">
                            <div className="community__events__item__img">
                              {
                                item.img ?
                                  <img src={`https://cms.grakn.ai/${item.img.data.url}`} alt="" />
                                  :
                                  <img src='/assets/img/logo.png' alt="" className="community__events__item__img--none" />
                              }
                            </div>
                            <div className="community__events__item__title">{item.title}</div>
                            <div className="community__events__item__description">{item.description}</div>
                            <div className="community__events__item__place"><strong>{moment(item.date).format("DD MMMM YYYY")}:</strong> {item.address}, {item.city}, {item.country}</div>
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
    onSubmitNewsletter: (obj) => dispatch(newsletter(obj)),
    onGetEvents: () => dispatch(fetchEvents()),
    onGetMeetups: () => dispatch(fetchMeetups()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CommunityPage);
