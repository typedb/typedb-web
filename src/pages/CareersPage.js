import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCareers } from 'actions/careers';
import classNames from 'classnames';

class CareersPage extends Component {
  componentDidMount() {
    this.props.onFetchCareers();
  }

  render() {
    return (
      <div className="careers">
        <div className="careers__container">
        <span className="careers__heading container section__container">Careers</span>
        {
          this.props.careers.loading?
          null
          :
          <div className="careers__list">
            {
              this.props.careers.items.length == 0?
                <div>No Jobs available</div>
                :
                this.props.careers.items.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)).map((item, index) => {
                  return (
                    <section className="careers__list__item" key={`${index}_careers`}>
                      <div className="container section__container">
                        <span className="careers__list__item__title">{item.title}</span>
                        <a className="careers__list__item__link animated__link animated__link--purple" href={item.angellist_url} target="__blank">Check on Angelist</a>
                        <div className="careers__list__item__description"
                          dangerouslySetInnerHTML={{__html: item.description.replace(/[*]/g, '').replace(/(?:\r\n|\r|\n)/g, '<br />')}}
                        />
                      </div>
                    </section>
                  )
                })
            }
          </div>
        }
        </div>
      </div>
    );  
  }
}

const mapStateToProps = (state) => (
  {
    careers: state.careers
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    onFetchCareers: () => dispatch(fetchCareers()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CareersPage);