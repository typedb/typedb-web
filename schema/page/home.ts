import { defineField, defineType } from "@sanity/types";
import { featureGridSchemaName, FeatureGridSection, SanityFeatureGridSection } from "../component/feature-grid";
import { LinkPanelWithIcon, SanityLinkPanelWithIcon } from "../component/link-panel";
import { SanityCoreSection, SectionBase } from "../component/section";
import { Brochure, brochureField, brochureSchemaName, SanityBrochure } from "../component/brochure";
import {
    collapsible, isVisibleField, optionalActionsField,
    required, keyPointsWithIconsField, titleFieldWithHighlights, bodyFieldRichText, titleAndBodyFields,
} from "../common-fields";
import { SanityContentTextTab, ContentTextTab, contentTextTabSchemaName, multiComparisonTabsSchemaName, MultiComparisonTabs, SanityMultiComparisonTabs } from "../component/content-text-panel";
import { KeyPointWithIcon, SanityKeyPointWithIcon } from "../key-point";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SocialMediaID } from "../social-media";
import { SanityTestimonial, Testimonial, testimonialSchemaName } from "../testimonial";
import { PropsOf } from "../util";

import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    compareDBs: { id: "compareDBsSection", title: "DB Comparison" },
    quickLearn: { id: "quickLearnSection", title: "Quick Learn" },
    cloud: { id: "cloudSection", title: "Cloud" },
    testimonials: { id: "testimonialsSection", title: "Testimonials" },
    conclusion: { id: "conclusionSection", title: "Conclusion" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = (typeof sections)[SectionKey]["id"];

export interface SanityHomePage extends SanityPage {
    [sections.intro.id]: SanityIntroSection;
    [sections.compareDBs.id]: SanityMultiComparisonSection;
    [sections.quickLearn.id]: SanityFeatureGridSection;
    [sections.cloud.id]: SanityCloudSection;
    [sections.testimonials.id]: SanityTestimonialsSection;
    conclusionSection: SanityCoreSection;
}

interface SanityIntroSection extends SanityCoreSection {
    contentTabs: SanityContentTextTab[];
}

interface SanityImpactSection extends SanityCoreSection {
    impactTabs: SanityContentTextTab[];
}

interface SanityMultiComparisonSection extends SanityCoreSection {
    comparisons: SanityMultiComparisonTabs[];
}

interface SanityCloudSection extends SanityCoreSection {
    offerings: SanityBrochure[];
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

interface SanityTestimonialsSection extends SanityKeyPointsSection {
    testimonials: SanityReference<SanityTestimonial>[];
}

export class HomePage extends Page {
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.compareDBs.id]?: MultiComparisonSection;
    readonly [sections.quickLearn.id]?: FeatureGridSection;
    readonly [sections.cloud.id]?: CloudSection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly [sections.conclusion.id]?: SectionBase;

    constructor(data: SanityHomePage, db: SanityDataset) {
        super(data, db);
        this.introSection = data.introSection.isVisible ? IntroSection.fromSanity(data.introSection, db) : undefined;
        this.compareDBsSection = data.compareDBsSection.isVisible
            ? MultiComparisonSection.fromSanity(data.compareDBsSection, db)
            : undefined;
        this.quickLearnSection = data.quickLearnSection.isVisible
            ? FeatureGridSection.fromSanity(data.quickLearnSection, db)
            : undefined;
        this.cloudSection = data.cloudSection.isVisible ? CloudSection.fromSanity(data.cloudSection, db) : undefined;
        this.testimonialsSection = data.testimonialsSection.isVisible
            ? TestimonialsSection.fromSanity(data.testimonialsSection, db)
            : undefined;
        this.conclusionSection = data.conclusionSection.isVisible
            ? SectionBase.fromSanity(data.conclusionSection, db)
            : undefined;
    }
}

class IntroSection extends SectionBase {
    readonly contentTabs: ContentTextTab[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.contentTabs = props.contentTabs;
    }

    static override fromSanity(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                contentTabs: data.contentTabs.map((x) => new ContentTextTab(x, db)),
            })
        );
    }
}

class MultiComparisonSection extends SectionBase {
    readonly comparisons: MultiComparisonTabs[];

    constructor(props: PropsOf<MultiComparisonSection>) {
        super(props);
        this.comparisons = props.comparisons;
    }

    static override fromSanity(data: SanityMultiComparisonSection, db: SanityDataset) {
        return new MultiComparisonSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                comparisons: data.comparisons.map(x => new MultiComparisonTabs(x, db)),
            }),
        );
    }
}

class ImpactSection extends SectionBase {
    readonly impactTabs: ContentTextTab[];

    constructor(props: PropsOf<ImpactSection>) {
        super(props);
        this.impactTabs = props.impactTabs;
    }

    static override fromSanity(data: SanityImpactSection, db: SanityDataset) {
        return new ImpactSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                impactTabs: data.impactTabs.map((x) => new ContentTextTab(x, db)),
            })
        );
    }
}

class ToolingSection extends SectionBase {
    readonly panels: LinkPanelWithIcon[];

    constructor(props: PropsOf<ToolingSection>) {
        super(props);
        this.panels = props.panels;
    }

    static override fromSanity(data: SanityToolingSection, db: SanityDataset) {
        return new ToolingSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                panels: data.panels.map((x) => LinkPanelWithIcon.fromSanity(x, db)),
            })
        );
    }
}

class CloudSection extends SectionBase {
    readonly offerings: Brochure[];

    constructor(props: PropsOf<CloudSection>) {
        super(props);
        this.offerings = props.offerings;
    }

    static override fromSanity(data: SanityCloudSection, db: SanityDataset) {
        return new CloudSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                offerings: data.offerings.map(x => Brochure.fromSanity(x, db)),
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

class TestimonialsSection extends SectionBase {
    readonly testimonials: Testimonial[];
    readonly keyPoints: KeyPointWithIcon[];

    constructor(props: PropsOf<TestimonialsSection>) {
        super(props);
        this.testimonials = props.testimonials;
        this.keyPoints = props.keyPoints;
    }

    static override fromSanity(data: SanityTestimonialsSection, db: SanityDataset) {
        return new TestimonialsSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                testimonials: data.testimonials.map((x) => new Testimonial(db.resolveRef(x), db)),
                keyPoints: data.keyPoints.map(x => new KeyPointWithIcon(x, db)),
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
        optionalActionsField,
        defineField({
            name: "displayUserLogos",
            title: "Display Organisation Logos?",
            type: "boolean",
            initialValue: false,
            validation: required,
        }),
        defineField({
            name: "contentTabs",
            title: "Content Tabs",
            type: "array",
            of: [{ type: contentTextTabSchemaName }],
            validation: required,
        }),
        isVisibleField,
    ]),
    sectionSchema("compareDBs", [
        ...titleAndBodyFields,
        optionalActionsField,
        defineField({
            name: "comparisons",
            title: "Comparisons",
            type: "array",
            of: [{type: multiComparisonTabsSchemaName }],
            validation: required,
        }),
        isVisibleField,
    ]),
    sectionSchema("quickLearn", [
        ...titleAndBodyFields,
        optionalActionsField,
        defineField({
            name: featureGridSchemaName,
            title: "Points",
            type: "reference",
            to: [{type: featureGridSchemaName}],
            validation: required,
        }),
        isVisibleField
    ]),
    sectionSchema("cloud", [
        ...titleAndBodyFields,
        optionalActionsField,
        defineField({
            name: "offerings",
            title: "Offerings",
            type: "array",
            of: [{ type: brochureSchemaName }],
            validation: required,
        }),
        isVisibleField
    ]),
    sectionSchema("testimonials", [
        ...titleAndBodyFields,
        optionalActionsField,
        defineField({
            name: "testimonials",
            title: "Testimonials",
            type: "array",
            of: [{ type: "reference", to: [{ type: testimonialSchemaName }] }],
        }),
        keyPointsWithIconsField(5),
        isVisibleField,
    ]),
    sectionSchema("conclusion", [...titleAndBodyFields, optionalActionsField, isVisibleField]),
];

const introSectionField = defineField({
    name: sections.intro.id,
    title: `${sections.intro.title} Section`,
    type: sectionSchemaName("intro"),
    options: collapsible,
});

const otherSectionFields = (Object.keys(sections) as SectionKey[])
    .filter((key) => !["intro"].includes(key))
    .map((key) =>
        defineField({
            name: sections[key].id,
            title: `${sections[key].title} Section`,
            type: sectionSchemaName(key),
            options: collapsible,
        })
    );

const homePageSchema = defineType({
    name: homePageSchemaName,
    title: "Home Page",
    type: "document",
    fields: [
        metaTagsField,
        introSectionField,
        ...otherSectionFields,
    ],
    preview: { prepare: (_selection) => ({ title: "Home Page" }) },
});

export const homePageSchemas = [homePageSchema, ...sectionSchemas];
