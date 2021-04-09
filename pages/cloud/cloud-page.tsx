import React from 'react';
import { DefaultLayout } from "../common/ui/layout/default-layout";
import { cloudPageStyles } from "./cloud-styles";

export const CloudPage: React.FC = () => {
    const classes = cloudPageStyles();

    return (
        <DefaultLayout classes={{ main: classes.layoutMain }}>
            <section className={classes.defaultSection}>
                <h1 className={classes.h1}>Grakn Cluster in the Cloud and On-Premise</h1>
                <p className={classes.largeText}>
                    Easily deploy and manage Grakn Cluster on one machine, or a thousand-node cluster
                </p>
            </section>
        </DefaultLayout>
    );
};
