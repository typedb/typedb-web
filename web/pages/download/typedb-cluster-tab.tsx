import React from "react";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { downloadPageProductStyles } from "./download-styles";
import { ComparisonBlock, ComparisonBlockItem } from "./comparison-block";
import clsx from "clsx";
import { VaticleButton } from "../../common/button/button";

export const TypeDBClusterTab: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
        title: "Cloud Deployment",
        content: () => <CloudPane/>,
    }, {
        title: "On Premise",
        content: () => <OnPremisePane/>,
    }];

    return (
        <>
            <ComparisonBlock items={items}/>
        </>
    );
}

const CloudPane: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    return (
        <>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText)}>
                Deploy your TypeDB Cluster as a Helm package in your Kubernetes cluster, in the cloud provider of your choosing: Google Cloud, Amazong Web Services, or Microsoft Azure.
            </p>

            <div className={classes.filler}/>

            <div className={clsx(classes.comparisonBlockContent, classes.mainActionList, classes.contentMargin)}>
                <VaticleButton size="small" type="secondary" disabled comingSoon>
                    Coming soon!
                </VaticleButton>
            </div>
        </>
    );
}

const OnPremisePane: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    return (
        <>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText)}>
                Deploy and manage TypeDB Cluster with full control in your own computing ecosystem.
            </p>

            <div className={classes.filler}/>

            <div className={clsx(classes.comparisonBlockContent, classes.mainActionList)}>
                <VaticleButton size="small" type="secondary" className={classes.contentMargin} to="#get-in-touch">
                    Get in touch
                </VaticleButton>
            </div>
        </>
    );
}
