import React, { Component, version } from 'react';
import { Link } from 'react-router-dom';
import { keys } from 'lodash';
import { connect } from 'react-redux';
import SupportForm from 'components/SupportForm';
const zenscroll = require('zenscroll');
const graknRoutes = require('config/graknRoutes');
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import Form from 'components/FormValidationComponents/components/form';
import Select from 'components/FormValidationComponents/components/select';

const languageDrivers = [
  {
    url: 'http://dev.grakn.ai/docs/java-library/setup',
    name: 'Grakn-java',
    img: '/assets/svg/java-logo.svg'
  },
  {
    url: 'https://github.com/graknlabs/grakn-python',
    name: 'Grakn-python',
    img: '/assets/svg/python-logo.svg'
  },
  {
    url: 'https://github.com/graknlabs/grakn-node',
    name: 'Grakn-node',
    img: '/assets/svg/nodejs-logo.svg'
  }
];

const KBMScomparisson = [
  { item: 'Dedicated IDE (Workbase)', advance: 'true', premium: 'true'},
  { item: 'Scalable Storage', advance: 'true', premium: 'true'},
  { item: 'Elastic Throughput', advance: 'true', premium: 'true'},
  { item: 'Cluster Management', advance: 'true', premium: 'true'},
  { item: 'Perfomance Monitoring', advance: 'true', premium: 'true'},
  { item: 'Secured Authentication', advance: 'true', premium: 'true'},
  { item: 'Backup and Recovery', advance: 'true', premium: 'false'},
  { item: 'Advance Migration Tools', advance: 'true', premium: 'false'},
  { item: 'Custom Access Rights', advance: 'true', premium: 'false'},
  { item: 'Full-text Search', advance: 'true', premium: 'false'},
  { item: 'Support Hours', advance: '24x7', premium: '10x7'},
  { item: 'Response Times', advance: 'Within 1 Business Day', premium: 'Within 1 Business Day'},
  { item: 'Critical ticket SLA', advance: '2 Hours', premium: '2 Hours'},
];

const WorkbaseComparisson = [
  { item: 'Visual Schema Designer', advance: 'true', premium: 'true'},
  { item: 'Query Visualisation & Development', advance: 'true', premium: 'true'},
  { item: 'Database Migration Tools', advance: 'true', premium: 'false'},
  { item: 'User Management Portal', advance: 'true', premium: 'false'},
  { item: 'Cluster Performance Monitoring', advance: 'true', premium: 'false'},
  { item: 'Cluster Administration', advance: 'true', premium: 'false'},
]

class DownloadCentrePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versionCore: this.props.downloads.length > 0? this.props.downloads.filter(item => item.latest === 'True' && item.product ==='core')[0].version: '',
      platformCore: '',
    }
    this.scroll = this.scroll.bind(this);
    this.renderTableMobile = this.renderTableMobile.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.switchVersion = this.switchVersion.bind(this);
    this.switchPlatform = this.switchPlatform.bind(this);
  }

  scroll() {
    zenscroll.setup(1000, 50);
    zenscroll.to(this.supportform);   
  }

  componentDidMount() {
    let OSName="";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="mac_os_x";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="linux";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="linux";
    this.switchPlatform(OSName);
  }

  componentWillReceiveProps(newProps){
    if(this.props.downloads.length != newProps.downloads.length && newProps.downloads.length > 0) {
      const versionCore = newProps.downloads.filter(item => item.latest === 'True' && item.product ==='core')[0].version;
      this.switchVersion(versionCore);
    }
  }
  switchVersion(versionCore) {
    this.setState({
      versionCore,
    });
  }

  switchPlatform(platformCore) {
    this.setState({
      platformCore,
    });
  }

  renderTable(table, title1="Premium", title2="Advanced") {
    return (
      <div className="support-page__comparisson__table">
        <div className="support-page__comparisson__table__header">
          <span className="support-page__comparisson__table__header__item support-page__comparisson__table__header__item--empty" />
          <span className="support-page__comparisson__table__header__item">{title1}</span>
          <span className="support-page__comparisson__table__header__item">{title2}</span>
        </div>
      {
        table.map((elem, index) => {
          let premiumContent = '';
          let advanceContent = '';        
          if (elem.premium === 'true') {
            premiumContent = <i className="fa fa-check support-page__comparisson__table__row__item__green" />;
          }
          else if (elem.premium !== 'false') {
            premiumContent = elem.premium;
          }
          if (elem.advance === 'true') {
            advanceContent = <i className="fa fa-check support-page__comparisson__table__row__item__purple" />;
          }
          else if (elem.advance !== 'false') {
            advanceContent = elem.advance;
          }
          return (
            <div className="support-page__comparisson__table__row" key={`${elem.item}__table__desktop`}>
              <span className="support-page__comparisson__table__row__item">{elem.item}</span>
              <span className="support-page__comparisson__table__row__item">{premiumContent}</span>
              <span className="support-page__comparisson__table__row__item">{advanceContent}</span>
            </div>
          );
        })
      }
      </div>
    )
  }

  renderTableMobile(table, title1="Premium", title2="Advanced")  {
    return (
      <div className="support-page__comparisson__table__mobile">
      {
        table.map((elem, index) => {
          let premiumContent = '';
          let advanceContent = '';        
          if (elem.premium === 'true') {
            premiumContent = 'Yes';
          }
          else if (elem.premium !== 'false') {
            premiumContent = elem.premium;
          }
          if (elem.advance === 'true') {
            advanceContent = 'Yes';
          }
          else if (elem.advance !== 'false') {
            advanceContent = elem.advance;
          }
          return (
            <div className="support-page__comparisson__table__mobile__row" key={`${elem.item}__table__desktop`}>
              <span className="support-page__comparisson__table__mobile__row__item">{elem.item}</span>
              <div className="support-page__comparisson__table__mobile__row__item support-page__comparisson__table__mobile__row__item--split">
                <span>{title1}</span>
                <span>{premiumContent}</span>
              </div>
              <div className="support-page__comparisson__table__mobile__row__item support-page__comparisson__table__mobile__row__item--split">
                <span>{title2}</span>
                <span>{advanceContent}</span>
              </div>
            </div>
          );
        })
      }
      </div>
    );
  }

  render() {
    let initialIndex = 0;
    if (this.props.location.hash === "#kbms") {
      initialIndex = 1;
    }
    if (this.props.location.hash === "#workbase") {
      initialIndex = 2;
    }
    return (
      <div className="downloads">
      <section className="downloads__splash">
        <img src="/assets/svg/download-splash.svg" alt="Download splash background" />
        <div className="downloads__splash__container container section__container">
          <div className="downloads__splash__text">
            <h1 className="downloads__splash__text__header"><strong>Grakn Download Centre</strong></h1>
          </div>
          <div className="downloads__splash__main">
            <Tabs defaultIndex={initialIndex}>
              <TabList className="downloads__splash__main__tablist">
                <Tab className="downloads__splash__main__tablist__tab" selectedClassName="downloads__splash__main__tablist__tab--active">
                  Grakn Core
                </Tab>
                <Tab className="downloads__splash__main__tablist__tab" selectedClassName="downloads__splash__main__tablist__tab--active">
                  Grakn KBMS
                </Tab>
                <Tab className="downloads__splash__main__tablist__tab" selectedClassName="downloads__splash__main__tablist__tab--active">
                  Grakn Workbase
                </Tab>
              </TabList>
              <TabPanel className="downloads__splash__main__tabpanel">
                <div className="downloads__splash__main__tabpanel__content">
                  <span className="downloads__splash__main__tabpanel__content__text">
                  Grakn is a hyper-relational database for knowledge engineering, i.e. a knowledge base. Graql is Grakn’s
                  reasoning (through OLTP) and analytics (through OLAP) declarative query language. 
                  <Link to="/grakn-core" className="animated__link animated__link--purple"> Learn more</Link>
                  </span>
                  <span className="downloads__splash__main__tabpanel__content__release">Current Stable Release: <strong>Grakn Core {this.props.downloads.length > 0 ? this.props.downloads.filter(item => item.latest==="True")[0].version : null}</strong></span>
                  <span className="downloads__splash__main__tabpanel__content__release"><strong>{this.props.downloads.length > 0 ? this.props.downloads.filter(item => item.latest==="True")[0].date : ''}</strong>  <a href={this.props.downloads.length > 0 ? this.props.downloads.filter(item => item.latest==="True")[0].releasenotes : ''} target="_blank" className="animated__link animated__link--purple">Release Notes</a></span>
                  <div className="downloads__splash__main__tabpanel__content__core__col downloads__splash__main__tabpanel__content__core__col--first">
                    <div className="downloads__splash__main__tabpanel__content__core__col__header downloads__splash__main__tabpanel__content__core__col__header--green">
                    Open Source
                    </div>
                    <div className="downloads__splash__main__tabpanel__content__core__col__content">
                      <div className="downloads__splash__main__tabpanel__content__core__col__content__checkbox">
                        <i className="fa fa-check" aria-hidden={true} style={{color: '#3dce8c', backgroundColor: ' #cbf3e1'}}/>
                        <div>
                          <strong>AGPL v3.0 License</strong>
                          <span>Deploy and operate your Grakn Core knowledge base
                          immediately. Grakn Core is licensed under AGPL so
                          that you can start developing quickly and adopt Grakn within your solution in no time.</span>
                        </div>
                      </div>
                      <a className="button button--transparent downloads__splash__main__tabpanel__content__core__col__content__github" href={graknRoutes.github} target="_blank">STAR ON GITHUB <i className="fa fa-2x fa-github" aria-hidden={true} /> </a>
                      <div className="downloads__splash__main__tabpanel__content__core__col__content__packagemanager">
                        <span>Package Manager: </span>
                        <a className="animated__link animated__link--purple" href={graknRoutes.setup}>Instructions for installing with Homebrew</a>
                      </div>
                      <Form className="downloads__splash__main__tabpanel__content__core__col__content__selectgroup">
                      <Select value={this.state.platformCore} name='platform' onChange={(e) => this.switchPlatform(e.target.value)}>
                        <option value=''>Operating System</option>
                        <option value='linux'>Linux</option>
                        <option value='mac_os_x'>Mac OS X</option>
                      </Select>
                      <Select value={this.state.versionCore} name='version' onChange={(e) => this.switchVersion(e.target.value)}>
                        <option value=''>Version</option>
                        {
                          this.props.downloads.map((item, index) => {
                          return (
                            <option value={item.version} key={`${item.version}--version-download`}>{item.version}</option>
                          )
                        })
                        }
                      </Select>
                      </Form>
                      {
                        this.state.versionCore !== '' && this.state.platformCore !== '' && this.props.downloads.length > 0 ?
                          <a href={this.props.downloads.filter(item => item.version === this.state.versionCore)[0][this.state.platformCore]}
                            className="button button--red downloads__splash__main__tabpanel__content__download"
                          >
                          Download
                          </a>
                          :
                          <span className="button button--red downloads__splash__main__tabpanel__content__download downloads__splash__main__tabpanel__content__download--disabled">Download</span>
                      }
                    </div>
                  </div>
                  
                  <div className="downloads__splash__main__tabpanel__content__core__col">
                    <div className="downloads__splash__main__tabpanel__content__core__col__header downloads__splash__main__tabpanel__content__core__col__header--purple">
                    Commercial
                    </div>
                    <div className="downloads__splash__main__tabpanel__content__core__col__content">
                      <div className="downloads__splash__main__tabpanel__content__core__col__content__checkbox">
                        <i className="fa fa-check" aria-hidden={true} style={{color: '#7d72e5', backgroundColor: '#dfddff'}}/>
                        <div>
                          <strong>Commercial License</strong>
                          <span>If you want to freely integrate Grakn Core into your
                          product, and satisfy all of your organisation&#39;s
                          requirements, the commercial license gives you that
                          piece of mind.</span>
                        </div>
                      </div>
                      <div className="downloads__splash__main__tabpanel__content__core__col__content__checkbox">
                        <i className="fa fa-check" aria-hidden={true} style={{color: '#7d72e5', backgroundColor: '#dfddff'}}/>
                        <div>
                          <strong>Core Support</strong>
                          <span>Get direct support from our engineers. From
                          development to production, we’re with you every step of the way, so you can focus on building your
                          application and your business.</span>
                        </div>
                      </div>
                      <div className="downloads__splash__main__tabpanel__content__core__col__content__checkbox">
                        <i className="fa fa-check" aria-hidden={true} style={{color: '#7d72e5', backgroundColor: '#dfddff'}}/>
                        <div>
                          <strong>Feature Requests</strong>
                          <span>As you develop on Grakn, you may find additional
                          features that you wish Grakn provides. We have a
                          long list of these features to develop, but we can
                          prioritise developing the ones you need.</span>
                        </div>
                      </div>
                      <span className="button button--red downloads__splash__main__tabpanel__content__button" onClick={() => this.scroll()}>Get in touch</span>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel className="downloads__splash__main__tabpanel">
                <div className="downloads__splash__main__tabpanel__content">
                  <span className="downloads__splash__main__tabpanel__content__text">
                    Grakn Enterprise KBMS is the Knowledge Base Management System designed to scale with your business.<br />
                    <Link to="/grakn-kbms" className="animated__link animated__link--purple"> Learn more</Link>
                  </span>
                  {this.renderTable(KBMScomparisson)}
                  {this.renderTableMobile(KBMScomparisson)}
                  <span className="button button--red downloads__splash__main__tabpanel__content__button" onClick={() => this.scroll()}>Get in touch</span>
                </div>
              </TabPanel>
              <TabPanel className="downloads__splash__main__tabpanel">
              <div className="downloads__splash__main__tabpanel__content">
                <span className="downloads__splash__main__tabpanel__content__text">
                Workbase is an Integrated Development Environment to perform knowledge engineering at scale, and control everything in your knowledge base from development to production.
                <Link to="/grakn-kbms" className="animated__link animated__link--purple"> Learn more</Link>
                </span>
                {this.renderTable(WorkbaseComparisson, "For Grakn Core", "For Grakn KBMS")}
                {this.renderTableMobile(WorkbaseComparisson, "For Grakn Core", "For Grakn KBMS")}
                <span className="button button--red downloads__splash__main__tabpanel__content__button" onClick={() => this.scroll()}>Get in touch</span>
              </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
      <section className="downloads__language">
          <div className="downloads__language__container container section__container">
            <span className="downloads__language__headline home__header">
            Develop with <strong>Grakn</strong>,<br />in a language of <strong>your choice</strong>
            </span>
            <div className="downloads__language__items--desktop">
              <div className="downloads__language__items--desktop__row">
              {
                languageDrivers.map((item, index) => {
                  return (
                    <a href={item.url} className="downloads__language__items__item" key={`${index}--language--driver`}
                    >
                      <img src={item.img} alt={item.name} />
                    </a>
                  )
                })
              }
              </div>
            </div>
          </div>
        </section>
        <section className="grakn-page__links">
          <div className="grakn-page__links__container container section__container">
            <div className="grakn-page__links__grid">

              <div className="grakn-page__links__item">
                <div className="grakn-page__links__item__img">
                  <img src="/assets/svg/grakn-started.svg" alt="Get Started" />
                </div>
                <div className="grakn-page__links__item__details">
                  <span className="grakn-page__links__item__details__header">Get Started</span>
                  <div className="grakn-page__links__item__details__text">
                  Whether you are new to programming or an experienced developer, it’s easy to learn and use Grakn. Get set up a matter of minutes. Go to <a href={graknRoutes.quickstart} className="animated__link animated__link--purple">quickstart tutorial.</a>
                  </div>
                </div>
              </div>

              <div className="grakn-page__links__item">
                <div className="grakn-page__links__item__img">
                  <img src="/assets/svg/grakn-documentation.svg" alt="Documentation" />
                </div>
                <div className="grakn-page__links__item__details">
                  <span className="grakn-page__links__item__details__header">Documentation</span>
                  <div className="grakn-page__links__item__details__text">
                  Documentation for Grakn’s development library and Graql language API, along with tutorials and guides, are available online. Visit our <a href={graknRoutes.docs} className="animated__link animated__link--purple">documentation portal.</a>
                  </div>
                </div>
              </div>

              <div className="grakn-page__links__item">
                <div className="grakn-page__links__item__img">
                  <img src="/assets/svg/grakn-discussion.svg" alt="Discussion" />
                </div>
                <div className="grakn-page__links__item__details">
                  <span className="grakn-page__links__item__details__header">Discussion</span>
                  <div className="grakn-page__links__item__details__text">
                  When you’re stuck, the most effective remedy is to collaborate. Ask your question on <a href={graknRoutes.stack} className="animated__link animated__link--purple">StackOverflow</a> or discuss it in our <a href={graknRoutes.discuss} className="animated__link animated__link--purple">Discussion forum.</a>
                  </div>
                </div>
              </div>

              <div className="grakn-page__links__item">
                <div className="grakn-page__links__item__img">
                  <img src="/assets/svg/grakn-academy.svg" alt="Academy" />
                </div>
                <div className="grakn-page__links__item__details">
                  <span className="grakn-page__links__item__details__header">Join the Academy!</span>
                  <div className="grakn-page__links__item__details__text">
                  Learn everything from the basic foundations to advanced topics of knowledge engineering and be an expert in the field. Join <a href={graknRoutes.academy} className="animated__link animated__link--purple">Grakn Academy.</a>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
        <section className="support-form__section" ref={(elem) => this.supportform = elem}>
          <div className="support-form__section__container container section__container">
            <span className="support-form__section__header support-form__section__header--with-tag">Get your Grakn!</span>
            <span className="support-form__section__tag">Get your Grakn commercial license and we’ll help you quickly get up to speed.</span>
            <SupportForm />
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    downloads: state.downloads.items
  }
)
export default connect(mapStateToProps)(DownloadCentrePage);