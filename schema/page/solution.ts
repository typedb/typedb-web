import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType, Slug } from "@sanity/types";
import { LinkButton } from "../button";
import { FurtherReadingSection, SanityCoreSection, SanityFurtherReadingSection } from "../component/page-section";
import { TechnicolorBlock } from "../component/technicolor-block";
import { Link, SanityLink } from "../link";
import {
    bodyFieldRichText,
    collapsibleOptions,
    isVisibleField,
    keyPointsField,
    keyPointsWithIconsField,
    learnMoreLinkField,
    linkPanelsField,
    pageTitleField,
    routeField,
    SanityVisibleToggle,
    sectionIdField,
    titleAndBodyFields,
    titleField,
    videoEmbedField,
} from "../common-fields";
import { LinkPanel, SanityLinkPanel } from "../component/link-panel";
import { KeyPoint, KeyPointWithIcon, SanityKeyPoint, SanityKeyPointWithIcon } from "../key-point";
import { SanityDataset, SanityReference } from "../sanity-core";
import {
    BodyTextField,
    ParagraphWithHighlights, PortableText,
    SanityBodyTextField,
    SanityTitleField,
    SanityTitleWithHighlights,
    TitleAndBody,
} from "../text";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    useCases: { id: "useCasesSection", title: "Use Cases" },
    challenges: { id: "challengesSection", title: "Challenges" },
    solution: { id: "solutionSection", title: "Solution" },
    // example: { id: "exampleSection", title: "Example" },
    furtherReading: { id: "furtherReadingSection", title: "Further Reading" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = (typeof sections)[SectionKey]["id"];

export interface SanitySolutionPage extends SanityPage {
    title: string;
    route: Slug;
    [sections.intro.id]: SanityIntroSection;
    [sections.useCases.id]: SanityKeyPointsSection;
    [sections.challenges.id]: SanityKeyPointsSection;
    [sections.solution.id]: SanitySolutionSection;
    // [sections.example.id]: SanityExampleSection;
    [sections.furtherReading.id]: SanityFurtherReadingSection;
}

interface SanityIntroSection extends SanityTitleWithHighlights, SanityBodyTextField, SanityVisibleToggle {
    videoURL: string;
    links: SanityLinkPanel[];
}

interface SanityKeyPointsSection extends SanityCoreSection {
    keyPoints: SanityKeyPoint[];
    sectionId?: string;
}

interface SanitySolutionSection extends SanityKeyPointsSection {
    keyPoints: SanityKeyPointWithIcon[];
}

interface SanityExampleTab extends SanityTitleField, SanityBodyTextField {
    videoURL: string;
    learnMoreLink: SanityReference<SanityLink>;
}

interface SanityExampleSection extends SanityCoreSection {
    exampleTabs: SanityExampleTab[];
    sampleProjectLink: SanityReference<SanityLink>;
}

export class SolutionPage extends Page {
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.useCases.id]?: KeyPointsSection;
    readonly [sections.challenges.id]?: KeyPointsSection;
    readonly [sections.solution.id]?: SolutionSection;
    // readonly [sections.example.id]?: ExampleSection;
    readonly [sections.furtherReading.id]?: FurtherReadingSection;

    constructor(data: SanitySolutionPage, db: SanityDataset) {
        super(data, db);
        this.introSection = data.introSection.isVisible
            ? IntroSection.fromSanityIntroSection(data.introSection, db)
            : undefined;
        if (data.useCasesSection.isVisible) {
            this.useCasesSection = KeyPointsSection.fromSanityKeyPointsSection({
                data: data.useCasesSection,
                db: db,
                title: new ParagraphWithHighlights({ spans: [{ text: "Requirements", highlight: true }] }),
                iconURL: "https://cdn.sanity.io/images/xndl14mc/production/ddb3754b63563cba578a2d5aa4c2de94468ef650-66x98.svg",
            });
        }
        if (data.challengesSection.isVisible) {
            this.challengesSection = KeyPointsSection.fromSanityKeyPointsSection({
                data: data.challengesSection,
                db: db,
                title: new ParagraphWithHighlights({ spans: [{ text: "Challenges", highlight: true }] }),
                iconURL: "https://cdn.sanity.io/images/xndl14mc/production/76cadf76e36fef7eac8a9b700a088a2e1ed10f1c-98x98.svg",
            });
        }
        this.solutionSection = data.solutionSection.isVisible
            ? SolutionSection.fromSanitySolutionSection({ data: data.solutionSection, db: db })
            : undefined;
        // this.exampleSection = data.exampleSection.isVisible ? ExampleSection.fromSanityExampleSection(data.exampleSection, db) : undefined;
        this.furtherReadingSection = data.furtherReadingSection.isVisible
            ? FurtherReadingSection.fromSanityFurtherReadingSection(data.furtherReadingSection, db)
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
        return new IntroSection(
            Object.assign(titleAndBody, {
                videoURL: data.videoURL,
                links: data.links.map((x) => LinkPanel.fromSanityLinkPanel(x, db)),
            })
        );
    }
}

class KeyPointsSection extends TechnicolorBlock {
    readonly keyPoints: KeyPoint[];

    constructor(props: PropsOf<KeyPointsSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static fromSanityKeyPointsSection(props: {
        data: SanityKeyPointsSection;
        db: SanityDataset;
        title: ParagraphWithHighlights;
        iconURL: string;
    }) {
        const { data, db, title, iconURL } = props;
        return new KeyPointsSection({
            title: title,
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            iconURL: iconURL,
            keyPoints: data.keyPoints.map((x) => new KeyPoint(x)),
            sectionId: data.sectionId,
        });
    }
}

class SolutionSection extends TechnicolorBlock {
    readonly keyPoints: KeyPointWithIcon[];

    constructor(props: PropsOf<SolutionSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static fromSanitySolutionSection(props: { data: SanitySolutionSection; db: SanityDataset }): SolutionSection {
        const { data, db } = props;
        return new SolutionSection({
            title: new ParagraphWithHighlights({
                spans: [
                    { text: "TypeDB", highlight: true },
                    { text: " Solution", highlight: false },
                ],
            }),
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            iconURL: "https://cdn.sanity.io/images/xndl14mc/production/19628ad84b647bdbc783df17ce2ea89c8fd507a3-98x108.svg",
            keyPoints: data.keyPoints.map((x) => new KeyPointWithIcon(x, db)),
        });
    }
}

class ExampleTab implements Partial<BodyTextField> {
    readonly title: string;
    readonly videoURL: string;
    readonly body?: PortableText;
    readonly learnMoreLink?: Link;

    constructor(data: SanityExampleTab, db: SanityDataset) {
        this.title = data.title;
        this.videoURL = data.videoURL;
        this.body = data.body;
        this.learnMoreLink = Link.fromSanityLinkRef(data.learnMoreLink, db);
    }
}

class ExampleSection extends TechnicolorBlock {
    readonly exampleTabs: ExampleTab[];
    readonly sampleProjectLink?: Link;

    constructor(props: PropsOf<ExampleSection>) {
        super(props);
        this.exampleTabs = props.exampleTabs;
        this.sampleProjectLink = props.sampleProjectLink;
    }

    static fromSanityExampleSection(data: SanityExampleSection, db: SanityDataset) {
        return new ExampleSection({
            title: new ParagraphWithHighlights({ spans: [] }),
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            iconURL: "/assets/icon/section/globe-code.svg",
            exampleTabs: data.exampleTabs.map((x) => new ExampleTab(x, db)),
            sampleProjectLink: Link.fromSanityLinkRef(data.sampleProjectLink, db),
        });
    }
}

export const solutionPageSchemaName = "solutionPage";

const sectionSchemaName = (key: SectionKey) => `${solutionPageSchemaName}_${sections[key].id}`;

const sectionSchema = (key: SectionKey, fields: any[]) =>
    defineType({
        name: sectionSchemaName(key),
        title: `${sections[key].title} Section`,
        type: "object",
        fields: fields,
    });

const exampleTabSchemaName = `${solutionPageSchemaName}_exampleTab`;

const exampleTabSchema = defineType({
    name: exampleTabSchemaName,
    title: "Example",
    type: "object",
    fields: [titleField, videoEmbedField, bodyFieldRichText, learnMoreLinkField],
});

const sectionSchemas = [
    sectionSchema("intro", [...titleAndBodyFields, videoEmbedField, linkPanelsField, isVisibleField]),
    sectionSchema("useCases", [bodyFieldRichText, sectionIdField, keyPointsField(4), isVisibleField]),
    sectionSchema("challenges", [bodyFieldRichText, sectionIdField, keyPointsField(4), isVisibleField]),
    sectionSchema("solution", [bodyFieldRichText, sectionIdField, keyPointsWithIconsField(), isVisibleField]),
    // sectionSchema("example", [
    //     bodyFieldRichText,
    //     defineField({
    //         name: "exampleTabs",
    //         title: "Example Tabs",
    //         type: "array",
    //         of: [{type: exampleTabSchemaName}],
    //     }),
    //     defineField({
    //         name: "sampleProjectLink",
    //         title: "Link to Sample Project",
    //         type: "reference",
    //         to: [{type: linkSchemaName}],
    //     }),
    //     isVisibleField,
    // ]),
    sectionSchema("furtherReading", [bodyFieldRichText, sectionIdField, linkPanelsField, isVisibleField]),
];

const sectionFields = (Object.keys(sections) as SectionKey[]).map((key) =>
    defineField({
        name: sections[key].id,
        title: `${sections[key].title} Section`,
        type: sectionSchemaName(key),
        options: collapsibleOptions,
    })
);

const solutionPageSchema = defineType({
    name: solutionPageSchemaName,
    title: "Solution Page",
    type: "document",
    icon: DocumentIcon,
    fields: [
        pageTitleField,
        metaTagsField,
        Object.assign({}, routeField, {
            description:
                "URL fragment for this solution page (e.g. cybersecurity). Do not include 'solution', this is automatically prepended",
        }),
        ...sectionFields,
    ],
    preview: {
        select: { title: "title" },
        prepare: (selection) => ({ title: selection.title }),
    },
});

export const solutionPageSchemas = [exampleTabSchema, ...sectionSchemas, solutionPageSchema];
