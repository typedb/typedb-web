import { DocumentIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, Slug } from "@sanity/types";
import { Link, linkSchemaName, SanityLink } from "../link";
import { bodyFieldRichText, collapsibleOptions, isVisibleField, keyPointsField, learnMoreLinkField, pageTitleField, routeField, SanityVisibleToggle, titleAndBodyFields, titleField, videoEmbedField } from "../common-fields";
import { LinkPanel, linkPanelSchemaName, SanityLinkPanel } from "../component/link-panel";
import { KeyPoint, SanityKeyPoint } from "../key-point";
import { SanityDataset, SanityReference } from "../sanity-core";
import { RichText, SanityBodyText, SanityTitle, SanityTitleAndBody, TitleAndBody } from "../text";
import { Page, SanityPage } from "./common";

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
    title: string;
    route: Slug;
    [sections.intro.id]: SanityIntroSection;
    [sections.requirements.id]: SanityKeyPointsSection;
    [sections.challenges.id]: SanityKeyPointsSection;
    [sections.solution.id]: SanityKeyPointsSection;
    [sections.example.id]: SanityExampleSection;
    [sections.furtherReading.id]: SanityFurtherReadingSection;
}

interface SanityIntroSection extends SanityTitleAndBody, SanityVisibleToggle {
    videoURL: string;
    links: SanityLinkPanel[];
}

interface SanityKeyPointsSection extends SanityBodyText, SanityVisibleToggle {
    keyPoints: SanityKeyPoint[];
}

interface SanityExampleTab extends SanityTitle, SanityBodyText {
    videoURL: string;
    learnMoreLink: SanityReference<SanityLink>;
}

interface SanityExampleSection extends SanityBodyText, SanityVisibleToggle {
    exampleTabs: SanityExampleTab[];
    sampleProjectLink: SanityReference<SanityLink>;
}

interface SanityFurtherReadingSection extends SanityBodyText, SanityVisibleToggle {
    links: SanityLinkPanel[];
}

class IntroSection extends TitleAndBody {
    readonly videoURL: string;
    readonly links: LinkPanel[];

    constructor(data: SanityIntroSection, db: SanityDataset) {
        super(data);
        this.videoURL = data.videoURL;
        this.links = data.links.map(x => new LinkPanel(x, db));
    }
}

class KeyPointsSection {
    readonly body: RichText;
    readonly keyPoints: KeyPoint[];

    constructor(data: SanityKeyPointsSection, db: SanityDataset) {
        this.body = new RichText(data.body);
        this.keyPoints = data.keyPoints.map(x => new KeyPoint(x, db));
    }
}

class ExampleTab {
    readonly title: string;
    readonly videoURL: string;
    readonly body: RichText;
    readonly learnMoreLink: Link;

    constructor(data: SanityExampleTab, db: SanityDataset) {
        this.title = data.title;
        this.videoURL = data.videoURL;
        this.body = new RichText(data.body);
        this.learnMoreLink = new Link(db.resolveRef(data.learnMoreLink));
    }
}

class ExampleSection {
    readonly body: RichText;
    readonly exampleTabs: ExampleTab[];
    readonly sampleProjectLink: Link;

    constructor(data: SanityExampleSection, db: SanityDataset) {
        this.body = new RichText(data.body);
        this.exampleTabs = data.exampleTabs.map(x => new ExampleTab(x, db));
        this.sampleProjectLink = new Link(db.resolveRef(data.sampleProjectLink));
    }
}

class FurtherReadingSection {
    readonly body: RichText;
    readonly links: LinkPanel[];

    constructor(data: SanityFurtherReadingSection, db: SanityDataset) {
        this.body = new RichText(data.body);
        this.links = data.links.map(x => new LinkPanel(x, db));
    }
}

export class UseCasePage extends Page {
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.requirements.id]?: KeyPointsSection;
    readonly [sections.challenges.id]?: KeyPointsSection;
    readonly [sections.solution.id]?: KeyPointsSection;
    readonly [sections.example.id]?: ExampleSection;
    readonly [sections.furtherReading.id]?: FurtherReadingSection;

    constructor(data: SanityUseCasePage, db: SanityDataset) {
        super(data);
        this.introSection = data.introSection.isVisible ? new IntroSection(data.introSection, db) : undefined;
        this.requirementsSection = data.requirementsSection.isVisible ? new KeyPointsSection(data.requirementsSection, db) : undefined;
        this.challengesSection = data.challengesSection.isVisible ? new KeyPointsSection(data.challengesSection, db) : undefined;
        this.solutionSection = data.solutionSection.isVisible ? new KeyPointsSection(data.solutionSection, db) : undefined;
        this.exampleSection = data.exampleSection.isVisible ? new ExampleSection(data.exampleSection, db) : undefined;
        this.furtherReadingSection = data.furtherReadingSection.isVisible ? new FurtherReadingSection(data.furtherReadingSection, db) : undefined;
    }
}

export const useCasePageSchemaName = "useCasePage";

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

const exampleTabSchemaName = `${useCasePageSchemaName}_exampleTab`;

const exampleTabSchema = defineType({
    name: exampleTabSchemaName,
    title: "Example",
    type: "object",
    fields: [
        titleField,
        videoEmbedField,
        bodyFieldRichText,
        learnMoreLinkField,
    ],
});

const sectionSchemas = [
    sectionSchema("intro", [
        ...titleAndBodyFields,
        videoEmbedField,
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
        defineField({
            name: "exampleTabs",
            title: "Example Tabs",
            type: "array",
            of: [{type: exampleTabSchemaName}],
        }),
        defineField({
            name: "sampleProjectLink",
            title: "Link to Sample Project",
            type: "reference",
            to: [{type: linkSchemaName}],
        }),
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
        Object.assign({}, routeField, { description: "URL fragment for this use case page (e.g. identity-access-management). Do not include 'use-cases', this is automatically prepended" }),
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

export const useCasePageSchemas = [exampleTabSchema, ...sectionSchemas, useCasePageSchema];
