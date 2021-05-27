import { ClassProps } from "../../common/class-props";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { TypeQLExample } from "./typeql-example";
import { expressivityExampleCode, expressivityExampleGraph } from "../../common/typeql/samples/expressivity-example";
import { safetyExampleCode, safetyExampleGraph } from "../../common/typeql/samples/safety-example";
import { inferenceExampleCode, inferenceExampleGraph } from "../../common/typeql/samples/inference-example";
import clsx from "clsx";
import { VaticleButton } from "../../common/button/button";
import React from "react";
import { urls } from "../../common/urls";

interface TypeQLExamplesSectionProps extends ClassProps {
    typeDBVersion: string;
}

export const TypeQLExamplesSection: React.FC<TypeQLExamplesSectionProps> = ({className, typeDBVersion}) => {
    const classes = Object.assign({}, vaticleStyles());

    return (
        <section className={className}>
            <h1 className={classes.h1}>Strong type systems make complex problems easier to tackle</h1>
            <p className={classes.largeText}>
                TypeDB provides a strong type system for developers to break down complex problems into
                meaningful and logical systems. Through TypeQL, TypeDB provide powerful abstractions over
                low-level and complex data patterns.
            </p>

            <TypeQLExample className={classes.sectionMarginSmall} visualiserPosition="left"
                           code={expressivityExampleCode} graphData={expressivityExampleGraph} title="Expressivity"
                           body="TypeDB allows you to model your domain based on logical and object-oriented principles.
                                     Composed of entity, relationship, and attribute types, as well as type hierarchies,
                                     roles, and rules, TypeDB allows you to think higher-level as opposed to join-tables,
                                     columns, vertices, edges, and properties."/>

            <TypeQLExample className={classes.sectionMarginSmall} visualiserPosition="right"
                           code={safetyExampleCode} graphData={safetyExampleGraph} title="Safety"
                           body="Types provide a way to describe the logical structures of your data, allowing TypeDB
                                     to validate that your code is inserting and querying data correctly. Query validation
                                     goes beyond static type checking, and includes logical validations of meaningless queries.
                                     With strict type-checking errors, you have a dataset that you can trust."/>

            <TypeQLExample className={classes.sectionMarginSmall} visualiserPosition="left"
                           code={inferenceExampleCode} graphData={inferenceExampleGraph} title="Inference"
                           body="TypeDB encodes the domain schema and data for logical interpretation by a type-based and
                                     rule-based reasoning engine – it enables type-inference and rule-inference that creates
                                     logical abstractions of data. Complex and verbose data patterns can be queried through
                                     simple and intuitive TypeQL queries."/>

            <div className={clsx(classes.mainActionList, classes.sectionMarginSmall)}>
                <VaticleButton size="small" type="primary" href={urls.downloadTypeDB} target="_blank">Download {typeDBVersion}</VaticleButton>
                <VaticleButton size="small" type="primary" href={urls.github.typedb} target="_blank">Fork/Star on GitHub</VaticleButton>
            </div>
        </section>
    );
}
