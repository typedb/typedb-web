import { VaticleButton, VaticleButtonProps } from "../../common/button/button";
import React from "react";
import clsx from "clsx";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {ClassProps} from "../../common/class-props";
import {featureStyles} from "./feature-styles";

interface FeatureBlockButtonProps extends VaticleButtonProps {
    text: "Learn More" | "Documentation" | "Back Home" | "Coming Soon!";
}

export interface FeatureBlockProps extends ClassProps {
    id?: string,
    title: string;
    body: string;
    examplePosition: "left" | "right";
    button?: FeatureBlockButtonProps;
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({className, id, title, body, examplePosition, button, children}) => {
    const classes = Object.assign({}, vaticleStyles(), featureStyles());

    const buttonProps: FeatureBlockButtonProps = Object.assign({ size: "small", type: "secondary" }, button);
    delete buttonProps.text;

    return (
        <div id={id} className={clsx(classes.diagramAndCaption, examplePosition === "left" ? classes.exampleLeft : classes.exampleRight, className)}>
            <h2 className={clsx(classes.h2, classes.hideDesktop)}>{title}</h2>
            {children}
            <div className={examplePosition === "left" ? classes.diagramCaptionSpacingLeft : classes.diagramCaptionSpacingRight}>
                <h2 className={clsx(classes.h2, classes.showDesktop)}>{title}</h2>
                <p className={clsx(classes.mediumText, classes.body)}>{body}</p>
                {button && <VaticleButton {...buttonProps} className={clsx(classes.learnMore, classes.showDesktop, classes.contentMargin)}>{button.text}</VaticleButton>}
            </div>
            {button && <VaticleButton {...buttonProps} className={clsx(classes.learnMore, classes.hideDesktop, classes.contentMargin)}>{button.text}</VaticleButton>}
        </div>
    );
}
