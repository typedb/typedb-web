import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const graknRoutes = require('config/graknRoutes');
console.log(graknRoutes);
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
  handleChange() {
    console.log("not implemented");
  }
  render() {
    return (
      <div className="community">
        <section className="community__splash">
          <div className="community__splash__container container section__container">
            <span>Get in touch with Grakn developers and community</span>
          </div>
        </section>
        <section className="community__content">
          <div className="container section__container">
            <span className="community__content__header">Subscribe to our newsletter</span>
            <div className="community__content__form">
              <span>Stay updated with our community news and development releases!</span>
              <input type="text" defaultValue="Email" />              
              <input type="text" defaultValue="First Name" />              
              <input type="text" defaultValue="Last Name" />
              <button className="button--red" onClick={() => console.log('newsletter')}>Subscribe</button>             
            </div>
            <div className="community__content__links">
              <div className="community__content__links__col">
                <div className="community__content__links__col__item">
                  <span className="community__content__links__col__item__header">Talk to us on Slack</span>
                  <span className="community__content__links__col__item__text">
                  We’d love to help you get up to speed with Grakn. Get in touch with the team and community on our <Link to="/slack">Slack Channel</Link>
                  </span>                  
                </div>
                <div className="community__content__links__col__item">
                  <span className="community__content__links__col__item__header">Get involved on GitHub
                  </span>
                  <span className="community__content__links__col__item__text">
                  Report a bug, request new features, submit a patch and follow our development on our <a href={graknRoutes.github} target="_blank">GitHub Repository</a>
                  </span>                  
                </div>
                <div className="community__content__links__col__item">
                  <span className="community__content__links__col__item__header">Start a discussion                  
                  </span>
                  <span className="community__content__links__col__item__text">
                  When you’re stuck on a problem, often the most effective remedy is to collaborate. Ask your question on <a href={graknRoutes.stack} target="_blank">Stackoverflow</a> or discuss your problem in our <a href={graknRoutes.discuss} target="_blank">Discussion Forum</a>.
                  </span>                  
                </div>
                <div className="community__content__links__col__item">
                  <span className="community__content__links__col__item__header">Join our Facebook Group                  
                  </span>
                  <span className="community__content__links__col__item__text">
                  We love to stay up to date with things happening within our community. Join our <a href={graknRoutes.facebook} target="_blank">Facebook Group</a> and meet the rest of our community members.
                  </span>                  
                </div>
                <div className="community__content__links__col__item">
                  <span className="community__content__links__col__item__header">Build with Grakn                  
                  </span>
                  <span className="community__content__links__col__item__text">
                  We have a growing list of project ideas. If you need inspiration and want to build something cool, take a look at our <a href="https://docs.grakn.ai/documentation/examples/projects.html" target="_blank">suggestions</a> or send us your own ideas via the <a href={graknRoutes.github} target="_blank">Discussion Forum.</a>
                  </span>                  
                </div>
              </div>
              <div className="community__content__links__col">
                <div className="community__content__links__col__item">
                  <span className="community__content__links__col__item__header">Join our Meetups!</span>
                  <span className="community__content__links__col__item__text">
                  Learn how graph technologies could help you work more intelligently with highly interconnected data. We will talk about best practices in complex data modelling, graph visualisation, graph analytics, graph deployments in the cloud, as well as their applications for intelligent systems and AI applications. Join our <a href={graknRoutes.meetups} target="_blank">meetups</a>
                  </span>                  
                </div>
                <div className="community__content__links__col__item">
                  <span className="community__content__links__col__item__header">Become a Graqler!</span>
                  <span className="community__content__links__col__item__text">
                  For every application you develop with Grakn, if you share its story with us, you'll get a free t-shirt and GRAKN.AI stickers. If you blog/host it online, we'll send you our hoodie too!
                  </span>                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default CommunityPage;