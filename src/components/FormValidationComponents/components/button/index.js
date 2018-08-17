import React from 'react';
import PropTypes from 'prop-types';
import button from 'components/FormValidationComponents/hocs/button';

const Button = ({ hasErrors, submitted, ...props }) => {
  return (
    <button {...props} disabled={hasErrors || submitted} />
  );
};

Button.contextTypes = {
  hasErrors: PropTypes.bool
};

export default button(Button);
