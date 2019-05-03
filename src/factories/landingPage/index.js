import * as React from "react";
import Cookies from 'js-cookie';
import api from "../../api";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLeadCaptureForm: false,
            captureFormDownloadPath: "",
            captureFormTitle: "",
            requiresFormToDownload: !Cookies.get('known'),
            isVisitorKnown: false,
        };

        this.showLeadCaptureForm = this.showLeadCaptureForm.bind(this)
        this.hideLeadCaptureForm = this.hideLeadCaptureForm.bind(this)
    }

    renderActions(actions, className) {
        return (
            <div className={`m-landingpage-${className}-actions`}>
                {actions.map((action, index) => {
                    const actionClass = "button button" + (action.isPrimary ? "--red" : "--white");
                    if (action.form) {
                        return <a key={index} className={actionClass} onClick={() => this.renderDownload(action.form)}>{action.title}</a>
                    } else if (action.url) {
                        return <a key={index} className={actionClass} href={action.url} target={action.url.indexOf("http") > -1 ? "_blank" : "_self"} >{action.title}</a>
                    }
                })}
            </div>
        )
    }

    setVisitorKnown() {
        this.setState({ isVisitorKnown: true });
    }

    renderDownload(form) {
        if (this.state.requiresFormToDownload && !this.state.isVisitorKnown) {
            this.showLeadCaptureForm(form);
        } else {
            api.track({
                "utk": Cookies.get('hubspotutk'),
                "platform": "website",
                "action": "download",
                "subject": form.title.replace("Download the ", "").replace("Download ", "")
            }).then(() => {
                Cookies.set('known', true);
                this.setState({ isVisitorKnown: true });
            });
            window.open(form.downloadPath, "_blank");
        }
    }

    showLeadCaptureForm(form) {
        this.setState({ showLeadCaptureForm: true });
        this.setState({ captureFormTitle: form.title });
        this.setState({ captureFormDownloadPath: form.downloadPath });
    }

    hideLeadCaptureForm() {
        this.setState({ showLeadCaptureForm: false });
        this.setState({ captureFormTitle: "" });
        this.setState({ captureFormDownloadPath: "" });
    }

    render() {
        const {
            header,
            briefCopy,
            sneakPeek,
            propositions,
            testimonials,
            footer
        } = this.props.data;

        const LeadCaptureForm = this.props.LeadCaptureForm;

        return (
            <div className="o-landingpage">
                <LeadCaptureForm isOpen={this.state.showLeadCaptureForm} onClose={() => this.hideLeadCaptureForm()} onSuccessfulSubmission={() => this.setVisitorKnown()} downloadPath={this.state.captureFormDownloadPath} title={this.state.captureFormTitle} hubspotId={this.props.hubspotFormId} />

                {header && (
                    <div className="o-landingpage-header">
                        <div className="m-landingpage-header-callToAction">
                            <h1>{header.headline}</h1>
                            {header.subHeadline && <h2>{header.subHeadline}</h2>}
                            {this.renderActions(header.actions, "header")}
                        </div>
                        {briefCopy && (
                            <div className="o-landingPage-briefCopy-wrapper ">
                                <div className="o-landingPage-briefCopy">
                                    <div className="m-landingPage-briefCopy-text">
                                        <h3>{briefCopy.title}</h3>
                                        <p>{briefCopy.description}</p>
                                        {briefCopy.action.form && <a className="a-landingpage-briefCopy-action button button--transparent" onClick={() => this.renderDownload(briefCopy.action.form)}>{briefCopy.action.title}</a>}
                                        {briefCopy.action.url && <a className="a-landingpage-briefCopy-action button button--transparent" href={briefCopy.action.url}>{briefCopy.action.title}</a>}
                                    </div>
                                    <div className="m-landingPage-briefCopy-media">
                                        <iframe src={briefCopy.videoUrl} frameBorder="0" allowFullScreen></iframe>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {sneakPeek && (
                    <div className="o-landingpage-sneakPeek">
                        <h2>{sneakPeek.title}</h2>
                        <img alt="A Sneak Peak" src={sneakPeek.url} width="100%" height="auto" />
                    </div>
                )}

                {propositions && (
                    <div className="o-landingpage-propositionsBg">
                        <div className="o-landingpage-propositions">
                            {propositions.map((category, index) => {
                                return (
                                    <div key={index} className='o-landingPage-propositionCategory'>
                                        <h2>{category.title}</h2>
                                        {category.items.map((proposition, index) => {
                                            return (
                                                <div key={index} className="m-landingPage-proposition">
                                                    <h3>{proposition.title}</h3>
                                                    {proposition.icon && <img src={proposition.icon} /> }
                                                    <p>{proposition.description}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {testimonials && (
                    <div className="o-landingpage-testimonials">
                        {testimonials.map((testimonial, index) => {
                            return (
                                <div key={index} className='m-landingPage-testimonial'>
                                    {testimonial.imageUrl  && (
                                        <a href={testimonial.imageUrl} target="_blanks">
                                           <img height="80px" src={testimonial.image} />
                                        </a>
                                    )}
                                    {!testimonial.imageUrl && <img height="80px" width="auto" src={testimonial.image} />}

                                    <p>{testimonial.description}</p>
                                    {this.renderActions(testimonial.actions, "testimonials")}
                                </div>
                            );
                        })}
                    </div>
                )}

                {footer && (
                    <div className="o-landingpage-footer">
                        <div className="m-landingpage-footer-callToAction">
                            <h1>{footer.headline}</h1>
                            {footer.subHeadline && <h2>{footer.subHeadline}</h2>}
                            {this.renderActions(footer.actions, "footer")}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default LandingPage;