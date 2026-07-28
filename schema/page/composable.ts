import { ComposeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType, Slug } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import {
    IllustrationSection, illustrationSectionSchemaName, LinkPanelsSection, linkPanelsSectionSchemaName,
    SanityIllustrationSection, SanityLinkPanelsSection, SanitySectionCore, SanitySimpleLinkPanelsSection,
    SanityTitleBodyPanelSection, SectionCore, sectionCoreSchemaName, SimpleLinkPanelsSection,
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

export type SanityComposableSection = SanityKeyed &
    (
        | ({ _type: typeof sectionCoreSchemaName } & SanitySectionCore)
        | ({ _type: typeof illustrationSectionSchemaName } & SanityIllustrationSection)
        | ({ _type: typeof titleBodyPanelSectionSchemaName } & SanityTitleBodyPanelSection)
        | ({ _type: typeof linkPanelsSectionSchemaName } & SanityLinkPanelsSection)
        | ({ _type: typeof simpleLinkPanelsSectionSchemaName } & SanitySimpleLinkPanelsSection)
        | ({ _type: typeof keyPointsSectionSchemaName } & SanityKeyPointsSection)
        | ({ _type: typeof conclusionSectionSchemaName } & SanityConclusionSection)
    );

export interface SanityComposablePage extends SanityPage {
    title: string;
    route: Slug;
    sections?: SanityComposableSection[];
}

export type ComposablePageSection =
    | { type: typeof sectionCoreSchemaName; key: string; section: SectionCore }
    | { type: typeof illustrationSectionSchemaName; key: string; section: IllustrationSection }
    | { type: typeof titleBodyPanelSectionSchemaName; key: string; section: TitleBodyPanelSection }
    | { type: typeof linkPanelsSectionSchemaName; key: string; section: LinkPanelsSection }
    | { type: typeof simpleLinkPanelsSectionSchemaName; key: string; section: SimpleLinkPanelsSection }
    | { type: typeof keyPointsSectionSchemaName; key: string; section: KeyPointsSection }
    | { type: typeof conclusionSectionSchemaName; key: string; section: ConclusionSection };

function sectionFromSanity(data: SanityComposableSection, db: SanityDataset): ComposablePageSection | undefined {
    switch (data._type) {
        case sectionCoreSchemaName:
            return { type: data._type, key: data._key, section: SectionCore.fromSanity(data, db) };
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
        default:
            return undefined;
    }
}

export class ComposablePage extends Page {
    readonly title: string;
    readonly route: string;
    readonly sections: ComposablePageSection[];

    constructor(data: SanityComposablePage, db: SanityDataset) {
        super(data, db);
        this.title = data.title;
        this.route = data.route.current;
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
            name: "sections",
            title: "Page Sections",
            type: "array",
            description: "The page is built from these sections, rendered top to bottom",
            of: [
                defineArrayMember({ type: illustrationSectionSchemaName }),
                defineArrayMember({ type: sectionCoreSchemaName }),
                defineArrayMember({ type: titleBodyPanelSectionSchemaName }),
                defineArrayMember({ type: keyPointsSectionSchemaName }),
                defineArrayMember({ type: linkPanelsSectionSchemaName }),
                defineArrayMember({ type: simpleLinkPanelsSectionSchemaName }),
                defineArrayMember({ type: conclusionSectionSchemaName }),
            ],
            options: {
                insertMenu: {
                    filter: true,
                    groups: [
                        {
                            name: "intro",
                            title: "Intro & Heroes",
                            of: [illustrationSectionSchemaName, sectionCoreSchemaName],
                        },
                        {
                            name: "content",
                            title: "Content",
                            of: [titleBodyPanelSectionSchemaName, keyPointsSectionSchemaName],
                        },
                        {
                            name: "links",
                            title: "Links & Navigation",
                            of: [linkPanelsSectionSchemaName, simpleLinkPanelsSectionSchemaName],
                        },
                        {
                            name: "conversion",
                            title: "Conversion",
                            of: [conclusionSectionSchemaName],
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
