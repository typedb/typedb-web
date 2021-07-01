import React from 'react';
import {DefaultLayout} from "../../common/layout/default-layout";
import {downloadPageStyles} from "./download-styles";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {ProductSection} from "./product-section";
import clsx from "clsx";
import {ContactForm} from "../contact/contact-form";

export const DownloadPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageStyles());

    return (
        <DefaultLayout>
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
                    <ContactForm id="contact-form-download-page" className={classes.subsectionMargin}/>
                </div>
            </section>
        </DefaultLayout>
    );
};
