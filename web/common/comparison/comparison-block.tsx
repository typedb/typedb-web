import React from "react";
import {ClassProps} from "../class-props";
import {vaticleStyles} from "../styles/vaticle-styles";
import { comparisonStyles } from "./comparison-styles";
import clsx from "clsx";

export interface ComparisonBlockItem {
    title: string;
    content: React.FC<any>;
}

interface ComparisonBlockProps extends ClassProps {
    items: [ComparisonBlockItem, ComparisonBlockItem];
}

export const ComparisonBlock: React.FC<ComparisonBlockProps> = ({items: [item1, item2], className}) => {
    const classes = Object.assign({}, vaticleStyles(), comparisonStyles());

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
