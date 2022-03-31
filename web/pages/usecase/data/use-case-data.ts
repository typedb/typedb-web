interface Link {
    text: string,
    url: string
}

interface Title {
    title: string
}

interface BodySingleParagraph {
    body: string
}

interface BodyMultiParagraph {
    body: string[]
}

type KeyPoint = Title & BodySingleParagraph;

export interface KeyPoints {
    keyPoints: KeyPoint[]
}

type KeyPointPanels = KeyPoints & { keyPointPanelHeight: number };

export interface UseCaseData {
    pageTitle: string,
    introVideoURL: string,
    mainLink: Link,
    whitePaperLink: Link,
    section1: Title & BodyMultiParagraph,
    section2: Title,
    section3: Title & KeyPointPanels,
    section4: Title & KeyPoints,
    section5: Title
}
