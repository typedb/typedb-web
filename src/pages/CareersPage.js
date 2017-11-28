import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCareers } from 'actions/careers';

class CareersPage extends Component {
  componentDidMount() {
    this.props.onFetchCareers();
  }

  render() {
    return (
      <div className="careers">
        Careers Page
      </div>
    );  
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onFetchCareers: () => dispatch(fetchCareers()),
  }
);

export default connect(null, mapDispatchToProps)(CareersPage);