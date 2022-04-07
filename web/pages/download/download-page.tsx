import React from 'react';
import {VaticleLayout} from "../../common/layout/layout";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import { InlineContactForm } from "../contact/inline-contact-form";
import {ProductSection} from "./product-section";
import clsx from "clsx";

export const DownloadPage: React.FC = () => {
    const classes = vaticleStyles();

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
                <InlineContactForm className={classes.subsectionMargin}/>
            </section>
        </VaticleLayout>
    );
};
