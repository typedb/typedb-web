import React, {useEffect, useState} from "react";
import moment from "moment";
import {ComparisonBlockItem, DistributionBlock} from "./distribution-block";
import {useTypeDBVersion} from "../../state/typedb-version";
import {VaticleSelect} from "../../common/select/select";
import {VaticleButton} from "../../common/button/button";
import clsx from "clsx";
import {urls} from "../../common/urls";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {downloadPageProductStyles} from "./download-styles";
import { getCurrentOS, OS } from "../../common/util/platform";

export const TypeDBTab: React.FC = () => {
    const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
        title: "Open Source",
        content: () => <OpenSourcePane/>,
    }, {
        title: "Commercial",
        content: () => <CommercialPane/>,
    }];

    return <DistributionBlock items={items}/>;
}

type TypeDBVersion = "2.6.4" | "2.6.3" | "2.6.2" | "2.6.1" | "2.6.0" | "2.5.0" | "2.4.0" | "2.3.3" | "2.3.2" | "2.3.1" | "2.3.0" | "2.2.0" | "2.1.3" | "2.1.1" | "2.0.2" | "2.0.1" | "2.0.0";

interface Downloads {
    "macOS": NativeDownloads;
    "Linux": NativeDownloads;
    "Windows": NativeDownloads;
}

type NativeDownloads = { [version: string]: string }

const defaultOSMap: {[key in OS]: keyof Downloads} = {
    macOS: "macOS",
    iOS: "macOS",
    Linux: "Linux",
    Windows: "Windows",
    Android: "macOS",
    Other: "macOS",
}

const OpenSourcePane: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const latestReleaseDate = new Date("2022-02-16");
    const latestReleaseDateFormatted = moment(latestReleaseDate).format("Do [of] MMMM YYYY");
    const typeDBVersion = useTypeDBVersion()[0];
    const latestReleaseNotesURL = `${urls.github.typedbReleases}/tag/${typeDBVersion}`;

    const downloads: Downloads = {
        "macOS": {
            "2.6.4": "https://github.com/vaticle/typedb/releases/download/2.6.4/typedb-all-mac-2.6.4.zip",
            "2.6.3": "https://github.com/vaticle/typedb/releases/download/2.6.3/typedb-all-mac-2.6.3.zip",
            "2.6.2": "https://github.com/vaticle/typedb/releases/download/2.6.2/typedb-all-mac-2.6.2.zip",
            "2.6.1": "https://github.com/vaticle/typedb/releases/download/2.6.1/typedb-all-mac-2.6.1.zip",
            "2.6.0": "https://github.com/vaticle/typedb/releases/download/2.6.0/typedb-all-mac-2.6.0.zip",
            "2.5.0": "https://github.com/vaticle/typedb/releases/download/2.5.0/typedb-all-mac-2.5.0.zip",
            "2.4.0": "https://github.com/vaticle/typedb/releases/download/2.4.0/typedb-all-mac-2.4.0.zip",
            "2.3.3": "https://github.com/vaticle/typedb/releases/download/2.3.3/typedb-all-mac-2.3.3.zip",
            "2.3.2": "https://github.com/vaticle/typedb/releases/download/2.3.2/typedb-all-mac-2.3.2.zip",
            "2.3.1": "https://github.com/vaticle/typedb/releases/download/2.3.1/typedb-all-mac-2.3.1.zip",
            "2.3.0": "https://github.com/vaticle/typedb/releases/download/2.3.0/typedb-all-mac-2.3.0.zip",
            "2.2.0": "https://github.com/vaticle/typedb/releases/download/2.2.0/typedb-all-mac-2.2.0.zip",
            "2.1.3": "https://github.com/vaticle/typedb/releases/download/2.1.3/typedb-all-mac-2.1.3.zip",
            "2.1.1": "https://github.com/vaticle/typedb/releases/download/2.1.1/typedb-all-mac-2.1.1.zip",
            "2.0.2": "https://github.com/vaticle/typedb/releases/download/2.0.2/grakn-core-all-mac-2.0.2.zip",
            "2.0.1": "https://github.com/vaticle/typedb/releases/download/2.0.1/grakn-core-all-mac-2.0.1.zip",
            "2.0.0": "https://github.com/vaticle/typedb/releases/download/2.0.0/grakn-core-all-mac-2.0.0.zip",
        },
        "Linux": {
            "2.6.4": "https://github.com/vaticle/typedb/releases/download/2.6.4/typedb-all-linux-2.6.4.tar.gz",
            "2.6.3": "https://github.com/vaticle/typedb/releases/download/2.6.3/typedb-all-linux-2.6.3.tar.gz",
            "2.6.2": "https://github.com/vaticle/typedb/releases/download/2.6.2/typedb-all-linux-2.6.2.tar.gz",
            "2.6.1": "https://github.com/vaticle/typedb/releases/download/2.6.1/typedb-all-linux-2.6.1.tar.gz",
            "2.6.0": "https://github.com/vaticle/typedb/releases/download/2.6.0/typedb-all-linux-2.6.0.tar.gz",
            "2.5.0": "https://github.com/vaticle/typedb/releases/download/2.5.0/typedb-all-linux-2.5.0.tar.gz",
            "2.4.0": "https://github.com/vaticle/typedb/releases/download/2.4.0/typedb-all-linux-2.4.0.tar.gz",
            "2.3.3": "https://github.com/vaticle/typedb/releases/download/2.3.3/typedb-all-linux-2.3.3.tar.gz",
            "2.3.2": "https://github.com/vaticle/typedb/releases/download/2.3.2/typedb-all-linux-2.3.2.tar.gz",
            "2.3.1": "https://github.com/vaticle/typedb/releases/download/2.3.0/typedb-all-linux-2.3.1.tar.gz",
            "2.3.0": "https://github.com/vaticle/typedb/releases/download/2.3.0/typedb-all-linux-2.3.0.tar.gz",
            "2.2.0": "https://github.com/vaticle/typedb/releases/download/2.2.0/typedb-all-linux-2.2.0.tar.gz",
            "2.1.3": "https://github.com/vaticle/typedb/releases/download/2.1.3/typedb-all-linux-2.1.3.tar.gz",
            "2.1.1": "https://github.com/vaticle/typedb/releases/download/2.1.1/typedb-all-linux-2.1.1.tar.gz",
            "2.0.2": "https://github.com/vaticle/typedb/releases/download/2.0.2/grakn-core-all-linux-2.0.2.tar.gz",
            "2.0.1": "https://github.com/vaticle/typedb/releases/download/2.0.1/grakn-core-all-linux-2.0.1.tar.gz",
            "2.0.0": "https://github.com/vaticle/typedb/releases/download/2.0.0/grakn-core-all-linux-2.0.0.tar.gz",
        },
        "Windows": {
            "2.6.4": "https://github.com/vaticle/typedb/releases/download/2.6.4/typedb-all-windows-2.6.4.zip",
            "2.6.3": "https://github.com/vaticle/typedb/releases/download/2.6.3/typedb-all-windows-2.6.3.zip",
            "2.6.2": "https://github.com/vaticle/typedb/releases/download/2.6.2/typedb-all-windows-2.6.2.zip",
            "2.6.1": "https://github.com/vaticle/typedb/releases/download/2.6.1/typedb-all-windows-2.6.1.zip",
            "2.6.0": "https://github.com/vaticle/typedb/releases/download/2.6.0/typedb-all-windows-2.6.0.zip",
            "2.5.0": "https://github.com/vaticle/typedb/releases/download/2.5.0/typedb-all-windows-2.5.0.zip",
            "2.4.0": "https://github.com/vaticle/typedb/releases/download/2.4.0/typedb-all-windows-2.4.0.zip",
            "2.3.3": "https://github.com/vaticle/typedb/releases/download/2.3.3/typedb-all-windows-2.3.3.zip",
            "2.3.2": "https://github.com/vaticle/typedb/releases/download/2.3.2/typedb-all-windows-2.3.2.zip",
            "2.3.1": "https://github.com/vaticle/typedb/releases/download/2.3.1/typedb-all-windows-2.3.1.zip",
            "2.3.0": "https://github.com/vaticle/typedb/releases/download/2.3.0/typedb-all-windows-2.3.0.zip",
            "2.2.0": "https://github.com/vaticle/typedb/releases/download/2.2.0/typedb-all-windows-2.2.0.zip",
            "2.1.3": "https://github.com/vaticle/typedb/releases/download/2.1.3/typedb-all-windows-2.1.3.zip",
            "2.1.1": "https://github.com/vaticle/typedb/releases/download/2.1.1/typedb-all-windows-2.1.1.zip",
            "2.0.2": "https://github.com/vaticle/typedb/releases/download/2.0.2/grakn-core-all-windows-2.0.2.zip",
            "2.0.1": "https://github.com/vaticle/typedb/releases/download/2.0.1/grakn-core-all-windows-2.0.1.zip",
            "2.0.0": "https://github.com/vaticle/typedb/releases/download/2.0.0/grakn-core-all-windows-2.0.0.zip",
        },
    };

    const defaultOS: keyof Downloads = defaultOSMap[getCurrentOS()]
    const latestVersion = Object.keys(downloads[defaultOS])[0] as TypeDBVersion;
    const [selectedOS, setSelectedOS] = useState<keyof Downloads>(defaultOS);
    const [selectedVersion, setSelectedVersion] = useState(latestVersion);
    const [downloadURL, setDownloadURL] = useState(downloads[defaultOS][latestVersion]);

    useEffect(() => {
        setDownloadURL(downloads[selectedOS][selectedVersion]);
    }, [selectedOS, selectedVersion]);

    return (
        <>
            <div className={classes.comparisonBlockHeading}>
                <span className={clsx(classes.check, classes.checkGreen, classes.comparisonBlockHeadingCheck)}/>
                <h5 className={clsx(classes.h5, classes.comparisonBlockContent)}>AGPL v3.0 License</h5>
            </div>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMargin)}>
                Deploy and operate your TypeDB database immediately. TypeDB is licensed under AGPL so
                that you can start developing quickly and adopt TypeDB within your ecosystem in no time.
            </p>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMargin)}>
                Latest Release: <strong>TypeDB {typeDBVersion}</strong>
                <br/>
                <strong>{latestReleaseDateFormatted}</strong> <a href={latestReleaseNotesURL} target="_blank">Release
                Notes</a>
            </p>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMargin)}>
                <strong>Download and install with:</strong>
                <br/>
                <ul className={classes.horizontalBulletedList}>
                    <li><a href={urls.docs.installTypeDB.homebrew}>Homebrew</a></li>
                    <li><a href={urls.docs.installTypeDB.apt}>APT</a></li>
                    <li><a href={urls.docs.installTypeDB.docker}>Docker</a></li>
                </ul>
            </p>

            <div
                className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMargin, classes.selectGroup)}>
                <VaticleSelect label="Operating System" value={selectedOS} setValue={setSelectedOS} inputName="os"
                               inputID="typedb-os" variant="outlined">
                    {Object.keys(downloads).map(os => <option value={os}>{os}</option>)}
                </VaticleSelect>
                <VaticleSelect label="Version" value={selectedVersion} setValue={setSelectedVersion} inputName="version"
                               inputID="typedb-version" variant="outlined">
                    {Object.keys(downloads[selectedOS]).map(version => <option value={version}>{version}</option>)}
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
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMargin)}>
                If you want to freely integrate TypeDB into your ecosystem, and satisfy all of your organisation's
                requirements, the commercial license gives you that peace of mind.
            </p>

            <div className={classes.comparisonBlockHeading}>
                <span className={clsx(classes.check, classes.checkPurple, classes.comparisonBlockHeadingCheck)}/>
                <h5 className={clsx(classes.h5, classes.comparisonBlockContent)}>Enterprise Support</h5>
            </div>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMargin)}>
                Get direct support from our engineers. From development to production, we’re with you every step of
                the way, so you can focus on building your application and your business.
            </p>

            <div className={classes.filler}/>

            <div className={clsx(classes.comparisonBlockContent, classes.mainActionList)}>
                <VaticleButton size="small" type="secondary" className={classes.contentMargin} to="#get-in-touch">
                    Get in touch
                </VaticleButton>
            </div>
        </>
    );
}
