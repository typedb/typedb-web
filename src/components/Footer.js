import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newsletter } from 'actions/invitations';

const graknRoutes = require('config/graknRoutes');

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }
  handleEmailChange(e) {
    this.setState({
      input: e.target.value,
    });
  }
  render() {
    return (
      <div className="footer">
      <div className="container footer__container footer__social">
        <div className="footer__social__buttons">
          <a href={graknRoutes.twitter} target="_blank"><i className="fa fa-twitter" /></a>
          <a href={graknRoutes.facebook} target="_blank"><i className="fa fa-facebook-f" /></a>
          <a href={graknRoutes.linkedin} target="_blank"><i className="fa fa-linkedin" /></a>
          <a href={graknRoutes.github} target="_blank"><i className="fa fa-github" /></a>
        </div>
        <div className="footer__social__signup">
          <input type="text" value={this.state.input} onChange={(e) => this.handleEmailChange(e)} placeholder="Subscribe to our newsletter"/>
          <button className="button--red" onClick={() => this.props.onSubscribeSubmit({email: this.state.input})}>Subscribe</button>
        </div>
      </div>
      <div className="container footer__container">
        <div className="footer__block">
          <div className="footer__block__header">GET IN TOUCH</div>
          <div className="footer__block__links">
            <a href={graknRoutes.github} target="_blank" className="footer__block__links--github">
              <img src="/assets/svg/github.svg" alt="github"/>
              <strong>Grakn 1.0</strong> on Github
            </a>
            <Link to="/slack" className="footer__block__links--slack">
              <img src="/assets/svg/slack-mark.svg" alt="slack"/>        
              <strong>Grakn</strong> on Slack
            </Link>
            <a href="mailto:enterprise@grakn.ai">
              <i className="fa fa-phone" aria-hidden="true" />
              Get in touch
            </a>
            <div className="footer__block__links--address">
              <span> 
                <i className="fa fa-map-marker" aria-hidden="true" />
                Unit 22, 8 Hornsey St.
              </span>
              <span> London N7 8EG, UK </span>
              <a href="mailto:info@grakn.ai">info@grakn.ai</a>
            </div>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__block__header">DATABASE</div>
          <div className="footer__block__links">
            <Link to="/grakn">The Grakn</Link>
            <Link to="/kbms">The KBMS</Link>
            <a href={graknRoutes.quickstart}>Quickstart</a>
            <a href={graknRoutes.download}>Install</a>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__block__header">ENTERPRISE</div>
          <div className="footer__block__links">
            <Link to="/deployment">Deployment</Link>
            <Link to="/services">Services</Link>
            <Link to="/support">Support</Link>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__block__header">USE CASE</div>
          <div className="footer__block__links">
            <Link to="/usecase-bots">Intelligent Bots</Link>
            <Link to="/usecase-search">Semantic Search</Link>
            <Link to="/usecase-finance">Financial Services</Link>
            <Link to="/usecase-health">Life Sciences</Link>
            <Link to="/usecase-security">Security</Link>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__block__header">DEVELOPER</div>
          <div className="footer__block__links">
            <a href={graknRoutes.academy}>Academy</a>
            <a href={graknRoutes.docs}>Documentation</a>
            <Link to="/community">Community</Link>
            <a href={graknRoutes.discuss}>Discuss</a>
            <a href={graknRoutes.github}>Github</a>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__block__header">COMPANY</div>
          <div className="footer__block__links">
            <a href={graknRoutes.blog}>Blog</a>          
            <Link to="/careers">Careers</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onSubscribeSubmit: (obj) => dispatch(newsletter(obj))
  }
)
export default connect(null, mapDispatchToProps)(Footer);