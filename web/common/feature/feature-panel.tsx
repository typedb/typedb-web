import React from "react";
import clsx from "clsx";
import { VaticleLink } from "../link/link";
import {vaticleStyles} from "../styles/vaticle-styles";
import {ClassProps} from "../class-props";
import {featureStyles} from "./feature-styles";

export interface FeaturePanelData {
    name: string;
    icon: React.FC;
    linkTo: string;
    comingSoon?: true;
}

export const FeaturePanelList: React.FC<ClassProps> = ({className, children}) => {
    const classes = Object.assign({}, vaticleStyles(), featureStyles());

    return (
        <div className={clsx(classes.featurePanelList, className)}>
            {children}
        </div>
    );
}

export const FeaturePanel: React.FC<FeaturePanelData> = ({name, icon, linkTo, comingSoon, children}) => {
    const classes = Object.assign({}, vaticleStyles(), featureStyles());

    return (
        <VaticleLink className={classes.featurePanel} to={linkTo}>
            {comingSoon && <div className={classes.featurePanelComingSoonBanner}>coming soon</div>}
            {React.createElement(icon)}
            <h4 className={clsx(classes.h4, classes.textMargin)}>{name}</h4>
            <p className={clsx(classes.mediumText, classes.textMarginSmall)}>{children}</p>
        </VaticleLink>
    )
}
