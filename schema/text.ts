import { defineType, PortableTextTextBlock } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "./button";
import { bodyFieldRichText, actionsFieldOptional, titleFieldWithHighlights } from "./common-fields";
import { SanityDataset } from "./sanity-core";
import { PropsOf } from "./util";

export type PortableText = PortableTextTextBlock[];

export type SanityTitleField = { title: string };

export type SanityTitleWithHighlights = { title: PortableText };

export type SanityBodyTextField = { body: PortableText };

export type SanityTitleAndBody = SanityTitleWithHighlights & Partial<SanityBodyTextField>;

export type SanityTitleBodyActions = SanityTitleAndBody & SanityOptionalActions;

export class ParagraphWithHighlights {
    readonly spans: { text: string; highlight: boolean }[];

    constructor(props: PropsOf<ParagraphWithHighlights>) {
        this.spans = props.spans;
    }

    static fromSanity(data?: PortableText) {
        if (!data?.length) {
            return new ParagraphWithHighlights({ spans: [] });
        }
        console.assert(data.length === 1);
        return new ParagraphWithHighlights({
            spans: data[0].children
                .filter((block) => block._type === "span")
                .map((block) => ({
                    text: block.text as string,
                    highlight: (block.marks as string[]).includes("strong"),
                })) || [],
        });
    }

    toPlainText(): string {
        return this.spans.map(x => x.text).join("");
    }

    static fromPlainText(text: string): ParagraphWithHighlights {
        return new ParagraphWithHighlights({ spans: [{ text, highlight: false }] });
    }

    toSectionID(): string {
        return this.toPlainText().toLowerCase().replace(/([^A-Za-z0-9-\s])/g, '').replace(/\s/g, "-");
    }
}

export type TitleWithHighlights = { title: ParagraphWithHighlights };

export type BodyTextField = { body: PortableText };

export class TitleAndBody implements TitleWithHighlights, Partial<BodyTextField> {
    readonly title: ParagraphWithHighlights;
    readonly body?: PortableText;

    constructor(props: PropsOf<TitleAndBody>) {
        this.title = props.title;
        this.body = props.body;
    }

    static fromSanityTitleAndBody(data: SanityTitleAndBody) {
        return new TitleAndBody({
            title: ParagraphWithHighlights.fromSanity(data.title),
            body: data.body,
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
        return new TitleBodyActions(
            Object.assign(TitleAndBody.fromSanityTitleAndBody(data), {
                actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            })
        );
    }
}

export const titleAndBodySchemaName = "titleAndBody";

export const titleBodyActionsSectionSchemaName = "titleBodyActionsSection";

const titleAndBodySchema = defineType({
    name: titleAndBodySchemaName,
    title: "Title & Body",
    type: "document",
    fields: [titleFieldWithHighlights, bodyFieldRichText],
});

const titleBodyActionsSectionSchema = defineType({
    name: titleBodyActionsSectionSchemaName,
    title: "Title, Body & Actions",
    type: "document",
    fields: [titleFieldWithHighlights, bodyFieldRichText, actionsFieldOptional],
});

export const textSchemas = [titleAndBodySchema, titleBodyActionsSectionSchema];
