import { defineType, PortableTextTextBlock } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "./button";
import { bodyFieldRichText, optionalActionsField, titleFieldWithHighlights } from "./common-fields";
import { SanityDataset } from "./sanity-core";
import { PropsOf } from "./util";

export type SanityPortableText = PortableTextTextBlock[];

export type SanityTitle = { title: string };

export type SanityTitleWithHighlights = { title: SanityPortableText };

export type SanityBodyText = { body: SanityPortableText };

export type SanityTitleAndBody = SanityTitleWithHighlights & SanityBodyText;

export type SanityTitleBodyActions = SanityTitleAndBody & SanityOptionalActions;

export class ParagraphWithHighlights {
    readonly spans: { text: string, highlight: boolean }[];

    constructor(props: PropsOf<ParagraphWithHighlights>) {
        this.spans = props.spans;
    }

    static fromSanity(data: SanityPortableText) {
        console.assert(data.length === 1);
        return new ParagraphWithHighlights({
            spans: data[0].children
                .filter(block => block._type === "span")
                .map(block => ({ text: block.text as string, highlight: (block.marks as string[]).includes("strong") }))
        });
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

    constructor(props: PropsOf<TitleAndBody>) {
        this.title = props.title;
        this.body = props.body;
    }

    static fromSanityTitleAndBody(data: SanityTitleAndBody) {
        return new TitleAndBody({
            title: ParagraphWithHighlights.fromSanity(data.title),
            body: new RichText(data.body),
        });
    }
}

export class TitleBodyActions extends TitleAndBody {
    readonly actions?: LinkButton[];

    constructor(props: PropsOf<TitleBodyActions>) {
        super(props);
        this.actions = props.actions;
    }

    static fromSanityTitleBodyActions(data: SanityTitleBodyActions, db: SanityDataset) {
        return new TitleBodyActions(Object.assign(TitleAndBody.fromSanityTitleAndBody(data), {
            actions: data.actions?.map(x => LinkButton.fromSanity(x, db))
        }));
    }
}

export const titleAndBodySchemaName = "titleAndBody";

export const titleBodyActionsSectionSchemaName = "titleBodyActionsSection";

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
