import React from "react";
import { ClassProps } from "../../common/class-props";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { downloadPageProductStyles } from "./download-styles";
import clsx from "clsx";

export interface ComparisonBlockItem {
    title: string;
    content: React.FC<any>;
}

interface ComparisonBlockProps {
    items: [ComparisonBlockItem, ComparisonBlockItem];
}

export const ComparisonBlock: React.FC<ComparisonBlockProps & ClassProps> = ({items: [item1, item2], className}) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    return (
        <div className={clsx(classes.comparisonBlock, className)}>
            <div className={classes.comparisonBlockItem}>
                <div className={clsx(classes.comparisonBlockItemTitle, classes.comparisonBlockItem1Title)}>
                    <h6 className={classes.h6}>{item1.title}</h6>
                </div>
                <div className={clsx(classes.comparisonBlockItemBody)}>
                    <item1.content/>
                </div>
            </div>
            <div className={classes.comparisonBlockItem}>
                <div className={clsx(classes.comparisonBlockItemTitle, classes.comparisonBlockItem2Title)}>
                    <h6 className={classes.h6}>{item2.title}</h6>
                </div>
                <div className={clsx(classes.comparisonBlockItemBody)}>
                    <item2.content/>
                </div>
            </div>
        </div>
    );
}
