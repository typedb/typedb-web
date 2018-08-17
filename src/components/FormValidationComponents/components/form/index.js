import React, { Component } from 'react';
import PropTypes from 'prop-types';
import form from 'components/FormValidationComponents/hocs/form';

class Form extends Component {
  static propTypes = {
    getValues: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    validateAll: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    hideErrors: PropTypes.func.isRequired,
  };

  render() {
    const { getValues, validate, validateAll, showError, hideErrors, ...props } = this.props;

    return (
      <form ref={r => this.form = r } {...props} />
    )
  }
}

export default form(Form);
