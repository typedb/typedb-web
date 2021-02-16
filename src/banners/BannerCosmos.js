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
    this.handleBannerClick = this.handleBannerClick.bind(this);
  }

  handleBannerClose() {
    Cookies.set("closed-cosmos-banner", true, { expires: 60 });
    this.setState({ isBannerDisplayed: false });
    document.body.classList.remove('banner-showing');
  }

  handleBannerClick(e) {
    if (e.target.classList.contains('banner-btn-close')) return false;
    window.open("https://community.grakn.ai/grakn-orbit-2021?utm_source=homepage&utm_medium=banner&utm_campaign=orbit-2021");
  }

  render() {
    return (
      <div onClick={(e) => this.handleBannerClick(e)}>
        {this.state.isBannerDisplayed && (
          <div className="banner-cosmos-container">
            <div className="banner-bg" />
            <div className="banner-content">
              <img className="banner-logo content-item" src="/assets/img/banners/orbit/grakn-orbit-2021.svg"/>
              <p className="banner-text banner-text--color-white content-item">The conference by the Grakn Community, for the Grakn Community | <span className="banner-text banner-text--color-brand">21-22nd of April 2021</span></p>
              {/* <p className="banner-text banner-text--color-brand content-item"> 21-22nd of April 2021</p> */}
              <div className="tablet-text">
                <p className="banner-text banner-text--color-white">The conference by the Grakn Community, for the Grakn Community</p>
                <p className="banner-text banner-text--color-brand">21-22nd of April 2021</p>
              </div>
              <div className="banner-button content-item">Register Now</div>
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
