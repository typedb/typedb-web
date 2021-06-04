import React from 'react';
import { DefaultLayout } from "../../common/layout/default-layout";
import { downloadPageStyles } from "./download-styles";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { ProductSection } from "./product-section";
import clsx from "clsx";
import { ContactForm } from "../common/contact/contact-form";

export const DownloadPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageStyles());

    return (
        <DefaultLayout>
            <section className={classes.firstSection}>
                <h1 className={classes.h1}>Download Centre</h1>
                <ProductSection className={classes.subsectionMargin}/>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>Get in touch about TypeDB</h1>
                <p className={clsx(classes.largeText)}>
                    Let us know how we can help you and we'll help you get up to speed.
                </p>

                <ContactForm className={classes.subsectionMargin}/>
            </section>
        </DefaultLayout>
    );
};
