import React, { Component } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'components/FormValidationComponents/components/form';
import Input from 'components/FormValidationComponents/components/input';
import Select from 'components/FormValidationComponents/components/select';
import TextArea from 'components/FormValidationComponents/components/textarea';
import Button from 'components/FormValidationComponents/components/button';
import api from 'api';
import Cookies from 'js-cookie';

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

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLabel: 'Submit',
      submitted: false,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      company: undefined,
      moreInfo: undefined,
    }
    this.checkboxes = [];
    this.onUpdateCheckbox = this.onUpdateCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onSuccess() {
    this.form.hideErrors();
    this.setState({ submitted: true, buttonLabel: 'Message Sent!' });
    this.clearForm();
    if (this.props.onSuccess) { setTimeout(() => { this.props.onSuccess() }, 2000); }
  }

  handleSubmit(e) {
    this.setState({ buttonLabel: 'Sending...' });
    this.form.hideErrors();
    e.preventDefault();
    const formValues = this.form.getValues();
    formValues.aois = this.checkboxes.join(",");

    api.sendHubspot({
      ref: {
        targetFormId: "c627860e-93d2-4dd3-9a2e-d77aee5f1088",
        utk: Cookies.get('hubspotutk'),
        pageUri: this.props.pageUri,
        pageName: this.props.pageTitle
      },
      formFields: { ...formValues }
    }).then(() => {
      console.log("sent hubspot")
      api.track({
        "utk": Cookies.get('hubspotutk'),
        "platform": "website",
        "action": "formSubmission",
        "subject": "contact",
        "subjectSpecific": {
          "pageTitle": this.props.pageTitle
        }
      }).then(() => { Cookies.set(`known`, true); });
    });

    api.sendSupport({ ...formValues, emailTitle: "Getting in touch with Grakn!" })
      .then(() => { this.onSuccess(e); })
      .catch((e) => { console.log(e); })
  }

  onUpdateCheckbox(e) {
    let checkboxes = this.checkboxes;
    if (e.target.checked) {
      checkboxes.push(e.target.value);
    }
    else {
      checkboxes = checkboxes.filter(elem => elem !== e.target.value);
    }
  }

  clearForm() {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      moreInfo: "",
    })
    this.checkboxes = [];
    document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
  }

  render() {
    return (
      <div className="support-form" onSubmit={this.handleSubmit}>
        <Form ref={c => { this.form = c }}>
          <div className="support-form__row">
            <div className="support-form__row__item">
              <Input className="support-form__input" placeholder='First Name' name='firstname' value={this.state.firstName} validations={[required]} />
            </div>
            <div className="support-form__row__item">
              <Input className="support-form__input" placeholder='Last Name' name='lastname' value={this.state.lastName} validations={[required]} />
            </div>
          </div>
          <div className="support-form__row">
            <div className="support-form__row__item">
              <Input className="support-form__input" placeholder='Email' name='email' value={this.state.email} validations={[required, email]} />
            </div>
            <div className="support-form__row__item">
              <Input className="support-form__input" placeholder='Company' name='company' value={this.state.company} validations={[required]} />
            </div>
          </div>
          <div className="support-form__row">
            <div className="support-form__row__item support-form__row__item__select">
              <Select className="support-form__input support-form__input__select" value='' name='job' validations={[required]}>
                <option value=''>Job function</option>
                <option value='software engineer'>Software Engineer</option>
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
            <div className="support-form__row__item support-form__row__item__select">
              <Select className="support-form__input support-form__input__select" value='' name='stage_of_development' validations={[required]}>
                <option value=''>Stage of development</option>
                <option value='discovery'>Discovery phase</option>
                <option value='installed'>Just installed</option>
                <option value='development'>Development</option>
                <option value='testing'>Testing and Optimisation</option>
                <option value='production'> Live in production</option>
              </Select>
            </div>
          </div>
          <div className="support-form__row">
            <div className="support-form__row__item support-form__row__item__select">
              <Select className="support-form__input support-form__input__select" value='' name='product' validations={[required]}>
                <option value=''>Product</option>
                <option value='core'>Grakn Core</option>
                <option value='kgms'>Grakn KGMS</option>
                <option value='workbase'>Grakn Workbase</option>
                <option value='services'>Professional Services</option>
              </Select>
              <label className="support-form__label support-form__label--modified">
                Select all areas you’re interested in:
              </label>
              <div className="support-form__input__group__row">
                <div className="support-form__input__group">
                  <input className="support-form__input support-form__input__checkbox" value="training" type="checkbox" onChange={e => this.onUpdateCheckbox(e)} />
                  <label className="support-form__label support-form__label--checkbox" name="aoi">Training</label>
                </div>
                <div className="support-form__input__group">
                  <input className="support-form__input support-form__input__checkbox" value="modelling" type="checkbox" onChange={e => this.onUpdateCheckbox(e)} />
                  <label className="support-form__label support-form__label--checkbox" name="aoi">Modelling</label>
                </div>
              </div>
              <div className="support-form__input__group__row">
                <div className="support-form__input__group">
                  <input className="support-form__input support-form__input__checkbox" value="migration" type="checkbox" onChange={e => this.onUpdateCheckbox(e)} />
                  <label className="support-form__label support-form__label--checkbox" name="aoi">Migration</label>
                </div>
                <div className="support-form__input__group">
                  <input className="support-form__input support-form__input__checkbox" value="customapi" type="checkbox" onChange={e => this.onUpdateCheckbox(e)} />
                  <label className="support-form__label support-form__label--checkbox" name="aoi">Custom API</label>
                </div>
              </div>
              <div className="support-form__input__group__row">
                <div className="support-form__input__group">
                  <input className="support-form__input support-form__input__checkbox" value="deployment" type="checkbox" onChange={e => this.onUpdateCheckbox(e)} />
                  <label className="support-form__label support-form__label--checkbox" name="aoi">Deployment</label>
                </div>
                <div className="support-form__input__group">
                  <input className="support-form__input support-form__input__checkbox" value="support" type="checkbox" onChange={e => this.onUpdateCheckbox(e)} />
                  <label className="support-form__label support-form__label--checkbox" name="aoi">Support</label>
                </div>
              </div>
              <div className="support-form__input__group__row">
                <div className="support-form__input__group">
                  <input className="support-form__input support-form__input__checkbox" value="licensing" type="checkbox" onChange={e => this.onUpdateCheckbox(e)} />
                  <label className="support-form__label support-form__label--checkbox" name="aoi">Licensing</label>
                </div>
                <div className="support-form__input__group">
                  <input className="support-form__input support-form__input__checkbox" value="cloud" type="checkbox" onChange={e => this.onUpdateCheckbox(e)} />
                  <label className="support-form__label support-form__label--checkbox" name="aoi">Cloud</label>
                </div>
              </div>
            </div>
            <div className="support-form__row__item">
              <TextArea className="support-form__input support-form__input__textarea" placeholder="Tell us a little bit more about how we can help you" name='tell_us_a_little_bit_more_about_how_we_can_help_you' value={this.state.moreInfo} />
            </div>
          </div>
          <div className="support-form__row support-form__row--modified">
            <Button submitted={this.state.submitted} className={"button button--" + (this.state.submitted ? 'green' : 'red') + " support-form__button"}>{(this.state.buttonLabel)}</Button>
          </div>
        </Form>
        <span className="support-form__consent">By submitting your personal data, you consent to emails from Grakn. See our <Link to="/privacy-policy" className="animated__link animated__link--purple">Privacy Policy</Link>.</span>
      </div>
    );
  }
}

export default connect(null)(ContactForm);