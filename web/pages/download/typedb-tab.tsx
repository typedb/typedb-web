import React, { useEffect, useState } from "react";
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
        content: () => <OpenSourcePane/>,
    }, {
        title: "Commercial",
        content: () => <CommercialPane/>,
    }];

    return <ComparisonBlock items={items}/>;
}

interface Downloads {
    "Linux": NativeDownloads;
    "Mac OS X": NativeDownloads;
    "Windows": NativeDownloads;
}

type NativeDownloads = {[version: string]: string}

const OpenSourcePane: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const latestReleaseDate = new Date("2021-05-25");
    const latestReleaseDateFormatted = moment(latestReleaseDate).format("Do [of] MMMM YYYY");
    const typeDBVersion = useTypeDBVersion()[0];
    const latestReleaseNotesURL = `${urls.github.typedbReleases}/tag/${typeDBVersion}`;

    const downloads: Downloads = {
        "Linux": {
            "2.1.1": "https://github.com/vaticle/typedb/releases/download/2.1.1/typedb-all-linux-2.1.1.tar.gz",
            "2.0.2": "https://github.com/vaticle/typedb/releases/download/2.0.2/grakn-core-all-linux-2.0.2.tar.gz",
            "2.0.1": "https://github.com/vaticle/typedb/releases/download/2.0.1/grakn-core-all-linux-2.0.1.tar.gz",
            "2.0.0": "https://github.com/vaticle/typedb/releases/download/2.0.0/grakn-core-all-linux-2.0.0.tar.gz",
        },
        "Mac OS X": {
            "2.1.1": "https://github.com/vaticle/typedb/releases/download/2.1.1/typedb-all-mac-2.1.1.zip",
            "2.0.2": "https://github.com/vaticle/typedb/releases/download/2.0.2/grakn-core-all-mac-2.0.2.zip",
            "2.0.1": "https://github.com/vaticle/typedb/releases/download/2.0.1/grakn-core-all-mac-2.0.1.zip",
            "2.0.0": "https://github.com/vaticle/typedb/releases/download/2.0.0/grakn-core-all-mac-2.0.0.zip",
        },
        "Windows": {
            "2.1.1": "https://github.com/vaticle/typedb/releases/download/2.1.1/typedb-all-windows-2.1.1.zip",
            "2.0.2": "https://github.com/vaticle/typedb/releases/download/2.0.2/grakn-core-all-windows-2.0.2.zip",
            "2.0.1": "https://github.com/vaticle/typedb/releases/download/2.0.1/grakn-core-all-windows-2.0.1.zip",
            "2.0.0": "https://github.com/vaticle/typedb/releases/download/2.0.0/grakn-core-all-windows-2.0.0.zip",
        },
    };

    const [selectedOS, setSelectedOS] = useState("Mac OS X");
    const [selectedVersion, setSelectedVersion] = useState("2.1.1");
    const [downloadURL, setDownloadURL] = useState(downloads["Mac OS X"]["2.1.1"]);

    useEffect(() => {
        setDownloadURL(downloads[selectedOS][selectedVersion]);
    }, [selectedOS, selectedVersion]);

    return (
        <>
            <div className={classes.comparisonBlockHeading}>
                <span className={clsx(classes.check, classes.checkGreen, classes.comparisonBlockHeadingCheck)}/>
                <h5 className={clsx(classes.h5, classes.comparisonBlockContent)}>AGPL v3.0 License</h5>
            </div>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                Deploy and operate your TypeDB database immediately. TypeDB is licensed under AGPL so
                that you can start developing quickly and adopt TypeDB within your ecosystem in no time.
            </p>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                Current Stable Release: <strong>TypeDB {typeDBVersion}</strong>
                <br/>
                <strong>{latestReleaseDateFormatted}</strong> <a href={latestReleaseNotesURL} target="_blank">Release Notes</a>
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
                <VaticleSelect label="Operating System" value={selectedOS} setValue={setSelectedOS} inputName="os" inputID="typedb-os" variant="outlined">
                    <option value="Linux">Linux</option>
                    <option value="Mac OS X">Mac OS X</option>
                    <option value="Windows">Windows</option>
                </VaticleSelect>
                <VaticleSelect label="Version" value={selectedVersion} setValue={setSelectedVersion} inputName="version" inputID="typedb-version" variant="outlined">
                    <option value="2.1.1">2.1.1</option>
                    <option value="2.0.2">2.0.2</option>
                    <option value="2.0.1">2.0.1</option>
                    <option value="2.0.0">2.0.0</option>
                </VaticleSelect>
            </div>

            <div className={classes.filler}/>

            <div className={clsx(classes.comparisonBlockContent, classes.mainActionList, classes.subsectionMargin)}>
                <VaticleButton size="small" type="primary" href={downloadURL} download="">Download</VaticleButton>
            </div>
        </>
    );
}

const CommercialPane: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    return (
        <>
            <div className={classes.comparisonBlockHeading}>
                <span className={clsx(classes.check, classes.checkPurple, classes.comparisonBlockHeadingCheck)}/>
                <h5 className={clsx(classes.h5, classes.comparisonBlockContent)}>Commercial License</h5>
            </div>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                If you want to freely integrate TypeDB into your ecosystem, and satisfy all of your organisation's
                requirements, the commercial license gives you that peace of mind.
            </p>

            <div className={classes.comparisonBlockHeading}>
                <span className={clsx(classes.check, classes.checkPurple, classes.comparisonBlockHeadingCheck)}/>
                <h5 className={clsx(classes.h5, classes.comparisonBlockContent)}>Enterprise Support</h5>
            </div>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                Get direct support from our engineers. From development to production, we’re with you every step of
                the way, so you can focus on building your application and your business.
            </p>

            <div className={classes.filler}/>

            <div className={clsx(classes.comparisonBlockContent, classes.mainActionList)}>
                <VaticleButton size="small" type="secondary" className={classes.contentMargin} href="#get-in-touch">
                    Get in touch
                </VaticleButton>
            </div>
        </>
    );
}
