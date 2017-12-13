import React, { Component } from 'react';
import validator from 'validator';
import Form from 'components/FormValidationComponents/components/form';
import Input from 'components/FormValidationComponents/components/input';
import Select from 'components/FormValidationComponents/components/select';
import TextArea from 'components/FormValidationComponents/components/textarea';
import Button from 'components/FormValidationComponents/components/button';

const required = (value) => {
  if (!value.toString().trim().length) {
    return <span className="support-form__error">Required</span>;
  }
};

const email = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="support-form__error">{value} is not a valid email.</span>;
  }
};

class SupportForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.form.getValues());
  }

  render() {
    return (
      <div className="support-form" onSubmit={this.handleSubmit}>
        <Form ref={c => { this.form = c }}>
          <div className="support-form__row">
            <div className="support-form__row__item">
              <label>
                First Name
              </label>
              <Input className="support-form__input" placeholder='Enter your First Name' name='firstname' validations={[required]}/>
            </div>
            <div className="support-form__row__item">
              <label>
                Last Name
              </label>
              <Input className="support-form__input" placeholder='Enter your Last Name' name='lastname' validations={[required]}/>
            </div>
          </div>
          <div className="support-form__row">
            <div className="support-form__row__item">
              <label>
                Email
              </label>
              <Input className="support-form__input" placeholder='Enter your email' name='email' validations={[required, email]}/>
            </div>
            <div className="support-form__row__item">
              <label>
                Phone Number
              </label>
              <Input className="support-form__input" placeholder='Enter your Phone Number' name='phone' validations={[required]}/>
            </div>
          </div>
          <div className="support-form__row">
            <div className="support-form__row__item">
              <label>
                Company
              </label>
              <Input className="support-form__input" placeholder='Enter your company' name='company' validations={[required]}/>
            </div>
            <div className="support-form__row__item">
              <label>
                Job Function
              </label>
              <Select className="support-form__input support-form__input__select" value='' name='job' validations={[required]}>
                <option value=''>Choose your job</option>
                <option value='software enginner'>Software Engineer</option>
                <option value='director'>Director / Development Manager</option>
                <option value='it operations'>IT/Dev Operations</option>
                <option value='software architect'>Software Architect</option>
                <option value='dba'>DBA</option>
                <option value='product manager'>Product / Project Manager</option>
                <option value='consultant'>Consultant</option>
                <option value='tech executive'>Technology Executive (CTO, CIO, VP of Eng, etc.)</option>
                <option value='business executive'>Business Executive (CEO, COO, CMO, etc.)</option>
                <option value='business development'>Business Development Manager</option>
                <option value='academic'>Academic (Student, Teacher, Professor)</option>
                <option value='other'>Other</option>
              </Select>
            </div>
          </div>
          <div className="support-form__row">
            <div className="support-form__row__item">
              <label>
                Stage of development
              </label>
              <Select className="support-form__input support-form__input__select" value='' name='stage' validations={[required]}>
              <option value=''>Choose your stage</option>
              <option value='discovery'>Discovery phase</option>
              <option value='installed'>Just installed</option>
              <option value='development'>Development</option>
              <option value='testing'>Testing and Optimisation</option>
              <option value='production'> Live in production</option>
            </Select>
              </div>
              <div className="support-form__row__item">
              <label>
              Tell us a little bit more about how we can help you
              </label>
              <TextArea className="support-form__input support-form__input__textarea" placeholder="Enter your message" name='more'/>           
            </div>
          </div>
          <div className="support-form__row support-form__row--modified">
            <Button className="button button--red support-form__button" >Submit</Button>
          </div>          
        </Form>
      </div>
    );
  }
}

export default SupportForm;