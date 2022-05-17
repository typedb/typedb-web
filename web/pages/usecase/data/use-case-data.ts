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

export interface Users {
    users: User[]
}

export interface User {
    name: string
    logo: UserLogo
}

export interface UserLogo {
    src: string
    width?: number
}

export interface UseCaseData {
    pageTitle: string
    introVideoURL: string
    mainLink: Link
    whitePaperLink: HubspotLink
    section1: Title & BodyMultiParagraph
    section2: Title & Image
    section3: Title & KeyPointPanels
    section4: Title & KeyPoints & Partial<BodyMultiParagraph>
    section5?: Users
    section6: Title
}
