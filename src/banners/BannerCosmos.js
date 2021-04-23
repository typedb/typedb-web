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
    window.open("https://youtube.com/c/vaticle");
  }

  render() {
    return (
      <div onClick={(e) => this.handleBannerClick(e)}>
        {this.state.isBannerDisplayed && (
          <div className="banner-cosmos-container">
            <div className="banner-bg" />
            <div className="banner-content">
              <div className="banner-filler content-item"></div>
              <p className="banner-text banner-text--color-white content-item">Grakn Labs is now Vaticle, and Grakn and Graql are now TypeDB and TypeQL</p>
              <div className="tablet-text">
                <p className="banner-text banner-text--color-white">Grakn Labs is now Vaticle, and Grakn and Graql are now TypeDB and TypeQL</p>
              </div>
              <div className="banner-button content-item">Watch Keynote</div>
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
