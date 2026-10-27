import { BarChartIcon, BlockElementIcon, CheckmarkCircleIcon, InfoOutlineIcon, SplitVerticalIcon, ThListIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "@sanity/types";
import {
    bodyFieldRichText, isVisibleField, SectionLayoutDirection, sectionLayoutDirectionField, sectionPreview,
    sectionWidthField, titleBodyActionsFields, titleWithHighlightsPreview,
} from "../common-fields";
import { keyPointSchemaName } from "../key-point";
import {
    Illustration, illustrationFieldValueFromSanity, illustrationObjectSchemaName, SanityIllustrationObject,
} from "../illustration";
import { SanityDataset } from "../sanity-core";
import { PortableText } from "../text";
import { PropsOf } from "../util";
import { FeatureTable, featureTableSchemaName, SanityFeatureTable } from "./feature-table";
import { SanitySectionCore, SectionCore } from "./section";

// Building blocks for the "TypeDB vs X" compare pages. Every comparison sets the competitor against TypeDB,
// so pairs name their sides by subject rather than by position.

interface SanityKeyed {
    _key: string;
}

export const compareSubjects = [
    { title: "TypeDB", value: "typedb" },
    { title: "Competitor", value: "competitor" },
] as const;

export type CompareSubject = (typeof compareSubjects)[number]["value"];

export interface SanityCompareStat {
    value: string;
    label?: string;
    subject?: CompareSubject;
}

export interface CompareStat {
    value: string;
    label?: string;
    subject: CompareSubject;
}

/** A stat inside a card, which takes its subject from the card's side */
export interface CompareCardStat {
    value: string;
    label?: string;
}

function compareStatFromSanity(data: SanityCompareStat): CompareStat {
    return { value: data.value, label: data.label || undefined, subject: data.subject || "typedb" };
}

type SanityCompareCardContentItem = SanityKeyed & (
    | ({ _type: "block" } & PortableText[number])
    | SanityIllustrationObject
    | ({ _type: typeof compareCardStatSchemaName } & CompareCardStat)
);

export type CompareCardContentItem =
    | { kind: "text"; key: string; body: PortableText }
    | { kind: "illustration"; key: string; illustration: Illustration }
    | { kind: "stat"; key: string; stat: CompareCardStat };

export interface SanityCompareCard {
    label: string;
    content?: SanityCompareCardContentItem[];
}

export class CompareCard {
    readonly label: string;
    readonly content: CompareCardContentItem[];

    constructor(props: PropsOf<CompareCard>) {
        this.label = props.label;
        this.content = props.content;
    }

    static fromSanity(data: SanityCompareCard, db: SanityDataset) {
        const content: CompareCardContentItem[] = [];
        for (const item of data.content || []) {
            if (item._type === "block") {
                // Consecutive text blocks render as one rich text run
                const last = content[content.length - 1];
                if (last?.kind === "text") last.body.push(item as PortableText[number]);
                else content.push({ kind: "text", key: item._key, body: [item as PortableText[number]] });
            } else if (item._type === illustrationObjectSchemaName) {
                const illustration = illustrationFieldValueFromSanity(item, db);
                if (illustration) content.push({ kind: "illustration", key: item._key, illustration });
            } else if (item._type === compareCardStatSchemaName) {
                content.push({ kind: "stat", key: item._key, stat: { value: item.value, label: item.label || undefined } });
            }
        }
        return new CompareCard({ label: data.label, content });
    }
}

export interface SanityCompareCardPair {
    competitor: SanityCompareCard;
    typedb: SanityCompareCard;
}

export interface SanityCompareCallout {
    stats?: (SanityKeyed & SanityCompareStat)[];
    body?: PortableText;
}

export interface SanityCompareNote {
    body: PortableText;
}

type SanityCompareFeatureContentItem = SanityKeyed & (
    | ({ _type: typeof compareCardPairSchemaName } & SanityCompareCardPair)
    | ({ _type: typeof featureTableSchemaName } & SanityFeatureTable)
    | ({ _type: typeof compareCalloutSchemaName } & SanityCompareCallout)
    | ({ _type: typeof compareNoteSchemaName } & SanityCompareNote)
);

export type CompareFeatureContentItem =
    | { kind: "cardPair"; key: string; competitor: CompareCard; typedb: CompareCard }
    | { kind: "table"; key: string; table: FeatureTable }
    | { kind: "callout"; key: string; stats: CompareStat[]; body?: PortableText }
    | { kind: "note"; key: string; body: PortableText };

function compareFeatureContentItemFromSanity(item: SanityCompareFeatureContentItem, db: SanityDataset): CompareFeatureContentItem | undefined {
    switch (item._type) {
        case compareCardPairSchemaName:
            return {
                kind: "cardPair", key: item._key,
                competitor: CompareCard.fromSanity(item.competitor, db),
                typedb: CompareCard.fromSanity(item.typedb, db),
            };
        case featureTableSchemaName:
            return { kind: "table", key: item._key, table: FeatureTable.fromSanity(item, db) };
        case compareCalloutSchemaName:
            return { kind: "callout", key: item._key, stats: (item.stats || []).map(compareStatFromSanity), body: item.body };
        case compareNoteSchemaName:
            return { kind: "note", key: item._key, body: item.body };
        default:
            return undefined;
    }
}

export interface SanityCompareFeatureSection extends SanitySectionCore {
    content?: SanityCompareFeatureContentItem[];
    layoutDirection?: SectionLayoutDirection;
}

export class CompareFeatureSection extends SectionCore {
    readonly content: CompareFeatureContentItem[];
    readonly layoutDirection: SectionLayoutDirection;

    constructor(props: PropsOf<CompareFeatureSection>) {
        super(props);
        this.content = props.content;
        this.layoutDirection = props.layoutDirection;
    }

    static override fromSanity(data: SanityCompareFeatureSection, db: SanityDataset) {
        return new CompareFeatureSection({
            ...SectionCore.fromSanity(data, db),
            content: (data.content || []).map((x) => compareFeatureContentItemFromSanity(x, db))
                .filter((x): x is CompareFeatureContentItem => !!x),
            layoutDirection: data.layoutDirection || "auto",
        });
    }
}

export interface SanityCompareChoiceSection extends SanitySectionCore {
    competitorChoice: SanitySectionCore;
    typedbChoice: SanitySectionCore;
    aside?: SanitySectionCore;
}

export class CompareChoiceSection extends SectionCore {
    readonly competitorChoice: SectionCore;
    readonly typedbChoice: SectionCore;
    readonly aside?: SectionCore;

    constructor(props: PropsOf<CompareChoiceSection>) {
        super(props);
        this.competitorChoice = props.competitorChoice;
        this.typedbChoice = props.typedbChoice;
        this.aside = props.aside;
    }

    static override fromSanity(data: SanityCompareChoiceSection, db: SanityDataset) {
        return new CompareChoiceSection({
            ...SectionCore.fromSanity(data, db),
            competitorChoice: SectionCore.fromSanity(data.competitorChoice, db),
            typedbChoice: SectionCore.fromSanity(data.typedbChoice, db),
            aside: data.aside?.title?.length ? SectionCore.fromSanity(data.aside, db) : undefined,
        });
    }
}

export const compareStatSchemaName = "compareStat";
export const compareCardStatSchemaName = "compareCardStat";
export const compareCardSchemaName = "compareCard";
export const compareCardPairSchemaName = "compareCardPair";
export const compareCalloutSchemaName = "compareCallout";
export const compareNoteSchemaName = "compareNote";
export const compareFeatureSectionSchemaName = "compareFeatureSection";
export const compareChoiceSectionSchemaName = "compareChoiceSection";

const portableTextPreview = (blocks?: PortableText) =>
    (blocks || []).flatMap((x) => x.children || []).map((x) => x.text as string).join(" ");

const compareStatSchema = defineType({
    name: compareStatSchemaName,
    title: "Stat",
    type: "object",
    icon: BarChartIcon,
    fields: [
        defineField({
            name: "value",
            type: "string",
            description: "The headline figure, e.g. '1.7%' or 'Up to 3x'",
            validation: (rule) => [
                rule.required().error("A stat needs a figure to show"),
                rule.max(16).warning("Figures read best when short"),
            ],
        }),
        defineField({
            name: "label",
            type: "string",
            description: "Optional: what the figure measures, e.g. 'TypeQL silently wrong'",
        }),
        defineField({
            name: "subject",
            type: "string",
            description: "Whose figure this is. TypeDB figures are highlighted",
            options: { list: [...compareSubjects], layout: "radio", direction: "horizontal" },
            initialValue: "typedb",
        }),
    ],
    preview: {
        select: { value: "value", label: "label", subject: "subject" },
        prepare: ({ value, label, subject }) => ({
            title: [value, label].filter(Boolean).join(" · "),
            subtitle: subject === "competitor" ? "Competitor stat" : "TypeDB stat",
        }),
    },
});

const compareCardStatSchema = defineType({
    name: compareCardStatSchemaName,
    title: "Stat",
    type: "object",
    icon: BarChartIcon,
    description: "Highlighted when it's on the TypeDB side",
    fields: compareStatSchema.fields.filter((x) => x.name !== "subject"),
    preview: {
        select: { value: "value", label: "label" },
        prepare: ({ value, label }) => ({ title: [value, label].filter(Boolean).join(" · "), subtitle: "Stat" }),
    },
});

const compareCardSchema = defineType({
    name: compareCardSchemaName,
    title: "Card",
    type: "object",
    icon: BlockElementIcon,
    fields: [
        defineField({
            name: "label",
            type: "string",
            description: "Shown at the top of the card, e.g. 'Neo4j', or 'Smallest dataset'",
            validation: (rule) => rule.required().error("Each card needs a label so readers know which side it is"),
        }),
        defineField({
            name: "content",
            type: "array",
            description: "Any mix of text, illustrations (code, image, graph) and stats, shown top to bottom",
            of: [
                defineArrayMember({ type: "block" }),
                defineArrayMember({ type: illustrationObjectSchemaName }),
                defineArrayMember({ type: compareCardStatSchemaName }),
            ],
            validation: (rule) => rule.required().min(1).error("A card needs some content"),
        }),
    ],
    preview: {
        select: { title: "label" },
    },
});

const compareCardPairSchema = defineType({
    name: compareCardPairSchemaName,
    title: "Side-by-side Cards",
    type: "object",
    icon: SplitVerticalIcon,
    fields: [
        defineField({
            name: "competitor",
            type: compareCardSchemaName,
            description: "Shown on the left",
            validation: (rule) => rule.required().error("Both sides of the comparison are needed"),
        }),
        defineField({
            name: "typedb",
            title: "TypeDB",
            type: compareCardSchemaName,
            description: "Shown on the right, highlighted",
            validation: (rule) => rule.required().error("Both sides of the comparison are needed"),
        }),
    ],
    preview: {
        select: { competitor: "competitor.label", typedb: "typedb.label" },
        prepare: ({ competitor, typedb }) => ({ title: `${competitor || "?"} | ${typedb || "?"}`, subtitle: "Side-by-side Cards" }),
    },
});

const compareCalloutSchema = defineType({
    name: compareCalloutSchemaName,
    title: "Stat Callout",
    type: "object",
    icon: BarChartIcon,
    fields: [
        defineField({
            name: "stats",
            type: "array",
            of: [defineArrayMember({ type: compareStatSchemaName })],
            validation: (rule) => [
                rule.required().min(1).error("A callout needs at least one stat; use a Note for text alone"),
                rule.max(3).warning("More than three stats crowd the callout"),
            ],
        }),
        Object.assign({}, bodyFieldRichText, { description: "Shown beside the stats, e.g. the source and a link to it" }),
    ],
    preview: {
        select: { stats: "stats" },
        prepare: ({ stats }: { stats?: SanityCompareStat[] }) => ({
            title: (stats || []).map((x) => x.value).join(" · ") || "No stats",
            subtitle: "Stat Callout",
        }),
    },
});

const compareNoteSchema = defineType({
    name: compareNoteSchemaName,
    title: "Note",
    type: "object",
    icon: InfoOutlineIcon,
    fields: [
        Object.assign({}, bodyFieldRichText, {
            description: "Small print, e.g. caveats or benchmark conditions",
            validation: (rule: any) => rule.required().error("A note needs some text"),
        }),
    ],
    preview: {
        select: { body: "body" },
        prepare: ({ body }) => ({ title: portableTextPreview(body) || "Empty note", subtitle: "Note" }),
    },
});

const compareFeatureSectionSchema = defineType({
    name: compareFeatureSectionSchemaName,
    title: "Feature Comparison",
    type: "object",
    icon: SplitVerticalIcon,
    fields: [
        ...titleBodyActionsFields.map((x) => x.name === "eyebrow"
            ? Object.assign({}, x, { description: "Numbers and names the feature, e.g. '01 · Structure'" })
            : x),
        defineField({
            name: "content",
            type: "array",
            description: "Mix side-by-side cards, tables, stat callouts and notes. Tables put TypeDB in the first column",
            of: [
                defineArrayMember({ type: compareCardPairSchemaName }),
                defineArrayMember({ type: featureTableSchemaName, title: "Table", icon: ThListIcon }),
                defineArrayMember({ type: compareCalloutSchemaName }),
                defineArrayMember({ type: compareNoteSchemaName }),
            ],
            validation: (rule) => rule.required().min(1).error("A feature comparison needs something to compare"),
        }),
        Object.assign({}, sectionLayoutDirectionField, {
            description: "Auto places the content beside the text. Content Below suits wide content, such as a row of stats",
        }),
        sectionWidthField,
        isVisibleField,
    ],
    preview: {
        select: { title: "title", eyebrow: "eyebrow" },
        prepare: ({ title, eyebrow }) => ({
            title: titleWithHighlightsPreview(title || []),
            subtitle: eyebrow || "Feature Comparison",
        }),
    },
});

const compareChoiceSectionSchema = defineType({
    name: compareChoiceSectionSchemaName,
    title: "Making the Choice",
    type: "object",
    icon: CheckmarkCircleIcon,
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "competitorChoice",
            title: "Choose the Competitor If",
            type: keyPointSchemaName,
            description: "Title like 'Choose Neo4j if', with the reasons as a bulleted list",
            validation: (rule) => rule.required().error("Both sides of the choice are needed"),
        }),
        defineField({
            name: "typedbChoice",
            title: "Choose TypeDB If",
            type: keyPointSchemaName,
            description: "Title like 'Choose TypeDB if', with the reasons as a bulleted list. Highlighted",
            validation: (rule) => rule.required().error("Both sides of the choice are needed"),
        }),
        defineField({
            name: "aside",
            title: "Aside (optional)",
            type: keyPointSchemaName,
            description: "Shown under the choices, e.g. 'Or use both'",
            options: { collapsible: true, collapsed: true },
        }),
        isVisibleField,
    ],
    preview: sectionPreview("Making the Choice"),
});

export const compareSchemas = [
    compareStatSchema, compareCardStatSchema, compareCardSchema, compareCardPairSchema, compareCalloutSchema, compareNoteSchema,
    compareFeatureSectionSchema, compareChoiceSectionSchema,
];
