import { defineArrayMember, defineField, defineType } from "@sanity/types";
import { BulbOutlineIcon } from "@sanity/icons";
import {
    bodyFieldRichText, iconNameFieldOptional, isVisibleField, sectionPreview, titleBodyActionsFields, titleField,
} from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { ParagraphWithHighlights, PortableText } from "../text";
import { PropsOf } from "../util";
import { SanitySectionCore, SectionCore } from "./section";

export interface SanitySolutionCard {
    _key: string;
    iconName?: string;
    title: string;
    body?: PortableText;
    solution?: PortableText;
}

export interface SanitySolutionCardsSection extends SanitySectionCore {
    cards: SanitySolutionCard[];
}

export interface SolutionCard {
    key: string;
    iconName?: string;
    title: string;
    body?: PortableText;
    solution?: ParagraphWithHighlights;
}

export class SolutionCardsSection extends SectionCore {
    readonly cards: SolutionCard[];

    constructor(props: PropsOf<SolutionCardsSection>) {
        super(props);
        this.cards = props.cards;
    }

    static override fromSanity(data: SanitySolutionCardsSection, db: SanityDataset) {
        return new SolutionCardsSection({
            ...SectionCore.fromSanity(data, db),
            cards: (data.cards || []).map((x) => ({
                key: x._key,
                iconName: x.iconName || undefined,
                title: x.title,
                body: x.body,
                solution: x.solution?.length ? ParagraphWithHighlights.fromSanity(x.solution) : undefined,
            })),
        });
    }
}

export const solutionCardSchemaName = "solutionCard";

const solutionCardSchema = defineType({
    name: solutionCardSchemaName,
    title: "Solution Card",
    type: "object",
    icon: BulbOutlineIcon,
    fields: [
        titleField,
        Object.assign({}, bodyFieldRichText, { description: "The problem, or the situation the card describes" }),
        defineField({
            name: "solution",
            type: "array",
            of: [{ type: "block" }],
            description: "Shown under a divider, aligned across cards. Text marked as 'bold' is highlighted, e.g. 'TypeDB:'",
        }),
        Object.assign({}, iconNameFieldOptional, {
            description: "One of: structure-drift, many-sided-relation, guardrails-warning, mcp, vector, embedded",
        }),
    ],
    preview: {
        select: { title: "title", iconName: "iconName" },
        prepare: ({ title, iconName }: { title?: string; iconName?: string }) => ({
            title: title || "Untitled card",
            subtitle: iconName ? `Icon: ${iconName}` : "No icon",
        }),
    },
});

export const solutionCardsSectionSchemaName = "solutionCardsSection";

const solutionCardsSectionSchema = defineType({
    name: solutionCardsSectionSchemaName,
    title: "Solution Cards",
    type: "object",
    icon: BulbOutlineIcon,
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "cards",
            type: "array",
            of: [defineArrayMember({ type: solutionCardSchemaName })],
            validation: (rule) => [
                rule.required().min(1).error("Add at least one card"),
                rule.max(4).warning("More than four cards will wrap onto a second row"),
            ],
        }),
        isVisibleField,
    ],
    preview: sectionPreview("Solution Cards"),
});

export const solutionCardsSectionSchemas = [solutionCardSchema, solutionCardsSectionSchema];
