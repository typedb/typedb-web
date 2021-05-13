import { ClassProps } from "../common/class-props";
import { commonStyles } from "../common/ui/common-styles";
import { homePageStyles } from "./home-styles";
import { TypeQLExample } from "./typeql-example";
import { studentHierarchyCode, studentHierarchyGraph } from "../common/ui/typeql/samples/student-hierarchy";
import { transitiveLocationCode, transitiveLocationGraph } from "../common/ui/typeql/samples/transitive-location";
import { locationDataCode, locationDataGraph } from "../common/ui/typeql/samples/location-data";
import clsx from "clsx";
import { VaticleButton } from "../common/ui/button/button";
import { downloadTypeDBURL, githubURL } from "../common/urls";
import React from "react";

interface TypeQLExamplesSectionProps extends ClassProps {
    typeDBVersion: string;
}

export const TypeQLExamplesSection: React.FC<TypeQLExamplesSectionProps> = ({className, typeDBVersion}) => {
    const classes = Object.assign({}, commonStyles(), homePageStyles());

    return (
        <section className={className}>
            <h1 className={classes.h1}>Strong type systems make complex problems easier to tackle</h1>
            <p className={classes.largeText}>
                Vaticle TypeDB provides a strong type system for developers to break down complex problems into
                meaningful and logical systems. Through TypeQL, TypeDB provide strong abstractions over
                low-level and complex data patterns.
            </p>

            <TypeQLExample className={classes.sectionMarginSmall} visualiserPosition="left"
                           code={studentHierarchyCode} graphData={studentHierarchyGraph} title="Expressivity"
                           body="Vaticle TypeDB allows you to model your domain through the well-known Entity-Relationship model,
                                     but at its fullest expressivity. It's composed of entity, relationship, and attribute types,
                                     and also type hierarchies, roles, and rules, allowing you to build expressive datasets
                                     based-on logical and object-oriented principles."/>

            <TypeQLExample className={classes.sectionMarginLarge} visualiserPosition="right"
                           code={transitiveLocationCode} graphData={transitiveLocationGraph} title="Safety"
                           body="Types provide a way to describe the logical structures of your data, allowing Vaticle TypeDB
                                     to validate that your code is inserting data correctly. Data validation goes beyond static type
                                     checking, and includes logical validations of inferrable data patterns. With strict type-checking
                                     errors, you have a dataset that you can trust."/>

            <TypeQLExample className={classes.sectionMarginLarge} visualiserPosition="left"
                           code={locationDataCode} graphData={locationDataGraph} title="Simplicity"
                           body="Vaticle TypeDB derives all possible interpretations of a query, through type-based and
                                     rule-based inference. Complex and verbose data patterns can be queried through simple and
                                     intuitive TypeQL queries. TypeDB also optimises the traversal path of query execution.
                                     As a result, TypeDB significantly reduces complexity of applications."/>

            <div className={clsx(classes.mainActionList, classes.sectionMarginSmall)}>
                <VaticleButton size="small" type="primary" href={downloadTypeDBURL} target="_blank">Download {typeDBVersion}</VaticleButton>
                <VaticleButton size="small" type="primary" href={githubURL} target="_blank">Fork/Star on GitHub</VaticleButton>
            </div>
        </section>
    );
}
