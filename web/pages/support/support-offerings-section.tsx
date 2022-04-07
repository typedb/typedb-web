import clsx from "clsx";
import React from "react";
import { VaticleButton } from "../../common/button/button";
import { ClassProps } from "../../common/class-props";
import { ComparisonTable, ComparisonTableRowData } from "../../common/comparison/comparison-table";
import { vaticleStyles } from "../../common/styles/vaticle-styles";

const tier1 = "Premium Support";
const tier2 = "Advanced Support";
const rows: ComparisonTableRowData[] = [{
    name: "Access to Community Resources",
    value1: true,
    value2: true,
}, {
    name: "Support hours",
    value1: "10x5",
    value2: "24x7",
}, {
    name: "Response time",
    value1: "1 business day",
    value2: "1 business day",
}, {
    name: "Urgent ticket SLA",
    value1: "2 hours",
    value2: "2 hours",
}, {
    name: "Priority queueing",
    value1: true,
    value2: true,
}, {
    name: "Direct access to our engineers",
    value1: true,
    value2: true,
}, {
    name: "Release upgrades",
    value1: true,
    value2: true,
}, {
    name: "Bug patches",
    value1: true,
    value2: true,
}, {
    name: "Hot fixes and bug escalation",
    value1: false,
    value2: true,
}, {
    name: "Architecture and performance reviews",
    value1: false,
    value2: true,
}, {
    name: "Migration and capacity planning",
    value1: false,
    value2: true,
}, {
    name: "Launch day assistance",
    value1: false,
    value2: true,
}];

export const SupportOfferingsSection: React.FC<ClassProps> = ({className}) => {
    const classes = vaticleStyles();

    return (
        <section className={className}>
            <h1 className={classes.h1}>Whatever stage and size your company is, we have a support plan that fits your team</h1>
            <ComparisonTable className={classes.subsectionMargin} item1={tier1} item2={tier2} rows={rows}/>
            <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                <VaticleButton size="small" type="primary" to="#get-in-touch">Contact our sales team</VaticleButton>
            </div>
        </section>
    );
}
