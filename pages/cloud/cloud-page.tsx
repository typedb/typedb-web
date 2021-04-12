import React from 'react';
import { cloudPageStyles } from "./cloud-styles";
import { DefaultLayout } from "../common/ui/layout/default-layout";
import { AppProps } from "../index/App";

interface CloudPageProps extends AppProps {}

export const CloudPage: React.FC<CloudPageProps> = ({graknVersion}) => {
    const classes = cloudPageStyles();

    return (
        <DefaultLayout graknVersion={graknVersion}>
            <section className={classes.defaultSection}>
                <h1 className={classes.h1}>Grakn Cluster in the Cloud and On-Premise</h1>
                <p className={classes.largeText}>
                    Easily deploy and manage Grakn Cluster on one machine, or a thousand-node cluster
                </p>
            </section>
        </DefaultLayout>
    );
};
