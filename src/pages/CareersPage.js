import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCareers } from 'actions/careers';
import classNames from 'classnames';

const splitTwo = (arr) => {
  const leftEnd= Math.ceil(arr.length/2);
  return ({
    left: arr.slice(0,leftEnd),
    right: arr.slice(leftEnd)
  });
}

class CareersPage extends Component {
  componentDidMount() {
    this.props.onFetchCareers();
  }

  render() {
    return (
      <div className="careers">
        <section className="careers__splash">
          <div className="container section__container">
            <h1 className="careers__splash__text">Careers</h1>
          </div>
        </section>
        <section className="careers__intro">
          <div className="container section__container careers__intro__container">
            <div className="careers__intro__text">
            <span>Cognitive/Intelligent Systems consume data that are too complex for current databases to handle. GRAKN.AI is a hyper-relational database that allows you to perform knowledge engineering to manage this complexity. Through Knowledge Representation and Automated Reasoning techniques, Grakn provides the knowledge base foundation for these systems.
            <br /> <br />
            We're a team of talented engineers from world leading universities, and we're based in London. We've developed a distributed knowledge base that reasons over complex data in real-time and derives knowledge that is too complex for human cognition to uncover. Five years from now, we believe Grakn will be in the hands of every developer as a de facto database for building cognitive and intelligent systems.            </span>
            </div>
            <div className="careers__intro__img">
              <img src="/assets/svg/careers-intro.svg" alt="Careers intro" />
            </div>
          </div>
        </section>
        { 
          this.props.careers.items.sort((a,b) => a.sort - b.sort).map((item, index) => {
            return (
              <section className="careers__job" key={`careers__job__${index}`}>
                <div className="container section__container careers__job__container">
                  <div className="careers__job__logo">
                    <img src={item.logo} alt="Job Image" />
                  </div>
                  <span className="careers__job__title" style={{color: item.maintheme}}>
                    {item.title}
                  </span>
                  <span className="careers__job__intro">
                    {item.intro}
                  </span>
                  <div className="careers__job__list">
                  {
                    item.responsibilities?
                    <div className="careers__job__list__section">
                      <span className="careers__job__list__section__title">Responsibilities</span>
                      <div className="careers__job__list__section__items">
                        <div className="careers__job__list__section__items__col">
                          {
                            item.responsibilities.split('\n').slice(0, Math.ceil(item.responsibilities.split('\n').length/2)).map((listItem, listItemIndex) => {
                              return (
                                <div 
                                key={`careers__job__${item.title}__responsibilities__${listItemIndex}`} 
                                className="careers__job__list__section__items__col__item"
                                >
                                <i className="fa fa-check" aria-hidden={true} style={{color: item.maintheme, backgroundColor: item.secondarytheme}}/>
                                <span>{listItem}</span>
                                </div>
                              )
                            })
                          }
                        </div>
                        <div className="careers__job__list__section__items__col">
                          {
                            item.responsibilities.split('\n').slice(Math.ceil(item.responsibilities.split('\n').length/2)).map((listItem, listItemIndex) => {
                              return (
                                <div 
                                key={`careers__job__${item.title}__responsibilities__${listItemIndex}`} 
                                className="careers__job__list__section__items__col__item"
                                >
                                <i className="fa fa-check" aria-hidden={true} style={{color: item.maintheme, backgroundColor: item.secondarytheme}}/>
                                <span>{listItem}</span>
                                </div>                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                    :
                    null
                    }
                    {
                      item.required?
                      <div className="careers__job__list__section">
                        <span className="careers__job__list__section__title">Required Skills</span>
                        <div className="careers__job__list__section__items">
                          <div className="careers__job__list__section__items__col">
                            {
                              item.required.split('\n').slice(0, Math.ceil(item.required.split('\n').length/2)).map((listItem, listItemIndex) => {
                                return (
                                  <div 
                                  key={`careers__job__${item.title}__required__${listItemIndex}`} 
                                  className="careers__job__list__section__items__col__item"
                                  >
                                  <i className="fa fa-check" aria-hidden={true} style={{color: item.maintheme, backgroundColor: item.secondarytheme}}/>
                                  <span>{listItem}</span>
                                  </div>
                                )
                              })
                            }
                          </div>
                          <div className="careers__job__list__section__items__col">
                            {
                              item.required.split('\n').slice(Math.ceil(item.required.split('\n').length/2)).map((listItem, listItemIndex) => {
                                return (
                                  <div 
                                  key={`careers__job__${item.title}__required__${listItemIndex}`} 
                                  className="careers__job__list__section__items__col__item"
                                  >
                                  <i className="fa fa-check" aria-hidden={true} style={{color: item.maintheme, backgroundColor: item.secondarytheme}}/>
                                  <span>{listItem}</span>
                                  </div>                              )
                              })
                            }
                          </div>
                        </div>
                      </div>
                      :
                      null
                    }
                    {
                      item.bonus?
                      <div className="careers__job__list__section">
                        <span className="careers__job__list__section__title">Bonus Skills</span>
                        <div className="careers__job__list__section__items">
                          <div className="careers__job__list__section__items__col">
                            {
                              item.bonus.split('\n').slice(0, Math.ceil(item.bonus.split('\n').length/2)).map((listItem, listItemIndex) => {
                                return (
                                  <div 
                                  key={`careers__job__${item.title}__bonus__${listItemIndex}`} 
                                  className="careers__job__list__section__items__col__item"
                                  >
                                  <i className="fa fa-check" aria-hidden={true} style={{color: item.maintheme, backgroundColor: item.secondarytheme}}/>
                                  <span>{listItem}</span>
                                  </div>
                                )
                              })
                            }
                          </div>
                          <div className="careers__job__list__section__items__col">
                            {
                              item.bonus.split('\n').slice(Math.ceil(item.bonus.split('\n').length/2)).map((listItem, listItemIndex) => {
                                return (
                                  <div 
                                  key={`careers__job__${item.title}__bonus__${listItemIndex}`} 
                                  className="careers__job__list__section__items__col__item"
                                  >
                                  <i className="fa fa-check" aria-hidden={true} style={{color: item.maintheme, backgroundColor: item.secondarytheme}}/>
                                  <span>{listItem}</span>
                                  </div>                              )
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