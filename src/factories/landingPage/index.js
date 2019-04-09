import * as React from "react";

class LandingPage extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
		};
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


        return (
            <div className="o-landingpage">
                {header && (
                    <div className="o-landingpage-header">
                        <div className="m-landingpage-header-callToAction">
                            <h1>{header.headline}</h1>
                            {header.subHeadline && <h2>{header.subHeadline}</h2>}
                            <a className="a-landingpage-header-action button button--red" href={header.action.url}>{header.action.title}</a>
                        </div>
                        {briefCopy && (
                            <div className="o-landingPage-briefCopy">
                                <div className="m-landingPage-briefCopy-text">
                                <h3>{briefCopy.title}</h3>
                                <p>{briefCopy.description}</p>
                                <a className="a-landingpage-briefCopy-action button button--transparent" href={briefCopy.action.url}>{briefCopy.action.title}</a>
                                </div>
                                <div className="m-landingPage-briefCopy-media">
                                    <iframe src={briefCopy.videoUrl} frameBorder="0" allowFullScreen></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {sneakPeek && (
                    <div className="o-landingpage-sneakPeek">
                        <h2>{sneakPeek.title}</h2>
                        <img alt="A Sneak Peak" src={sneakPeek.url} />
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
                                                    {proposition.icon && (
                                                        <img src={proposition.icon}/>
                                                    )}
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
                                    <img height="80px" src="/src/pages/landingpages/Biomed/images/testimonial_lifebit.png" />
                                    <p>{testimonial.description}</p>
                                    <a className="a-landingpage-briefCopy-action button button--transparent" href={testimonial.action.url}>{testimonial.action.title}</a>
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
                            <div className="m-landingpage-footer-actions">
                                {footer.actions.map((action, index) => {
                                    const actionClass = "button button" + (action.isPrimary ? "--red" : "--transparent");
                                    return (
                                        <a key={index} className={actionClass} href={action.url}>{action.title}</a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default LandingPage;