import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 'Enter Email'
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmailChange(e) {
    this.setState({
      input: e.target.value,
    });
  }
  handleSubmit() {
    this.props.onSubscribeSubmit(this.state.input);
  }
  render() {
    return (
      <div className="footer">
      <div className="container footer__container footer__social">
        <div className="footer__social__buttons">
          <a href="" target="_blank"><i className="fa fa-twitter" /></a>
          <a href="" target="_blank"><i className="fa fa-facebook-f" /></a>
          <a href="" target="_blank"><i className="fa fa-google-plus" /></a>
          <a href="" target="_blank"><i className="fa fa-linkedin" /></a>
          <a href="" target="_blank"><i className="fa fa-github" /></a>
        </div>
        <div className="footer__social__signup">
          <input type="text" value={this.state.input} onChange={(e) => this.handleEmailChange(e)}/>
          <button className="button--red" onClick={() => this.handleSubmit()}>Subscribe</button>
        </div>
      </div>
      <div className="container footer__container">
        <div className="footer__block">
          <div className="footer__block__header">GET IN TOUCH</div>
          <div className="footer__block__links">
            <Link to="/" className="footer__block__links--github">
              <img src="/assets/svg/github.svg" alt="github"/>
              <strong>Grakn 0.17</strong> on Github
            </Link>
            <Link to="/slack" className="footer__block__links--slack">
              <img src="/assets/svg/slack-mark.svg" alt="slack"/>        
              <strong>Grakn</strong> on Slack
            </Link>
            <Link to="/">
              <i className="fa fa-phone" aria-hidden="true" />
              Schedule a Call
            </Link>
            <div className="footer__block__links--address">
              <span> 
                <i className="fa fa-map-marker" aria-hidden="true" />
                Unit 22, 8 Hornsey Street
              </span>
              <span> London N7 8EG, UK </span>
              <a href="mailto:info@grakn.ai">info@grakn.ai</a>
            </div>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__block__header">GET STARTED</div>
          <div className="footer__block__links">
            <Link to="/">Product</Link>
            <Link to="/">Install</Link>
            <Link to="/">Quickstart</Link>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__block__header">RESOURCES</div>
          <div className="footer__block__links">
            <Link to="/">Documentation</Link>
            <Link to="/">Github</Link>
            <Link to="/">Javadocs</Link>
            <Link to="/">Community</Link>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__block__header">COMMUNITY</div>
          <div className="footer__block__links">
            <Link to="/">Discussion</Link>
            <Link to="/">Stackoverflow</Link>
            <Link to="/">Slack</Link>
            <Link to="/">Twitter</Link>
          </div>
        </div>
        <div className="footer__block">
          <div className="footer__block__header">COMPANY</div>
          <div className="footer__block__links">
            <Link to="/">Blog</Link>
            <Link to="/">Careers</Link>
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
    onSubscribeSubmit: (val) => dispatch(this.props.subscribeSubmit(val))
  }
)
export default Footer;