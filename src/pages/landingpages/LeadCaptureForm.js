import React, { Component } from 'react';
import Modal from 'react-modal';
import validator from 'validator';
import { Link } from 'react-router-dom';
import Form from 'components/FormValidationComponents/components/form';
import Input from 'components/FormValidationComponents/components/input';
import Select from 'components/FormValidationComponents/components/select';
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

class LeadCaptureForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLabel: "",
            submitted: false,
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            company: undefined,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillUpdate() {
        if (this.state.buttonLabel == "") {
            this.setState({
                buttonLabel: this.props.title
            });
        }
    }

    onSuccess() {
        this.form.hideErrors();
        this.setState({ submitted: true, buttonLabel: 'Thank you!' });
        this.clearForm();
        setTimeout(() => {
            this.props.onClose();
        }, 2000);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ buttonLabel: 'Sending...' });

        this.form.hideErrors();
        const formValues = this.form.getValues();
        const downloadPath = this.props.downloadPath;

        setTimeout(function () { window.open(downloadPath, "_blank"); });

        api.signupNewsletter({
            email: formValues.email,
            firstname: formValues.firstname,
            lastname: formValues.lastname,
        });

        const downloadedDocument = this.props.title.replace("Download ", "").replace("Download the ", "");
        const pageTitle = this.props.pageInfo.title;
        const pageUrl = this.props.pageInfo.url;

        api.track({
            "utk": Cookies.get('hubspotutk'),
            "platform": "website",
            "action": "formSubmission",
            "subject": "download",
            "subjectSpecific": {
                "pageTitle": pageTitle
            }
        }).then(() => {
            Cookies.set(`known`, true);
            this.props.onSuccessfulSubmission();

            api.track({
                "utk": Cookies.get('hubspotutk'),
                "platform": "website",
                "action": "download",
                "subject": downloadedDocument
            }).then(() => { Cookies.set('known', true) });
        });

        api.sendSupport({
            ...formValues,
            emailTitle: "New Newsletter Signup!"
        });

        api.sendHubspot({
            ref: {
                targetFormId: this.props.hubspotId,
                utk: Cookies.get('hubspotutk'),
                pageUri: pageUrl,
                pageName: pageTitle
            },
            formFields: { ...formValues }
        })
            .then(() => {
                this.onSuccess();
            })
            .catch((e) => { console.log(e); });
    }

    clearForm() {
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            company: "",
        })
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                shouldCloseOnOverlayClick={true}
                onRequestClose={this.props.onClose}
                ariaHideApp={false}
                style={{ content: { minHeight: '520px' } }}
            >
                <i className="fa fa-times ReactModal__Closebtn" onClick={() => this.props.onClose()} />
                <div className="support-form" onSubmit={this.handleSubmit}>
                    <h1 className="title">{this.props.title}</h1>
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
                                <Select className="support-form__input support-form__input__select" value='' name='job_function' validations={[required]}>
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
                        </div>
                        <div className="support-form__row support-form__row--modified">
                            <Button submitted={this.state.submitted} className={"button button--" + (this.state.submitted ? 'green' : 'red') + " support-form__button"}>{(this.state.buttonLabel)}</Button>
                        </div>
                    </Form>
                    <span className="support-form__consent">By submitting your personal data, you consent to emails from Grakn. See our <Link to="/privacy-policy" className="animated__link animated__link--purple" target="_blank">Privacy Policy</Link>.</span>
                </div>

            </Modal>
        );
    }
}

export default LeadCaptureForm;