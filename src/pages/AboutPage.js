import React, { Component } from 'react';
import TrackedPage from './TrackedPage';
import { connect } from 'react-redux';
import { fetchTeam } from 'actions/team';

class AboutPage extends Component {

  componentDidMount() {
    this.props.onFetchTeam();
  }

  render() {
    return (
      <TrackedPage>
        <div className="about">
          <section className="about__splash">
            <div className="container section__container">
              <h1 className="about__splash__text">We push the boundary of intelligent systems one step forward</h1>
            </div>
            <div className="about__splash__circle"><img src="/assets/svg/bot.svg" alt="grakn bot" /></div>
          </section>
          <section className="about__team">
            <div className="container section__container">
                <span className="about__team__header">About Us</span>
                <div className="about__team__text">
                  <span className="about__team__text__col1">Grakn enables the world to organise complex networks of data that serves as the knowledge foundation of intelligent systems. Grakn provides the knowledge engineering tools to turn rich datasets into a body of knowledge, becoming the de facto database for intelligent systems. We're a team with big ambitions, and our competition is fierce. However, no database company tackles the problem of data complexity as we do.</span>
                  <div className="about__team__text__divider">
                    <img src="/assets/svg/about-divider.svg" alt="Divider" />
                  </div>
                  <span className="about__team__text__col2">We're a growing team of talented engineers and technology entrepreneurs based in London. Our team members come from diverse and accomplished backgrounds, from various countries and many different walks of life. Our skills span across Computer Science, Engineering, Machine Learning, Physics, Scientific Computing, Mathematics, Optimisation, Robotics, Knowledge Representation and Automated Reasoning.</span>
                </div>
            </div>
          </section>
          {/* <section className="about__members">
            <div className="container section__container">
              <span className="about__members__header">Core Team</span>
              <div className="multi-resize-column">
                {
                  this.props.team.items.sort((a,b) => a.sort - b.sort).map((member, index) => {
                    return (
                      <div className="about__members__item multi-resize-column__item" key={`${index}__about`}>
                        <img src={member.img} alt={`${member.name} image`} />
                        <a className="about__members__item__info" href={member.social} target="_blank">
                          <span className="about__members__item__info__name">{member.name}</span>
                          <span className="about__members__item__info__position">{member.position}</span>
                          <span className="about__members__item__info__education">{member.education}</span>
                        </a>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </section> */}
        </div>
      </TrackedPage>
    )
  }
}

const mapStateToProps = (state) => (
  {
    team: state.team
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onFetchTeam: () => dispatch(fetchTeam())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
