import React from 'react';
const teamInfo = require('config/teamInfo').team;

const AboutPage = () => (
  <div className="about">
    <section className="about__splash">
      <div className="container section__container">
        <span className="about__splash__text">GRAKN.AI will be the de facto database for AI and Cognitive Systems</span>
      </div>      
    </section>
    <section className="about__team">
      <div className="container section__container">
          <span className="about__team__header">Team</span>
          <div className="about__team__text">
            <span className="about__team__text__col1">Grakn enables machines to manage complex data that serves as a knowledge base for AI and Cognitive systems. With GRAKN.AI, machines are able to infer hidden knowledge that is too complex for human cognition to uncover. Five years from now, GRAKN.AI will be de facto data platform for building AI and Cognitive systems.We're a team with big ambitions, and our competitions are fierce. However, no database solution addresses the problem of data complexity as we do.</span>
            <span className="about__team__text__col2">We're a growing team of talented engineers and technology entrepreneurs based in London. Our team members come from diverse and accomplished backgrounds, from various countries and many different walks of life. Our skills span across Finance, Computer Science, Engineering, Computational Neurodynamics, Machine Learning, Scientific Computing, Applied Mathematics, Optimisation, Knowledge Representation and Automated Reasoning.</span>
          </div>
      </div>      
    </section>
    <section className="about__members">
      <div className="container section__container">
        <div className="multi-resize-column">
          {
            teamInfo.map((member, index) => {
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
);

export default AboutPage;
