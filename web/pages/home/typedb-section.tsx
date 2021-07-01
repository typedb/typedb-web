import React from "react";
import clsx from "clsx";
import {urls} from "../../common/urls";
import {routes} from "../router";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {
    entityRelationshipExampleCode,
    entityRelationshipExampleGraph
} from "../typedb/examples/entity-relationship-example";
import {
    logicalQueryValidationExampleCode,
    logicalQueryValidationExampleGraph
} from "../typedb/examples/logical-query-validation-example";
import {inferenceExampleCode, inferenceExampleGraph} from "../typedb/examples/inference-example";
import {simpleStatefulAPIExample} from "../typedb/examples/simple-stateful-api-example";
import {ClassProps} from "../../common/class-props";
import {VaticleButton} from "../../common/button/button";
import {FeatureBlock} from "../feature/feature-block";
import {TypeQLExample} from "../feature/typeql-example";
import {PolyglotExample} from "../../common/code/polyglot-example";
import { homePageTypeDBStyles } from "./home-styles";

export const TypeDBSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageTypeDBStyles());

    return (
        <section className={className}>
            <h1 className={classes.h1}>Type systems make complex problems easier to tackle</h1>
            <p className={classes.sectionCaption} style={{maxWidth: 850}}>
                TypeDB provides a strong type system for developers to break down complex problems into
                meaningful and logical systems. Through TypeQL, TypeDB provides powerful abstractions over
                low-level and complex data patterns.
            </p>

            <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Expressivity"
                          body="TypeDB allows you to model your domain based on logical and object-oriented principles.
                          Composed of entity, relationship, and attribute types, as well as type hierarchies, roles, and
                          rules, TypeDB allows you to think higher-level as opposed to join-tables, columns, documents,
                          vertices, edges, and properties."
                          button={{text: "Learn More", to: routes.typeDB.expressivity}}>
                <TypeQLExample code={entityRelationshipExampleCode} data={entityRelationshipExampleGraph}/>
            </FeatureBlock>

            <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Safety"
                          body="Types provide a way to describe the logical structures of your data, allowing TypeDB to
                          validate that your code inserts and queries data correctly. Query validation goes beyond
                          static type checking, and includes logical validations of meaningless queries. With strict
                          type-checking errors, you have a dataset that you can trust."
                          button={{text: "Learn More", to: routes.typeDB.safety}}>
                <TypeQLExample code={logicalQueryValidationExampleCode} data={logicalQueryValidationExampleGraph}/>
            </FeatureBlock>

            <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Inference"
                          body="TypeDB encodes your data for logical interpretation by its reasoning engine. It enables
                          type-inference and rule-inference that creates logical abstractions of data. This allows the
                          discovery of facts and patterns that would otherwise be too hard to find; and complex queries
                          become much simpler."
                          button={{text: "Learn More", to: routes.typeDB.inference}}>
                <TypeQLExample code={inferenceExampleCode} data={inferenceExampleGraph}/>
            </FeatureBlock>

            <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Programmatic API"
                          body="TypeDB's API is provided through a gRPC client, built with robust functionalities that
                          REST cannot provide. TypeDB Clients provide stateful objects, Sessions and Transactions, to
                          interact with the database programmatically. The transactions provide ACID guarantees, up to
                          snapshot isolation."
                          button={{text: "Learn More", to: routes.typeDB.api}}>
                <PolyglotExample id="simple-stateful-api" sources={simpleStatefulAPIExample}/>
            </FeatureBlock>

            <div className={clsx(classes.mainActionList, classes.actions)}>
                <VaticleButton className={classes.hideMobile} size="small" type="secondary" to={routes.typeDB.page}>Learn More</VaticleButton>
                <VaticleButton size="small" type="primary" href={urls.github.typedb} target="_blank">Fork/Star on
                    GitHub</VaticleButton>
            </div>
        </section>
    );
}
