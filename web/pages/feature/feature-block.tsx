import {VaticleButton} from "../../common/button/button";
import React from "react";
import clsx from "clsx";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {ClassProps} from "../../common/class-props";
import {featureStyles} from "./feature-styles";

export interface CodeExampleProps extends ClassProps {
    title: string;
    body: string;
    examplePosition: "left" | "right";
    buttonText: "Learn More" | "Documentation";
}

export const FeatureBlock: React.FC<CodeExampleProps> = ({className, title, body, examplePosition, buttonText, children}) => {
    const classes = Object.assign({}, vaticleStyles(), featureStyles());

    return (
        <div
            className={clsx(classes.diagramAndCaption, examplePosition === "left" ? classes.exampleLeft : classes.exampleRight, className)}>
            {children}
            <div
                className={examplePosition === "left" ? classes.diagramCaptionSpacingLeft : classes.diagramCaptionSpacingRight}>
                <h2 className={classes.h2}>{title}</h2>
                <p className={clsx(classes.mediumText, classes.textMarginLarge)}>{body}</p>
                <VaticleButton size="small" type="secondary" disabled comingSoon
                               className={clsx(classes.learnMore, classes.showDesktop, classes.contentMargin)}>{buttonText}</VaticleButton>
            </div>
            <VaticleButton size="small" type="secondary" disabled comingSoon
                           className={clsx(classes.learnMore, classes.hideDesktop, classes.contentMargin)}>{buttonText}</VaticleButton>
        </div>
    );
}
