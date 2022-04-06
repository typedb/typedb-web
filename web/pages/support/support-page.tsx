import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {VaticleLayout} from "../../common/layout/layout";
import {VaticleButton} from "../../common/button/button";
import clsx from "clsx";
import { VaticleSnackbar } from "../../common/snackbar/snackbar";
import {urls} from "../../common/urls";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import { deleteSearchParam } from "../../common/util/search-params";
import { ContactForm } from "../contact/contact-form";
import { TestimonialsSection } from "../testimonials/testimonials-section";
import { KeyPointsSection } from "./key-points-section";
import { supportPageStyles } from "./support-styles";
import { SupportOfferingsSection } from "./support-offerings-section";

export const SupportPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), supportPageStyles());

    const [contactSuccessSnackbarOpen, setContactSuccessSnackbarOpen] = useState(false);
    const [contactErrorSnackbarOpen, setContactErrorSnackbarOpen] = useState(false);

    const routerHistory = useHistory();
    const routerLocation = useLocation();

    const onContactFormSubmitDone = (res: Response) => {
        if (res.ok) {
            deleteSearchParam(routerHistory, routerLocation, "dialog");
            setContactSuccessSnackbarOpen(true);
        } else {
            setContactErrorSnackbarOpen(true);
        }
    };

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
                                 contactButton={{text: "Get in touch with our team", to: "#get-in-touch"}}/>

            <section className={classes.sectionMargin}>
                <h1 id="get-in-touch" className={clsx(classes.h1, classes.pageAnchor)}>Get in touch with our team!</h1>
                <div className={classes.inlineForm}>
                    <ContactForm id="contact-form-support-page" className={classes.subsectionMargin} onSubmitDone={onContactFormSubmitDone}/>
                </div>
                <VaticleSnackbar variant="success" message="Your message has been sent." open={contactSuccessSnackbarOpen} setOpen={setContactSuccessSnackbarOpen}/>
                <VaticleSnackbar variant="error" message="Your message failed to send, please try again later." open={contactErrorSnackbarOpen} setOpen={setContactErrorSnackbarOpen}/>
            </section>
        </VaticleLayout>
    );
};
