import { VaticleButton } from "../../../common/button/button";
import React from "react";
import clsx from "clsx";
import { vaticleStyles } from "../../../common/styles/vaticle-styles";
import { TypeQLVisualiser } from "../../../common/typeql/typeql-visualiser";
import { TypeQLGraph } from "../../../common/typeql/typeql-data";
import { ClassProps } from "../../../common/class-props";
import { typeQLStyles } from "./typeql-styles";

export interface TypeQLExampleProps extends ClassProps {
    title: string;
    body: string;
    code: string;
    graphData: TypeQLGraph;
    visualiserPosition: "left" | "right";
    buttonText: "Learn More" | "Documentation";
}

export const TypeQLExample: React.FC<TypeQLExampleProps> = ({className, title, body, code, graphData, visualiserPosition, buttonText}) => {
    const classes = Object.assign({}, vaticleStyles(), typeQLStyles());

    return (
        <div className={clsx(classes.diagramAndCaption, visualiserPosition === "left" ? classes.visualiserLeft : classes.visualiserRight, className)}>
            <TypeQLVisualiser code={code} data={graphData} />
            <div className={visualiserPosition === "left" ? classes.diagramCaptionSpacingLeft : classes.diagramCaptionSpacingRight}>
                <h2 className={classes.h2}>{title}</h2>
                <p className={clsx(classes.mediumText, classes.textMarginLarge)}>{body}</p>
                <VaticleButton size="small" type="secondary" disabled comingSoon className={clsx(classes.learnMore, classes.showDesktop, classes.contentMargin)}>{buttonText}</VaticleButton>
            </div>
            <VaticleButton size="small" type="secondary" disabled comingSoon className={clsx(classes.learnMore, classes.hideDesktop, classes.contentMargin)}>{buttonText}</VaticleButton>
        </div>
    );
}
