import * as React from "react";
import Cookies from "js-cookie";

class BannerCosmos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isBannerDisplayed: !Cookies.get("closed-cosmos-banner")
      isBannerDisplayed: false
    };

    if (this.state.isBannerDisplayed) {
      document.body.classList.add('banner-showing');
    } else {
      document.body.classList.remove('banner-showing');
    }

    this.handleBannerClose = this.handleBannerClose.bind(this);
    this.handleBannerClick = this.handleBannerClick.bind(this);
  }

  handleBannerClose() {
    Cookies.set("closed-cosmos-banner", true);
    this.setState({ isBannerDisplayed: false });
    document.body.classList.remove('banner-showing');
  }

  handleBannerClick(e) {
    if (e.target.classList.contains('banner-btn-close')) return false;
    window.open("https://grakncosmos.com");
  }

  render() {
    return (
      <div onClick={(e) => this.handleBannerClick(e)}>
        {this.state.isBannerDisplayed && (
          <div className="banner-cosmos-container">
            <div className="banner-bg" />
            <div className="banner-content">
              <img className="banner-logo content-item" src="/assets/img/banners/cosmos/banner-cosmos-logo.svg"/>
              <p className="banner-text banner-text--color-white content-item">The conference of people changing the universe with Grakn | <span className="banner-text banner-text--color-brand">6-7th of February 2020</span></p>
              {/* <p className="banner-text banner-text--color-brand content-item"> 6-7th of February 2020</p> */}
              <div className="tablet-text">
                <p className="banner-text banner-text--color-white">The conference of people changing the universe with Grakn</p>
                <p className="banner-text banner-text--color-brand">6-7th of February 2020</p>
              </div>
              <div className="banner-button content-item">Get Tickets</div>
            </div>
            <div
              className="banner-btn-close"
              onClick={() => this.handleBannerClose()}
            ></div>
          </div>
        )}
      </div>
    );
  }
}

export default BannerCosmos;
