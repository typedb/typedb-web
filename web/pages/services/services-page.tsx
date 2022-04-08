import clsx from "clsx";
import React from "react";
import { VaticleButton } from "../../common/button/button";
import { VaticleLayout } from "../../common/layout/layout";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { InlineContactForm } from "../contact/inline-contact-form";
import { routes } from "../router";
import { ContactButtonTarget, TestimonialsSection } from "../testimonials/testimonials-section";
import { ServiceOfferingsSection } from "./service-offerings-section";
import { servicesPageStyles } from "./services-styles";

export const ServicesPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), servicesPageStyles());

    return (
        <VaticleLayout>
            <section className={classes.firstSectionMargin}>
                <h1 className={classes.h1}>From Zero to Hero</h1>
                <p className={clsx(classes.headlineText, classes.introBody)}>
                    For every step of your knowledge engineering journey, we're here to help you achieve your goals.
                </p>
            </section>

            <ServiceOfferingsSection className={classes.sectionMargin}/>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>Stay Supported</h1>
                <p className={classes.sectionIntro}>
                    Now your knowledge graph is alive and working for you and your business.
                    Rest assured, we still have your back! Get TypeDB Enterprise support
                    to make sure no issue will ever get in the way of your business.
                </p>
                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="primary" to={routes.support}>Get Support</VaticleButton>
                </div>
            </section>

            <TestimonialsSection className={classes.sectionMargin} title="Loved by the pioneers in industry"
                                 contactButton={{text: "Get in touch with our team", target: ContactButtonTarget.InlineForm}}/>

            <section className={classes.subsectionMargin}>
                <h1 id="get-in-touch" className={clsx(classes.h1, classes.pageAnchor)}>Get in touch about TypeDB</h1>
                <p className={clsx(classes.sectionIntro)}>
                    Let us know how we can help you and we'll help you get up to speed.
                </p>
                <InlineContactForm className={classes.subsectionMargin}/>
            </section>
        </VaticleLayout>
    );
};
