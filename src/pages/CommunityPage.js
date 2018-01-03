import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newsletter } from 'actions/invitations';

const graknRoutes = require('config/graknRoutes');

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
  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  render() {
    return (
      <div className="community">
        <section className="community__splash">
          <div className="community__splash__container container section__container">
            <span>Get in <strong>touch</strong> with Grakn developers and community</span>
            <div className="community__splash__form">
              <span className="community__splash__form__header">Subscribe to our newsletter</span>
              <span className="community__splash__form__tag">Stay updated with our community news and development releases!</span>
              <input type="text" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e.target.value)}/>              
              <input type="text" placeholder="First Name" value={this.state.name} onChange={(e) => this.handleChange('name', e.target.value)}/>              
              <input type="text" placeholder="Last Name" value={this.state.surname} onChange={(e) => this.handleChange('surname', e.target.value)}/>
              <button className="button--red" onClick={() => this.props.onSubmitNewsletter(this.state)}>Subscribe</button>             
            </div>
          </div>
        </section>
        <section className="community__content">
          <div className="container section__container">
            <div className="community__content__links">
              <div className="community__content__links__col">
                <div className="community__content__links__col__item">
                  <span className="community__content__links__col__item__header"><img src="/assets/svg/slack-mark.svg" alt="Slack"/>Talk to us on Slack</span>
                  <span className="community__content__links__col__item__text">
                  We’d love to help you get up to speed with Grakn. Get in touch with the team and community on our <Link to="/slack" className="animated__link animated__link--purple">Slack Channel</Link>
                  </span>                  
                </div>
                <div className="community__content__links__col__item">
                  <span className="community__content__links__col__item__header">
                  <i className="fa fa-github" aria-hidden={true} />
                  Get involved on GitHub
                  </span>
                  <span className="community__content__links__col__item__text">
                  Report a bug, request new features, submit a patch and follow our development on our <a href={graknRoutes.github} target="_blank" className="animated__link animated__link--purple">GitHub Repository</a>
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
                  When you’re stuck on a problem, often the most effective remedy is to collaborate. Ask your question on <a href={graknRoutes.stack} target="_blank" className="animated__link animated__link--purple">Stackoverflow</a> or discuss your problem in our <a href={graknRoutes.discuss} className="animated__link animated__link--purple">Discussion Forum</a>.
                  </span>                  
                </div>
                <div className=" community__content__links__row__col community__content__links__col__item">
                  <span className="community__content__links__col__item__header">
                  <i className="fa fa-facebook" aria-hidden={true} />
                  Join our Facebook Group                  
                  </span>
                  <span className="community__content__links__col__item__text">
                  We love to stay up to date with things happening within our community. Join our <a href={graknRoutes.facebook} target="_blank" className="animated__link animated__link--purple">Facebook Group</a> and meet the rest of our community members.
                  </span>                  
                </div>
                <div className="community__content__links__row__col community__content__links__col__item">
                  <span className="community__content__links__col__item__header">
                  <img src="/assets/svg/bot.svg" alt="Grakn" />
                  Build with Grakn                  
                  </span>
                  <span className="community__content__links__col__item__text">
                  We have a growing list of project ideas. If you need inspiration and want to build something cool, take a look at our <a href="https://dev.grakn.ai/documentation/examples/projects.html" target="_blank" className="animated__link animated__link--purple">suggestions</a> or send us your own ideas via the <a href={graknRoutes.github} target="_blank" className="animated__link animated__link--purple">Discussion Forum.</a>
                  </span>                  
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="community__fancy">
          <div className="community__fancy__container container section__container">
            <div className="community__fancy__item">
              <span className="community__fancy__item__header community__fancy__item__header--green">Join our Meetups!</span>
              <span className="community__fancy__item__text">
              Learn how graph technologies could help you work more intelligently with highly interconnected data. We will talk about best practices in complex data modelling, graph visualisation, graph analytics, graph deployments in the cloud, as well as their applications for intelligent systems and AI applications. Join our <a href={graknRoutes.meetups} className="animated__link animated__link--purple">meetups</a>.
              </span>
            </div>
            <div className="community__fancy__item">
              <span className="community__fancy__item__header community__fancy__item__header--purple">Become a Graqler!</span>
              <span className="community__fancy__item__text">
              For every application you develop with Grakn, if you share its story with us, you'll get a free t-shirt and GRAKN.AI stickers. If you blog/host it online, we'll send you our hoodie too!              </span>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onSubmitNewsletter: (obj) => dispatch(newsletter(obj))
  }
)

export default connect(null, mapDispatchToProps)(CommunityPage);