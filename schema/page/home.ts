import { ArrayRule, defineField, defineType } from "@sanity/types";
import { SanityOptionalActions } from "../button";
import { ConclusionPanel, conclusionPanelSchemaName, SanityConclusionPanel } from "../component/conclusion-panel";
import { LinkPanel, linkPanelSchemaName, SanityLinkPanel } from "../component/link-panel";
import { SanityTechnicolorBlock, TechnicolorBlock } from "../component/technicolor-block";
import { collapsibleOptions, isVisibleField, keyPointsField, optionalActionsField, pageTitleField, titleAndBodyFields, titleBodyIconFields, SanityVisibleToggle } from "../common-fields";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "../component/content-text-panel";
import { KeyPoint, SanityKeyPoint } from "../key-point";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SocialMediaID, socialMediaLinksField } from "../social-media";
import { SanityTestimonial, Testimonial, testimonialSchemaName } from "../testimonial";
import { SanityTitleBodyActions } from "../text";
import { PropsOf } from "../util";

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

export interface SanityHomePage extends SanityPage {
    [sections.intro.id]: SanityIntroSection;
    [sections.features.id]: SanityFeaturesSection;
    [sections.useCases.id]: SanityUseCasesSection;
    [sections.tooling.id]: SanityKeyPointsSection;
    [sections.cloud.id]: SanityKeyPointsSection;
    [sections.community.id]: SanityCommunitySection;
    [sections.testimonials.id]: SanityTestimonialsSection;
    [sections.conclusion.id]: SanityConclusionSection;
}

interface SanitySection extends SanityTitleBodyActions, SanityVisibleToggle {}

interface SanityCoreSection extends SanitySection, SanityTechnicolorBlock {}

interface SanityIntroSection extends SanityCoreSection, SanityOptionalActions {
    userLogos: SanityReference<SanityOrganisation>[];
}

interface SanityFeaturesSection extends SanityCoreSection {
    featureTabs: SanityContentTextPanel[];
}

interface SanityUseCasesSection extends SanityCoreSection {
    useCases: SanityLinkPanel[];
}

interface SanityKeyPointsSection extends SanityCoreSection {
    keyPoints: SanityKeyPoint[];
}

interface SanityCommunitySection extends SanityCoreSection {
    socialMediaLinks: SocialMediaID[];
}

interface SanityTestimonialsSection extends SanityCoreSection {
    testimonials: SanityTestimonial[];
}

interface SanityConclusionSection extends SanityCoreSection {
    panel: SanityConclusionPanel;
}

export class HomePage extends Page {
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.features.id]?: FeaturesSection;
    readonly [sections.useCases.id]?: UseCasesSection;
    readonly [sections.tooling.id]?: KeyPointsSection;
    readonly [sections.cloud.id]?: KeyPointsSection;
    readonly [sections.community.id]?: CommunitySection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly [sections.conclusion.id]?: ConclusionSection;

    constructor(data: SanityHomePage, db: SanityDataset) {
        super(data);
        this.introSection = data.introSection.isVisible ? IntroSection.fromSanityIntroSection(data.introSection, db) : undefined;
        this.featuresSection = data.featuresSection.isVisible ? FeaturesSection.fromSanityFeaturesSection(data.featuresSection, db) : undefined;
        this.useCasesSection = data.useCasesSection.isVisible ? UseCasesSection.fromSanityUseCasesSection(data.useCasesSection, db) : undefined;
        this.toolingSection = data.toolingSection.isVisible ? KeyPointsSection.fromSanityKeyPointsSection(data.toolingSection, db) : undefined;
        this.cloudSection = data.cloudSection.isVisible ? KeyPointsSection.fromSanityKeyPointsSection(data.cloudSection, db) : undefined;
        this.communitySection = data.communitySection.isVisible ? CommunitySection.fromSanityCommunitySection(data.communitySection, db) : undefined;
        this.testimonialsSection = data.testimonialsSection.isVisible ? TestimonialsSection.fromSanityTestimonialsSection(data.testimonialsSection, db) : undefined;
        this.conclusionSection = data.conclusionSection.isVisible ? ConclusionSection.fromSanityConclusionSection(data.conclusionSection, db) : undefined;
    }
}

class IntroSection extends TechnicolorBlock {
    readonly userLogos: Organisation[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.userLogos = props.userLogos;
    }

    static fromSanityIntroSection(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            userLogos: data.userLogos.map(x => new Organisation(db.resolveRef(x), db)),
        }));
    }
}

class FeaturesSection extends TechnicolorBlock {
    readonly featureTabs: ContentTextPanel[];

    constructor(props: PropsOf<FeaturesSection>) {
        super(props);
        this.featureTabs = props.featureTabs;
    }

    static fromSanityFeaturesSection(data: SanityFeaturesSection, db: SanityDataset) {
        return new FeaturesSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            featureTabs: data.featureTabs.map(x => new ContentTextPanel(x, db)),
        }));
    }
}

class UseCasesSection extends TechnicolorBlock {
    readonly useCases: LinkPanel[];

    constructor(props: PropsOf<UseCasesSection>) {
        super(props);
        this.useCases = props.useCases;
    }

    static fromSanityUseCasesSection(data: SanityUseCasesSection, db: SanityDataset) {
        return new UseCasesSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            useCases: data.useCases.map(x => LinkPanel.fromSanityLinkPanel(x, db)),
        }));
    }
}

class KeyPointsSection extends TechnicolorBlock {
    readonly keyPoints: KeyPoint[];

    constructor(props: PropsOf<KeyPointsSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static fromSanityKeyPointsSection(data: SanityKeyPointsSection, db: SanityDataset) {
        return new KeyPointsSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            keyPoints: data.keyPoints.map(x => new KeyPoint(x, db)),
        }));
    }
}

class CommunitySection extends TechnicolorBlock {
    readonly socialMedias: SocialMediaID[];

    constructor(props: PropsOf<CommunitySection>) {
        super(props);
        this.socialMedias = props.socialMedias;
    }

    static fromSanityCommunitySection(data: SanityCommunitySection, db: SanityDataset) {
        return new CommunitySection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            socialMedias: data.socialMediaLinks,
        }));
    }
}

class TestimonialsSection extends TechnicolorBlock {
    readonly testimonials: Testimonial[];

    constructor(props: PropsOf<TestimonialsSection>) {
        super(props);
        this.testimonials = props.testimonials;
    }

    static fromSanityTestimonialsSection(data: SanityTestimonialsSection, db: SanityDataset) {
        return new TestimonialsSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            testimonials: data.testimonials.map(x => new Testimonial(x, db)),
        }));
    }
}

class ConclusionSection extends TechnicolorBlock {
    readonly panel: ConclusionPanel;

    constructor(props: PropsOf<ConclusionSection>) {
        super(props);
        this.panel = props.panel;
    }

    static fromSanityConclusionSection(data: SanityConclusionSection, db: SanityDataset) {
        return new ConclusionSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            panel: ConclusionPanel.fromSanity(data.panel, db)
        }));
    }
}

export const homePageSchemaName = "homePage";

const sectionSchemaName = (key: SectionKey) => `${homePageSchemaName}_${sections[key].id}`;

const sectionSchema = (key: SectionKey, fields: any[]) => defineType({
    name: sectionSchemaName(key),
    title: `${sections[key].title} Section`,
    type: "object",
    fields: fields,
});

const sectionSchemas = [
    sectionSchema("intro", [
        ...titleBodyIconFields,
        optionalActionsField,
        Object.assign({}, organisationLogosField, { name: "userLogos" }),
        isVisibleField,
    ]),
    sectionSchema("features", [
        ...titleBodyIconFields,
        defineField({
            name: "featureTabs",
            title: "Feature Tabs",
            type: "array",
            of: [{type: contentTextPanelSchemaName}],
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
            of: [{type: linkPanelSchemaName}],
            validation: (rule: ArrayRule<any>) => rule.required().custom((value) => {
                if ([4, 8].includes(value.length)) return true;
                return "Must contain exactly 4 or 8 items";
            }),
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
        ...titleBodyIconFields,
        optionalActionsField,
        defineField({
            name: "panel",
            title: "Panel",
            type: conclusionPanelSchemaName,
        }),
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

export const homePageSchemas = [homePageSchema, ...sectionSchemas];
