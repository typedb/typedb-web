import clsx from "clsx";
import React from "react";
import { ParagraphWithLinks } from "../../pages/usecase/paragraph-with-links";
import { ClassProps } from "../class-props";
import { vaticleStyles } from "../styles/vaticle-styles";
import { keyPointTableStyles } from "./key-point-styles";

interface KeyPointTableProps extends ClassProps {
    keyPoints: { title: string, body: string }[];
}

export const KeyPointTable: React.FC<KeyPointTableProps> = ({keyPoints, className}) => {
    const classes = Object.assign({}, vaticleStyles(), keyPointTableStyles());

    return (
        <div className={className}>
        {keyPoints.map((keyPoint) => (
            <div className={classes.tableRow}>
                <div className={clsx(classes.mediumText, classes.titleColumn)}>{keyPoint.title}</div>
                <ParagraphWithLinks text={keyPoint.body} className={clsx(classes.mediumText, classes.bodyColumn)}/>
            </div>
        ))}
        </div>
    )
}
