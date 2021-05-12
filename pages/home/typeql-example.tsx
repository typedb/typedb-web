import { homePageStyles } from "./home-styles";
import { VaticleButton } from "../common/ui/button/button";
import React from "react";
import clsx from "clsx";
import { commonStyles } from "../common/ui/common-styles";
import { TypeQLVisualiser } from "../common/ui/typeql/typeql-visualiser";
import { TypeQLGraph } from "../common/ui/typeql/typeql-data";
import { ClassProps } from "../common/class-props";

export interface TypeQLExampleProps extends ClassProps {
    title: string;
    body: string;
    code: string;
    graphData: TypeQLGraph;
    visualiserPosition: "left" | "right";
}

export const TypeQLExample: React.FC<TypeQLExampleProps> = ({className, title, body, code, graphData, visualiserPosition}) => {
    const classes = Object.assign({}, commonStyles(), homePageStyles());

    return (
        <div className={clsx(classes.diagramAndCaption, visualiserPosition === "left" ? classes.visualiserLeft : classes.visualiserRight, className)}>
            <TypeQLVisualiser code={code} data={graphData} />
            <div className={visualiserPosition === "left" ? classes.diagramCaptionSpacingLeft : classes.diagramCaptionSpacingRight}>
                <h2 className={classes.h2}>{title}</h2>
                <p className={clsx(classes.mediumText, classes.textMarginLarge)}>{body}</p>
                <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore, classes.showDesktop)}>Learn More</VaticleButton>
            </div>
            <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore, classes.hideDesktop)}>Learn More</VaticleButton>
        </div>
    );
}
