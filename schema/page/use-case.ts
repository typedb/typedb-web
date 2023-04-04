import { DocumentIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType } from "@sanity/types";
import { bodyFieldRichText, collapsibleOptions, isVisibleField, keyPointsField, pageTitleField, routeField, titleAndBodyFields, videoURLField } from "../common-fields";
import { linkPanelSchemaName } from "../component/link-panel";
import { KeyPoint, SanityKeyPoint } from "../key-point";
import { RichText, SanityBodyText, SanityPortableText, SanityTitleAndBody, TitleAndBody } from "../text";
import { schemaName } from "../util";
import { Page, SanityPage } from "./common";

const displayedSections = "displayedSections";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    requirements: { id: "requirementsSection", title: "Requirements" },
    challenges: { id: "challengesSection", title: "Challenges" },
    solution: { id: "solutionSection", title: "Solution" },
    example: { id: "exampleSection", title: "Example" },
    furtherReading: { id: "furtherReadingSection", title: "Further Reading" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = typeof sections[SectionKey]["id"];

export interface SanityUseCasePage extends SanityPage {
    [displayedSections]: SectionID[];
    [sections.intro.id]: SanityIntroSection;
    [sections.requirements.id]: SanityKeyPointsSection;
    [sections.challenges.id]: SanityKeyPointsSection;
    [sections.solution.id]: SanityKeyPointsSection;
    [sections.example.id]: SanityExampleSection;
    [sections.furtherReading.id]: SanityFurtherReadingSection;
}

interface SanityIntroSection extends SanityTitleAndBody {
    videoURL: string;
    links: SanityLinkPanel[];
}

type SanityLinkPanel = { title: string, description: SanityPortableText; url: string };

interface SanityKeyPointsSection extends SanityBodyText {
    keyPoints: SanityKeyPoint[];
}

interface SanityExampleSection extends SanityBodyText {
}

interface SanityFurtherReadingSection extends SanityBodyText {
    links: SanityLinkPanel[];
}

export class UseCasePage extends Page {
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.challenges.id]?: KeyPointsSection;

    constructor(data: SanityUseCasePage) {
        super(data);
        this.introSection = data.displayedSections.includes(sections.intro.id) ? new IntroSection(data.introSection) : undefined;
        this.challengesSection = data.displayedSections.includes(sections.challenges.id) ? new KeyPointsSection(data.challengesSection) : undefined;
    }
}

class IntroSection extends TitleAndBody {
    readonly videoURL: string;
    readonly links: LinkPanel[];

    constructor(data: SanityIntroSection) {
        super(data);
        this.videoURL = data.videoURL;
        this.links = data.links.map(x => new LinkPanel(x));
    }
}

class KeyPointsSection {
    readonly body: RichText;
    readonly keyPoints: KeyPoint[];

    constructor(data: SanityKeyPointsSection) {
        this.body = new RichText(data.body);
        this.keyPoints = data.keyPoints.map(x => new KeyPoint(x));
    }
}

class LinkPanel {
    readonly title: string;
    readonly description: RichText;
    readonly url: string;

    constructor(data: SanityLinkPanel) {
        this.title = data.title;
        this.description = new RichText(data.description);
        this.url = data.url;
    }
}

export const useCasePageSchemaName = schemaName(UseCasePage);

const sectionSchemaName = (key: SectionKey) => `${useCasePageSchemaName}_${sections[key].id}`;

const sectionSchema = (key: SectionKey, fields: any[]) => defineType({
    name: sectionSchemaName(key),
    title: `${sections[key].title} Section`,
    type: "object",
    fields: fields,
});

const linkPanelsField = defineField({
    name: "links",
    title: "Links",
    type: "array",
    of: [{type: linkPanelSchemaName}],
    validation: (rule: ArrayRule<any>) => rule.length(3),
});

const sectionSchemas = [
    sectionSchema("intro", [
        ...titleAndBodyFields,
        videoURLField,
        linkPanelsField,
        isVisibleField,
    ]),
    sectionSchema("requirements", [
        bodyFieldRichText,
        keyPointsField(4),
        isVisibleField,
    ]),
    sectionSchema("challenges", [
        bodyFieldRichText,
        keyPointsField(4),
        isVisibleField,
    ]),
    sectionSchema("solution", [
        bodyFieldRichText,
        keyPointsField(),
        isVisibleField,
    ]),
    sectionSchema("example", [
        bodyFieldRichText,
        isVisibleField,
    ]),
    sectionSchema("furtherReading", [
        bodyFieldRichText,
        linkPanelsField,
        isVisibleField,
    ]),
];

const sectionFields = (Object.keys(sections) as SectionKey[]).map(key => defineField({
    name: sections[key].id,
    title: `${sections[key].title} Section`,
    type: sectionSchemaName(key),
    options: collapsibleOptions,
}));

const useCasePageSchema = defineType({
    name: useCasePageSchemaName,
    title: "Use Case Page",
    type: "document",
    icon: DocumentIcon,
    fields: [
        pageTitleField,
        Object.assign({}, routeField, { description: "URL fragment for this use case page (e.g. identity-access-management). Do not include 'use-case', this is automatically prepended" }),
        ...sectionFields,
    ],
    preview: {
        select: { title: "title" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: "Use Case Page",
        }),
    },
});

export const useCasePageSchemas = [...sectionSchemas, useCasePageSchema];
