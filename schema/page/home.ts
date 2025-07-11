import { ArrayRule, defineField, defineType } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { IntegrationsGridSection, integrationsGridSectionSchemaName, SanityIntegrationsGridSection } from "../component/integrations-grid";
import { LinkPanel, linkPanelSchemaName } from "../component/link-panel";
import { 
    resourceSectionSchemaName, SanityCoreSection, SanityLinkPanelsSection, SectionBase, SanityTitleBodyIllustrationSection,
    TitleBodyIllustrationSection,
} from "../component/section";
import {
    collapsibleOptions, isVisibleField, actionsFieldOptional, titleBodyIconFields, requiredRule,
    keyPointsWithIconsField, titleFieldWithHighlights, bodyFieldRichText, sectionIconField, resourcesField, keywordFieldOptional, keyPointsField, titleField, SanityVisibleToggle,
} from "../common-fields";
import { SanityContentTextTab, ContentTextTab, contentTextTabSchemaName } from "../component/content-text-panel";
import { illustrationFieldOptional } from "../illustration";
import { KeyPointsSection, KeyPointsWithIconsSection, SanityKeyPointsSection, SanityKeyPointsWithIconsSection } from "../key-point";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { ResourceLink } from "../resource/base";
import { SanityResource, SanityResourceSection } from "../resource/sanity";
import { ResourceSection } from "../resource/section";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SocialMediaID, socialMediaLinksField } from "../social-media";
import { SanityTestimonialsSection, testimonialSchemaName, TestimonialsSection, testimonialsSectionField } from "../testimonial";
import { ParagraphWithHighlights, SanityTitleField, SanityTitleWithHighlights } from "../text";
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
    resources: { id: "resourcesSection", title: "Resources" },
    tooling: { id: "toolingSection", title: "Tooling" },
    drivers: { id: "driversSection", title: "Drivers" },
    cloud: { id: "cloudSection", title: "Cloud" },
    community: { id: "communitySection", title: "Community" },
    testimonials: { id: "testimonialsSection", title: "Testimonials" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = (typeof sections)[SectionKey]["id"];

export interface SanityHomePage extends SanityPage {
    [sections.intro.id]: SanityIntroSection;
    [sections.hotTopics.id]: SanityHotTopicsSection;
    [sections.featureFusion.id]: SanityKeyPointsSection;
    [sections.benefits1.id]: SanityTitleBodyIllustrationSection;
    [sections.benefits2.id]: SanityTitleBodyIllustrationSection;
    [sections.socialValidation.id]: SanitySocialValidationSection;
    organisationLogos?: SanityReference<SanityOrganisation>[];
    [sections.resources.id]: SanityResourceSection;
    [sections.tooling.id]: SanityLinkPanelsSection;
    [sections.drivers.id]: SanityDriversSection;
    [sections.cloud.id]: SanityKeyPointsWithIconsSection;
    [sections.community.id]: SanityCommunitySection;
    [sections.testimonials.id]: SanityTestimonialsSection;
    conclusionSection: SanityConclusionSection;
}

interface SanityIntroSection extends SanityCoreSection {
    userLogos: SanityReference<SanityOrganisation>[];
    displayUserLogos: boolean;
    contentTabs: SanityContentTextTab[];
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
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.hotTopics.id]?: HotTopicsSection;
    readonly [sections.featureFusion.id]?: KeyPointsSection;
    readonly benefitSection1?: TitleBodyIllustrationSection;
    readonly benefitSection2?: TitleBodyIllustrationSection;
    readonly [sections.socialValidation.id]?: SocialValidationSection;
    readonly [sections.resources.id]?: ResourceSection;
    readonly [sections.tooling.id]?: ToolingSection;
    readonly [sections.drivers.id]?: IntegrationsGridSection;
    readonly [sections.cloud.id]?: KeyPointsWithIconsSection;
    readonly [sections.community.id]?: CommunitySection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly conclusionSection?: ConclusionSection;

    constructor(data: SanityHomePage, db: SanityDataset) {
        super(data, db);
        this.introSection = data.introSection.isVisible ? IntroSection.fromSanity(data.introSection, db) : undefined;
        this.hotTopicsSection = data.hotTopicsSection.isVisible ? HotTopicsSection.fromSanity(data.hotTopicsSection, db) : undefined;
        this.featureFusionSection = data.featureFusionSection.isVisible
            ? KeyPointsSection.fromSanityKeyPointsSection(data.featureFusionSection, db)
            : undefined;
        this.benefitSection1 = data.benefitsSection1.isVisible
            ? TitleBodyIllustrationSection.fromSanity(data.benefitsSection1, db)
            : undefined;
        this.benefitSection2 = data.benefitsSection2.isVisible
            ? TitleBodyIllustrationSection.fromSanity(data.benefitsSection2, db)
            : undefined;
        this.socialValidationSection = data.socialValidationSection.isVisible
            ? SocialValidationSection.fromSanity(data.socialValidationSection, db)
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
        this.communitySection = data.communitySection.isVisible
            ? CommunitySection.fromSanity(data.communitySection, db)
            : undefined;
        this.testimonialsSection = data.testimonialsSection.isVisible
            ? TestimonialsSection.fromSanity(data.testimonialsSection, db)
            : undefined;
        this.conclusionSection = data.conclusionSection.isVisible
            ? ConclusionSection.fromSanity(data.conclusionSection, db)
            : undefined;
    }
}

class IntroSection extends SectionBase {
    readonly userLogos: Organisation[];
    readonly contentTabs: ContentTextTab[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.userLogos = props.userLogos;
        this.contentTabs = props.contentTabs;
    }

    static override fromSanity(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                userLogos: data.displayUserLogos
                    ? data.userLogos.map((x) => new Organisation(db.resolveRef(x), db))
                    : [],
                contentTabs: data.contentTabs.map((x) => new ContentTextTab(x, db)),
            })
        );
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
    sectionSchema("benefits1", [
        ...titleBodyIconFields,
        actionsFieldOptional,
        keywordFieldOptional,
        illustrationFieldOptional,
        isVisibleField,
    ]),
    sectionSchema("benefits2", [
        ...titleBodyIconFields,
        actionsFieldOptional,
        keywordFieldOptional,
        illustrationFieldOptional,
        isVisibleField,
    ]),
    socialValidationSectionSchema,
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
    sectionSchema("cloud", [...titleBodyIconFields, actionsFieldOptional, keyPointsWithIconsField(5), isVisibleField]),
    sectionSchema("community", [...titleBodyIconFields, actionsFieldOptional, socialMediaLinksField, isVisibleField]),
    sectionSchema("testimonials", [
        ...titleBodyIconFields,
        actionsFieldOptional,
        defineField({
            name: "testimonials",
            title: "Testimonials",
            type: "array",
            of: [{ type: "reference", to: [{ type: testimonialSchemaName }] }],
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
    type: sectionSchemaName("benefits1"),
    options: collapsibleOptions,
});

const benefitsSection2Field = defineField({
    name: sections.benefits2.id,
    title: `${sections.benefits2.title} Section`,
    type: sectionSchemaName("benefits2"),
    options: collapsibleOptions,
});

const featureFusionSectionField = defineField({
    name: sections.featureFusion.id,
    title: `${sections.featureFusion.title} Section`,
    type: sectionSchemaName("featureFusion"),
    options: collapsibleOptions,
});

const socialValidationSectionField = defineField({
    name: sections.socialValidation.id,
    title: `${sections.socialValidation.title} Section`,
    type: socialValidationSectionSchemaName,
    options: collapsibleOptions,
});

const otherSectionFields = (Object.keys(sections) as SectionKey[])
    .filter((key) => ["cloud", "community"].includes(key))
    .map((key) =>
        defineField({
            name: sections[key].id,
            title: `${sections[key].title} Section`,
            type: sectionSchemaName(key),
            options: collapsibleOptions,
        })
    );

const homePageSchema = defineType({
    name: homePageSchemaName,
    title: "Home Page",
    type: "document",
    fields: [
        metaTagsField,
        introSectionField,
        hotTopicsSectionField,
        featureFusionSectionField,
        benefitsSection1Field,
        benefitsSection2Field,
        socialValidationSectionField,
        defineField({
            name: "resourcesSection",
            title: "Resources Section",
            type: resourceSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "driversSection",
            title: "Integrations Grid Section",
            type: integrationsGridSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        ...otherSectionFields,
        testimonialsSectionField,
        defineField({
            name: "conclusionSection",
            title: "Conclusion Section",
            type: conclusionSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Home Page" }) },
});

export const homePageSchemas = [homePageSchema, ...sectionSchemas];
