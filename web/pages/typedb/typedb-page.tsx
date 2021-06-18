import React from "react";
import {DefaultLayout} from "../../common/layout/default-layout";
import {TypeQLExample} from "../feature/typeql-example";
import {FeatureBlock} from "../feature/feature-block";
import {PolyglotExample} from "../../common/code/polyglot-example";
import {VaticleButton} from "../../common/button/button";
import {useTypeDBVersion} from "../../state/typedb-version";
import clsx from "clsx";
import {routes} from "../router";
import {urls} from "../../common/urls";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {typeDBStyles} from "./typedb-styles";
import {entityRelationshipExampleCode, entityRelationshipExampleGraph} from "./examples/entity-relationship-example";
import {typeHierarchyExampleCode, typeHierarchyExampleGraph} from "./examples/type-hierarchy-example";
import {ternaryRelationsExampleCode, ternaryRelationsExampleGraph} from "./examples/ternary-relations-example";
import {logicalQueryValidationExampleCode, logicalQueryValidationExampleGraph} from "./examples/logical-query-validation-example";
import {simpleStatefulAPIExampleSources} from "./examples/simple-stateful-api-example";
import {nestedRelationsExampleCode, nestedRelationsExampleGraph} from "./examples/nested-relations-example";
import {
    logicalDataValidationExampleCode,
    logicalDataValidationExampleGraph
} from "./examples/logical-data-validation-example";

export const TypeDBPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), typeDBStyles());

    const typeDBVersion = useTypeDBVersion()[0];

    return (
        <DefaultLayout>
            <section className={classes.firstSection}>

                <h1 className={classes.h1}>Meet TypeDB and TypeQL</h1>
                <p className={classes.largeText}>
                    TypeDB is a strongly-typed database with a rich and logical type system. TypeDB empowers you to
                    tackle
                    complex problems, and TypeQL is its query language.
                </p>

                <hr className={clsx(classes.subsectionMargin, classes.shortDivider)}/>
            </section>

            <section className={classes.subsectionMargin}>
                <h2 className={classes.h2}>A higher level of expressivity</h2>
                <p className={classes.largeText}>
                    TypeDB allows you to model your domain based on logical and object-oriented principles. Composed of
                    entity, relationship, and attribute types, as well as type hierarchies, roles, and rules, TypeDB
                    allows you to think higher-level as opposed to join-tables, columns, documents, vertices, edges,
                    and properties.
                </p>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left"
                              title="Entity-Relationship Model"
                              body="TypeDB allows you to model your domain using the well-known Entity-Relationship
                               model at its full expressivity. It is composed of entity types, relationship types, and
                               attribute types. Unlike other modelling languages, Grakn allows you to define type
                               hierarchies, hyper-entities, hyper-relations, and rules to build rich knowledge"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <TypeQLExample code={entityRelationshipExampleCode} data={entityRelationshipExampleGraph}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Type Hierarchies"
                              body="TypeDB alows you to easily model type inheritance into the domain model. Following
                               logical and object-oriented principle, this allows data types to inherit the behaviour
                               and properties of their supertypes. Lorem ipsum dolor sit amet, consectetur adipiscing
                               elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <TypeQLExample code={typeHierarchyExampleCode} data={typeHierarchyExampleGraph}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Ternary Relations"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <TypeQLExample code={ternaryRelationsExampleCode} data={ternaryRelationsExampleGraph}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Nested Relations"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <TypeQLExample code={nestedRelationsExampleCode} data={nestedRelationsExampleGraph}/>
                </FeatureBlock>
            </section>

            <section className={classes.subsectionMargin}>
                <h2 className={classes.h2}>A higher degree of safety</h2>
                <p className={classes.largeText}>
                    Types provide a way to describe the logical structures of your data, allowing TypeDB to validate
                    that your code is inserting and querying data correctly. Query validation goes beyond static type
                    checking, and includes logical validations of meaningless queries. With strict type-checking errors,
                    you have a dataset that you can trust.
                </p>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left"
                              title="Logical Data Validation"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <TypeQLExample code={logicalDataValidationExampleCode} data={logicalDataValidationExampleGraph}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right"
                              title="Logical Query Validation"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <TypeQLExample code={logicalQueryValidationExampleCode} data={logicalQueryValidationExampleGraph}/>
                </FeatureBlock>
            </section>

            <section className={classes.subsectionMargin}>
                <h2 className={classes.h2}>Evolved with logical inference</h2>
                <p className={classes.largeText}>
                    TypeDB encodes your data for logical interpretation by a reasoning engine. It enables type-inference
                    and rule-inference that creates logical abstractions of data. This allows the discovery of facts and
                    patterns that would otherwise be too hard to find; and complex queries become much simpler.
                </p>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Rules"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <TypeQLExample code={logicalQueryValidationExampleCode} data={logicalQueryValidationExampleGraph}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Inference"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <TypeQLExample code={logicalQueryValidationExampleCode} data={logicalQueryValidationExampleGraph}/>
                </FeatureBlock>
            </section>

            <section className={classes.subsectionMargin}>
                <h2 className={classes.h2}>A robust programmatic API</h2>
                <p className={classes.largeText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                </p>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Simple & Stateful API"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <PolyglotExample id="simple-stateful-api" sources={simpleStatefulAPIExampleSources}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="ACID Transactions"
                              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
                              button={{text: "Documentation", disabled: true, comingSoon: true}}>
                    <PolyglotExample id="acid-transactions" sources={simpleStatefulAPIExampleSources}/>
                </FeatureBlock>
            </section>

            <section className={clsx(classes.mainActionList, classes.subsectionMargin)}>
                <VaticleButton size="small" type="primary" to={routes.download}>Download
                    TypeDB {typeDBVersion}</VaticleButton>
                <VaticleButton size="small" type="primary" href={urls.github.typedb} target="_blank">Fork/Star on
                    GitHub</VaticleButton>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>Scale with TypeDB Cluster</h1>
                <p className={classes.largeText}>
                    TypeDB Cluster is the distributed database designed to scale with your organisation. Whether
                    you have a growing dataset, application workload, or user requests, TypeDB Cluster will provide the
                    functionalities needed to take you from development to production and scale.
                </p>

                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="secondary" disabled comingSoon>Learn More</VaticleButton>
                </div>
            </section>
        </DefaultLayout>
    );
};
