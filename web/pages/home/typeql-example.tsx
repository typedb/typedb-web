import { homePageStyles } from "./home-styles";
import { VaticleButton } from "../../common/button/button";
import React from "react";
import clsx from "clsx";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { TypeQLVisualiser } from "../../common/typeql/typeql-visualiser";
import { TypeQLGraph } from "../../common/typeql/typeql-data";
import { ClassProps } from "../../common/class-props";

export interface TypeQLExampleProps extends ClassProps {
    title: string;
    body: string;
    code: string;
    graphData: TypeQLGraph;
    visualiserPosition: "left" | "right";
}

export const TypeQLExample: React.FC<TypeQLExampleProps> = ({className, title, body, code, graphData, visualiserPosition}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageStyles());

    return (
        <div className={clsx(classes.diagramAndCaption, visualiserPosition === "left" ? classes.visualiserLeft : classes.visualiserRight, className)}>
            <TypeQLVisualiser code={code} data={graphData} />
            <div className={visualiserPosition === "left" ? classes.diagramCaptionSpacingLeft : classes.diagramCaptionSpacingRight}>
                <h2 className={classes.h2}>{title}</h2>
                <p className={clsx(classes.mediumText, classes.textMarginLarge)}>{body}</p>
                <VaticleButton size="small" type="secondary" disabled comingSoon className={clsx(classes.learnMore, classes.showDesktop, classes.contentMargin)}>Learn More</VaticleButton>
            </div>
            <VaticleButton size="small" type="secondary" disabled comingSoon className={clsx(classes.learnMore, classes.hideDesktop, classes.contentMargin)}>Learn More</VaticleButton>
        </div>
    );
}
