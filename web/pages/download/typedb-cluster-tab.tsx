import React from "react";
import { ComparisonBlock, ComparisonBlockItem } from "../../common/comparison/comparison-block";
import { comparisonStyles } from "../../common/comparison/comparison-styles";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import { hashRoutes } from "../router";
import {downloadPageProductStyles} from "./download-styles";
import clsx from "clsx";
import {VaticleButton} from "../../common/button/button";

const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
    title: "Cloud Deployment",
    content: () => <CloudPane/>,
}, {
    title: "On Premise",
    content: () => <OnPremisePane/>,
}];

export const TypeDBClusterTab: React.FC = () => <ComparisonBlock items={items}/>;

const CloudPane: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles(), comparisonStyles());

    return (
        <>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText)}>
                Deploy your TypeDB Cluster as a Helm package in your Kubernetes cluster, in the cloud provider of your
                choosing: Google Cloud, Amazon Web Services, or Microsoft Azure.
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
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles(), comparisonStyles());

    return (
        <>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText)}>
                Deploy and manage TypeDB Cluster with full control in your own computing ecosystem.
            </p>

            <div className={classes.filler}/>

            <div className={clsx(classes.comparisonBlockContent, classes.mainActionList)}>
                <VaticleButton size="small" type="secondary" className={classes.contentMargin} to={hashRoutes.contactSection}>
                    Get in touch
                </VaticleButton>
            </div>
        </>
    );
}
