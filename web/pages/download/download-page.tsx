import React, { useEffect } from 'react';
import { DefaultLayout } from "../../common/layout/default-layout";
import { downloadPageStyles } from "./download-styles";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { getTypeDBVersion } from "../api/typedb-service";
import { ProductSection } from "./product-section";
import { useTypeDBVersion } from "../state/typedb-version";
import clsx from "clsx";
import { ContactForm } from "../common/contact/contact-form";

export const DownloadPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageStyles());

    const [typeDBVersion, setTypeDBVersion] = useTypeDBVersion();
    useEffect(() => {
        getTypeDBVersion().then(version => {
            setTypeDBVersion(version);
        });
    }, []);

    return (
        <DefaultLayout typeDBVersion={typeDBVersion}>
            <section className={classes.firstSection}>
                <h1 className={classes.h1}>Download Centre</h1>
                <ProductSection latestTypeDBVersion={typeDBVersion} className={classes.subsectionMargin}/>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>Get your TypeDB!</h1>
                <p className={clsx(classes.largeText)}>
                    Get your TypeDB commercial license and we'll help you quickly get up to speed.
                </p>

                <ContactForm className={classes.subsectionMargin}/>
            </section>
        </DefaultLayout>
    );
};
