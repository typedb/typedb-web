import React from "react";
import clsx from "clsx";
import { VaticleLink } from "../link/link";
import {vaticleStyles} from "../styles/vaticle-styles";
import {ClassProps} from "../class-props";
import { keyPointPanelGridStyles, keyPointPanelStyles } from "./key-point-styles";

export interface KeyPointPanelData {
    name: string;
    icon: React.FC;
    linkTo?: string;
    comingSoon?: true;
}

export interface KeyPointPanelProps {
    data: KeyPointPanelData,
    horizontalPadding?: number,
    mobileHeight?: number,
}

export const KeyPointPanel: React.FC<KeyPointPanelProps> = ({children, ...props}) => {
    const classes = Object.assign({}, vaticleStyles(), keyPointPanelStyles(props));
    const { comingSoon, icon, linkTo, name } = props.data;

    const inner = (
        <>
            {comingSoon && <div className={classes.keyPointPanelComingSoonBanner}>coming soon</div>}
            {React.createElement(icon)}
            <h4 className={clsx(classes.h4, classes.textMargin)}>{name}</h4>
            <p className={clsx(classes.mediumText, classes.textMarginSmall)}>{children}</p>
        </>
    );

    return linkTo
        ? <VaticleLink className={classes.keyPointPanel} to={linkTo}>{inner}</VaticleLink>
        : <div className={classes.keyPointPanel}>{inner}</div>;
}

export interface KeyPointPanelsProps extends ClassProps {
    panelHeight?: { desktop: number, mobile: number },
}

export const KeyPointPanels: React.FC<KeyPointPanelsProps> = ({className, children, ...props}) => {
    const classes = Object.assign({}, vaticleStyles(), keyPointPanelGridStyles(props));

    return (
        <div className={clsx(classes.keyPointPanelGrid, className)}>
            {children}
        </div>
    );
}
