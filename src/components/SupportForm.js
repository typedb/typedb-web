import React, { Component } from 'react';
import validator from 'validator';
import Form from 'components/FormValidationComponents/components/form';
import Input from 'components/FormValidationComponents/components/input';

const required = (value) => {
  if (!value.toString().trim().length) {
    return <span className="support-form__error">`${value}` is required</span>;
  }
};

const email = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="support-form__error">`${value}` is not a valid email.</span>;
  }
};

class SupportForm extends Component {
  render() {
    return (
      <div className="support-form">
        <Form>
          <div className="support-form__row">
            <div className="support-form__row__item">
            <label>
              Email
              <Input placeholder='Enter your email address' name='email' validations={[required, email]}/>
            </label>
            </div>
            <div className="support-form__row__item">
            <label>
              Email
              <Input placeholder='Enter your email address' name='email' validations={[required, email]}/>
            </label>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default SupportForm;