import { ComposeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType, Slug } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { ContactFormSection, contactFormSectionSchemaName, SanityContactFormSection } from "../component/contact-form-section";
import { FeatureTableSection, featureTableSectionSchemaName, SanityFeatureTableSection } from "../component/feature-table";
import {
    PricingPanelsSection, pricingPanelsSectionSchemaName, SanityPricingPanelsSection,
} from "../component/pricing-panels-section";
import { HotTopicsSection } from "../component/hot-topics-section";
import {
    hotTopicsSectionSchemaName, IllustrationSection, illustrationSectionSchemaName,
    LinkPanelsSection, linkPanelsSectionSchemaName, SanityHotTopicsSection, SanityIllustrationSection,
    SanityLinkPanelsSection, SanitySimpleLinkPanelsSection,
    SanityTitleBodyPanelSection, SimpleLinkPanelsSection,
    simpleLinkPanelsSectionSchemaName, TitleBodyPanelSection, titleBodyPanelSectionSchemaName,
} from "../component/section";
import { KeyPointsSection, keyPointsSectionSchemaName, SanityKeyPointsSection } from "../key-point";
import { SanityDataset } from "../sanity-core";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

// Top-level URL segments owned by the fixed-schema pages and resource hubs in main/src/routes.browser.ts.
// Keep in sync manually - the schema package cannot import from the Angular app.
const reservedRoutes = [
    "404", "applications", "blog", "cloud", "deploy", "events", "features", "fundamentals", "learn", "lectures",
    "legal", "papers", "pricing", "request-tech-talk", "startup-program", "support", "use-cases",
];

interface SanityKeyed {
    _key: string;
}

export const composablePageBackgrounds = [
    { title: "None", value: "none" },
    { title: "Floating Dots", value: "floatingDots" },
] as const;

export type ComposablePageBackground = (typeof composablePageBackgrounds)[number]["value"];

export type SanityComposableSection = SanityKeyed &
    (
        | ({ _type: typeof illustrationSectionSchemaName } & SanityIllustrationSection)
        | ({ _type: typeof titleBodyPanelSectionSchemaName } & SanityTitleBodyPanelSection)
        | ({ _type: typeof linkPanelsSectionSchemaName } & SanityLinkPanelsSection)
        | ({ _type: typeof simpleLinkPanelsSectionSchemaName } & SanitySimpleLinkPanelsSection)
        | ({ _type: typeof keyPointsSectionSchemaName } & SanityKeyPointsSection)
        | ({ _type: typeof conclusionSectionSchemaName } & SanityConclusionSection)
        | ({ _type: typeof hotTopicsSectionSchemaName } & SanityHotTopicsSection)
        | ({ _type: typeof contactFormSectionSchemaName } & SanityContactFormSection)
        | ({ _type: typeof featureTableSectionSchemaName } & SanityFeatureTableSection)
        | ({ _type: typeof pricingPanelsSectionSchemaName } & SanityPricingPanelsSection)
    );

export interface SanityComposablePage extends SanityPage {
    title: string;
    route: Slug;
    background?: ComposablePageBackground;
    sections?: SanityComposableSection[];
}

export type ComposablePageSection =
    | { type: typeof illustrationSectionSchemaName; key: string; section: IllustrationSection }
    | { type: typeof titleBodyPanelSectionSchemaName; key: string; section: TitleBodyPanelSection }
    | { type: typeof linkPanelsSectionSchemaName; key: string; section: LinkPanelsSection }
    | { type: typeof simpleLinkPanelsSectionSchemaName; key: string; section: SimpleLinkPanelsSection }
    | { type: typeof keyPointsSectionSchemaName; key: string; section: KeyPointsSection }
    | { type: typeof conclusionSectionSchemaName; key: string; section: ConclusionSection }
    | { type: typeof hotTopicsSectionSchemaName; key: string; section: HotTopicsSection }
    | { type: typeof contactFormSectionSchemaName; key: string; section: ContactFormSection }
    | { type: typeof featureTableSectionSchemaName; key: string; section: FeatureTableSection }
    | { type: typeof pricingPanelsSectionSchemaName; key: string; section: PricingPanelsSection };

function sectionFromSanity(data: SanityComposableSection, db: SanityDataset): ComposablePageSection | undefined {
    switch (data._type) {
        case illustrationSectionSchemaName:
            return { type: data._type, key: data._key, section: IllustrationSection.fromSanity(data, db) };
        case titleBodyPanelSectionSchemaName:
            return { type: data._type, key: data._key, section: TitleBodyPanelSection.fromSanity(data, db) };
        case linkPanelsSectionSchemaName:
            return { type: data._type, key: data._key, section: LinkPanelsSection.fromSanity(data, db) };
        case simpleLinkPanelsSectionSchemaName:
            return { type: data._type, key: data._key, section: SimpleLinkPanelsSection.fromSanity(data, db) };
        case keyPointsSectionSchemaName:
            return { type: data._type, key: data._key, section: KeyPointsSection.fromSanity(data, db) };
        case conclusionSectionSchemaName:
            return { type: data._type, key: data._key, section: ConclusionSection.fromSanity(data, db) };
        case hotTopicsSectionSchemaName:
            return { type: data._type, key: data._key, section: HotTopicsSection.fromSanity(data, db) };
        case contactFormSectionSchemaName:
            return { type: data._type, key: data._key, section: ContactFormSection.fromSanity(data, db) };
        case featureTableSectionSchemaName:
            return { type: data._type, key: data._key, section: FeatureTableSection.fromSanity(data, db) };
        case pricingPanelsSectionSchemaName:
            return { type: data._type, key: data._key, section: PricingPanelsSection.fromSanity(data, db) };
        default:
            return undefined;
    }
}

export class ComposablePage extends Page {
    readonly title: string;
    readonly route: string;
    readonly background: ComposablePageBackground;
    readonly sections: ComposablePageSection[];

    constructor(data: SanityComposablePage, db: SanityDataset) {
        super(data, db);
        this.title = data.title;
        this.route = data.route.current;
        this.background = data.background || "none";
        this.sections = (data.sections || [])
            .filter((x) => x.isVisible)
            .map((x) => sectionFromSanity(x, db))
            .filter((x): x is ComposablePageSection => !!x);
    }
}

export const composablePageSchemaName = "composablePage";

const composablePageSchema = defineType({
    name: composablePageSchemaName,
    title: "Composable Page",
    type: "document",
    icon: ComposeIcon,
    fields: [
        defineField({
            name: "title",
            type: "string",
            description: "Page name - used in the browser tab title and to identify this page in the CMS",
            validation: (rule) => rule.required().error("A page title is required"),
        }),
        defineField({
            name: "route",
            type: "slug",
            description: "URL path for this page - e.g. 'graph-database' publishes to typedb.com/graph-database",
            options: { source: "title" },
            validation: (rule) => [
                rule.required().error("Required to generate the page URL"),
                rule.custom((value?: Slug) => {
                    const current = value?.current;
                    if (!current) return true;
                    if (reservedRoutes.includes(current)) return `'${current}' is already used by an existing page`;
                    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(current))
                        return "Must contain only lowercase letters, numbers and hyphens, e.g. 'graph-database'";
                    return true;
                }),
            ],
        }),
        defineField({
            name: "background",
            title: "Background",
            type: "string",
            description: "Animated effect rendered behind the whole page",
            options: {
                layout: "radio",
                direction: "horizontal",
                list: [...composablePageBackgrounds],
            },
            initialValue: "none",
        }),
        defineField({
            name: "sections",
            title: "Page Sections",
            type: "array",
            description: "The page is built from these sections, rendered top to bottom",
            of: [
                defineArrayMember({ type: illustrationSectionSchemaName }),
                defineArrayMember({ type: titleBodyPanelSectionSchemaName }),
                defineArrayMember({ type: keyPointsSectionSchemaName }),
                defineArrayMember({ type: linkPanelsSectionSchemaName }),
                defineArrayMember({ type: simpleLinkPanelsSectionSchemaName }),
                defineArrayMember({ type: conclusionSectionSchemaName }),
                defineArrayMember({ type: hotTopicsSectionSchemaName }),
                defineArrayMember({ type: featureTableSectionSchemaName }),
                defineArrayMember({ type: pricingPanelsSectionSchemaName }),
                defineArrayMember({ type: contactFormSectionSchemaName }),
            ],
            options: {
                insertMenu: {
                    filter: true,
                    groups: [
                        {
                            name: "content",
                            title: "Content",
                            of: [
                                illustrationSectionSchemaName, titleBodyPanelSectionSchemaName,
                                keyPointsSectionSchemaName, featureTableSectionSchemaName,
                            ],
                        },
                        {
                            name: "links",
                            title: "Links",
                            of: [linkPanelsSectionSchemaName, simpleLinkPanelsSectionSchemaName, hotTopicsSectionSchemaName],
                        },
                        {
                            name: "conversion",
                            title: "Conversion",
                            of: [
                                pricingPanelsSectionSchemaName, conclusionSectionSchemaName,
                                contactFormSectionSchemaName,
                            ],
                        },
                    ],
                    views: [
                        {
                            name: "grid",
                            previewImageUrl: (schemaTypeName) => `/static/section-previews/${schemaTypeName}.svg`,
                        },
                        { name: "list" },
                    ],
                },
            },
            validation: (rule) => rule.min(1).warning("The page is empty - add at least one section"),
        }),
        metaTagsField,
    ],
    preview: {
        select: { title: "title", route: "route.current" },
        prepare: ({ title, route }: { title?: string; route?: string }) => ({
            title: title || "Untitled page",
            subtitle: route ? `/${route}` : "No route set",
        }),
    },
});

export const composablePageSchemas = [composablePageSchema];
