import React from "react";
import { KeyPointPanel, KeyPointPanels } from "../../common/keypoint/key-point-panels";
import {VaticleLayout} from "../../common/layout/layout";
import {VaticleButton} from "../../common/button/button";
import clsx from "clsx";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import { UseCaseData } from "./data/use-case-data";
import { useCaseStyles } from "./use-case-styles";
import HighAvailabilityIcon from "../../assets/icons/high-availability.svg";
import { KeyPointTable } from "../../common/keypoint/key-point-table";

export const UseCasePage: React.FC<UseCaseData> = ({ pageTitle, mainLink, whitePaperLink, section1, section2, section3, section4, section5}) => {
    const classes = Object.assign({}, vaticleStyles(), useCaseStyles());
    const keyPointPanelMobileHeight = 344;

    return (
        <VaticleLayout>
            <section className={classes.firstSectionMargin}>
                <h1 className={classes.h1}>{pageTitle}</h1>
                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="primary" href={mainLink.url} target="_blank">{mainLink.text}</VaticleButton>
                </div>
            </section>

            <section className={classes.sectionMargin}>
                <h2 className={classes.h2}>{section1.title}</h2>
                {section1.body.map(text => <p className={clsx(classes.headlineText, classes.introBody)}>{text}</p>)}
                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="secondary" href={whitePaperLink.url} target="_blank">{whitePaperLink.text}</VaticleButton>
                </div>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>{section2.title}</h1>
            </section>

            <section className={classes.sectionMargin}>
                <h1 className={classes.h1}>{section3.title}</h1>
                <KeyPointPanels className={classes.subsectionMargin} panelHeight={{desktop: 408, mobile: keyPointPanelMobileHeight}}>
                {section3.keyPoints.map(feature =>
                    <KeyPointPanel data={{name: feature.title, icon: HighAvailabilityIcon}} horizontalPadding={20}
                                   mobileHeight={keyPointPanelMobileHeight}>{feature.body}
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
        </VaticleLayout>
    );
};
