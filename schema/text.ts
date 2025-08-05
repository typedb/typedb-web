import { defineType, PortableTextTextBlock } from "@sanity/types";
import { bodyFieldRichText, titleFieldWithHighlights } from "./common-fields";
import { PropsOf } from "./util";

export type PortableText = PortableTextTextBlock[];

export type SanityTitleField = { title: string };

export type SanityTitleWithHighlights = { title: PortableText };

export type SanityBodyTextField = { body: PortableText };

export type SanityTitleAndBody = SanityTitleWithHighlights & Partial<SanityBodyTextField>;

export class ParagraphWithHighlights {
    readonly spans: { text: string; highlight: boolean, newline?: boolean }[];

    constructor(props: PropsOf<ParagraphWithHighlights>) {
        this.spans = props.spans;
    }

    static fromSanity(data?: PortableText) {
        if (!data?.length) {
            return new ParagraphWithHighlights({ spans: [] });
        }

        const spans: { text: string; highlight: boolean; newline?: boolean }[] = [];

        data.forEach((block, index) => {
            if (!block.children) return;

            const blockSpans = block.children
                .filter((child) => child._type === "span")
                .map((child) => ({
                    text: child.text as string,
                    highlight: (child.marks as string[]).includes("strong"),
                }));

            spans.push(...blockSpans);

            if (index < data.length - 1) {
                spans.push({ text: '', highlight: false, newline: true });
            }
        });

        return new ParagraphWithHighlights({ spans });
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

export const titleAndBodySchemaName = "titleAndBody";

const titleAndBodySchema = defineType({
    name: titleAndBodySchemaName,
    title: "Title & Body",
    type: "document",
    fields: [titleFieldWithHighlights, bodyFieldRichText],
});

export const textSchemas = [titleAndBodySchema];
