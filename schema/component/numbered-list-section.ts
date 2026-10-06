import { defineArrayMember, defineField, defineType } from "@sanity/types";
import { OlistIcon } from "@sanity/icons";
import { isVisibleField, sectionPreview, titleBodyActionsFields } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SanitySectionCore, SectionCore } from "./section";

export interface SanityNumberedListItem {
    _key: string;
    title: string;
    description?: string;
}

export interface SanityNumberedListSection extends SanitySectionCore {
    items: SanityNumberedListItem[];
}

export interface NumberedListItem {
    key: string;
    title: string;
    description?: string;
}

export class NumberedListSection extends SectionCore {
    readonly items: NumberedListItem[];

    constructor(props: PropsOf<NumberedListSection>) {
        super(props);
        this.items = props.items;
    }

    static override fromSanity(data: SanityNumberedListSection, db: SanityDataset) {
        return new NumberedListSection({
            ...SectionCore.fromSanity(data, db),
            items: (data.items || []).map((x) => ({ key: x._key, title: x.title, description: x.description || undefined })),
        });
    }
}

export const numberedListItemSchemaName = "numberedListItem";

const numberedListItemSchema = defineType({
    name: numberedListItemSchemaName,
    title: "Item",
    type: "object",
    icon: OlistIcon,
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (rule) => rule.required().error("Each item needs a title"),
        }),
        defineField({
            name: "description",
            type: "text",
            rows: 2,
        }),
    ],
    preview: { select: { title: "title", subtitle: "description" } },
});

export const numberedListSectionSchemaName = "numberedListSection";

const numberedListSectionSchema = defineType({
    name: numberedListSectionSchemaName,
    title: "Numbered List",
    type: "object",
    icon: OlistIcon,
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "items",
            type: "array",
            description: "Numbered in order, starting at 01",
            of: [defineArrayMember({ type: numberedListItemSchemaName })],
            validation: (rule) => rule.required().min(1).error("Add at least one item"),
        }),
        isVisibleField,
    ],
    preview: sectionPreview("Numbered List"),
});

export const numberedListSectionSchemas = [numberedListItemSchema, numberedListSectionSchema];
