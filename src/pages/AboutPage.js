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
            <h1 className="about__splash__text">Enabling the world to organise complex networks of data and make it queryable</h1>
          </div>
          <div className="about__splash__circle"><img src="/assets/svg/bot.svg" alt="grakn bot" /></div>
        </section>
        <section className="about__team">
          <div className="container section__container">
              <span className="about__team__header">Team</span>
              <div className="about__team__text">
                <span className="about__team__text__col1">Grakn enables machines to manage complex data that serves as a knowledge graph for AI and Cognitive Systems. With GRAKN.AI, machines are able to infer hidden knowledge that is too complex for human cognition to uncover. Five years from now, GRAKN.AI will be de facto data platform for building AI and Cognitive systems. We're a team with big ambitions, and our competitions are fierce. However, no database solution addresses the problem of data complexity as we do.</span>
                <div className="about__team__text__divider">
                  <img src="/assets/svg/about-divider.svg" alt="Divider" />
                </div>
                <span className="about__team__text__col2">We're a growing team of talented engineers and technology entrepreneurs based in London. Our team members come from diverse and accomplished backgrounds, from various countries and many different walks of life. Our skills span across Finance, Computer Science, Engineering, Computational Neurodynamics, Machine Learning, Scientific Computing, Applied Mathematics, Optimisation, Knowledge Representation and Automated Reasoning.</span>
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
