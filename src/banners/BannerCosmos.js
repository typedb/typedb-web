import * as React from "react";
import Cookies from "js-cookie";

class BannerCosmos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBannerDisplayed: !Cookies.get("closed-cosmos-banner")
    };

    if (this.state.isBannerDisplayed) {
      document.body.classList.add('banner-showing');
    } else {
      document.body.classList.remove('banner-showing');
    }

    this.handleBannerClose = this.handleBannerClose.bind(this);
  }

  handleBannerClose() {
    Cookies.set("closed-cosmos-banner", true);
    this.setState({ isBannerDisplayed: false });
    document.body.classList.remove('banner-showing');
  }

  render() {
    return (
      <div>
        {this.state.isBannerDisplayed && (
          <div className="banner-cosmos-container">
            <div className="banner-bg" />
            <div className="banner-content">
              <a href="https://grakncosmos.com" target="_blank"><img className="banner-logo content-item" src="/assets/img/banners/cosmos/banner-cosmos-logo.svg"/></a>
              <p className="banner-text banner-text--color-white content-item">The conference of people changing the universe with Grakn</p>
              <p className="banner-text banner-text--color-brand content-item"> 6-7th of February 2020</p>
              <div className="tablet-text">
                <p className="banner-text banner-text--color-white">The conference of people changing the universe with Grakn</p>
                <p className="banner-text banner-text--color-brand">6-7th of February 2020</p>
              </div>
              <div className="banner-button content-item"><a href="https://grakncosmos.com" target="_blank">Get Tickets</a></div>
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
