import React, { useLayoutEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { VaticleDialog } from "../../common/dialog/dialog";
import { YoutubeVideoEmbed } from "../../common/embed/youtube-video-embed";
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
    const keyPointPanelMobileHeight = 344;

    const [downloadFormOpen, setDownloadFormOpen] = useState(false);
    const [downloadErrorSnackbarOpen, setDownloadErrorSnackbarOpen] = useState(false);

    const routerHistory = useHistory();
    const routerLocation = useLocation();

    useLayoutEffect(() => {
        setDownloadFormOpen(getSearchParam("dialog") === "download-white-paper");
    }, [routerLocation.search]);

    const onDownloadFormSubmitDone = (res: Response) => {
        if (res.ok) {
            deleteSearchParam(routerHistory, routerLocation, "dialog");
            window.open(whitePaperLink.url, "_blank");
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
                {section1.body.map(text => <p className={clsx(classes.headlineText, classes.introBody)}>{text}</p>)}
                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="secondary" to="?dialog=download-white-paper">{whitePaperLink.text}</VaticleButton>
                </div>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>{section2.title}</h1>
                <img src={section2.image.url} alt={section2.image.altText} className={clsx(classes.subsectionMargin, classes.section2Image)}/>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>{section3.title}</h1>
                <KeyPointPanels className={classes.subsectionMargin} panelHeight={{desktop: 408, mobile: keyPointPanelMobileHeight}}>
                {section3.keyPoints.map(keyPoint =>
                    <KeyPointPanel data={{name: keyPoint.title, icon: keyPoint.icon}} horizontalPadding={20}
                                   mobileHeight={keyPointPanelMobileHeight}>{keyPoint.body}
                    </KeyPointPanel>
                )}
                </KeyPointPanels>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>{section4.title}</h1>
                <KeyPointTable className={classes.subsectionMargin} keyPoints={section4.keyPoints}/>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>{section5.title}</h1>
                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="primary" href={mainLink.url} target="_blank">{mainLink.text}</VaticleButton>
                    <VaticleButton size="small" type="secondary" href={whitePaperLink.url} target="_blank">{whitePaperLink.text}</VaticleButton>
                </div>
            </section>

            <VaticleDialog open={downloadFormOpen} setOpen={setDownloadFormOpen}>
                <WhitePaperForm hubspotFormID={whitePaperLink.hubspotFormID} onSubmitDone={onDownloadFormSubmitDone}/>
            </VaticleDialog>
            <VaticleSnackbar variant="error" message="An error has occurred, please try again later." open={downloadErrorSnackbarOpen} setOpen={setDownloadErrorSnackbarOpen}/>
        </VaticleLayout>
    );
};
