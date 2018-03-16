import React from 'react';
import PagingComponent from 'components/PagingComponent';
import { connect } from 'react-redux';

const CompanyLogos = ({ companies }) => {
  console.log(companies)
  return (
  <section className="company-logos">
    <div className="container section__container">
    {
      companies.length > 0?
        <PagingComponent auto={true}>
          {
            companies.sort((a,b) =>  a.sort - b.sort).map((item, index) => {
              return (
                <div className="company-logos__item" key={`${item.index}__company`}>
                  <img src={`https://cms.grakn.ai/${item.logo.data.url}`} alt={item.name} />
                </div>
              )
            })
          }
        </PagingComponent>
        :
        null
    }
    </div>
  </section>
  )
};

const mapStateToProps = (state) => (
  {
    companies: state.companies.items
  }
)

export default connect(mapStateToProps)(CompanyLogos);