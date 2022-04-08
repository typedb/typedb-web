import clsx from "clsx";
import React from "react";
import { VaticleButton } from "../../common/button/button";
import { VaticleLayout } from "../../common/layout/layout";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { urls } from "../../common/urls";
import { InlineContactForm } from "../contact/inline-contact-form";
import { ContactButtonTarget, TestimonialsSection } from "../testimonials/testimonials-section";
import { KeyPointsSection } from "./key-points-section";
import { SupportOfferingsSection } from "./support-offerings-section";
import { supportPageStyles } from "./support-styles";

export const SupportPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), supportPageStyles());

    return (
        <VaticleLayout>
            <section className={classes.firstSectionMargin}>
                <h1 className={classes.h1}>Focus on your business, not infrastructure</h1>
                <p className={clsx(classes.headlineText, classes.introBody)}>
                    From development to production, we're with you every step of the way, so you can focus on building
                    your application and your business.
                </p>
                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="primary" href={urls.supportPlatform} target="_blank">Go to Support Platform</VaticleButton>
                </div>
            </section>

            <KeyPointsSection className={classes.sectionMargin}/>

            <SupportOfferingsSection className={classes.sectionMargin}/>

            <TestimonialsSection className={classes.sectionMargin} title="Loved by the pioneers in industry"
                                 contactButton={{text: "Get in touch with our team", target: ContactButtonTarget.InlineForm}}/>

            <section className={classes.sectionMargin}>
                <h1 id="get-in-touch" className={clsx(classes.h1, classes.pageAnchor)}>Get in touch with our team!</h1>
                <InlineContactForm className={classes.subsectionMargin}/>
            </section>
        </VaticleLayout>
    );
};
