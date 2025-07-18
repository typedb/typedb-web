import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType, Slug } from "@sanity/types";
import { LinkButton } from "../button";
import { SanityCoreSection } from "../component/section";
import { SectionBase } from "../component/section";
import { SanityLink } from "../link";
import {
    bodyFieldRichText, collapsibleOptions, isVisibleField, keyPointsField, keyPointsWithIconsField,
    learnMoreLinkFieldOptional, resourcesFieldOptional, routeField, SanityVisibleToggle,
    titleAndBodyFields, titleField, videoEmbedField,
} from "../common-fields";
import { LinkPanel, SanityLinkPanel } from "../component/link-panel";
import { KeyPointsSection, KeyPointWithIcon, SanityKeyPointsSection, SanityKeyPointWithIcon } from "../key-point";
import { SanityResourceSection } from "../resource/sanity";
import { furtherLearningField, ResourceSection } from "../resource/section";
import { SanityDataset, SanityReference } from "../sanity-core";
import {
    ParagraphWithHighlights, SanityBodyTextField, SanityTitleField, SanityTitleWithHighlights, TitleAndBody,
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
} as const;

type SectionKey = keyof typeof sections;
type SectionID = (typeof sections)[SectionKey]["id"];

export interface SanityUseCasePage extends SanityPage {
    title: string;
    route: Slug;
    [sections.intro.id]: SanityIntroSection;
    [sections.useCases.id]: SanityKeyPointsSection;
    [sections.challenges.id]: SanityKeyPointsSection;
    [sections.solution.id]: SanitySolutionSection;
    // [sections.example.id]: SanityExampleSection;
    furtherReadingSection: SanityResourceSection;
}

interface SanityIntroSection extends SanityTitleWithHighlights, SanityBodyTextField, SanityVisibleToggle {
    videoURL: string;
    links: SanityLinkPanel[];
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

export class UseCasePage extends Page {
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.useCases.id]?: KeyPointsSection;
    readonly [sections.challenges.id]?: KeyPointsSection;
    readonly [sections.solution.id]?: SolutionSection;
    // readonly [sections.example.id]?: ExampleSection;
    readonly furtherReadingSection?: ResourceSection;

    constructor(data: SanityUseCasePage, db: SanityDataset) {
        super(data, db);
        this.introSection = data.introSection.isVisible
            ? IntroSection.fromSanityIntroSection(data.introSection, db)
            : undefined;
        if (data.useCasesSection.isVisible) {
            this.useCasesSection = KeyPointsSection.fromSanity(data.useCasesSection, db);
        }
        if (data.challengesSection.isVisible) {
            this.challengesSection = KeyPointsSection.fromSanity(data.challengesSection, db);
        }
        this.solutionSection = data.solutionSection.isVisible
            ? SolutionSection.fromSanitySolutionSection({ data: data.solutionSection, db: db })
            : undefined;
        // this.exampleSection = data.exampleSection.isVisible ? ExampleSection.fromSanityExampleSection(data.exampleSection, db) : undefined;
        this.furtherReadingSection = data.furtherReadingSection.isVisible
            ? ResourceSection.fromSanityFurtherLearningSection(data.furtherReadingSection, db)
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
                links: data.links.map((x) => LinkPanel.fromSanity(x, db)),
            })
        );
    }
}

class SolutionSection extends SectionBase {
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
            keyPoints: data.keyPoints.map((x) => KeyPointWithIcon.fromSanity(x, db)),
            sectionId: "typedb-solution",
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
    fields: [titleField, videoEmbedField, bodyFieldRichText, learnMoreLinkFieldOptional],
});

const sectionSchemas = [
    sectionSchema("intro", [...titleAndBodyFields, videoEmbedField, resourcesFieldOptional, isVisibleField]),
    sectionSchema("useCases", [bodyFieldRichText, keyPointsField(4), isVisibleField]),
    sectionSchema("challenges", [bodyFieldRichText, keyPointsField(4), isVisibleField]),
    sectionSchema("solution", [bodyFieldRichText, keyPointsWithIconsField(), isVisibleField]),
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
];

const sectionFields = [
    ...(Object.keys(sections) as SectionKey[]).map((key) =>
        defineField({
            name: sections[key].id,
            title: `${sections[key].title} Section`,
            type: sectionSchemaName(key),
            options: collapsibleOptions,
        })
    ),
    furtherLearningField,
];

const useCasePageSchema = defineType({
    name: solutionPageSchemaName,
    title: "Solution Page",
    type: "document",
    icon: DocumentIcon,
    fields: [
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

export const useCasePageSchemas = [exampleTabSchema, ...sectionSchemas, useCasePageSchema];
