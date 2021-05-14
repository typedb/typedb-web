import React from 'react';
import { DefaultLayout } from "../common/ui/layout/default-layout";
import { cloudPageStyles } from "./cloud-styles";
import { commonStyles } from "../common/ui/common-styles";

export const CloudPage: React.FC = () => {
    const classes = Object.assign({}, commonStyles(), cloudPageStyles());

    return (
        <DefaultLayout>
            <section className={classes.sectionMarginSmall}>
                <h1 className={classes.h1}>TypeDB Cluster in the Cloud and On-Premise</h1>
                <p className={classes.largeText}>
                    Easily deploy and manage TypeDB Cluster on one machine, or a thousand-node cluster
                </p>
            </section>
        </DefaultLayout>
    );
};
