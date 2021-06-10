import React, { useEffect, useState } from "react";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { downloadPageProductStyles } from "./download-styles";
import moment from "moment";
import clsx from "clsx";
import { urls } from "../../common/urls";
import { VaticleSelect } from "../../common/select/select";
import { VaticleButton } from "../../common/button/button";
import { ComparisonBlock, ComparisonBlockItem } from "./comparison-block";

// TODO: This tab was copied from TypeDBTab - we should reuse and extend TypeDBTab
export const TypeDBWorkbaseTab: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
        title: "Open Source",
        content: () => <OpenSourcePane/>,
    }, {
        title: "Commercial",
        content: () => <CommercialPane/>,
    }];

    return (
        <>
            <ComparisonBlock items={items}/>
        </>
    );
}

interface Downloads {
    "Linux": NativeDownloads;
    "Mac OS X": NativeDownloads;
    "Windows": NativeDownloads;
}

type NativeDownloads = {[version: string]: string}

const OpenSourcePane: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const latestReleaseDate = new Date("2021-05-20 19:04:00");
    const latestReleaseDateFormatted = moment(latestReleaseDate).format("Do [of] MMMM YYYY");
    const typeDBVersion = "2.1.0";
    const latestReleaseNotesURL = `${urls.github.typedbWorkbaseReleases}/tag/${typeDBVersion}`;

    const downloads: Downloads = {
        "Linux": {
            "2.1.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.0/typedb-workbase-linux-2.1.0.AppImage",
            "2.0.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.2/grakn-workbase-linux-2.0.2.AppImage",
            "2.0.1": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.1/grakn-workbase-linux-2.0.1.AppImage",
            "2.0.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.0/grakn-workbase-linux-2.0.0.AppImage",
        },
        "Mac OS X": {
            "2.1.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.0/typedb-workbase-mac-2.1.0.dmg",
            "2.0.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.2/grakn-workbase-mac-2.0.2.dmg",
            "2.0.1": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.1/grakn-workbase-mac-2.0.1.dmg",
            "2.0.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.0/grakn-workbase-mac-2.0.0.dmg",
        },
        "Windows": {
            "2.1.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.1.0/typedb-workbase-win-2.1.0.exe",
            "2.0.2": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.2/grakn-workbase-win-2.0.2.exe",
            "2.0.1": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.1/grakn-workbase-win-2.0.1.exe",
            "2.0.0": "https://github.com/vaticle/typedb-workbase/releases/download/2.0.0/grakn-workbase-win-2.0.0.exe",
        },
    };

    const [selectedOS, setSelectedOS] = useState("Mac OS X");
    const [selectedVersion, setSelectedVersion] = useState("2.1.0");
    const [downloadURL, setDownloadURL] = useState(downloads["Mac OS X"]["2.1.0"]);

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
                Install and develop with TypeDB Workbase immediately. TypeDB Workbase is licensed under AGPL so
                that you can start developing quickly and adopt TypeDB Workbase within your ecosystem in no time.
            </p>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                Current Stable Release: <strong>TypeDB Workbase {typeDBVersion}</strong>
                <br/>
                <strong>{latestReleaseDateFormatted}</strong> <a href={latestReleaseNotesURL} target="_blank">Release Notes</a>
            </p>

            <div className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge, classes.selectGroup)}>
                <VaticleSelect label="Operating System" value={selectedOS} setValue={setSelectedOS} inputName="os" inputID="typedb-os" variant="outlined">
                    <option value="Linux">Linux</option>
                    <option value="Mac OS X">Mac OS X</option>
                    <option value="Windows">Windows</option>
                </VaticleSelect>
                <VaticleSelect label="Version" value={selectedVersion} setValue={setSelectedVersion} inputName="version" inputID="typedb-version" variant="outlined">
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
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                If you want to freely integrate TypeDB Workbase into your ecosystem, and satisfy all of your organisation's
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
                <VaticleButton size="small" type="secondary" className={classes.contentMargin} hashLink="#get-in-touch">
                    Get in touch
                </VaticleButton>
            </div>
        </>
    );
}
