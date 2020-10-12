import React, { Component } from 'react';
import TrackedPage from './TrackedPage';
import { connect } from 'react-redux';
import { fetchCareers } from 'actions/careers';
import classNames from 'classnames';

const splitTwo = (arr) => {
  const leftEnd = Math.ceil(arr.length / 2);
  return ({
    left: arr.slice(0, leftEnd),
    right: arr.slice(leftEnd)
  });
}

class CareersPage extends Component {
  componentDidMount() {
    this.props.onFetchCareers();
  }

  render() {
    return (
      <TrackedPage pageTitle="Careers">
        <div className="careers">
          <section className="careers__splash">
            <div className="container section__container">
              <h1 className="careers__splash__text">Careers</h1>
            </div>
          </section>
          <section className="careers__intro">
            <div className="container section__container careers__intro__container">
              <div className="careers__intro__text">
                <span>Grakn Labs is a team of people driven by a purpose: to solve the world's most complex problems, through knowledge engineering. We are the inventors of the Grakn knowledge-base and the Graql query language. Our technology helps organisations in various industries, including Life Sciences, Defence & Security, Financial Services and Robotics, to build intelligent systems that we believe will change the world. From financial analytics to drug discovery, cyber threat detection to robotics disaster recovery, our technology empowers engineers around the world to tackle a higher order of complexity in knowledge, and solve the world's most complex problems.
                <br /> <br />
                In 2017, we were awarded Product of the Year by the University of Cambridge. After only a few years, our pioneering community has grown to 5K+ engineers, spread across 10+ countries around the globe -- and we're still counting. To continue pursuing this vision, we need to build a team of individuals who are not just the best and brightest in what they do, but also driven by a strong sense of purpose and compassion for the world.
                <br /> <br />
                If you would like to join our team​ for any of the positions below, submit your application through our <a href="https://apply.workable.com/grakn/" className="animated__link animated__link--purple" target="_blank">application portal</a> and tell us a little bit about yourself.
                </span>
            </div>
              <div className="careers__intro__img">
                <img src="/assets/svg/careers-intro.svg" alt="Careers intro" />
              </div>
            </div>
          </section>
          {
            this.props.careers.items.sort((a, b) => a.sort - b.sort).map((item, index) => {
              return (
                <section className="careers__job" key={`careers__job__${index}`}>
                  <div className="container section__container careers__job__container">
                    <div className="careers__job__logo">
                      <img src={item.logo} alt="Job Image" />
                    </div>
                    <span className="careers__job__title" style={{ color: item.maintheme }}>
                      {item.title}
                    </span>
                    <span className="careers__job__intro">
                      {item.intro}
                    </span>
                    <div className="careers__job__list">
                      {
                        item.responsibilities ?
                          <div className="careers__job__list__section">
                            <span className="careers__job__list__section__title">Responsibilities</span>
                            <div className="careers__job__list__section__items">
                              <div className="careers__job__list__section__items__col">
                                {
                                  item.responsibilities.split('\n').slice(0, Math.ceil(item.responsibilities.split('\n').length / 2)).map((listItem, listItemIndex) => {
                                    return (
                                      <div
                                        key={`careers__job__${item.title}__responsibilities__${listItemIndex}`}
                                        className="careers__job__list__section__items__col__item"
                                      >
                                        <i className="fa fa-check" aria-hidden={true} style={{ color: item.maintheme, backgroundColor: item.secondarytheme }} />
                                        <span>{listItem}</span>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div className="careers__job__list__section__items__col">
                                {
                                  item.responsibilities.split('\n').slice(Math.ceil(item.responsibilities.split('\n').length / 2)).map((listItem, listItemIndex) => {
                                    return (
                                      <div
                                        key={`careers__job__${item.title}__responsibilities__${listItemIndex}`}
                                        className="careers__job__list__section__items__col__item"
                                      >
                                        <i className="fa fa-check" aria-hidden={true} style={{ color: item.maintheme, backgroundColor: item.secondarytheme }} />
                                        <span>{listItem}</span>
                                      </div>)
                                  })
                                }
                              </div>
                            </div>
                          </div>
                          :
                          null
                      }
                      {
                        item.required ?
                          <div className="careers__job__list__section">
                            <span className="careers__job__list__section__title">Required Skills</span>
                            <div className="careers__job__list__section__items">
                              <div className="careers__job__list__section__items__col">
                                {
                                  item.required.split('\n').slice(0, Math.ceil(item.required.split('\n').length / 2)).map((listItem, listItemIndex) => {
                                    return (
                                      <div
                                        key={`careers__job__${item.title}__required__${listItemIndex}`}
                                        className="careers__job__list__section__items__col__item"
                                      >
                                        <i className="fa fa-check" aria-hidden={true} style={{ color: item.maintheme, backgroundColor: item.secondarytheme }} />
                                        <span>{listItem}</span>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div className="careers__job__list__section__items__col">
                                {
                                  item.required.split('\n').slice(Math.ceil(item.required.split('\n').length / 2)).map((listItem, listItemIndex) => {
                                    return (
                                      <div
                                        key={`careers__job__${item.title}__required__${listItemIndex}`}
                                        className="careers__job__list__section__items__col__item"
                                      >
                                        <i className="fa fa-check" aria-hidden={true} style={{ color: item.maintheme, backgroundColor: item.secondarytheme }} />
                                        <span>{listItem}</span>
                                      </div>)
                                  })
                                }
                              </div>
                            </div>
                          </div>
                          :
                          null
                      }
                      {
                        item.bonus ?
                          <div className="careers__job__list__section">
                            <span className="careers__job__list__section__title">Bonus Skills</span>
                            <div className="careers__job__list__section__items">
                              <div className="careers__job__list__section__items__col">
                                {
                                  item.bonus.split('\n').slice(0, Math.ceil(item.bonus.split('\n').length / 2)).map((listItem, listItemIndex) => {
                                    return (
                                      <div
                                        key={`careers__job__${item.title}__bonus__${listItemIndex}`}
                                        className="careers__job__list__section__items__col__item"
                                      >
                                        <i className="fa fa-check" aria-hidden={true} style={{ color: item.maintheme, backgroundColor: item.secondarytheme }} />
                                        <span>{listItem}</span>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div className="careers__job__list__section__items__col">
                                {
                                  item.bonus.split('\n').slice(Math.ceil(item.bonus.split('\n').length / 2)).map((listItem, listItemIndex) => {
                                    return (
                                      <div
                                        key={`careers__job__${item.title}__bonus__${listItemIndex}`}
                                        className="careers__job__list__section__items__col__item"
                                      >
                                        <i className="fa fa-check" aria-hidden={true} style={{ color: item.maintheme, backgroundColor: item.secondarytheme }} />
                                        <span>{listItem}</span>
                                      </div>)
                                  })
                                }
                              </div>
                            </div>
                          </div>
                          :
                          null
                      }
                    </div>
                  </div>
                </section>
              )
            })
          }
        </div>
      </TrackedPage>
    );
  }
}

const mapStateToProps = (state) => (
  {
    careers: state.careers
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    onFetchCareers: () => dispatch(fetchCareers()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CareersPage);
