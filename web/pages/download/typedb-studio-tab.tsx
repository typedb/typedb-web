import React, {useEffect, useState} from "react";
import {ComparisonBlock, ComparisonBlockItem} from "../../common/comparison/comparison-block";
import {comparisonStyles} from "../../common/comparison/comparison-styles";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {getCurrentOS, OS} from "../../common/util/platform";
import {hashRoutes} from "../router";
import {downloadPageProductStyles} from "./download-styles";
import moment from "moment";
import clsx from "clsx";
import {urls} from "../../common/urls";
import {VaticleSelect} from "../../common/select/select";
import {VaticleButton} from "../../common/button/button";

const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
    title: "Open Source",
    content: () => <OpenSourcePane/>,
}, {
    title: "Commercial",
    content: () => <CommercialPane/>,
}];

// TODO: This tab was copied from TypeDBTab - we should reuse and extend TypeDBTab
export const TypeDBStudioTab: React.FC = () => <ComparisonBlock items={items}/>;

interface Downloads {
    "Ubuntu / Debian": NativeDownloads;
    "Linux (cross-platform)": NativeDownloads;
    "macOS": NativeDownloads;
    "Windows": NativeDownloads;
}

type NativeDownloads = { [version: string]: string }

const defaultOSMap: {[key in OS]: keyof Downloads} = {
    macOS: "macOS",
    iOS: "macOS",
    Linux: "Ubuntu / Debian",
    Windows: "Windows",
    Android: "macOS",
    Other: "macOS",
}

const latestReleaseDateFormatted = moment(new Date("2022-06-24")).format("Do [of] MMMM YYYY");
const studioVersion = "2.10.0-alpha-10";
const latestReleaseNotesURL = `${urls.github.typedbStudioReleases}/tag/${studioVersion}`;
const downloads: Downloads = {
    "Ubuntu / Debian": {
        "2.10.0-alpha-10": "https://github.com/vaticle/typedb-studio/releases/download/2.10.0-alpha-10/typedb-studio_2.10.0-alpha-10-1_amd64.deb",
        "2.1.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.2/typedb-workbase-linux-2.1.2.AppImage",
        "2.1.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.0/typedb-workbase-linux-2.1.0.AppImage",
        "2.0.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.2/grakn-workbase-linux-2.0.2.AppImage",
        "2.0.1": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.1/grakn-workbase-linux-2.0.1.AppImage",
        "2.0.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.0/grakn-workbase-linux-2.0.0.AppImage",
    },
    "Linux (cross-platform)": {
        "2.10.0-alpha-10": "https://github.com/vaticle/typedb-studio/releases/download/2.10.0-alpha-10/typedb-studio-linux-java-binary-2.10.0-alpha-10.tar.gz",
    },
    "macOS": {
        "2.10.0-alpha-10": "https://github.com/vaticle/typedb-studio/releases/download/2.10.0-alpha-10/typedb-studio-mac-2.10.0-alpha-10.dmg",
        "2.1.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.2/typedb-workbase-mac-2.1.2.dmg",
        "2.1.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.0/typedb-workbase-mac-2.1.0.dmg",
        "2.0.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.2/grakn-workbase-mac-2.0.2.dmg",
        "2.0.1": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.1/grakn-workbase-mac-2.0.1.dmg",
        "2.0.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.0/grakn-workbase-mac-2.0.0.dmg",
    },
    "Windows": {
        "2.10.0-alpha-10": "https://github.com/vaticle/typedb-studio/releases/download/2.10.0-alpha-10/typedb-studio-windows-2.10.0-alpha-10.exe",
        "2.1.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.2/typedb-workbase-win-2.1.2.exe",
        "2.1.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.0/typedb-workbase-win-2.1.0.exe",
        "2.0.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.2/grakn-workbase-win-2.0.2.exe",
        "2.0.1": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.1/grakn-workbase-win-2.0.1.exe",
        "2.0.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.0/grakn-workbase-win-2.0.0.exe",
    },
};
const defaultOS: keyof Downloads = defaultOSMap[getCurrentOS()];
const defaultVersion: string = "2.10.0-alpha-10";

const OpenSourcePane: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles(), comparisonStyles());

    const [selectedOS, setSelectedOS] = useState(defaultOS);
    const [selectedVersion, setSelectedVersion] = useState(defaultVersion);
    const [downloadURL, setDownloadURL] = useState(downloads[defaultOS][defaultVersion]);

    const selectOS = (value: keyof Downloads) => {
        setSelectedOS(value);
        if (value == "Linux (cross-platform)") setSelectedVersion(defaultVersion)
    }

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
                Install and develop with TypeDB Studio immediately. TypeDB Studio is licensed under AGPL so
                that you can start developing quickly and adopt TypeDB Studio within your ecosystem in no time.
            </p>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMargin)}>
                Latest Release: <strong>TypeDB Studio {studioVersion}</strong>
                <br/>
                <strong>{latestReleaseDateFormatted}</strong> <a href={latestReleaseNotesURL} target="_blank">Release
                Notes</a>
            </p>

            <div
                className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMargin, classes.selectGroup)}>
                <VaticleSelect label="Operating System" value={selectedOS} setValue={selectOS} inputName="os"
                               inputID="typedb-os" variant="outlined">
                    <option value="Ubuntu / Debian">Ubuntu / Debian</option>
                    <option value="Linux (cross-platform)">Linux (cross-platform)</option>
                    <option value="macOS">macOS</option>
                    <option value="Windows">Windows</option>
                </VaticleSelect>
                <VaticleSelect label="Version" value={selectedVersion} setValue={setSelectedVersion} inputName="version"
                               inputID="typedb-version" variant="outlined">
                    <option value="2.10.0-alpha-10">2.10.0-alpha-10</option>
                    {selectedOS !== "Linux (cross-platform)" &&
                    <>
                        <option value="2.1.2">2.1.2</option>
                        <option value="2.1.0">2.1.0</option>
                        <option value="2.0.2">2.0.2</option>
                        <option value="2.0.1">2.0.1</option>
                        <option value="2.0.0">2.0.0</option>
                    </>}
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
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles(), comparisonStyles());

    return (
        <>
            <div className={classes.comparisonBlockHeading}>
                <span className={clsx(classes.check, classes.checkPurple, classes.comparisonBlockHeadingCheck)}/>
                <h5 className={clsx(classes.h5, classes.comparisonBlockContent)}>Commercial License</h5>
            </div>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMargin)}>
                If you want to freely integrate TypeDB Studio into your ecosystem, and satisfy all of your
                organisation's
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
                <VaticleButton size="small" type="secondary" className={classes.contentMargin} to={hashRoutes.contactSection}>
                    Get in touch
                </VaticleButton>
            </div>
        </>
    );
}
