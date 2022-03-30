import React from "react";
import clsx from "clsx";
import {urls} from "../../common/urls";
import { hashRoutes, routes } from "../router";
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
import {clientAPIBasicExample} from "../typedb/examples/client-api-basic-example";
import {ClassProps} from "../../common/class-props";
import {VaticleButton} from "../../common/button/button";
import {FeatureWithSnippet} from "../../common/feature/feature-with-snippet";
import {TypeQLSnippet} from "../../common/feature/typeql-snippet";
import {PolyglotSnippet} from "../../common/code/polyglot-snippet";
import { homePageTypeDBStyles } from "./home-styles";

export const TypeDBSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageTypeDBStyles());

    return (
        <section className={className}>
            <h1 className={classes.h1}>Type systems make complex problems <br className={classes.showTablet}/> easier to tackle</h1>
            <p className={classes.sectionIntro}>
                TypeDB provides a strong type system for developers to break down complex problems into
                meaningful and logical systems. Through TypeQL, TypeDB provides powerful abstractions over
                low-level and complex data patterns.
            </p>

            <FeatureWithSnippet className={classes.subsectionMargin} examplePosition="left" title="Expressivity"
                                body="TypeDB allows you to model your domain based on logical and object-oriented principles.
                          Composed of entity, relationship, and attribute types, as well as type hierarchies, roles, and
                          rules, TypeDB allows you to think higher-level, as opposed to join-tables, columns, documents,
                          vertices, edges, and properties."
                                button={{text: "Learn More", to: hashRoutes.typeDB.expressivity}}>
                <TypeQLSnippet code={entityRelationshipExampleCode} data={entityRelationshipExampleGraph}/>
            </FeatureWithSnippet>

            <FeatureWithSnippet className={classes.subsectionMargin} examplePosition="right" title="Safety"
                                body="Types provide a way to describe the logical structures of your data, allowing TypeDB to
                          validate that your code inserts and queries data correctly. Query validation goes beyond
                          static type-checking, and includes logical validation of meaningless queries. With strict
                          type-checking errors, you have a dataset that you can trust."
                                button={{text: "Learn More", to: hashRoutes.typeDB.safety}}>
                <TypeQLSnippet code={logicalQueryValidationExampleCode} data={logicalQueryValidationExampleGraph}/>
            </FeatureWithSnippet>

            <FeatureWithSnippet className={classes.subsectionMargin} examplePosition="left" title="Inference"
                                body="TypeDB encodes your data for logical interpretation by its reasoning engine. It enables
                          type-inference and rule-inference, which create logical abstractions of data. This allows the
                          discovery of facts and patterns that would otherwise be too hard to find; and complex queries
                          become much simpler."
                                button={{text: "Learn More", to: hashRoutes.typeDB.inference}}>
                <TypeQLSnippet code={inferenceExampleCode} data={inferenceExampleGraph}/>
            </FeatureWithSnippet>

            <FeatureWithSnippet className={classes.subsectionMargin} examplePosition="right" title="Programmatic API"
                                body="TypeDB's API is provided through a gRPC client, built with robust functionalities that
                          REST cannot provide. TypeDB Clients provide stateful objects, Sessions and Transactions, to
                          interact with the database programmatically. The transactions provide ACID guarantees, up to
                          snapshot isolation."
                                button={{text: "Learn More", to: hashRoutes.typeDB.api}}>
                <PolyglotSnippet id="simple-stateful-api" sources={clientAPIBasicExample}/>
            </FeatureWithSnippet>

            <div className={clsx(classes.mainActionList, classes.actions)}>
                <VaticleButton className={classes.hideMobile} size="small" type="secondary" to={routes.typeDB}>Learn More</VaticleButton>
                <VaticleButton size="small" type="primary" href={urls.github.typedb} target="_blank">Fork/Star on
                    GitHub</VaticleButton>
            </div>
        </section>
    );
}
