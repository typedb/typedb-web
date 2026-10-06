import { defineArrayMember, defineField, defineType } from "@sanity/types";
import { SplitHorizontalIcon } from "@sanity/icons";
import { isVisibleField, sectionPreview, titleBodyActionsFields } from "../common-fields";
import { Language, languages } from "../code";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SanitySectionCore, SectionCore } from "./section";

export interface SanitySwitcherCard {
    _key: string;
    label: string;
    headline: string;
    points?: string[];
    language?: Language;
    code?: string;
}

export interface SanityCardSwitcherSection extends SanitySectionCore {
    cards: SanitySwitcherCard[];
}

export interface SwitcherCard {
    key: string;
    label: string;
    headline: string;
    points: string[];
    language: Language;
    code?: string;
}

export class CardSwitcherSection extends SectionCore {
    readonly cards: SwitcherCard[];

    constructor(props: PropsOf<CardSwitcherSection>) {
        super(props);
        this.cards = props.cards;
    }

    static override fromSanity(data: SanityCardSwitcherSection, db: SanityDataset) {
        return new CardSwitcherSection({
            ...SectionCore.fromSanity(data, db),
            cards: (data.cards || []).map((x) => ({
                key: x._key,
                label: x.label,
                headline: x.headline,
                points: x.points || [],
                language: x.language || "typeql",
                code: x.code || undefined,
            })),
        });
    }
}

export const switcherCardSchemaName = "switcherCard";

const switcherCardSchema = defineType({
    name: switcherCardSchemaName,
    title: "Card",
    type: "object",
    icon: SplitHorizontalIcon,
    fields: [
        defineField({
            name: "label",
            type: "string",
            description: "Shown in the list of cards, e.g. 'Knowledge graphs'",
            validation: (rule) => [
                rule.required().error("A label is needed to pick this card"),
                rule.max(32).warning("Long labels wrap in the card list"),
            ],
        }),
        defineField({
            name: "headline",
            type: "string",
            validation: (rule) => rule.required().error("The card needs a headline"),
        }),
        defineField({
            name: "points",
            type: "array",
            of: [{ type: "string" }],
            validation: (rule) => rule.max(4).warning("Cards read best with three or four points"),
        }),
        defineField({
            name: "language",
            type: "string",
            options: { layout: "dropdown", list: Object.entries(languages).map(([value, title]) => ({ title, value })) },
            initialValue: "typeql",
        }),
        defineField({
            name: "code",
            type: "text",
            rows: 5,
            description: "Optional example shown at the foot of the card",
        }),
    ],
    preview: {
        select: { title: "label", subtitle: "headline" },
    },
});

export const cardSwitcherSectionSchemaName = "cardSwitcherSection";

const cardSwitcherSectionSchema = defineType({
    name: cardSwitcherSectionSchemaName,
    title: "Card Switcher",
    type: "object",
    icon: SplitHorizontalIcon,
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "cards",
            type: "array",
            description: "Visitors pick a card from the list; the first card is shown initially",
            of: [defineArrayMember({ type: switcherCardSchemaName })],
            validation: (rule) => rule.required().min(2).error("A card switcher needs at least two cards"),
        }),
        isVisibleField,
    ],
    preview: sectionPreview("Card Switcher"),
});

export const cardSwitcherSectionSchemas = [switcherCardSchema, cardSwitcherSectionSchema];
