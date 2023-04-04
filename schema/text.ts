import { defineType, PortableTextTextBlock } from "@sanity/types";
import { SanityActions } from "./action";
import { bodyFieldRichText, optionalActionsField, titleFieldWithHighlights } from "./common-fields";
import { schemaName } from "./util";

export type SanityPortableText = PortableTextTextBlock[];

export type SanityTitle = { title: string };

export type SanityTitleWithHighlights = { title: SanityPortableText };

export type SanityBodyText = { body: SanityPortableText };

export type SanityTitleAndBody = SanityTitleWithHighlights & SanityBodyText;

export type SanityTitleBodyActionsSection = SanityTitleAndBody & Partial<SanityActions>;

export class ParagraphWithHighlights {
    readonly spans: { text: string, highlight: boolean }[];

    constructor(data: SanityPortableText) {
        console.assert(data.length === 1);
        this.spans = data[0].children
            .filter(block => block._type === "span")
            .map(block => ({ text: block.text as string, highlight: (block.marks as string[]).includes("strong") }));
    }
}

export class RichText {
    readonly paragraphs: { spans: { text: string, marks: string[] }[] }[];

    constructor(data: SanityPortableText) {
        this.paragraphs = data.map(p => ({
            spans: p.children.filter(block => block._type === "span")
                .map(span => ({ text: span.text as string, marks: span.marks as string[] }))
        }));
    }
}

export type TitleWithHighlights = { title: ParagraphWithHighlights };

export type BodyText = { body: RichText };

export class TitleAndBody implements TitleWithHighlights, BodyText {
    readonly title: ParagraphWithHighlights;
    readonly body: RichText;

    constructor(data: SanityTitleAndBody) {
        this.title = new ParagraphWithHighlights(data.title);
        this.body = new RichText(data.body);
    }
}

export class TitleBodyActionsSection extends TitleAndBody {
    // readonly actions?: Action[];

    constructor(data: SanityTitleBodyActionsSection) {
        super(data);
    }
}

export const titleAndBodySchemaName = schemaName(TitleAndBody);

export const titleBodyActionsSectionSchemaName = schemaName(TitleBodyActionsSection);

const titleAndBodySchema = defineType({
    name: titleAndBodySchemaName,
    title: "Title & Body",
    type: "document",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
    ],
});

const titleBodyActionsSectionSchema = defineType({
    name: titleBodyActionsSectionSchemaName,
    title: "Title, Body & Actions",
    type: "document",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        optionalActionsField,
    ],
});

export const textSchemas = [titleAndBodySchema, titleBodyActionsSectionSchema];
