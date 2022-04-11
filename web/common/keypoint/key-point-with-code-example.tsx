import { VaticleButton, VaticleButtonProps } from "../button/button";
import React from "react";
import clsx from "clsx";
import {vaticleStyles} from "../styles/vaticle-styles";
import {ClassProps} from "../class-props";
import {keyPointStyles} from "./key-point-styles";

interface KeyPointWithCodeExampleButtonProps extends Partial<VaticleButtonProps> {
    text: "Learn More" | "Documentation" | "Back Home" | "Coming Soon!";
}

export interface KeyPointWithCodeExampleProps extends ClassProps {
    id?: string,
    title: string;
    body: string;
    examplePosition: "left" | "right";
    button?: KeyPointWithCodeExampleButtonProps;
}

export const KeyPointWithCodeExample: React.FC<KeyPointWithCodeExampleProps> = ({className, id, title, body, examplePosition, button, children}) => {
    const classes = Object.assign({}, vaticleStyles(), keyPointStyles());

    const buttonProps: KeyPointWithCodeExampleButtonProps & Pick<VaticleButtonProps, "size" | "type"> = Object.assign({ size: "small", type: "secondary" }, button);
    delete buttonProps.text;

    return (
        <div id={id} className={clsx(classes.keyPointWithExample, examplePosition === "left" ? classes.exampleLeft : classes.exampleRight, className)}>
            <h2 className={clsx(classes.h2, classes.hideDesktop)}>{title}</h2>
            {children}
            <div className={examplePosition === "left" ? classes.exampleSpacingLeft : classes.exampleSpacingRight}>
                <h2 className={clsx(classes.h2, classes.showDesktop)}>{title}</h2>
                <p className={clsx(classes.mediumText, classes.body)}>{body}</p>
                {button && <VaticleButton {...buttonProps} className={clsx(classes.learnMore, classes.showDesktop, classes.contentMargin)}>{button.text}</VaticleButton>}
            </div>
            {button && <VaticleButton {...buttonProps} className={clsx(classes.learnMore, classes.hideDesktop, classes.contentMargin)}>{button.text}</VaticleButton>}
        </div>
    );
}
