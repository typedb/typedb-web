import React, { useState } from 'react';
import {VaticleLayout} from "../../common/layout/layout";
import {downloadPageStyles} from "./download-styles";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {ProductSection} from "./product-section";
import clsx from "clsx";
import {ContactForm} from "../contact/contact-form";
import { VaticleSnackbar } from "../../common/snackbar/snackbar";
import { deleteSearchParam } from "../../common/util/search-params";
import { useHistory, useLocation } from "react-router-dom";

export const DownloadPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageStyles());

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
                <h1 className={classes.h1}>Download Centre</h1>
                <ProductSection className={classes.subsectionMargin}/>
            </section>

            <section className={classes.subsectionMargin}>
                <h1 id="get-in-touch" className={clsx(classes.h1, classes.pageAnchor)}>Get in touch about TypeDB</h1>
                <p className={clsx(classes.sectionIntro)}>
                    Let us know how we can help you and we'll help you get up to speed.
                </p>

                <div className={classes.contactFormContainer}>
                    <ContactForm id="contact-form-download-page" className={classes.subsectionMargin} onSubmitDone={onContactFormSubmitDone}/>
                </div>
            </section>

            <VaticleSnackbar variant="success" message="Your message has been sent." open={contactSuccessSnackbarOpen} setOpen={setContactSuccessSnackbarOpen}/>
            <VaticleSnackbar variant="error" message="Your message failed to send, please try again later." open={contactErrorSnackbarOpen} setOpen={setContactErrorSnackbarOpen}/>
        </VaticleLayout>
    );
};
