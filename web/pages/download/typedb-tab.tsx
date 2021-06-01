import React, { useState } from "react";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { downloadPageProductStyles } from "./download-styles";
import moment from "moment";
import { useTypeDBVersion } from "../state/typedb-version";
import clsx from "clsx";
import { urls } from "../../common/urls";
import { VaticleSelect } from "../../common/select/select";
import { VaticleButton } from "../../common/button/button";
import { ComparisonBlock, ComparisonBlockItem } from "./comparison-block";

export const TypeDBTab: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
        title: "Open Source",
        content: () => <OpenSourcePane latestReleaseDate={new Date("2021-05-25")}/>,
    }, {
        title: "Commercial",
        content: () => <p/>,
    }];

    return (
        <>
            <p className={classes.largeText}>
                TypeDB is a knowledge graph to organise complex networks of data and make it queryable. TypeQL is TypeDB’s
                reasoning (through OLTP) and analytics (through OLAP) declarative query language. <a>Learn more</a>
            </p>
            <ComparisonBlock items={items} className={classes.sectionMarginSmall}/>
        </>
    );
}

interface OpenSourcePaneProps {
    latestReleaseDate: Date;
}

const OpenSourcePane: React.FC<OpenSourcePaneProps> = ({latestReleaseDate}) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const latestReleaseDateFormatted = moment(latestReleaseDate).format("Do [of] MMMM YYYY");
    const typeDBVersion = useTypeDBVersion()[0];

    const [selectedOS, setSelectedOS] = useState("Mac OS X");
    const [selectedVersion, setSelectedVersion] = useState("2.1.1");

    return (
        <>
            <div className={classes.comparisonBlockHeading}>
                <span className={clsx(classes.check, classes.checkGreen, classes.comparisonBlockHeadingCheck)}/>
                <h5 className={clsx(classes.h5, classes.comparisonBlockContent)}>AGPL v3.0 License</h5>
            </div>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                Deploy and operate your TypeDB knowledge graph immediately. TypeDB is licensed under AGPL so
                that you can start developing quickly and adopt TypeDB within your solution in no time.
            </p>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                Current Stable Release: <strong>TypeDB {typeDBVersion}</strong>
                <br/>
                <strong>{latestReleaseDateFormatted}</strong> <a>Release Notes</a>
            </p>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                <strong>Download and install with:</strong>
                <br/>
                <ul className={classes.horizontalBulletedList}>
                    <li><a href={urls.docs.installTypeDB.homebrew}>Homebrew</a></li>
                    <li><a href={urls.docs.installTypeDB.apt}>APT</a></li>
                    <li><a href={urls.docs.installTypeDB.docker}>Docker</a></li>
                </ul>
            </p>

            <div className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge, classes.selectGroup)}>
                <VaticleSelect label="Operating System" value={selectedOS} setValue={setSelectedOS} inputName="os" inputID="typedb-os">
                    <option value="Linux">Linux</option>
                    <option value="Mac OS X">Mac OS X</option>
                    <option value="Windows">Windows</option>
                </VaticleSelect>
                <VaticleSelect label="Version" value={selectedVersion} setValue={setSelectedVersion} inputName="version" inputID="typedb-version">
                    <option value="2.1.1">2.1.1</option>
                    <option value="2.0.2">2.0.2</option>
                    <option value="2.0.1">2.0.1</option>
                    <option value="2.0.0">2.0.0</option>
                </VaticleSelect>
            </div>

            <div className={clsx(classes.comparisonBlockContent, classes.mainActionList, classes.sectionMarginSmall)}>
                <VaticleButton size="small" type="primary" href={urls.github.typedbReleases} target="_blank">Download</VaticleButton>
            </div>
        </>
    );
}
