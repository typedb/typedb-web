import {ClassProps} from "../../common/class-props";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {expressivityExampleCode, expressivityExampleGraph} from "../typedb/examples/expressivity-example";
import {safetyExampleCode, safetyExampleGraph} from "../typedb/examples/safety-example";
import {inferenceExampleCode, inferenceExampleGraph} from "../typedb/examples/inference-example";
import clsx from "clsx";
import {VaticleButton} from "../../common/button/button";
import React from "react";
import {urls} from "../../common/urls";
import {routes} from "../router";
import {TypeQLExample} from "../feature/typeql-example";
import {FeatureBlock} from "../feature/feature-block";

interface TypeQLExamplesSectionProps extends ClassProps {
    typeDBVersion: string;
}

export const TypeQLExamplesSection: React.FC<TypeQLExamplesSectionProps> = ({className, typeDBVersion}) => {
    const classes = Object.assign({}, vaticleStyles());

    return (
        <section className={className}>
            <h1 className={classes.h1}>Type systems make complex problems easier to tackle</h1>
            <p className={classes.largeText}>
                TypeDB provides a strong type system for developers to break down complex problems into
                meaningful and logical systems. Through TypeQL, TypeDB provides powerful abstractions over
                low-level and complex data patterns.
            </p>

            <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Expressivity"
                          body="TypeDB allows you to model your domain based on logical and object-oriented principles.
                                     Composed of entity, relationship, and attribute types, as well as type hierarchies,
                                     roles, and rules, TypeDB allows you to think higher-level as opposed to join-tables,
                                     columns, documents, vertices, edges, and properties."
                          button={{text: "Learn More", disabled: true, comingSoon: true}}>
                <TypeQLExample code={expressivityExampleCode} data={expressivityExampleGraph}/>
            </FeatureBlock>

            <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Safety"
                          body="Types provide a way to describe the logical structures of your data, allowing TypeDB
                                     to validate that your code is inserting and querying data correctly. Query validation
                                     goes beyond static type checking, and includes logical validations of meaningless queries.
                                     With strict type-checking errors, you have a dataset that you can trust."
                          button={{text: "Learn More", disabled: true, comingSoon: true}}>
                <TypeQLExample code={safetyExampleCode} data={safetyExampleGraph}/>
            </FeatureBlock>

            <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Inference"
                          body="TypeDB encodes your data for logical interpretation by its reasoning engine. It enables
                                     type-inference and rule-inference that creates logical abstractions of data.
                                     This allows the discovery of facts and patterns that would otherwise be too hard to
                                     find; and complex queries become much simpler."
                          button={{text: "Learn More", disabled: true, comingSoon: true}}>
                <TypeQLExample code={inferenceExampleCode} data={inferenceExampleGraph}/>
            </FeatureBlock>

            <div className={clsx(classes.mainActionList, classes.subsectionMargin)}>
                <VaticleButton size="small" type="primary" to={routes.download}>Download
                    TypeDB {typeDBVersion}</VaticleButton>
                <VaticleButton size="small" type="primary" href={urls.github.typedb} target="_blank">Fork/Star on
                    GitHub</VaticleButton>
            </div>
        </section>
    );
}
