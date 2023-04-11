import { ArrayRule, defineField, defineType, Reference } from "@sanity/types";
import { buttonSchemaName, Link, SanityActions } from "../action";
import { bodyFieldRichText, collapsibleOptions, sectionIconField, isVisibleField, keyPointsField, linkField, optionalActionsField, pageTitleField, titleAndBodyFields, titleBodyIconFields, titleField, videoURLField } from "../common-fields";
import { ContentTextTab, contentTextTabSchema, SanityContentTextTab } from "../component/content-text-tabs";
import { formField } from "../form";
import { KeyPoint, SanityKeyPoint } from "../key-point";
import { Organisation, organisationLogosField } from "../organisation";
import { SanityDataset } from "../sanity-core";
import { SocialMediaID, socialMediaLinksField } from "../social-media";
import { testimonialSchemaName } from "../testimonial";
import { BodyText, ParagraphWithHighlights, RichText, SanityBodyText, SanityTitle, SanityTitleWithHighlights, TitleWithHighlights } from "../text";

import { schemaName } from "../util";
import { Page, SanityPage } from "./common";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    features: { id: "featuresSection", title: "Features" },
    useCases: { id: "useCasesSection", title: "Use Cases" },
    tooling: { id: "toolingSection", title: "Tooling" },
    cloud: { id: "cloudSection", title: "Cloud" },
    community: { id: "communitySection", title: "Community" },
    testimonials: { id: "testimonialsSection", title: "Testimonials" },
    conclusion: { id: "conclusionSection", title: "Conclusion" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = typeof sections[SectionKey]["id"];

interface SanitySection extends SanityTitleWithHighlights, SanityBodyText {
    isVisible: boolean;
}

interface SanityCoreSection extends SanitySection {
    icon: Reference;
}

interface SanityIntroSection extends SanityCoreSection {
    userLogos: Reference[];
}

interface SanityFeaturesSection extends SanityCoreSection {
    featureTabs: SanityContentTextTab[];
}

interface SanityUseCase extends SanityTitle, SanityBodyText {
    icon: Reference;
    videoURL: string;
    learnMoreLink: Reference;
}

interface SanityUseCasesSection extends SanityCoreSection {
    useCases: SanityUseCase[];
}

interface SanityToolingSection extends SanityCoreSection {
    keyPoints: SanityKeyPoint[];
}

interface SanityCloudSection extends SanityCoreSection, SanityActions {
    keyPoints: SanityKeyPoint[];
}

interface SanityCommunitySection extends SanityCoreSection {
    socialMedias: SocialMediaID[];
}

interface SanityTestimonialsSection extends SanityCoreSection {}

interface SanityConclusionSection extends SanitySection {}

export interface SanityHomePage extends SanityPage {
    [sections.intro.id]: SanityIntroSection;
    [sections.features.id]: SanityFeaturesSection;
    [sections.useCases.id]: SanityUseCasesSection;
    [sections.tooling.id]: SanityToolingSection;
    [sections.cloud.id]: SanityCloudSection;
    [sections.community.id]: SanityCommunitySection;
    [sections.testimonials.id]: SanityTestimonialsSection;
    [sections.conclusion.id]: SanityConclusionSection;
}

export abstract class HomePageSection implements TitleWithHighlights, BodyText {
    readonly body: RichText;
    readonly title: ParagraphWithHighlights;

    protected constructor(data: SanitySection) {
        this.body = new RichText(data.body);
        this.title = new ParagraphWithHighlights(data.title);
    }
}

export abstract class HomePageCoreSection extends HomePageSection {
    readonly iconURL: string;

    protected constructor(data: SanityCoreSection, db: SanityDataset) {
        super(data);
        this.iconURL = db.resolveImageRef(data.icon).url;
    }
}

export class HomePageIntroSection extends HomePageCoreSection {
    readonly userLogos: Organisation[];
    constructor(data: SanityIntroSection, db: SanityDataset) {
        super(data, db);
        this.userLogos = data.userLogos.map(x => new Organisation(db.resolveRef(x), db));
    }
}

export class HomePageFeaturesSection extends HomePageCoreSection {
    readonly featureTabs: ContentTextTab[];

    constructor(data: SanityFeaturesSection, db: SanityDataset) {
        super(data, db);
        this.featureTabs = data.featureTabs.map(x => new ContentTextTab(x));
    }
}

export class HomePageUseCase {
    readonly title: string;
    readonly iconURL: string;
    readonly videoURL: string;
    readonly body: RichText;
    readonly learnMoreLink: Link;

    constructor(data: SanityUseCase, db: SanityDataset) {
        this.title = data.title;
        this.iconURL = db.resolveImageRef(data.icon).url;
        this.videoURL = data.videoURL;
        this.body = new RichText(data.body);
        this.learnMoreLink = new Link(db.resolveRef(data.learnMoreLink));
    }
}

export class HomePageUseCasesSection extends HomePageCoreSection {
    readonly useCases: HomePageUseCase[];

    constructor(data: SanityUseCasesSection, db: SanityDataset) {
        super(data, db);
        this.useCases = data.useCases.map(x => new HomePageUseCase(x, db));
    }
}

export class HomePageToolingSection extends HomePageCoreSection {
    readonly keyPoints: KeyPoint[];

    constructor(data: SanityToolingSection, db: SanityDataset) {
        super(data, db);
        this.keyPoints = data.keyPoints.map(x => new KeyPoint(x, db));
    }
}

export class HomePageCloudSection extends HomePageCoreSection {
    readonly keyPoints: KeyPoint[];

    constructor(data: SanityCloudSection, db: SanityDataset) {
        super(data, db);
        this.keyPoints = data.keyPoints.map(x => new KeyPoint(x, db));
    }
}

export class HomePageCommunitySection extends HomePageCoreSection {
    readonly socialMedias: SocialMediaID[];

    constructor(data: SanityCommunitySection, db: SanityDataset) {
        super(data, db);
        this.socialMedias = data.socialMedias;
    }
}

export class HomePageTestimonialsSection extends HomePageCoreSection {
    constructor(data: SanityTestimonialsSection, db: SanityDataset) {
        super(data, db);
    }
}

export class HomePageConclusionSection extends HomePageSection {
    constructor(data: SanityConclusionSection) {
        super(data);
    }
}

export class HomePage extends Page {
    readonly [sections.intro.id]?: HomePageIntroSection;
    readonly [sections.features.id]?: HomePageFeaturesSection;
    readonly [sections.useCases.id]?: HomePageUseCasesSection;
    readonly [sections.tooling.id]?: HomePageToolingSection;
    readonly [sections.cloud.id]?: HomePageCloudSection;
    readonly [sections.community.id]?: HomePageCommunitySection;
    readonly [sections.testimonials.id]?: HomePageTestimonialsSection;
    readonly [sections.conclusion.id]?: HomePageConclusionSection;

    constructor(data: SanityHomePage, db: SanityDataset) {
        super(data);
        this.introSection = data.introSection.isVisible ? new HomePageIntroSection(data.introSection, db) : undefined;
        this.featuresSection = data.featuresSection.isVisible ? new HomePageFeaturesSection(data.featuresSection, db) : undefined;
        this.useCasesSection = data.useCasesSection.isVisible ? new HomePageUseCasesSection(data.useCasesSection, db) : undefined;
        this.toolingSection = data.toolingSection.isVisible ? new HomePageToolingSection(data.toolingSection, db) : undefined;
        this.cloudSection = data.cloudSection.isVisible ? new HomePageCloudSection(data.cloudSection, db) : undefined;
        this.communitySection = data.communitySection.isVisible ? new HomePageCommunitySection(data.communitySection, db) : undefined;
        this.testimonialsSection = data.testimonialsSection.isVisible ? new HomePageTestimonialsSection(data.testimonialsSection, db) : undefined;
        this.conclusionSection = data.conclusionSection.isVisible ? new HomePageConclusionSection(data.conclusionSection) : undefined;
    }

    get displayedSections(): HomePageSection[] {
        return [
            this.introSection, this.featuresSection, this.useCasesSection, this.toolingSection,
            this.cloudSection, this.communitySection, this.testimonialsSection, this.conclusionSection
        ].filter(x => !!x) as HomePageSection[];
    }
}

export const homePageSchemaName = schemaName(HomePage);

const sectionSchemaName = (key: SectionKey) => `${homePageSchemaName}_${sections[key].id}`;

const sectionSchema = (key: SectionKey, fields: any[]) => defineType({
    name: sectionSchemaName(key),
    title: `${sections[key].title} Section`,
    type: "object",
    fields: fields,
});

const featureTabSchemaName = `${homePageSchemaName}_featureTab`;

const featureTabSchema = defineType({
    name: featureTabSchemaName,
    title: "Feature Tab",
    type: "object",
    fields: [
        ...contentTextTabSchema.fields,
        Object.assign({}, linkField, { name: "learnMoreLink", title: "'Learn More' Link" }),
    ],
});

const useCaseSchemaName = `${homePageSchemaName}_useCase`;

const useCaseSchema = defineType({
    name: useCaseSchemaName,
    title: "Use Case",
    type: "object",
    fields: [
        titleField,
        sectionIconField,
        videoURLField,
        bodyFieldRichText,
        Object.assign({}, linkField, { title: "Link to Use Case Page" }),
    ],
});

const sectionSchemas = [
    sectionSchema("intro", [
        ...titleBodyIconFields,
        defineField({
            name: "button",
            title: "Button (optional)",
            type: buttonSchemaName,
        }),
        formField,
        Object.assign({}, organisationLogosField, { name: "userLogos" }),
        isVisibleField,
    ]),
    sectionSchema("features", [
        ...titleBodyIconFields,
        defineField({
            name: "featureTabs",
            title: "Feature Tabs",
            type: "array",
            of: [{type: featureTabSchemaName}],
            validation: (rule: ArrayRule<any>) => rule.required(),
        }),
        isVisibleField,
    ]),
    sectionSchema("useCases", [
        ...titleBodyIconFields,
        defineField({
            name: "useCases",
            title: "Use Cases",
            type: "array",
            of: [{type: useCaseSchemaName}],
        }),
        isVisibleField,
    ]),
    sectionSchema("tooling", [
        ...titleBodyIconFields,
        keyPointsField(3),
        isVisibleField,
    ]),
    sectionSchema("cloud", [
        ...titleBodyIconFields,
        keyPointsField(5),
        optionalActionsField,
        isVisibleField,
    ]),
    sectionSchema("community", [
        ...titleBodyIconFields,
        socialMediaLinksField,
        isVisibleField,
    ]),
    sectionSchema("testimonials", [
        ...titleBodyIconFields,
        defineField({
            name: "testimonials",
            title: "Testimonials",
            type: "array",
            of: [{type: testimonialSchemaName}],
        }),
        isVisibleField,
    ]),
    sectionSchema("conclusion", [
        ...titleAndBodyFields,
        optionalActionsField,
        isVisibleField,
    ]),
];

const sectionFields = (Object.keys(sections) as SectionKey[]).map(key => defineField({
    name: sections[key].id,
    title: `${sections[key].title} Section`,
    type: sectionSchemaName(key),
    options: collapsibleOptions,
}));

const homePageSchema = defineType({
    name: homePageSchemaName,
    title: "Home Page",
    type: "document",
    fields: [
        pageTitleField,
        ...sectionFields,
    ],
    preview: { prepare: (_selection) => ({ title: "Home Page" }), },
});

export const homePageSchemas = [featureTabSchema, homePageSchema, ...sectionSchemas, useCaseSchema];
