import React, { Component } from 'react';
import { connect } from 'react-redux';
import PagingComponent from 'components/PagingComponent';

class KBMSFeatures extends Component {
  render() {
    return (
      <div>
      {
        this.props.kbmsfeatures.length > 0?
          <PagingComponent>
          {
            this.props.kbmsfeatures.filter(a => a.carouselposition !== -1).sort((a,b) => a.carouselposition - b.carouselposition).map((item, index) => {
              return (
                <div className="kbms-features__item" key={`${item.name}__carousel`}>
                  <div className="kbms-features__item__container">
                    <div className="kbms-features__item__logo"><img src={item.img} alt={item.name} /></div>
                    <span className="kbms-features__item__header">{item.name}</span>   
                    <span className="kbms-features__item__text">{item.description}</span>          
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
    kbmsfeatures: state.kbmsfeatures.items
  }
)
export default connect(mapStateToProps)(KBMSFeatures);