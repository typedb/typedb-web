import React from "react";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { downloadPageProductStyles } from "./download-styles";
import { ComparisonBlock, ComparisonBlockItem } from "./comparison-block";
import clsx from "clsx";
import { VaticleButton } from "../../common/button/button";

export const TypeDBClusterTab: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
        title: "Cloud",
        content: () => <CloudPane/>,
    }, {
        title: "On Premise",
        content: () => <OnPremisePane/>,
    }];

    return (
        <>
            <p className={clsx(classes.largeText, classes.tabIntro)}>
                TypeDB Enterprise Cluster is the Knowledge Graph Management System designed to scale with your business. <a>Learn more</a>
            </p>
            <ComparisonBlock items={items}/>
        </>
    );
}

const CloudPane: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    return (
        <>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText)}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <div className={classes.filler}/>

            <div className={clsx(classes.comparisonBlockContent, classes.mainActionList)}>
                <VaticleButton size="small" type="secondary" disabled={true} comingSoon={true} className={classes.buttonAfterText}>
                    Coming soon
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
            </p>

            <div className={classes.filler}/>

            <div className={clsx(classes.comparisonBlockContent, classes.mainActionList)}>
                <VaticleButton size="small" type="secondary" disabled={true} comingSoon={true} className={classes.buttonAfterText}>
                    Get in touch
                </VaticleButton>
            </div>
        </>
    );
}
