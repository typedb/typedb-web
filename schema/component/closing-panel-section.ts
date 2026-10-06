import { defineArrayMember, defineField, defineType } from "@sanity/types";
import { RocketIcon } from "@sanity/icons";
import { isVisibleField, sectionPreview, textLinkFieldOptional, titleBodyActionsFields } from "../common-fields";
import { SanityTextLink, TextLink } from "../link";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SanitySectionCore, SectionCore } from "./section";

export interface SanityClosingPanelColumn {
    _key: string;
    title: string;
    description?: string;
    link?: SanityTextLink;
}

export interface SanityClosingPanelSection extends SanitySectionCore {
    columns?: SanityClosingPanelColumn[];
}

export interface ClosingPanelColumn {
    key: string;
    title: string;
    description?: string;
    link?: TextLink;
}

export class ClosingPanelSection extends SectionCore {
    readonly columns: ClosingPanelColumn[];

    constructor(props: PropsOf<ClosingPanelSection>) {
        super(props);
        this.columns = props.columns;
    }

    static override fromSanity(data: SanityClosingPanelSection, db: SanityDataset) {
        return new ClosingPanelSection({
            ...SectionCore.fromSanity(data, db),
            columns: (data.columns || []).map((x) => ({
                key: x._key,
                title: x.title,
                description: x.description || undefined,
                link: x.link ? TextLink.fromSanityTextLink(x.link, db) : undefined,
            })),
        });
    }
}

export const closingPanelColumnSchemaName = "closingPanelColumn";

const closingPanelColumnSchema = defineType({
    name: closingPanelColumnSchemaName,
    title: "Column",
    type: "object",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (rule) => rule.required().error("Each column needs a title, e.g. 'TypeDB Cloud'"),
        }),
        defineField({
            name: "description",
            type: "string",
            validation: (rule) => rule.max(80).warning("Column descriptions read best as one short line"),
        }),
        Object.assign({}, textLinkFieldOptional, { description: "Optional: makes the column title a link" }),
    ],
    preview: { select: { title: "title", subtitle: "description" } },
});

export const closingPanelSectionSchemaName = "closingPanelSection";

const closingPanelSectionSchema = defineType({
    name: closingPanelSectionSchemaName,
    title: "Closing Panel",
    type: "object",
    icon: RocketIcon,
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "columns",
            type: "array",
            description: "Shown under a divider at the foot of the panel, e.g. the ways to run TypeDB",
            of: [defineArrayMember({ type: closingPanelColumnSchemaName })],
            validation: (rule) => rule.max(4).warning("More than four columns will wrap"),
        }),
        isVisibleField,
    ],
    preview: sectionPreview("Closing Panel"),
});

export const closingPanelSectionSchemas = [closingPanelColumnSchema, closingPanelSectionSchema];
