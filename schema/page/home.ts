import { ArrayRule, defineField, defineType } from "@sanity/types";
import { SanityOptionalActions } from "../button";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { featureGridSchemaName, FeatureGridSection, SanityFeatureGridSection } from "../component/feature-grid";
import { LinkPanelWithIcon, linkPanelWithIconSchemaName, SanityLinkPanelWithIcon } from "../component/link-panel";
import { resourceSectionSchemaName } from "../component/page-section";
import { SanityTechnicolorBlock, TechnicolorBlock } from "../component/technicolor-block";
import {
    collapsibleOptions,
    isVisibleField,
    optionalActionsField,
    titleBodyIconFields,
    SanityVisibleToggle,
    requiredRule,
    keyPointsWithIconsField,
    titleFieldWithHighlights,
    bodyFieldRichText,
    sectionIconField,
    resourcesField,
} from "../common-fields";
import {
    SanityTitledContentTextPanel,
    TitledContentTextPanel,
    titledContentTextPanelSchemaName,
} from "../component/content-text-panel";
import { KeyPointWithIcon, SanityKeyPointWithIcon } from "../key-point";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { SanityResourceSection } from "../resource/sanity";
import { ResourceSection } from "../resource/section";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SocialMediaID, socialMediaLinksField } from "../social-media";
import { SanityTestimonial, Testimonial, testimonialSchemaName } from "../testimonial";
import { SanityTitleBodyActions } from "../text";
import { PropsOf } from "../util";

import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const sections = {
    intro: { id: "introSection", title: "Intro" },
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
    impactSections: SanityImpactSection[];
    [sections.resources.id]: SanityResourceSection;
    [sections.tooling.id]: SanityToolingSection;
    [sections.drivers.id]: SanityDriversSection;
    [sections.cloud.id]: SanityKeyPointsSection;
    [sections.community.id]: SanityCommunitySection;
    [sections.testimonials.id]: SanityTestimonialsSection;
    conclusionSection: SanityConclusionSection;
}

interface SanitySection extends SanityTitleBodyActions, SanityVisibleToggle {}

interface SanityCoreSection extends SanitySection, SanityTechnicolorBlock {}

interface SanityIntroSection extends SanityCoreSection, SanityOptionalActions {
    userLogos: SanityReference<SanityOrganisation>[];
    displayUserLogos: boolean;
    contentTabs: SanityTitledContentTextPanel[];
}

interface SanityImpactSection extends SanityCoreSection, SanityOptionalActions {
    impactTabs: SanityTitledContentTextPanel[];
}

type SanityDriversSection = SanityFeatureGridSection;

interface SanityToolingSection extends SanityCoreSection {
    panels: SanityLinkPanelWithIcon[];
}

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
    readonly contentTabs: TitledContentTextPanel[];

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
                contentTabs: data.contentTabs.map((x) => new TitledContentTextPanel(x, db)),
            })
        );
    }
}

class ImpactSection extends TechnicolorBlock {
    readonly impactTabs: TitledContentTextPanel[];

    constructor(props: PropsOf<ImpactSection>) {
        super(props);
        this.impactTabs = props.impactTabs;
    }

    static override fromSanity(data: SanityImpactSection, db: SanityDataset) {
        return new ImpactSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                impactTabs: data.impactTabs.map((x) => new TitledContentTextPanel(x, db)),
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

    static override fromSanity(data: SanityToolingSection, db: SanityDataset) {
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
        optionalActionsField,
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
            of: [{ type: titledContentTextPanelSchemaName }],
            validation: requiredRule,
        }),
        isVisibleField,
    ]),
    sectionSchema("impact", [
        ...titleBodyIconFields,
        optionalActionsField,
        defineField({
            name: "impactTabs",
            title: "Impact Tabs",
            type: "array",
            of: [{ type: titledContentTextPanelSchemaName }],
            validation: requiredRule,
        }),
        isVisibleField,
    ]),
    sectionSchema("resources", [...titleBodyIconFields, optionalActionsField, resourcesField, isVisibleField]),
    sectionSchema("tooling", [
        ...titleBodyIconFields,
        optionalActionsField,
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
        optionalActionsField,
        defineField({
            name: "featureGrid",
            title: "Drivers",
            type: "reference",
            to: [{ type: featureGridSchemaName }],
            validation: requiredRule,
        }),
        isVisibleField,
    ]),
    sectionSchema("cloud", [...titleBodyIconFields, optionalActionsField, keyPointsWithIconsField(5), isVisibleField]),
    sectionSchema("community", [...titleBodyIconFields, optionalActionsField, socialMediaLinksField, isVisibleField]),
    sectionSchema("testimonials", [
        ...titleBodyIconFields,
        optionalActionsField,
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

const impactSectionsField = defineField({
    name: "impactSections",
    title: "Impact Sections",
    type: "array",
    of: [{ type: sectionSchemaName("impact") }],
});

const otherSectionFields = (Object.keys(sections) as SectionKey[])
    .filter((key) => !["intro", "impact", "resources"].includes(key))
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
