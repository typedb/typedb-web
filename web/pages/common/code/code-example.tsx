import { VaticleButton } from "../../../common/button/button";
import React from "react";
import clsx from "clsx";
import { vaticleStyles } from "../../../common/styles/vaticle-styles";
import { ClassProps } from "../../../common/class-props";
import { codeStyles } from "./code-styles";

export interface CodeExampleProps extends ClassProps {
    title: string;
    body: string;
    diagramPosition: "left" | "right";
    buttonText: "Learn More" | "Documentation";
}

export const CodeExample: React.FC<CodeExampleProps> = ({className, title, body, diagramPosition, buttonText, children }) => {
    const classes = Object.assign({}, vaticleStyles(), codeStyles());

    return (
        <div className={clsx(classes.diagramAndCaption, diagramPosition === "left" ? classes.diagramLeft : classes.diagramRight, className)}>
            {children}
            <div className={diagramPosition === "left" ? classes.diagramCaptionSpacingLeft : classes.diagramCaptionSpacingRight}>
                <h2 className={classes.h2}>{title}</h2>
                <p className={clsx(classes.mediumText, classes.textMarginLarge)}>{body}</p>
                <VaticleButton size="small" type="secondary" disabled comingSoon className={clsx(classes.learnMore, classes.showDesktop, classes.contentMargin)}>{buttonText}</VaticleButton>
            </div>
            <VaticleButton size="small" type="secondary" disabled comingSoon className={clsx(classes.learnMore, classes.hideDesktop, classes.contentMargin)}>{buttonText}</VaticleButton>
        </div>
    );
}
