import { ArrayRule, defineField, defineType } from "@sanity/types";
import { QueryLanguageComparisonSection, queryLanguageComparisonSectionSchemaName, SanityQueryLanguageComparisonSection } from "../code";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { IntegrationsGridSection, integrationsGridSectionSchemaName, SanityIntegrationsGridSection } from "../component/integrations-grid";
import { LinkPanel, linkPanelSchemaName } from "../component/link-panel";
import {
    SanityCoreSection, SanityLinkPanelsSection, SectionBase, SanityTitleBodyIllustrationSection,
    TitleBodyIllustrationSection, simpleLinkPanelsSectionSchemaName, SanitySimpleLinkPanelsSection, SimpleLinkPanelsSection, titleBodyIllustrationSectionSchemaName,
} from "../component/section";
import {
    collapsibleOptions, isVisibleField, actionsFieldOptional, titleBodyIconFields, requiredRule,
    titleFieldWithHighlights, bodyFieldRichText, sectionIconField, resourcesField,
    keywordFieldOptional, keyPointsField, SanityVisibleToggle,
} from "../common-fields";
import { contentTextTabSchemaName } from "../component/content-text-panel";
import { illustrationFieldOptional } from "../illustration";
import { KeyPointsSection, KeyPointsWithIconsSection, SanityKeyPointsSection, SanityKeyPointsWithIconsSection } from "../key-point";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { ResourceLink } from "../resource/base";
import { SanityResource, SanityResourceSection } from "../resource/sanity";
import { ResourceSection } from "../resource/section";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SocialMediaID, socialMediaLinksField } from "../social-media";
import { SanityTestimonialsSection, TestimonialsSection } from "../testimonial";
import { ParagraphWithHighlights, SanityTitleWithHighlights } from "../text";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    hotTopics: { id: "hotTopicsSection", title: "Hot Topics" },
    featureFusion: { id: "featureFusionSection", title: "Feature Fusion" },
    benefits1: { id: "benefitsSection1", title: "Benefits 1" },
    benefits2: { id: "benefitsSection2", title: "Benefits 2" },
    socialValidation: { id: "socialValidationSection", title: "Social Validation" },
    queryLanguageComparison: { id: "queryLanguageComparisonSection", title: "Query Language Comparison" },
    useCases: { id: "useCasesSection", title: "Use Cases" },
    benefits3: { id: "benefitsSection3", title: "Benefits 3" },
    studio: { id: "studioSection", title: "Studio" },
    community: { id: "communitySection", title: "Community" },
    benefits4: { id: "benefitsSection4", title: "Benefits 4" },
    benefits5: { id: "benefitsSection7", title: "Benefits 5" },
    resources: { id: "resourcesSection", title: "Resources" },
    tooling: { id: "toolingSection", title: "Tooling" },
    drivers: { id: "driversSection", title: "Integrations Grid" },
    cloud: { id: "cloudSection", title: "Cloud" },
    testimonials: { id: "testimonialsSection", title: "Testimonials" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = (typeof sections)[SectionKey]["id"];

export interface SanityHomePage extends SanityPage {
    [sections.intro.id]: SanityCoreSection;
    [sections.hotTopics.id]: SanityHotTopicsSection;
    [sections.benefits1.id]: SanityTitleBodyIllustrationSection;
    [sections.benefits2.id]: SanityTitleBodyIllustrationSection;
    [sections.socialValidation.id]: SanitySocialValidationSection;
    organisationLogos?: SanityReference<SanityOrganisation>[];
    [sections.queryLanguageComparison.id]: SanityQueryLanguageComparisonSection;
    [sections.useCases.id]: SanitySimpleLinkPanelsSection;
    [sections.benefits3.id]: SanityTitleBodyIllustrationSection;
    [sections.studio.id]: SanityTitleBodyIllustrationSection;
    [sections.community.id]: SanityCommunitySection;
    [sections.benefits4.id]: SanityKeyPointsSection;
    [sections.benefits5.id]: SanityTitleBodyIllustrationSection;
    [sections.resources.id]: SanityResourceSection;
    [sections.tooling.id]: SanityLinkPanelsSection;
    [sections.drivers.id]: SanityDriversSection;
    [sections.cloud.id]: SanityKeyPointsWithIconsSection;
    [sections.testimonials.id]: SanityTestimonialsSection;
    conclusionSection: SanityConclusionSection;
}

interface SanityHotTopicsSection extends SanityCoreSection {
    hotTopics: SanityReference<SanityResource>[];
}

interface SanitySocialValidationSection extends SanityTitleWithHighlights, SanityVisibleToggle {
    organisationLogos: SanityReference<SanityOrganisation>[];
}

type SanityDriversSection = SanityIntegrationsGridSection;

interface SanityCommunitySection extends SanityCoreSection {
    socialMediaLinks: SocialMediaID[];
}

export class HomePage extends Page {
    readonly [sections.intro.id]?: SectionBase;
    readonly [sections.hotTopics.id]?: HotTopicsSection;
    readonly [sections.benefits1.id]?: TitleBodyIllustrationSection;
    readonly [sections.benefits2.id]?: TitleBodyIllustrationSection;
    readonly [sections.socialValidation.id]?: SocialValidationSection;
    readonly [sections.queryLanguageComparison.id]?: QueryLanguageComparisonSection;
    readonly [sections.useCases.id]?: SimpleLinkPanelsSection;
    readonly [sections.benefits3.id]?: TitleBodyIllustrationSection;
    readonly [sections.studio.id]?: TitleBodyIllustrationSection;
    readonly [sections.community.id]?: CommunitySection;
    readonly [sections.benefits4.id]?: KeyPointsSection;
    readonly [sections.benefits5.id]?: TitleBodyIllustrationSection;
    readonly [sections.resources.id]?: ResourceSection;
    readonly [sections.tooling.id]?: ToolingSection;
    readonly [sections.drivers.id]?: IntegrationsGridSection;
    readonly [sections.cloud.id]?: KeyPointsWithIconsSection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly conclusionSection?: ConclusionSection;

    constructor(data: SanityHomePage, db: SanityDataset) {
        super(data, db);
        this.introSection = data.introSection.isVisible ? SectionBase.fromSanity(data.introSection, db) : undefined;
        this.hotTopicsSection = data.hotTopicsSection.isVisible ? HotTopicsSection.fromSanity(data.hotTopicsSection, db) : undefined;
        this.benefitsSection1 = data.benefitsSection1.isVisible
            ? TitleBodyIllustrationSection.fromSanity(data.benefitsSection1, db)
            : undefined;
        this.benefitsSection2 = data.benefitsSection2.isVisible
            ? TitleBodyIllustrationSection.fromSanity(data.benefitsSection2, db)
            : undefined;
        this.socialValidationSection = data.socialValidationSection.isVisible
            ? SocialValidationSection.fromSanity(data.socialValidationSection, db)
            : undefined;
        this.queryLanguageComparisonSection = data.queryLanguageComparisonSection.isVisible
            ? QueryLanguageComparisonSection.fromSanity(data.queryLanguageComparisonSection, db)
            : undefined;
        this.useCasesSection = data.useCasesSection.isVisible
            ? SimpleLinkPanelsSection.fromSanity(data.useCasesSection, db)
            : undefined;
        this.benefitsSection3 = data.benefitsSection3.isVisible
            ? TitleBodyIllustrationSection.fromSanity(data.benefitsSection3, db)
            : undefined;
        this.studioSection = data.studioSection.isVisible
            ? TitleBodyIllustrationSection.fromSanity(data.studioSection, db)
            : undefined;
        this.communitySection = data.communitySection.isVisible
            ? CommunitySection.fromSanity(data.communitySection, db)
            : undefined;
        this.benefitsSection4 = data.benefitsSection4.isVisible
            ? KeyPointsSection.fromSanity(data.benefitsSection4, db)
            : undefined;
        this.benefitsSection7 = data.benefitsSection7.isVisible
            ? TitleBodyIllustrationSection.fromSanity(data.benefitsSection7, db)
            : undefined;
        this.resourcesSection = data.resourcesSection.isVisible
            ? ResourceSection.fromSanity(data.resourcesSection, db)
            : undefined;
        this.toolingSection = data.toolingSection.isVisible
            ? ToolingSection.fromSanity(data.toolingSection, db)
            : undefined;
        this.driversSection = data.driversSection.isVisible
            ? IntegrationsGridSection.fromSanity(data.driversSection, db)
            : undefined;
        this.cloudSection = data.cloudSection.isVisible ? KeyPointsWithIconsSection.fromSanity(data.cloudSection, db) : undefined;
        this.testimonialsSection = data.testimonialsSection.isVisible
            ? TestimonialsSection.fromSanity(data.testimonialsSection, db)
            : undefined;
        this.conclusionSection = data.conclusionSection.isVisible
            ? ConclusionSection.fromSanity(data.conclusionSection, db)
            : undefined;
    }
}

class HotTopicsSection extends SectionBase {
    readonly hotTopics: ResourceLink[];

    constructor(props: PropsOf<HotTopicsSection>) {
        super(props);
        this.hotTopics = props.hotTopics;
    }

    static override fromSanity(data: SanityHotTopicsSection, db: SanityDataset) {
        return new HotTopicsSection(Object.assign(SectionBase.fromSanity(data, db), {
            hotTopics: data.hotTopics?.map(x => ResourceLink.fromSanity(db.resolveRef(x), db, true)) || [],
        }));
    }
}

export class SocialValidationSection {
    readonly title: ParagraphWithHighlights;
    readonly organisationLogos: Organisation[];

    constructor(props: PropsOf<SocialValidationSection>) {
        this.title = props.title;
        this.organisationLogos = props.organisationLogos;
    }

    static fromSanity(data: SanitySocialValidationSection, db: SanityDataset) {
        return new SocialValidationSection({
            title: ParagraphWithHighlights.fromSanity(data.title),
            organisationLogos: data.organisationLogos.map((x) => new Organisation(db.resolveRef(x), db)),
        });
    }
}

class ToolingSection extends SectionBase {
    readonly panels: LinkPanel[];

    constructor(props: PropsOf<ToolingSection>) {
        super(props);
        this.panels = props.panels;
    }

    static override fromSanity(data: SanityLinkPanelsSection, db: SanityDataset) {
        return new ToolingSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                panels: data.panels.map((x) => LinkPanel.fromSanity(x, db)),
            })
        );
    }
}

class CommunitySection extends SectionBase {
    readonly socialMedias: SocialMediaID[];

    constructor(props: PropsOf<CommunitySection>) {
        super(props);
        this.socialMedias = props.socialMedias;
    }

    static override fromSanity(data: SanityCommunitySection, db: SanityDataset) {
        return new CommunitySection(
            Object.assign(SectionBase.fromSanity(data, db), {
                socialMedias: data.socialMediaLinks,
            })
        );
    }
}

export const homePageSchemaName = "homePage";

const sectionSchemaName = (key: SectionKey) => `${homePageSchemaName}_${sections[key].id}`;

const sectionSchema = (key: SectionKey, fields: any[]) =>
    defineType({
        name: sectionSchemaName(key),
        title: `${sections[key].title} Section`,
        type: "object",
        fields: fields,
    });

export const socialValidationSectionSchemaName = `socialValidationSection`;

const socialValidationSectionSchema = defineType({
    name: socialValidationSectionSchemaName,
    title: "Social Validation Section",
    type: "object",
    fields: [titleFieldWithHighlights, organisationLogosField, isVisibleField],
});

const sectionSchemas = [
    sectionSchema("intro", [
        Object.assign({}, titleFieldWithHighlights, {
            description: "For the Home Page, this gets automatically added to the web page title",
        }),
        bodyFieldRichText,
        sectionIconField,
        actionsFieldOptional,
        defineField({
            name: "contentTabs",
            title: "Content Tabs",
            type: "array",
            of: [{ type: contentTextTabSchemaName }],
            validation: requiredRule,
        }),
        isVisibleField,
    ]),
    sectionSchema("hotTopics", [
        titleFieldWithHighlights,
        Object.assign({}, resourcesField, { name: "hotTopics", title: "Hot Topics" }),
        isVisibleField,
    ]),
    sectionSchema("featureFusion", [
        ...titleBodyIconFields,
        actionsFieldOptional,
        keywordFieldOptional,
        keyPointsField(3),
        isVisibleField,
    ]),
    socialValidationSectionSchema,
    sectionSchema("community", [...titleBodyIconFields, actionsFieldOptional, socialMediaLinksField, isVisibleField]),
    sectionSchema("benefits4", [...titleBodyIconFields, actionsFieldOptional, keyPointsField(), isVisibleField]),
    sectionSchema("resources", [...titleBodyIconFields, actionsFieldOptional, resourcesField, isVisibleField]),
    sectionSchema("tooling", [
        ...titleBodyIconFields,
        actionsFieldOptional,
        defineField({
            name: "panels",
            title: "Panels",
            type: "array",
            of: [{ type: linkPanelSchemaName }],
            validation: (rule: ArrayRule<any>) => rule.required().length(3),
        }),
        isVisibleField,
    ]),
];

const introSectionField = defineField({
    name: sections.intro.id,
    title: `${sections.intro.title} Section`,
    type: sectionSchemaName("intro"),
    options: collapsibleOptions,
});

const hotTopicsSectionField = defineField({
    name: sections.hotTopics.id,
    title: `${sections.hotTopics.title} Section`,
    type: sectionSchemaName("hotTopics"),
    options: collapsibleOptions,
});

const benefitsSection1Field = defineField({
    name: sections.benefits1.id,
    title: `${sections.benefits1.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const benefitsSection2Field = defineField({
    name: sections.benefits2.id,
    title: `${sections.benefits2.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const socialValidationSectionField = defineField({
    name: sections.socialValidation.id,
    title: `${sections.socialValidation.title} Section`,
    type: socialValidationSectionSchemaName,
    options: collapsibleOptions,
});

const queryLanguageComparisonSectionField = defineField({
    name: sections.queryLanguageComparison.id,
    title: `${sections.queryLanguageComparison.title} Section`,
    type: queryLanguageComparisonSectionSchemaName,
    options: collapsibleOptions,
});

const useCasesSectionField = defineField({
    name: sections.useCases.id,
    title: `${sections.useCases.title} Section`,
    type: simpleLinkPanelsSectionSchemaName,
    options: collapsibleOptions,
});

const benefitsSection3Field = defineField({
    name: sections.benefits3.id,
    title: `${sections.benefits3.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const studioSectionField = defineField({
    name: sections.studio.id,
    title: `${sections.studio.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const communitySectionField = defineField({
    name: sections.community.id,
    title: `${sections.community.title} Section`,
    type: sectionSchemaName("community"),
    options: collapsibleOptions,
});

const benefitsSection4Field = defineField({
    name: sections.benefits4.id,
    title: `${sections.benefits4.title} Section`,
    type: sectionSchemaName("benefits4"),
    options: collapsibleOptions,
});

const benefitsSection5Field = defineField({
    name: sections.benefits5.id,
    title: `${sections.benefits5.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const integrationsSectionField = defineField({
    name: sections.drivers.id,
    title: `${sections.drivers.title} Section`,
    type: integrationsGridSectionSchemaName,
    options: collapsibleOptions,
});

const resourcesSectionField = defineField({
    name: sections.resources.id,
    title: `${sections.resources.title} Section`,
    type: sectionSchemaName("resources"),
    options: collapsibleOptions,
});

const conclusionSectionField = defineField({
    name: "conclusionSection",
    title: "Conclusion Section",
    type: conclusionSectionSchemaName,
    options: collapsibleOptions,
    validation: requiredRule,
});

const homePageSchema = defineType({
    name: homePageSchemaName,
    title: "Home Page",
    type: "document",
    fields: [
        metaTagsField,
        introSectionField,
        hotTopicsSectionField,
        benefitsSection1Field,
        benefitsSection2Field,
        socialValidationSectionField,
        queryLanguageComparisonSectionField,
        useCasesSectionField,
        benefitsSection3Field,
        studioSectionField,
        communitySectionField,
        benefitsSection4Field,
        benefitsSection5Field,
        integrationsSectionField,
        resourcesSectionField,
        conclusionSectionField,
    ],
    preview: { prepare: (_selection) => ({ title: "Home Page" }) },
});

export const homePageSchemas = [homePageSchema, ...sectionSchemas];
