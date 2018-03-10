import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTeam } from 'actions/team';

class AboutPage extends Component {

  componentDidMount() {
    this.props.onFetchTeam();
  }

  render() {
    return (
      <div className="about">
        <section className="about__splash">
          <div className="container section__container">
            <h1 className="about__splash__text">We enable the world to organise complex networks of data</h1>
          </div>
          <div className="about__splash__circle"><img src="/assets/svg/bot.svg" alt="grakn bot" /></div>
        </section>
        <section className="about__team">
          <div className="container section__container">
              <span className="about__team__header">Team</span>
              <div className="about__team__text">
                <span className="about__team__text__col1">Grakn enables the world to organise complex networks of data that serves as the knowledge foundation of intelligent systems. Grakn provides the knowledge engineering tools to turn rich datasets into a body of knowledge. Five years from now, Grakn will be de facto database for intelligent systems. We're a team with big ambitions, and our competitions are fierce. However, no database company tackles the problem of data complexity as we do.</span>
                <div className="about__team__text__divider">
                  <img src="/assets/svg/about-divider.svg" alt="Divider" />
                </div>
                <span className="about__team__text__col2">We're a growing team of talented engineers and technology entrepreneurs based in London. Our team members come from diverse and accomplished backgrounds, from various countries and many different walks of life. Our skills span across Finance, Computer Science, Engineering, Machine Learning, Physics, Scientific Computing, Applied Mathematics, Constraint Optimisation, Robotics, Knowledge Representation and Automated Reasoning.</span>
              </div>
          </div>
        </section>
        <section className="about__members">
          <div className="container section__container">
            <div className="multi-resize-column">
              {
                this.props.team.items.map((member, index) => {
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
        </section>
      </div>
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
