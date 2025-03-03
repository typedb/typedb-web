import { ArrayRule, defineField, defineType } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { featureGridSchemaName, FeatureGridSection, SanityFeatureGridSection } from "../component/feature-grid";
import { LinkPanelWithIcon, linkPanelWithIconSchemaName } from "../component/link-panel";
import { resourceSectionSchemaName, SanityCoreSection, SanityLinkPanelsSection } from "../component/page-section";
import { TechnicolorBlock } from "../component/technicolor-block";
import {
    collapsibleOptions, isVisibleField, actionsFieldOptional, titleBodyIconFields, requiredRule,
    keyPointsWithIconsField, titleFieldWithHighlights, bodyFieldRichText, sectionIconField, resourcesField, titleField,
} from "../common-fields";
import { SanityContentTextTab, ContentTextTab, contentTextTabSchemaName } from "../component/content-text-panel";
import { KeyPointWithIcon, SanityKeyPointWithIcon } from "../key-point";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { resourceLinkOf } from "../resource";
import { ResourceLink } from "../resource/base";
import { SanityResource, SanityResourceSection } from "../resource/sanity";
import { ResourceSection } from "../resource/section";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SocialMediaID, socialMediaLinksField } from "../social-media";
import { SanityTestimonial, Testimonial, testimonialSchemaName } from "../testimonial";
import { PropsOf } from "../util";

import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    hotTopics: { id: "hotTopicsSection", title: "Hot Topics" },
    impact: { id: "impactSection", title: "Impact" },
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
    impactSections: SanityImpactSection[];
    [sections.resources.id]: SanityResourceSection;
    [sections.tooling.id]: SanityLinkPanelsSection;
    [sections.drivers.id]: SanityDriversSection;
    [sections.cloud.id]: SanityKeyPointsSection;
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

interface SanityImpactSection extends SanityCoreSection {
    impactTabs: SanityContentTextTab[];
}

type SanityDriversSection = SanityFeatureGridSection;

interface SanityKeyPointsSection extends SanityCoreSection {
    keyPoints: SanityKeyPointWithIcon[];
}

interface SanityCommunitySection extends SanityCoreSection {
    socialMediaLinks: SocialMediaID[];
}

interface SanityTestimonialsSection extends SanityCoreSection {
    testimonials: SanityReference<SanityTestimonial>[];
}

export class HomePage extends Page {
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.hotTopics.id]?: HotTopicsSection;
    readonly impactSections: ImpactSection[];
    readonly [sections.resources.id]?: ResourceSection;
    readonly [sections.tooling.id]?: ToolingSection;
    readonly [sections.drivers.id]?: FeatureGridSection;
    readonly [sections.cloud.id]?: CloudSection;
    readonly [sections.community.id]?: CommunitySection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly conclusionSection?: ConclusionSection;

    constructor(data: SanityHomePage, db: SanityDataset) {
        super(data, db);
        this.introSection = data.introSection.isVisible ? IntroSection.fromSanity(data.introSection, db) : undefined;
        this.hotTopicsSection = data.hotTopicsSection.isVisible ? HotTopicsSection.fromSanity(data.hotTopicsSection, db) : undefined;
        this.impactSections = data.impactSections
            .filter((x) => x.isVisible)
            .map((x) => ImpactSection.fromSanity(x, db));
        this.resourcesSection = data.resourcesSection.isVisible
            ? ResourceSection.fromSanity(data.resourcesSection, db)
            : undefined;
        this.toolingSection = data.toolingSection.isVisible
            ? ToolingSection.fromSanity(data.toolingSection, db)
            : undefined;
        this.driversSection = data.driversSection.isVisible
            ? FeatureGridSection.fromSanity(data.driversSection, db)
            : undefined;
        this.cloudSection = data.cloudSection.isVisible ? CloudSection.fromSanity(data.cloudSection, db) : undefined;
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

class IntroSection extends TechnicolorBlock {
    readonly userLogos: Organisation[];
    readonly contentTabs: ContentTextTab[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.userLogos = props.userLogos;
        this.contentTabs = props.contentTabs;
    }

    static override fromSanity(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                userLogos: data.displayUserLogos
                    ? data.userLogos.map((x) => new Organisation(db.resolveRef(x), db))
                    : [],
                contentTabs: data.contentTabs.map((x) => new ContentTextTab(x, db)),
            })
        );
    }
}

class HotTopicsSection extends TechnicolorBlock {
    readonly hotTopics: ResourceLink[];

    constructor(props: PropsOf<HotTopicsSection>) {
        super(props);
        this.hotTopics = props.hotTopics;
    }

    static override fromSanity(data: SanityHotTopicsSection, db: SanityDataset) {
        return new HotTopicsSection(Object.assign(TechnicolorBlock.fromSanity(data, db), {
            hotTopics: data.hotTopics?.map(x => ResourceLink.fromSanity(db.resolveRef(x), db, true)) || [],
        }));
    }
}

class ImpactSection extends TechnicolorBlock {
    readonly impactTabs: ContentTextTab[];

    constructor(props: PropsOf<ImpactSection>) {
        super(props);
        this.impactTabs = props.impactTabs;
    }

    static override fromSanity(data: SanityImpactSection, db: SanityDataset) {
        return new ImpactSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                impactTabs: data.impactTabs.map((x) => new ContentTextTab(x, db)),
            })
        );
    }
}

class ToolingSection extends TechnicolorBlock {
    readonly panels: LinkPanelWithIcon[];

    constructor(props: PropsOf<ToolingSection>) {
        super(props);
        this.panels = props.panels;
    }

    static override fromSanity(data: SanityLinkPanelsSection, db: SanityDataset) {
        return new ToolingSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                panels: data.panels.map((x) => LinkPanelWithIcon.fromSanity(x, db)),
            })
        );
    }
}

class CloudSection extends TechnicolorBlock {
    readonly keyPoints: KeyPointWithIcon[];

    constructor(props: PropsOf<CloudSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static override fromSanity(data: SanityKeyPointsSection, db: SanityDataset) {
        return new CloudSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                keyPoints: data.keyPoints.map((x) => new KeyPointWithIcon(x, db)),
            })
        );
    }
}

class CommunitySection extends TechnicolorBlock {
    readonly socialMedias: SocialMediaID[];

    constructor(props: PropsOf<CommunitySection>) {
        super(props);
        this.socialMedias = props.socialMedias;
    }

    static override fromSanity(data: SanityCommunitySection, db: SanityDataset) {
        return new CommunitySection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                socialMedias: data.socialMediaLinks,
            })
        );
    }
}

class TestimonialsSection extends TechnicolorBlock {
    readonly testimonials: Testimonial[];

    constructor(props: PropsOf<TestimonialsSection>) {
        super(props);
        this.testimonials = props.testimonials;
    }

    static override fromSanity(data: SanityTestimonialsSection, db: SanityDataset) {
        return new TestimonialsSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                testimonials: data.testimonials.map((x) => new Testimonial(db.resolveRef(x), db)),
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

const sectionSchemas = [
    sectionSchema("intro", [
        Object.assign({}, titleFieldWithHighlights, {
            description: "For the Home Page, this gets automatically added to the web page title",
        }),
        bodyFieldRichText,
        sectionIconField,
        actionsFieldOptional,
        defineField({
            name: "displayUserLogos",
            title: "Display Organisation Logos?",
            type: "boolean",
            initialValue: false,
            validation: requiredRule,
        }),
        Object.assign({}, organisationLogosField, { name: "userLogos" }),
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
    sectionSchema("impact", [
        ...titleBodyIconFields,
        actionsFieldOptional,
        defineField({
            name: "impactTabs",
            title: "Impact Tabs",
            type: "array",
            of: [{ type: contentTextTabSchemaName }],
            validation: requiredRule,
        }),
        isVisibleField,
    ]),
    sectionSchema("resources", [...titleBodyIconFields, actionsFieldOptional, resourcesField, isVisibleField]),
    sectionSchema("tooling", [
        ...titleBodyIconFields,
        actionsFieldOptional,
        defineField({
            name: "panels",
            title: "Panels",
            type: "array",
            of: [{ type: linkPanelWithIconSchemaName }],
            validation: (rule: ArrayRule<any>) => rule.required().length(3),
        }),
        isVisibleField,
    ]),
    sectionSchema("drivers", [
        ...titleBodyIconFields,
        actionsFieldOptional,
        defineField({
            name: "featureGrid",
            title: "Drivers",
            type: "reference",
            to: [{ type: featureGridSchemaName }],
            validation: requiredRule,
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

const impactSectionsField = defineField({
    name: "impactSections",
    title: "Impact Sections",
    type: "array",
    of: [{ type: sectionSchemaName("impact") }],
});

const otherSectionFields = (Object.keys(sections) as SectionKey[])
    .filter((key) => !["intro", "impact", "hotTopics", "resources"].includes(key))
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
        impactSectionsField,
        defineField({
            name: "resourcesSection",
            title: "Resources Section",
            type: resourceSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        ...otherSectionFields,
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
