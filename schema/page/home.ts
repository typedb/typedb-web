import { ArrayRule, defineField, defineType } from "@sanity/types";
import { SanityOptionalActions } from "../button";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { LinkPanel, linkPanelSchemaName, LinkPanelWithIcon, linkPanelWithIconSchemaName, SanityLinkPanel, SanityLinkPanelWithIcon } from "../component/link-panel";
import { SanityTechnicolorBlock, TechnicolorBlock } from "../component/technicolor-block";
import { collapsibleOptions, isVisibleField, optionalActionsField, pageTitleField, titleBodyIconFields, SanityVisibleToggle, requiredRule, keyPointsWithIconsField } from "../common-fields";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "../component/content-text-panel";
import { KeyPointWithIcon, SanityKeyPointWithIcon } from "../key-point";
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
    solutions: { id: "solutionsSection", title: "Solutions" },
    tooling: { id: "toolingSection", title: "Tooling" },
    cloud: { id: "cloudSection", title: "Cloud" },
    community: { id: "communitySection", title: "Community" },
    testimonials: { id: "testimonialsSection", title: "Testimonials" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = typeof sections[SectionKey]["id"];

export interface SanityHomePage extends SanityPage {
    [sections.intro.id]: SanityIntroSection;
    [sections.features.id]: SanityFeaturesSection;
    [sections.solutions.id]: SanitySolutionsSection;
    [sections.tooling.id]: SanityToolingSection;
    [sections.cloud.id]: SanityKeyPointsSection;
    [sections.community.id]: SanityCommunitySection;
    [sections.testimonials.id]: SanityTestimonialsSection;
    conclusionSection: SanityConclusionSection;
}

interface SanitySection extends SanityTitleBodyActions, SanityVisibleToggle {}

interface SanityCoreSection extends SanitySection, SanityTechnicolorBlock {}

interface SanityIntroSection extends SanityCoreSection, SanityOptionalActions {
    userLogos: SanityReference<SanityOrganisation>[];
}

interface SanityFeaturesSection extends SanityCoreSection {
    featureTabs: SanityContentTextPanel[];
}

interface SanitySolutionsSection extends SanityCoreSection {
    solutions: SanityLinkPanel[];
}

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
    testimonials: SanityTestimonial[];
}

export class HomePage extends Page {
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.features.id]?: FeaturesSection;
    readonly [sections.solutions.id]?: SolutionsSection;
    readonly [sections.tooling.id]?: ToolingSection;
    readonly [sections.cloud.id]?: CloudSection;
    readonly [sections.community.id]?: CommunitySection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly conclusionSection?: ConclusionSection;

    constructor(data: SanityHomePage, db: SanityDataset) {
        super(data);
        this.introSection = data.introSection.isVisible ? IntroSection.fromSanity(data.introSection, db) : undefined;
        this.featuresSection = data.featuresSection.isVisible ? FeaturesSection.fromSanity(data.featuresSection, db) : undefined;
        this.solutionsSection = data.solutionsSection.isVisible ? SolutionsSection.fromSanity(data.solutionsSection, db) : undefined;
        this.toolingSection = data.toolingSection.isVisible ? ToolingSection.fromSanity(data.toolingSection, db) : undefined;
        this.cloudSection = data.cloudSection.isVisible ? CloudSection.fromSanity(data.cloudSection, db) : undefined;
        this.communitySection = data.communitySection.isVisible ? CommunitySection.fromSanity(data.communitySection, db) : undefined;
        this.testimonialsSection = data.testimonialsSection.isVisible ? TestimonialsSection.fromSanity(data.testimonialsSection, db) : undefined;
        this.conclusionSection = data.conclusionSection.isVisible ? ConclusionSection.fromSanity(data.conclusionSection, db) : undefined;
    }
}

class IntroSection extends TechnicolorBlock {
    readonly userLogos: Organisation[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.userLogos = props.userLogos;
    }

    static override fromSanity(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection(Object.assign(TechnicolorBlock.fromSanity(data, db), {
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

    static override fromSanity(data: SanityFeaturesSection, db: SanityDataset) {
        return new FeaturesSection(Object.assign(TechnicolorBlock.fromSanity(data, db), {
            featureTabs: data.featureTabs.map(x => new ContentTextPanel(x, db)),
        }));
    }
}

class SolutionsSection extends TechnicolorBlock {
    readonly solutions: LinkPanel[];

    constructor(props: PropsOf<SolutionsSection>) {
        super(props);
        this.solutions = props.solutions;
    }

    static override fromSanity(data: SanitySolutionsSection, db: SanityDataset) {
        return new SolutionsSection(Object.assign(TechnicolorBlock.fromSanity(data, db), {
            solutions: data.solutions.map(x => LinkPanel.fromSanityLinkPanel(x, db)),
        }));
    }
}

class ToolingSection extends TechnicolorBlock {
    readonly panels: LinkPanelWithIcon[];

    constructor(props: PropsOf<ToolingSection>) {
        super(props);
        this.panels = props.panels;
    }

    static override fromSanity(data: SanityToolingSection, db: SanityDataset) {
        return new ToolingSection(Object.assign(TechnicolorBlock.fromSanity(data, db), {
            panels: data.panels.map(x => LinkPanelWithIcon.fromSanityLinkPanelWithIcon(x, db)),
        }));
    }
}

class CloudSection extends TechnicolorBlock {
    readonly keyPoints: KeyPointWithIcon[];

    constructor(props: PropsOf<CloudSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static override fromSanity(data: SanityKeyPointsSection, db: SanityDataset) {
        return new CloudSection(Object.assign(TechnicolorBlock.fromSanity(data, db), {
            keyPoints: data.keyPoints.map(x => new KeyPointWithIcon(x, db)),
        }));
    }
}

class CommunitySection extends TechnicolorBlock {
    readonly socialMedias: SocialMediaID[];

    constructor(props: PropsOf<CommunitySection>) {
        super(props);
        this.socialMedias = props.socialMedias;
    }

    static override fromSanity(data: SanityCommunitySection, db: SanityDataset) {
        return new CommunitySection(Object.assign(TechnicolorBlock.fromSanity(data, db), {
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

    static override fromSanity(data: SanityTestimonialsSection, db: SanityDataset) {
        return new TestimonialsSection(Object.assign(TechnicolorBlock.fromSanity(data, db), {
            testimonials: data.testimonials.map(x => new Testimonial(x, db)),
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
        optionalActionsField,
        defineField({
            name: "featureTabs",
            title: "Feature Tabs",
            type: "array",
            of: [{type: contentTextPanelSchemaName}],
            validation: (rule: ArrayRule<any>) => rule.required(),
        }),
        isVisibleField,
    ]),
    sectionSchema("solutions", [
        ...titleBodyIconFields,
        optionalActionsField,
        defineField({
            name: "solutions",
            title: "Solutions",
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
        optionalActionsField,
        defineField({
            name: "panels",
            title: "Panels",
            type: "array",
            of: [{type: linkPanelWithIconSchemaName}],
            validation: (rule: ArrayRule<any>) => rule.required().length(3),
        }),
        isVisibleField,
    ]),
    sectionSchema("cloud", [
        ...titleBodyIconFields,
        optionalActionsField,
        keyPointsWithIconsField(5),
        isVisibleField,
    ]),
    sectionSchema("community", [
        ...titleBodyIconFields,
        optionalActionsField,
        socialMediaLinksField,
        isVisibleField,
    ]),
    sectionSchema("testimonials", [
        ...titleBodyIconFields,
        optionalActionsField,
        defineField({
            name: "testimonials",
            title: "Testimonials",
            type: "array",
            of: [{type: testimonialSchemaName}],
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
        defineField({
            name: "conclusionSection",
            title: "Conclusion Section",
            type: conclusionSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Home Page" }), },
});

export const homePageSchemas = [homePageSchema, ...sectionSchemas];
