import React from "react";

interface Link {
    text: string,
    url: string
}

interface HubspotLink extends Link {
    hubspotFormID: string
}

interface Title {
    title: string
}

interface ImageData {
    url: string
    altText: string
}

interface Image {
    image: ImageData
}

interface BodySingleParagraph {
    body: string
}

interface BodyMultiParagraph {
    body: string[]
}

type BodyMultiParagraphOptional = Partial<BodyMultiParagraph>;

interface Icon {
    icon: React.FC
}

type KeyPoint = Title & BodySingleParagraph;

export interface KeyPoints {
    keyPoints: KeyPoint[]
}

type KeyPointPanel = KeyPoint & Icon;

export interface KeyPointPanels {
    keyPoints: KeyPointPanel[]
    keyPointPanelHeight: { desktop: number, mobile: number }
}

export interface UseCaseData {
    pageTitle: string,
    introVideoURL: string,
    mainLink: Link,
    whitePaperLink: HubspotLink,
    section1: Title & BodyMultiParagraph,
    section2: Title & Image,
    section3: Title & KeyPointPanels,
    section4: Title & KeyPoints & BodyMultiParagraphOptional,
    section5: Title
}
