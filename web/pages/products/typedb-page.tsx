import React from "react";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { DefaultLayout } from "../../common/layout/default-layout";
import clsx from "clsx";
import { typeDBStyles } from "./products-styles";
import { expressivityExampleCode, expressivityExampleGraph } from "../common/typeql/example/expressivity-example";
import { TypeQLExample } from "../common/typeql/typeql-example";
import { typeHierarchyExampleCode, typeHierarchyExampleGraph } from "../common/typeql/example/type-hierarchy-example";
import { safetyExampleCode, safetyExampleGraph } from "../common/typeql/example/safety-example";

export const TypeDBPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), typeDBStyles());

    return (
        <DefaultLayout>
            <section className={classes.firstSection}>

                <h1 className={classes.h1}>Meet TypeDB and TypeQL</h1>
                <p className={classes.largeText}>
                    TypeDB is a strongly-typed database with a rich and logical type system. TypeDB empowers you to tackle
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

                <TypeQLExample className={classes.subsectionMargin} visualiserPosition="left"
                               code={expressivityExampleCode} graphData={expressivityExampleGraph} title="Entity-Relationship Model"
                               body="TypeDB allows you to model your domain using the well-known Entity-Relationship
                               model at its full expressivity. It is composed of entity types, relationship types, and
                               attribute types. Unlike other modelling languages, Grakn allows you to define type
                               hierarchies, hyper-entities, hyper-relations, and rules to build rich knowledge" buttonText="Documentation"/>

                <TypeQLExample className={classes.subsectionMargin} visualiserPosition="right"
                               code={typeHierarchyExampleCode} graphData={typeHierarchyExampleGraph} title="Type Hierarchies"
                               body="TypeDB alows you to easily model type inheritance into the domain model. Following
                               logical and object-oriented principle, this allows data types to inherit the behaviour
                               and properties of their supertypes. Lorem ipsum dolor sit amet, consectetur adipiscing
                               elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." buttonText="Documentation"/>

                <TypeQLExample className={classes.subsectionMargin} visualiserPosition="left"
                               code={expressivityExampleCode} graphData={expressivityExampleGraph} title="Ternary Relations"
                               body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" buttonText="Documentation"/>

                <TypeQLExample className={classes.subsectionMargin} visualiserPosition="right"
                               code={expressivityExampleCode} graphData={expressivityExampleGraph} title="Nested Relations"
                               body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" buttonText="Documentation"/>
            </section>

            <section className={classes.subsectionMargin}>
                <h2 className={classes.h2}>A higher degree of safety</h2>
                <p className={classes.largeText}>
                    Types provide a way to describe the logical structures of your data, allowing TypeDB to validate
                    that your code is inserting and querying data correctly. Query validation goes beyond static type
                    checking, and includes logical validations of meaningless queries. With strict type-checking errors,
                    you have a dataset that you can trust.
                </p>

                <TypeQLExample className={classes.subsectionMargin} visualiserPosition="left"
                               code={safetyExampleCode} graphData={safetyExampleGraph} title="Logical Data Validation"
                               body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" buttonText="Documentation"/>

                <TypeQLExample className={classes.subsectionMargin} visualiserPosition="right"
                               code={safetyExampleCode} graphData={safetyExampleGraph} title="Semantic Query Validation"
                               body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" buttonText="Documentation"/>
            </section>

            <section className={classes.subsectionMargin}>
                <h2 className={classes.h2}>Evolved with logical inference</h2>
                <p className={classes.largeText}>
                    TypeDB encodes your data for logical interpretation by a reasoning engine. It enables type-inference
                    and rule-inference that creates logical abstractions of data. This allows the discovery of facts and
                    patterns that would otherwise be too hard to find; and complex queries become much simpler.
                </p>

                <TypeQLExample className={classes.subsectionMargin} visualiserPosition="left"
                               code={safetyExampleCode} graphData={safetyExampleGraph} title="Rules"
                               body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" buttonText="Documentation"/>

                <TypeQLExample className={classes.subsectionMargin} visualiserPosition="right"
                               code={safetyExampleCode} graphData={safetyExampleGraph} title="Inference"
                               body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" buttonText="Documentation"/>
            </section>

            <section className={classes.subsectionMargin}>
                <h2 className={classes.h2}>A robust programmatic API</h2>
                <p className={classes.largeText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                </p>

                <TypeQLExample className={classes.subsectionMargin} visualiserPosition="left"
                               code={safetyExampleCode} graphData={safetyExampleGraph} title="Simple & Stateful API"
                               body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" buttonText="Documentation"/>

                <TypeQLExample className={classes.subsectionMargin} visualiserPosition="right"
                               code={safetyExampleCode} graphData={safetyExampleGraph} title="ACID Transactions"
                               body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" buttonText="Documentation"/>
            </section>
        </DefaultLayout>
    );
};
