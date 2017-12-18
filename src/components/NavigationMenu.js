import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import navRoutes from 'config/navRoutes';

class NavigationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      secondaryActive: false,
      activePrimary: null,
    }
    this.renderLinks = this.renderLinks.bind(this);
    this.renderToggle = this.renderToggle.bind(this);
  }
  
  renderLinks(hamburger) {
    return Object.keys(navRoutes).map((key) => {
      const value = navRoutes[key];
      const linkClasses = classNames({
        'nav__link': true,
        'nav__link__inline': value.type === 'single',
        'nav__link__dropdown': value.type !== 'single',
        'animated__link': value.type === 'single' && key !== 'Github' && !hamburger,
      });
      // 
      if (value.type === 'single') {
        return (
          <a
          key={`${key}__link`}
          href={value.link}
          className={linkClasses}
          >
          { key !== 'Github'?
            key
            :
            <i className="fa fa-2x fa-github nav__link__icon" aria-hidden="true"></i> 
          }              
          </a>
        )
      }
      else {
        const subLinks = value.links;        
        return (
          <div
          className={linkClasses}
          onClick={
            () => {
              if(hamburger) {
                this.setState({
                  secondaryActive: true,
                  activePrimary: key
                });
              }
            }
          }
          >
          {key}
          {
            hamburger?
              <i className="fa fa-caret-right" aria-hidden={true} />
            :
              <i className="fa fa-caret-down" aria-hidden={true} />

          }
          {
            hamburger?
              null
              :
              <div className="nav__link__dropdown__content">
              {
                Object.keys(subLinks).map((key) => {
                  if (key === 'Community' || key === 'Services' || key === 'Support') {
                      return (
                        <Link key={`${key}__link`} to={subLinks[key]} className='nav__link nav__link__dropdown__content__item animated__link'>{key}</Link>
                      )
                  }
                  else {
                    return (
                      <a key={`${key}__link`} href={subLinks[key]} className='nav__link nav__link__dropdown__content__item animated__link'>{key}</a>
                    )
                  }
                })
              }
            </div>
          }
          </div>
        );
      }
    }); 
    console.log(navRoutes);
  }

  renderToggle() {
    this.setState({
      expanded: !this.state.expanded,
      secondaryActive: false,
      activePrimary: null,
    });
  }

  render() {
    const  { mediaType } = this.props;
    const hamburgerClasses = classNames({
      'nav__hamburger': true,
      'nav__hamburger--open': this.state.expanded 
    });
    const hamburgerSecondaryClasses = classNames({
      'nav__hamburger__secondary': true,
      'nav__hamburger__secondary--open': this.state.secondaryActive 
    });
    const hamburgerButton = classNames({
      'fa': true,
      'fa-2x': true,
      'nav__hamburger__button': true,
      'fa-bars': !this.state.expanded,
      'fa-times': this.state.expanded
    });

    return (
      <div className="nav__links">
      {
        mediaType === 'small' || mediaType === 'extraSmall' ?
          <i
            className={hamburgerButton}
            aria-hidden="true"
            onClick={() => this.renderToggle()}
          />
          :
          null        
      }
      {
        mediaType === 'small' || mediaType === 'extraSmall' ?
          <div className={hamburgerClasses}>
            {
              this.renderLinks(true)
            }
          </div>
          :
          this.renderLinks(false)      
      }
      {
        mediaType === 'small' || mediaType === 'extraSmall' ?
          <div className={hamburgerSecondaryClasses}>
            <span className="nav__link nav__hamburger__secondary__back"
            onClick={() => this.setState({
              secondaryActive: false,
              activePrimary: false
            })}
            >
              <i className="fa fa-chevron-left" aria-hidden={true} />Back
            </span>
            {
              this.state.activePrimary?
                Object.keys(navRoutes[this.state.activePrimary].links).map((key, index) => {
                  const subLinks = navRoutes[this.state.activePrimary].links;
                  if (key === 'Community' || key === 'Services' || key === 'Support') {
                    return (
                      <Link 
                        key={`${key}__link`}
                        to={subLinks[key]}
                        className='nav__link'
                        onClick={
                          () => {
                            if(hamburger) {
                              this.setState({
                                secondaryActive: false,
                                activePrimary: null,
                                expanded: false
                              });
                            }
                          }
                        }
                      >
                      {key}
                      </Link>
                    )
                  }
                  else {
                    return (
                      <a key={`${key}__link`} href={subLinks[key]} className='nav__link'>{key}</a>
                    )
                  }
                })
                :
                null
            }
          </div>
          :
          null     
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    mediaType: state.browser.mediaType,
  }
)

export default connect(mapStateToProps, null)(NavigationMenu);