import { BlockContentIcon, DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType, Reference, SanityDocument, Slug, SlugRule } from "@sanity/types";
import { titleField, titleFieldName } from "./common-fields";
import { Document } from "./document";
import { SanityDataset } from "./sanity-core";
import { TechnicolorBlockChain } from "./technicolor-block-chain";
import { sanitySchemaName } from "./util";

const routeFieldName = "route";
const contentFieldName = "content";

export interface SanityPage extends SanityDocument {
    title: string;
    route: Slug;
    content: Reference[];
}

export class Page extends Document {
    readonly title: string;
    readonly route: string;
    readonly content: PageContent[];

    constructor(data: SanityPage, db: SanityDataset) {
        super(data);
        this.title = data.title;
        this.route = data.route.current;
        this.content = data.content.map(x => new TechnicolorBlockChain(db.resolveReference(x), db));
    }
}

export type PageContent = /* PageSection |*/ TechnicolorBlockChain;

const bodyTextSchema = defineType({
    name: "bodyText",
    title: "Body Text",
    icon: BlockContentIcon,
    type: "array",
    of: [{type: "block"}],
});

const sectionSchema = defineType({
    name: "pageSection",
    title: "Page Section",
    icon: BlockContentIcon,
    type: "document",
    fields: [
        titleField,
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                { type: "bodyText" },
                { type: "actions" },
            ]
        })
    ]
});

const pageSchema = defineType({
    name: sanitySchemaName(Page),
    icon: DocumentTextIcon,
    type: "document",
    title: "Page",
    fields: [
        titleField,
        defineField({
            name: routeFieldName,
            title: "Route",
            type: "slug",
            initialValue: {current: "/"},
            description: "URL fragment for this page. e.g. /typedb-studio",
            validation: (rule: SlugRule) => rule.custom((value, _context) => {
                if (!value?.current) return "Required";
                if (!value.current.startsWith("/") || value.current.startsWith("//")) return "Must start with a single '/'";
                return true;
            }),
        }),
        defineField({
            name: contentFieldName,
            title: "Content",
            type: "array",
            of: [{
                type: "reference",
                to: [
                    { type: "pageSection" },
                    { type: "technicolorBlockChain" },
                ],
            }],
        }),
    ],
    preview: {
        select: { title: titleFieldName, route: "route.current" },
        prepare: (selection) => ({ title: selection.title, subtitle: selection.route }),
    },
});

export const pageSchemas = [bodyTextSchema, sectionSchema, pageSchema];
