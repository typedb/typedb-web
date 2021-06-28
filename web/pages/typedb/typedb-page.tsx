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
import {simpleStatefulAPIExample} from "./examples/simple-stateful-api-example";
import {nestedRelationsExampleCode, nestedRelationsExampleGraph} from "./examples/nested-relations-example";
import {logicalDataValidationExampleCode, logicalDataValidationExampleGraph} from "./examples/logical-data-validation-example";
import {inferenceExampleCode, inferenceExampleGraph} from "./examples/inference-example";
import {rulesExampleCode, rulesExampleGraph} from "./examples/rules-example";
import {acidTransactionsExampleCode} from "./examples/acid-transactions-example";
import { ConsoleExample } from "../../common/code/console-example";

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

            <section id="expressivity" className={classes.subsectionMargin}>
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
                              model. It is composed of entity types, relation types, and attribute types, with the
                              introduction of role types. TypeDB allows you to leverage the full expressivity of the
                              ER model, and describe your schema through first normal form."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <TypeQLExample code={entityRelationshipExampleCode} data={entityRelationshipExampleGraph}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Type Hierarchies"
                              body="TypeDB allows you to easily model type inheritance into your domain model. Following
                              logical and object-oriented principles, TypeDB allows data types to inherit the behaviours
                              and properties of their supertypes. Complex data structures become reusable, and
                              data interpretation becomes richer through polymorphism."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <TypeQLExample code={typeHierarchyExampleCode} data={typeHierarchyExampleGraph}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="N-ary Relations"
                              body="In the real world, relations aren't just binary connections between two things.
                              In rich systems, we often need to capture three or more things related with each other at
                              once. Representing them as separate binary relationships would lose information. TypeDB
                              can naturally represent arbitrary number of things as one relation."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <TypeQLExample code={ternaryRelationsExampleCode} data={ternaryRelationsExampleGraph}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Nested Relations"
                              body="Relations are concepts we use to describe the association between two or more things.
                              Sometimes, those things can be relations themselves. TypeDB can represent these structures
                              naturally, as it enables relations to be nested in another relation, allowing you to
                              express the model of your system in the most natural form."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <TypeQLExample code={nestedRelationsExampleCode} data={nestedRelationsExampleGraph}/>
                </FeatureBlock>
            </section>

            <section id="safety" className={classes.subsectionMargin}>
                <h2 className={classes.h2}>A higher degree of safety</h2>
                <p className={classes.largeText}>
                    Types provide a way to describe the logical structures of your data, allowing TypeDB to validate
                    that your code inserts and queries data correctly. Query validation goes beyond static type checking,
                    and includes logical validations of meaningless queries. With strict type-checking errors, you have
                    a dataset that you can trust.
                </p>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left"
                              title="Logical Data Validation"
                              body="Inserted data gets validated beyond static type checking of attribute value types.
                              Entities are validated to only have the correct attributes, and relations are validated to
                              only relate things that are logically allowed. TypeDB performs richer validation of inserted
                              entities and relations by evaluating the polymorphic types of the things involved."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <TypeQLExample code={logicalDataValidationExampleCode} data={logicalDataValidationExampleGraph}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right"
                              title="Logical Query Validation"
                              body="Read queries executed on TypeDB go through a type resolution process. This process
                              not only optimises the query's execution, but also acts as a static type checker to reject
                              meaningless and unsatisfiable queries, as they are likely a user error."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <TypeQLExample code={logicalQueryValidationExampleCode} data={logicalQueryValidationExampleGraph}/>
                </FeatureBlock>
            </section>

            <section id="inference" className={classes.subsectionMargin}>
                <h2 className={classes.h2}>Evolved with logical inference</h2>
                <p className={classes.largeText}>
                    TypeDB encodes your data for logical interpretation by a reasoning engine. It enables type-inference
                    and rule-inference that creates logical abstractions of data. This allows the discovery of facts and
                    patterns that would otherwise be too hard to find; and complex queries become much simpler.
                </p>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Rules"
                              body="TypeDB allows you to define rules in your schema. This extends the expressivity of
                              your model as it enables the system to derive new conclusions when a certain logical form
                              in your dataset is satisfied. Like functions in programming, rules can chain onto one
                              another, creating abstractions of behaviour at the data level."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <TypeQLExample code={rulesExampleCode} data={rulesExampleGraph}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="Inference"
                              body="TypeDB's inference facility translates one query into all of its possible
                              interpretations. This happens through two mechanisms: type-based and rule-based inference.
                              Not only does this derive new conclusions and uncovers relationships that would otherwise
                              be hidden, but it also enables the abstraction of complex patterns into simple queries."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <TypeQLExample code={inferenceExampleCode} data={inferenceExampleGraph}/>
                </FeatureBlock>
            </section>

            <section id="api" className={classes.subsectionMargin}>
                <h2 className={classes.h2}>A robust, programmatic API</h2>
                <p className={classes.largeText}>
                    TypeDB's API is provided through a gRPC client, built with robust functionalities that REST cannot
                    provide. TypeDB Clients provide stateful objects, Sessions and Transactions, to interact with the
                    database programmatically. The transactions provide ACID guarantees, up to snapshot isolation.

                </p>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="left" title="Simple & Stateful API"
                              body="TypeDB's API is provided through a gRPC client, providing bi-directional streaming,
                              compression, and strong message typing, that REST APIs could not provide. TypeDB Clients
                              are delivered as libraries in dedicated languages that provide stateful objects, Session
                              and Transactions, for you to interact with the database programmatically."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <PolyglotExample id="simple-stateful-api" sources={simpleStatefulAPIExample}/>
                </FeatureBlock>

                <FeatureBlock className={classes.subsectionMargin} examplePosition="right" title="ACID Transactions"
                              body="TypeDB provides ACID guarantees, up to Snapshot Isolation, through of schema
                              validation and consistent transactions. With lightweight optimistic transactions,
                              TypeDB allows a high number of concurrent read and write transactions. With atomic
                              all-or-nothing commits, transactional semantics become easy to reason over."
                              button={{text: "Documentation", href: urls.docs.home}}>
                    <ConsoleExample code={acidTransactionsExampleCode}/>
                </FeatureBlock>
            </section>

            <section className={clsx(classes.mainActionList, classes.subsectionMargin)}>
                <VaticleButton size="small" type="primary" to={routes.download}>Download
                    TypeDB {typeDBVersion}</VaticleButton>
                <VaticleButton size="small" type="primary" href={urls.github.typedb} target="_blank">Fork/Star on
                    GitHub</VaticleButton>
            </section>

            <section id="scale" className={classes.sectionMargin}>
                <h1 className={classes.h1}>Scale with TypeDB Cluster</h1>
                <p className={classes.largeText}>
                    TypeDB Cluster is the distributed database designed to scale with your organisation. Whether
                    you have a growing dataset, application workload, or user requests, TypeDB Cluster will provide the
                    functionalities needed to take you from development to production and scale.
                </p>

                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="secondary" to={routes.typeDBCluster.page}>Learn More</VaticleButton>
                </div>
            </section>
        </DefaultLayout>
    );
};
