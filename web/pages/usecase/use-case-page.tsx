import React, { useLayoutEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { VaticleDialog } from "../../common/dialog/dialog";
import { YoutubeVideoEmbed } from "../../common/embed/youtube-video-embed";
import { MacOSWindow } from "../../common/graphics/macos-window";
import { KeyPointPanel, KeyPointPanels } from "../../common/keypoint/key-point-panels";
import {VaticleLayout} from "../../common/layout/layout";
import {VaticleButton} from "../../common/button/button";
import clsx from "clsx";
import { VaticleSnackbar } from "../../common/snackbar/snackbar";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import { deleteSearchParam, getSearchParam } from "../../common/util/search-params";
import { UseCaseData } from "./data/use-case-data";
import { useCaseStyles } from "./use-case-styles";
import { KeyPointTable } from "../../common/keypoint/key-point-table";
import { WhitePaperForm } from "./white-paper-form";

export const UseCasePage: React.FC<UseCaseData> = ({ pageTitle, mainLink, whitePaperLink, introVideoURL, section1, section2, section3, section4, section5}) => {
    const classes = Object.assign({}, vaticleStyles(), useCaseStyles());

    const [downloadFormOpen, setDownloadFormOpen] = useState(false);
    const [downloadErrorSnackbarOpen, setDownloadErrorSnackbarOpen] = useState(false);

    const routerHistory = useHistory();
    const routerLocation = useLocation();

    useLayoutEffect(() => {
        setDownloadFormOpen(getSearchParam("dialog") === "download-white-paper");
    }, [routerLocation.search]);

    const download = (url: string) => {
        const link = document.createElement("a");
        link.setAttribute("download", "");
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const onDownloadFormSubmitDone = (res: Response) => {
        if (res.ok) {
            deleteSearchParam(routerHistory, routerLocation, "dialog");
            download(whitePaperLink.url);
        } else {
            setDownloadErrorSnackbarOpen(true);
        }
    };

    return (
        <VaticleLayout>
            <section className={classes.firstSectionMargin}>
                <h1 className={classes.h1}>{pageTitle}</h1>
                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="primary" href={mainLink.url} target="_blank">{mainLink.text}</VaticleButton>
                </div>

                <YoutubeVideoEmbed url={introVideoURL} className={classes.subsectionMargin}/>

                <h2 className={clsx(classes.h2, classes.subsectionMargin)}>{section1.title}</h2>
                {section1.body.map(text => <p className={clsx(classes.mediumText, classes.textMargin, classes.introBody)}>{text}</p>)}
                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="secondary" to="?dialog=download-white-paper">{whitePaperLink.text}</VaticleButton>
                </div>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>{section2.title}</h1>
                <MacOSWindow width={760} mobileScale={0.5} mobileVerticalMargin={-138} className={classes.subsectionMargin}>
                    <img src={section2.image.url} alt={section2.image.altText} className={classes.section2Image}/>
                </MacOSWindow>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>{section3.title}</h1>
                <KeyPointPanels className={classes.subsectionMargin} panelHeight={section3.keyPointPanelHeight}>
                {section3.keyPoints.map(keyPoint =>
                    <KeyPointPanel data={{name: keyPoint.title, icon: keyPoint.icon}} horizontalPadding={20}
                                   mobileHeight={section3.keyPointPanelHeight.mobile}>{keyPoint.body}
                    </KeyPointPanel>
                )}
                </KeyPointPanels>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>{section4.title}</h1>
                <KeyPointTable className={clsx(classes.section4KeyPoints, classes.contentMargin)} keyPoints={section4.keyPoints}/>
                {section4.body &&
                <div className={classes.contentMargin}>
                    {section4.body.map(text => <p className={clsx(classes.mediumText, classes.textMargin, classes.introBody)}>{text}</p>)}
                </div>}
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>{section5.title}</h1>
                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="primary" href={mainLink.url} target="_blank">{mainLink.text}</VaticleButton>
                    <VaticleButton size="small" type="secondary" to="?dialog=download-white-paper">{whitePaperLink.text}</VaticleButton>
                </div>
            </section>

            <VaticleDialog open={downloadFormOpen} setOpen={setDownloadFormOpen}>
                <WhitePaperForm hubspotFormID={whitePaperLink.hubspotFormID} onSubmitDone={onDownloadFormSubmitDone}/>
            </VaticleDialog>
            <VaticleSnackbar variant="error" message="An error has occurred, please try again later." open={downloadErrorSnackbarOpen} setOpen={setDownloadErrorSnackbarOpen}/>
        </VaticleLayout>
    );
};
