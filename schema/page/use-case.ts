import { DocumentIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, Slug } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "../button";
import { TechnicolorBlock } from "../component/technicolor-block";
import { Link, linkSchemaName, SanityLink } from "../link";
import { bodyFieldRichText, collapsibleOptions, isVisibleField, keyPointsField, learnMoreLinkField, pageTitleField, routeField, SanityVisibleToggle, titleAndBodyFields, titleField, videoEmbedField } from "../common-fields";
import { LinkPanel, linkPanelSchemaName, SanityLinkPanel } from "../component/link-panel";
import { KeyPoint, SanityKeyPoint } from "../key-point";
import { SanityDataset, SanityReference } from "../sanity-core";
import { ParagraphWithHighlights, RichText, SanityBodyText, SanityTitle, SanityTitleWithHighlights, TitleAndBody } from "../text";
import { PropsOf } from "../util";
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

interface SanityCoreSection extends SanityBodyText, SanityOptionalActions, SanityVisibleToggle {}

interface SanityIntroSection extends SanityTitleWithHighlights, SanityBodyText, SanityVisibleToggle {
    videoURL: string;
    links: SanityLinkPanel[];
}

interface SanityKeyPointsSection extends SanityCoreSection {
    keyPoints: SanityKeyPoint[];
}

interface SanityExampleTab extends SanityTitle, SanityBodyText {
    videoURL: string;
    learnMoreLink: SanityReference<SanityLink>;
}

interface SanityExampleSection extends SanityCoreSection {
    exampleTabs: SanityExampleTab[];
    sampleProjectLink: SanityReference<SanityLink>;
}

interface SanityFurtherReadingSection extends SanityCoreSection {
    links: SanityLinkPanel[];
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
        this.introSection = data.introSection.isVisible ? IntroSection.fromSanityIntroSection(data.introSection, db) : undefined;
        if (data.requirementsSection.isVisible) {
            this.requirementsSection = KeyPointsSection.fromSanityKeyPointsSection({
                data: data.requirementsSection,
                db: db,
                title: new ParagraphWithHighlights({ spans: [{ text: "Requirements", highlight: true }] }),
                iconURL: "/assets/icon/section/clipboard.svg"
            });
        }
        if (data.challengesSection.isVisible) {
            this.challengesSection = KeyPointsSection.fromSanityKeyPointsSection({
                data: data.challengesSection,
                db: db,
                title: new ParagraphWithHighlights({ spans: [{ text: "Challenges", highlight: true }] }),
                iconURL: "/assets/icon/section/mountain.svg"
            });
        }
        if (data.solutionSection.isVisible) {
            this.solutionSection = KeyPointsSection.fromSanityKeyPointsSection({
                data: data.solutionSection,
                db: db,
                title: new ParagraphWithHighlights({ spans: [{ text: "TypeDB", highlight: true }, { text: " solution", highlight: false }] }),
                iconURL: "/assets/icon/section/wrench-in-window.svg"
            });
        }
        this.exampleSection = data.exampleSection.isVisible
            ? ExampleSection.fromSanityExampleSection(data.exampleSection, db, "/assets/icon/section/globe-code.svg")
            : undefined;
        this.furtherReadingSection = data.furtherReadingSection.isVisible
            ? FurtherReadingSection.fromSanityFurtherReadingSection(data.furtherReadingSection, db, "/assets/icon/section/book-open.svg")
            : undefined;
    }
}

class IntroSection extends TitleAndBody {
    readonly videoURL: string;
    readonly links: LinkPanel[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.videoURL = props.videoURL;
        this.links = props.links;
    }

    static fromSanityIntroSection(data: SanityIntroSection, db: SanityDataset) {
        const titleAndBody = TitleAndBody.fromSanityTitleAndBody(data);
        return new IntroSection(Object.assign(titleAndBody, {
            videoURL: data.videoURL,
            links: data.links.map(x => LinkPanel.fromSanityLinkPanel(x, db))
        }));
    }
}

class KeyPointsSection extends TechnicolorBlock {
    readonly keyPoints: KeyPoint[];

    constructor(props: PropsOf<KeyPointsSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static fromSanityKeyPointsSection(props: { data: SanityKeyPointsSection, db: SanityDataset, title: ParagraphWithHighlights, iconURL: string }) {
        const { data, db, title, iconURL } = props;
        return new KeyPointsSection({
            title: title,
            body: new RichText(data.body),
            actions: data.actions?.map(x => LinkButton.fromSanity(x, db)),
            iconURL: iconURL,
            keyPoints: data.keyPoints.map(x => new KeyPoint(x, db)),
        });
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
        this.learnMoreLink = Link.fromSanityLinkRef(data.learnMoreLink, db);
    }
}

class ExampleSection extends TechnicolorBlock {
    readonly exampleTabs: ExampleTab[];
    readonly sampleProjectLink: Link;

    constructor(props: PropsOf<ExampleSection>) {
        super(props);
        this.exampleTabs = props.exampleTabs;
        this.sampleProjectLink = props.sampleProjectLink;
    }

    static fromSanityExampleSection(data: SanityExampleSection, db: SanityDataset, iconURL: string) {
        return new ExampleSection({
            title: new ParagraphWithHighlights({ spans: [] }),
            body: new RichText(data.body),
            actions: data.actions?.map(x => LinkButton.fromSanity(x, db)),
            iconURL: iconURL,
            exampleTabs: data.exampleTabs.map(x => new ExampleTab(x, db)),
            sampleProjectLink: Link.fromSanityLinkRef(data.sampleProjectLink, db),
        });
    }
}

class FurtherReadingSection extends TechnicolorBlock {
    readonly links: LinkPanel[];

    constructor(props: PropsOf<FurtherReadingSection>) {
        super(props);
        this.links = props.links;
    }

    static fromSanityFurtherReadingSection(data: SanityFurtherReadingSection, db: SanityDataset, iconURL: string) {
        return new FurtherReadingSection({
            title: new ParagraphWithHighlights({ spans: [{ text: "Further", highlight: true }, { text: " reading", highlight: false }] }),
            body: new RichText(data.body),
            actions: data.actions?.map(x => LinkButton.fromSanity(x, db)),
            iconURL: iconURL,
            links: data.links.map(x => LinkPanel.fromSanityLinkPanel(x, db)),
        });
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
