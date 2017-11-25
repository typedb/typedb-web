import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import navRoutes from 'config/navRoutes';

class NavigationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    this.renderLinks = this.renderLinks.bind(this);
    this.renderToggle = this.renderToggle.bind(this);
  }
  
  renderLinks() {
    return Object.keys(navRoutes).map((key) => {
      const linkClasses = classNames({
        'nav__link': true,
        'nav__link--animated': key !== 'Github',
      });
      return (
        <a
        key={`${key}__link`}
        href={navRoutes[key]}
        target="_blank"
        className={linkClasses}
        >
        { key !== 'Github'?
          key
          :
          <i className="fa fa-2x fa-github" aria-hidden="true"></i> 
        }              
        </a>
      )
    }) 
  }

  renderToggle() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const  { mediaType } = this.props;
    const hamburgerClasses = classNames({
      'nav__hamburger': true,
      'nav__hamburger--open': this.state.expanded 
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
              this.renderLinks()
            }
          </div>
          :
          this.renderLinks()      
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