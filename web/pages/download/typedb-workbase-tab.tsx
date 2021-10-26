import React, {useEffect, useState} from "react";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {downloadPageProductStyles} from "./download-styles";
import moment from "moment";
import clsx from "clsx";
import {urls} from "../../common/urls";
import {VaticleSelect} from "../../common/select/select";
import {VaticleButton} from "../../common/button/button";
import {ComparisonBlockItem, DistributionBlock} from "./distribution-block";

// TODO: This tab was copied from TypeDBTab - we should reuse and extend TypeDBTab
export const TypeDBWorkbaseTab: React.FC = () => {
    const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
        title: "Open Source",
        content: () => <OpenSourcePane/>,
    }, {
        title: "Commercial",
        content: () => <CommercialPane/>,
    }];

    return <DistributionBlock items={items}/>;
}

interface Downloads {
    "Ubuntu / Debian": NativeDownloads;
    "Linux (cross-platform)": NativeDownloads;
    "macOS": NativeDownloads;
    "Windows": NativeDownloads;
}

type NativeDownloads = { [version: string]: string }

const OpenSourcePane: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const latestReleaseDate = new Date("2021-10-26 17:00:00");
    const latestReleaseDateFormatted = moment(latestReleaseDate).format("Do [of] MMMM YYYY");
    const workbaseVersion = "2.4.0-alpha-3";
    const latestReleaseNotesURL = `${urls.github.typedbWorkbaseReleases}/tag/${workbaseVersion}`;

    const downloads: Downloads = {
        "Ubuntu / Debian": {
            "2.4.0-alpha-3": "https://github.com/vaticle/typedb-studio/releases/download/2.4.0-alpha-3/typedb-studio-linux_2.4.0-alpha-3-1_amd64.deb",
            "2.1.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.2/typedb-workbase-linux-2.1.2.AppImage",
            "2.1.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.0/typedb-workbase-linux-2.1.0.AppImage",
            "2.0.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.2/grakn-workbase-linux-2.0.2.AppImage",
            "2.0.1": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.1/grakn-workbase-linux-2.0.1.AppImage",
            "2.0.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.0/grakn-workbase-linux-2.0.0.AppImage",
        },
        "Linux (cross-platform)": {
            "2.4.0-alpha-3": "https://github.com/vaticle/typedb-studio/releases/download/2.4.0-alpha-3/typedb-studio-linux-java-binary-2.4.0-alpha-3.tar.gz",
        },
        "macOS": {
            "2.4.0-alpha-3": "https://github.com/vaticle/typedb-studio/releases/download/2.4.0-alpha-3/typedb-studio-mac-2.4.0-alpha-3.dmg",
            "2.1.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.2/typedb-workbase-mac-2.1.2.dmg",
            "2.1.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.0/typedb-workbase-mac-2.1.0.dmg",
            "2.0.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.2/grakn-workbase-mac-2.0.2.dmg",
            "2.0.1": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.1/grakn-workbase-mac-2.0.1.dmg",
            "2.0.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.0/grakn-workbase-mac-2.0.0.dmg",
        },
        "Windows": {
            "2.4.0-alpha-3": "https://github.com/vaticle/typedb-studio/releases/download/2.4.0-alpha-3/typedb-studio-windows-2.4.0-alpha-3.exe",
            "2.1.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.2/typedb-workbase-win-2.1.2.exe",
            "2.1.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.0/typedb-workbase-win-2.1.0.exe",
            "2.0.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.2/grakn-workbase-win-2.0.2.exe",
            "2.0.1": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.1/grakn-workbase-win-2.0.1.exe",
            "2.0.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.0/grakn-workbase-win-2.0.0.exe",
        },
    };

    const [selectedOS, setSelectedOS] = useState("macOS");
    const [selectedVersion, setSelectedVersion] = useState("2.4.0-alpha-3");
    const [downloadURL, setDownloadURL] = useState(downloads["macOS"]["2.4.0-alpha-3"]);

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
                Latest Release: <strong>TypeDB Studio {workbaseVersion}</strong>
                <br/>
                <strong>{latestReleaseDateFormatted}</strong> <a href={latestReleaseNotesURL} target="_blank">Release
                Notes</a>
            </p>

            <div
                className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMargin, classes.selectGroup)}>
                <VaticleSelect label="Operating System" value={selectedOS} setValue={setSelectedOS} inputName="os"
                               inputID="typedb-os" variant="outlined">
                    <option value="Debian / Ubuntu">Debian / Ubuntu</option>
                    <option value="Linux (cross-platform)">Linux (cross-platform)</option>
                    <option value="macOS">macOS</option>
                    <option value="Windows">Windows</option>
                </VaticleSelect>
                <VaticleSelect label="Version" value={selectedVersion} setValue={setSelectedVersion} inputName="version"
                               inputID="typedb-version" variant="outlined">
                    <option value="2.4.0-alpha-3">2.4.0-alpha-3</option>
                    <option value="2.1.2">2.1.2</option>
                    <option value="2.1.0">2.1.0</option>
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
                <VaticleButton size="small" type="secondary" className={classes.contentMargin} to="#get-in-touch">
                    Get in touch
                </VaticleButton>
            </div>
        </>
    );
}
