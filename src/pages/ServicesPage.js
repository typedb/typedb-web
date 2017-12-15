import React from 'react';
import Testimonials from 'components/Testimonials';
import SupportForm from 'components/SupportForm';

const ServicesPage = () => (
  <div className="services">
    <section className="services__splash">
      <div className="services__splash__container container section__container">
        <div className="services__splash__text">
          <span className="services__splash__text__header">From Zero to Hero</span>
          <span className="services__splash__text__tag">For every step of your knowledge engineering journey, we’re here to help you achieve your goals</span>
        </div>
      </div>
    </section>
    <section className="services__features">
      <div className="services__features__container container section__container">
       
        <div className="services__features__item">
          <div className="services__features__item__text">
            <span className="services__features__item__text__headline">Learning and Training</span>
            <span className="services__features__item__text__paragraph">
              Become a Grakn expert in a matter of days. With trainings worldwide, learn from experienced Grakn engineers to go from understanding project goals and development strategy, to engineering the most scalable knowledge base for you, your team, your business.
            </span>
            <div className="services__features__item__text__list">
              <div className="services__features__item__text__list__col">
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--green">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Hands-on development tutorials</span>
                </span>
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--green">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Dedicated knowledge engineer per course</span>
                </span>
              </div>
              <div className="services__features__item__text__list__col">
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--green">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>From install, configure to scale</span>
                </span>
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--green">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Basic and advanced knowledge engineering</span>
                </span>
              </div>
            </div>
            <a href="mailto:enterprise@grakn.ai" className="services__features__item__text__button button button--transparent ">Get in touch</a>                  
          </div>
          <div className="services__features__item__img">
            <img src="/assets/svg/learning.svg" alt="Services learning" />
          </div>
        </div>

        <div className="services__features__item">
          <div className="services__features__item__img">
            <img src="/assets/svg/knowledge.svg" alt="Knowledge" />
          </div>
          <div className="services__features__item__text">
            <span className="services__features__item__text__headline">Knowledge Modelling</span>
            <span className="services__features__item__text__paragraph">
            Good engineering starts with good architecture. Learn from our experienced engineers the best way to model and architect your knowledge base, following industry best practices. There is no domain too complex to model in Grakn, and we’ll help you achieve it.
            </span>
            <div className="services__features__item__text__list">
              <div className="services__features__item__text__list__col">
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--yellow">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Project architecture design</span>
                </span>
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--yellow">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Domain schema modelling</span>
                </span>
              </div>
              <div className="services__features__item__text__list__col">
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--yellow">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Database schema consolidation</span>
                </span>
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--yellow">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Expert schema review</span>
                </span>
              </div>
            </div>
            <a href="mailto:enterprise@grakn.ai" className="services__features__item__text__button button button--transparent ">Get in touch</a>                  
          </div>
        </div>

      </div>
    </section>
    <section className="services__features services__features--alternate">
      <div className="services__features__container container section__container">
       
        <div className="services__features__item">
          <div className="services__features__item__text">
            <span className="services__features__item__text__headline">Migration and Integration</span>
            <span className="services__features__item__text__paragraph">
            Migrating over from your current databases is not something to fear. The process can be smooth and painless, and we can help you with that. We can help integrate your data streams into your new Grakn knowledge base, no matter how big the throughput is.            
            </span>
            <div className="services__features__item__text__list">
              <div className="services__features__item__text__list__col">
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--red">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Migrate from any database</span>
                </span>
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--red">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Migrate from any data lake</span>
                </span>
              </div>
              <div className="services__features__item__text__list__col">
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--red">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Integrate data streams and pipeline</span>
                </span>
              </div>
            </div>
            <a href="mailto:enterprise@grakn.ai" className="services__features__item__text__button button button--transparent ">Get in touch</a>                  
          </div>
          <div className="services__features__item__img">
            <img src="/assets/svg/migration.svg" alt="Migration" />
          </div>
        </div>

        <div className="services__features__item">
          <div className="services__features__item__img">
            <img src="/assets/svg/APIs.svg" alt="Custom APIs" />
          </div>
          <div className="services__features__item__text">
            <span className="services__features__item__text__headline">Custom Development APIs</span>
            <span className="services__features__item__text__paragraph">
            You may want to use Grakn while developing with a specific programming language. You may want Grakn to output a specific data format. Or you may want to connect your system to Grakn using specific drivers. We can help you build these custom APIs so you can focus on building your application.
            </span>
            <div className="services__features__item__text__list">
              <div className="services__features__item__text__list__col">
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--blue">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Custom REST response formats</span>
                </span>
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--blue">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Custom input data interfaces</span>
                </span>
              </div>
              <div className="services__features__item__text__list__col">
                <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--blue">
                  <i className="fa fa-check" aria-hidden={true} />
                  <span>Programming language drivers</span>
                </span>
              </div>
            </div>
            <a href="mailto:enterprise@grakn.ai" className="services__features__item__text__button button button--transparent ">Get in touch</a>                  
          </div>
        </div>

      </div>
    </section>
    <section className="services__features services__features--single">
    <div className="services__features__container container section__container">
     
      <div className="services__features__item">
        <div className="services__features__item__text">
          <span className="services__features__item__text__headline">Deployment and Scaling</span>
          <span className="services__features__item__text__paragraph">
          As you focus building your application and your business, let us help you with deploying and scaling your infrastructure. Have our experienced engineers makes sure your infrastructure is state of the art, meets all your system requirements and scales as your company grows, as you launch your business into the future!
          </span>
          <div className="services__features__item__text__list">
            <div className="services__features__item__text__list__col">
              <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--light-blue">
                <i className="fa fa-check" aria-hidden={true} />
                <span>On-premise cluster deployment</span>
              </span>
              <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--light-blue">
                <i className="fa fa-check" aria-hidden={true} />
                <span>Cloud-based deployment</span>
              </span>
            </div>
            <div className="services__features__item__text__list__col">
              <span className="services__features__item__text__list__col__item services__features__item__text__list__col__item--light-blue">
                <i className="fa fa-check" aria-hidden={true} />
                <span>Cluster configuration & optimisation</span>
              </span>
            </div>
          </div>
          <a href="mailto:enterprise@grakn.ai" className="services__features__item__text__button button button--transparent ">Get in touch</a>                  
        </div>
        <div className="services__features__item__img">
          <img src="/assets/svg/deployment.svg" alt="Deployment" />
        </div>
      </div>
     </div>
     <div className="services__features__circle"><img src="/assets/svg/bot.svg" alt="grakn bot" /></div>     
    </section>
    <section className="services__alive">
      <img src="/assets/svg/services_alive.svg" alt="Its alive background"/>
      <div className="services__alive__container container section__container">
        <span className="services__alive__header">IT’S ALIVE!</span>
        <span className="services__alive__tag">Now your knowledge base is alive and working for you and your business. Rest assured, we still have your back! Get Grakn Enterprise support to make sure no issue will ever get in the way of your business.</span>
        <a href="mailto:enterprise@grakn.ai" className="services__alive__button button button--red">Get Support</a>                          
      </div>
    </section>
    <Testimonials />
    <section className="support-form__section">
      <div className="support-form__section__container container section__container">
        <span className="support-form__section__header">Get in touch with our team!</span>
        <SupportForm />
      </div>
    </section>
  </div>
);

export default ServicesPage;