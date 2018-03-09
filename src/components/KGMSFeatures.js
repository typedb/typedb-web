import React, { Component } from 'react';
import { connect } from 'react-redux';
import PagingComponent from 'components/PagingComponent';

class KGMSFeatures extends Component {
  render() {
    return (
      <div>
      {
        this.props.kgmsfeatures.length > 0?
          <PagingComponent>
          {
            this.props.kgmsfeatures.filter(a => a.carouselposition !== -1).sort((a,b) => a.carouselposition - b.carouselposition).map((item, index) => {
              return (
                <div className="kgms-features__item" key={`${item.name}__carousel`}>
                  <div className="kgms-features__item__container">
                    <div className="kgms-features__item__logo"><img src={item.img} alt={item.name} /></div>
                    <span className="kgms-features__item__header">{item.name}</span>   
                    <span className="kgms-features__item__text">{item.description}</span>          
                  </div>
                </div>
              );
            })
          }
        </PagingComponent>
        :
        null
      }
    </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    kgmsfeatures: state.kgmsfeatures.items
  }
)
export default connect(mapStateToProps)(KGMSFeatures);