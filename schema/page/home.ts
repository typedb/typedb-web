import { ArrayRule, defineField, defineType } from "@sanity/types";
import { SanityOptionalActions } from "../button";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { featureGridSchemaName, FeatureGridSection, SanityFeatureGridSection } from "../component/feature-grid";
import { LinkPanelWithIcon, linkPanelWithIconSchemaName, ProductPanel, productPanelSchemaName, SanityLinkPanelWithIcon, SanityProductPanel } from "../component/link-panel";
import { resourceSectionSchemaName, SanityCoreSection, SectionBase } from "../component/section";
import { ProductLabel, productLabelField, SanityProductLabel } from "../component/product-label";
import {
    collapsible, isVisibleField, optionalActionsField, titleBodyIconFields, SanityVisibleToggle,
    required, keyPointsWithIconsField, titleFieldWithHighlights, bodyFieldRichText, sectionIconField,
    resourcesField,
} from "../common-fields";
import { SanityContentTextTab, ContentTextTab, contentTextTabSchemaName, multiComparisonTabsSchemaName, MultiComparisonTabs, SanityMultiComparisonTabs } from "../component/content-text-panel";
import { KeyPointWithIcon, SanityKeyPointWithIcon } from "../key-point";
import { SanityTextLink, TextLink } from "../link";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { SanityResourceSection } from "../resource/sanity";
import { ResourceSection } from "../resource/section";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SocialMediaID, socialMediaLinksField } from "../social-media";
import { SanityTestimonial, Testimonial, testimonialSchemaName } from "../testimonial";
import { PortableText, SanityTitleBodyActions } from "../text";
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
    [sections.quickLearn.id]: SanityCoreSection;
    [sections.cloud.id]: SanityProductLabelSection;
    [sections.testimonials.id]: SanityTestimonialsSection;
    conclusionSection: SanityCoreSection;
}

interface SanityIntroSection extends SanityCoreSection {
    userLogos: SanityReference<SanityOrganisation>[];
    displayUserLogos: boolean;
    contentTabs: SanityContentTextTab[];
}

interface SanityImpactSection extends SanityCoreSection {
    impactTabs: SanityContentTextTab[];
}

interface SanityMultiComparisonSection extends SanityCoreSection {
    comparisonTabs: SanityMultiComparisonTabs;
}

interface SanityProductLabelSection extends SanityCoreSection {
    productLabel: SanityProductLabel;
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
    readonly [sections.quickLearn.id]?: SectionBase;
    readonly [sections.cloud.id]?: ProductLabelSection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly [sections.conclusion.id]?: SectionBase;

    constructor(data: SanityHomePage, db: SanityDataset) {
        super(data, db);
        this.introSection = data.introSection.isVisible ? IntroSection.fromSanity(data.introSection, db) : undefined;
        this.compareDBsSection = data.compareDBsSection.isVisible
            ? MultiComparisonSection.fromSanity(data.compareDBsSection, db)
            : undefined;
        this.quickLearnSection = data.quickLearnSection.isVisible
            ? SectionBase.fromSanity(data.quickLearnSection, db)
            : undefined;
        this.cloudSection = data.cloudSection.isVisible ? ProductLabelSection.fromSanity(data.cloudSection, db) : undefined;
        this.testimonialsSection = data.testimonialsSection.isVisible
            ? TestimonialsSection.fromSanity(data.testimonialsSection, db)
            : undefined;
        this.conclusionSection = data.conclusionSection.isVisible
            ? SectionBase.fromSanity(data.conclusionSection, db)
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

class MultiComparisonSection extends SectionBase {
    readonly comparisonTabs: MultiComparisonTabs;

    constructor(props: PropsOf<MultiComparisonSection>) {
        super(props);
        this.comparisonTabs = props.comparisonTabs;
    }

    static override fromSanity(data: SanityMultiComparisonSection, db: SanityDataset) {
        return new MultiComparisonSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                comparisonTabs: new MultiComparisonTabs(data.comparisonTabs, db),
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

class ProductLabelSection extends SectionBase {
    readonly productLabel: ProductLabel;

    constructor(props: PropsOf<ProductLabelSection>) {
        super(props);
        this.productLabel = props.productLabel;
    }

    static override fromSanity(data: SanityProductLabelSection, db: SanityDataset) {
        return new ProductLabelSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                productLabel: ProductLabel.fromSanity(data.productLabel, db),
            })
        );
    }
}

class CloudSection extends SectionBase {
    readonly keyPoints: KeyPointWithIcon[];

    constructor(props: PropsOf<CloudSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static override fromSanity(data: SanityKeyPointsSection, db: SanityDataset) {
        return new CloudSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                keyPoints: data.keyPoints.map((x) => new KeyPointWithIcon(x, db)),
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
        sectionIconField,
        optionalActionsField,
        defineField({
            name: "displayUserLogos",
            title: "Display Organisation Logos?",
            type: "boolean",
            initialValue: false,
            validation: required,
        }),
        Object.assign({}, organisationLogosField, { name: "userLogos" }),
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
        ...titleBodyIconFields,
        optionalActionsField,
        defineField({
            name: "comparisonTabs",
            title: "Comparison Tabs",
            type: multiComparisonTabsSchemaName,
            validation: required,
        }),
        isVisibleField,
    ]),
    sectionSchema("quickLearn", [...titleBodyIconFields, optionalActionsField, isVisibleField]),
    sectionSchema("cloud", [...titleBodyIconFields, optionalActionsField, productLabelField, isVisibleField]),
    sectionSchema("testimonials", [
        ...titleBodyIconFields,
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
    sectionSchema("conclusion", [...titleBodyIconFields, optionalActionsField, isVisibleField]),
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
