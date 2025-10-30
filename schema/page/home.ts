import { ArrayRule, defineField, defineType } from "@sanity/types";
import { QueryLanguageComparisonSection, queryLanguageComparisonSectionSchemaName, SanityQueryLanguageComparisonSection } from "../code";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { IntegrationsGridSection, integrationsGridSectionSchemaName, SanityIntegrationsGridSection } from "../component/integrations-grid";
import { LinkPanel, linkPanelSchemaName } from "../component/link-panel";
import {
    SanitySectionCore, SectionCore, SanityIllustrationSection,
    IllustrationSection, simpleLinkPanelsSectionSchemaName, SanitySimpleLinkPanelsSection, SimpleLinkPanelsSection,
    titleBodyIllustrationSectionSchemaName, SanityHotTopicsSection, hotTopicsSectionSchema, hotTopicsSectionSchemaName,

} from "../component/section";
import {
    collapsibleOptions, isVisibleField, actionsFieldOptional, requiredRule,
    titleFieldWithHighlights, bodyFieldRichText, resourcesField,
    keyPointsField, SanityVisibleToggle, titleBodyActionsFields,
} from "../common-fields";
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
    drivers: { id: "driversSection", title: "Integrations Grid" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = (typeof sections)[SectionKey]["id"];

export interface SanityHomePage extends SanityPage {
    [sections.intro.id]: SanityIllustrationSection;
    [sections.hotTopics.id]: SanityHotTopicsSection;
    [sections.benefits1.id]: SanityIllustrationSection;
    [sections.benefits2.id]: SanityIllustrationSection;
    [sections.socialValidation.id]: SanitySocialValidationSection;
    organisationLogos?: SanityReference<SanityOrganisation>[];
    [sections.queryLanguageComparison.id]: SanityQueryLanguageComparisonSection;
    [sections.useCases.id]: SanitySimpleLinkPanelsSection;
    [sections.benefits3.id]: SanityIllustrationSection;
    [sections.studio.id]: SanityIllustrationSection;
    [sections.community.id]: SanityCommunitySection;
    [sections.benefits4.id]: SanityKeyPointsSection;
    [sections.benefits5.id]: SanityIllustrationSection;
    [sections.resources.id]: SanityResourceSection;
    [sections.drivers.id]: SanityDriversSection;
    conclusionSection: SanityConclusionSection;
}

interface SanitySocialValidationSection extends SanityTitleWithHighlights, SanityVisibleToggle {
    organisationLogos: SanityReference<SanityOrganisation>[];
}

type SanityDriversSection = SanityIntegrationsGridSection;

interface SanityCommunitySection extends SanitySectionCore {
    socialMediaLinks: SocialMediaID[];
}

export class HomePage extends Page {
    readonly [sections.intro.id]?: SectionCore;
    readonly [sections.hotTopics.id]?: HotTopicsSection;
    readonly [sections.benefits1.id]?: IllustrationSection;
    readonly [sections.benefits2.id]?: IllustrationSection;
    readonly [sections.socialValidation.id]?: SocialValidationSection;
    readonly [sections.queryLanguageComparison.id]?: QueryLanguageComparisonSection;
    readonly [sections.useCases.id]?: SimpleLinkPanelsSection;
    readonly [sections.benefits3.id]?: IllustrationSection;
    readonly [sections.studio.id]?: IllustrationSection;
    readonly [sections.community.id]?: CommunitySection;
    readonly [sections.benefits4.id]?: KeyPointsSection;
    readonly [sections.benefits5.id]?: IllustrationSection;
    readonly [sections.resources.id]?: ResourceSection;
    readonly [sections.drivers.id]?: IntegrationsGridSection;
    readonly conclusionSection?: ConclusionSection;

    constructor(data: SanityHomePage, db: SanityDataset) {
        super(data, db);
        this.introSection = data.introSection.isVisible ? IllustrationSection.fromSanity(data.introSection, db) : undefined;
        this.hotTopicsSection = data.hotTopicsSection.isVisible ? HotTopicsSection.fromSanity(data.hotTopicsSection, db) : undefined;
        this.benefitsSection1 = data.benefitsSection1.isVisible
            ? IllustrationSection.fromSanity(data.benefitsSection1, db)
            : undefined;
        this.benefitsSection2 = data.benefitsSection2.isVisible
            ? IllustrationSection.fromSanity(data.benefitsSection2, db)
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
            ? IllustrationSection.fromSanity(data.benefitsSection3, db)
            : undefined;
        this.studioSection = data.studioSection.isVisible
            ? IllustrationSection.fromSanity(data.studioSection, db)
            : undefined;
        this.communitySection = data.communitySection.isVisible
            ? CommunitySection.fromSanity(data.communitySection, db)
            : undefined;
        this.benefitsSection4 = data.benefitsSection4.isVisible
            ? KeyPointsSection.fromSanity(data.benefitsSection4, db)
            : undefined;
        this.benefitsSection7 = data.benefitsSection7.isVisible
            ? IllustrationSection.fromSanity(data.benefitsSection7, db)
            : undefined;
        this.resourcesSection = data.resourcesSection.isVisible
            ? ResourceSection.fromSanity(data.resourcesSection, db)
            : undefined;
        this.driversSection = data.driversSection.isVisible
            ? IntegrationsGridSection.fromSanity(data.driversSection, db)
            : undefined;
        this.conclusionSection = data.conclusionSection.isVisible
            ? ConclusionSection.fromSanity(data.conclusionSection, db)
            : undefined;
    }
}

export class HotTopicsSection extends SectionCore {
    readonly hotTopics: ResourceLink[];

    constructor(props: PropsOf<HotTopicsSection>) {
        super(props);
        this.hotTopics = props.hotTopics;
    }

    static override fromSanity(data: SanityHotTopicsSection, db: SanityDataset) {
        return new HotTopicsSection(Object.assign(SectionCore.fromSanity(data, db), {
            hotTopics: data.hotTopics?.map(x => ResourceLink.fromSanity(db.resolveRef(x), db, false)) || [],
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

class CommunitySection extends SectionCore {
    readonly socialMedias: SocialMediaID[];

    constructor(props: PropsOf<CommunitySection>) {
        super(props);
        this.socialMedias = props.socialMedias;
    }

    static override fromSanity(data: SanityCommunitySection, db: SanityDataset) {
        return new CommunitySection(
            Object.assign(SectionCore.fromSanity(data, db), {
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
        actionsFieldOptional,
        illustrationFieldOptional,
        isVisibleField,
    ]),
    socialValidationSectionSchema,
    sectionSchema("community", [...titleBodyActionsFields, socialMediaLinksField, isVisibleField]),
    sectionSchema("benefits4", [...titleBodyActionsFields, keyPointsField(), isVisibleField]),
    sectionSchema("resources", [...titleBodyActionsFields, resourcesField, isVisibleField]),
];

const introSectionField = defineField({
    name: sections.intro.id,
    title: `${sections.intro.title} Section`,
    type: sectionSchemaName("intro"),
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

export const hotTopicsSectionField = defineField({
    name: "hotTopicsSection",
    title: `Hot Topics Section`,
    type: hotTopicsSectionSchemaName,
    options: collapsibleOptions,
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
