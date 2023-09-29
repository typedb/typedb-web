import { defineType, PortableTextSpan, PortableTextTextBlock } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "./button";
import {
    bodyFieldRichText,
    isVisibleField,
    optionalActionsField,
    SanityVisibleToggle,
    sectionIconField,
    sectionIdField,
    titleFieldWithHighlights,
} from "./common-fields";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./component/technicolor-block";
import { Illustration, illustrationField, illustrationFromSanity, SanityIllustrationField } from "./illustration";
import { SanityDataset } from "./sanity-core";
import { PropsOf } from "./util";

export type SanityPortableText = PortableTextTextBlock[];

export type SanityTitle = { title: string };

export type SanityTitleWithHighlights = { title: SanityPortableText };

export type SanityBodyText = { body?: SanityPortableText };

export type SanityTitleAndBody = SanityTitleWithHighlights & SanityBodyText;

export type SanityTitleBodyActions = SanityTitleAndBody & SanityOptionalActions;

export type SanityTitleBodyIllustrationSection = SanityTechnicolorBlock & SanityIllustrationField & SanityVisibleToggle;

export class ParagraphWithHighlights {
    readonly spans: { text: string; highlight: boolean }[];

    constructor(props: PropsOf<ParagraphWithHighlights>) {
        this.spans = props.spans;
    }

    static fromSanity(data: SanityPortableText) {
        console.assert(data.length === 1);
        return new ParagraphWithHighlights({
            spans: data[0].children
                .filter((block) => block._type === "span")
                .map((block) => ({
                    text: block.text as string,
                    highlight: (block.marks as string[]).includes("strong"),
                })),
        });
    }
}

function isPortableTextSpan(block: SanityPortableText[0]["children"][0]): block is PortableTextSpan {
    return block._type === "span";
}

export interface RichTextSpan {
    text: string;
    marks: string[];
    level?: number;
}

export class RichText {
    readonly paragraphs: { spans: RichTextSpan[] }[];

    constructor(data: PropsOf<RichText>) {
        this.paragraphs = data.paragraphs;
    }

    static fromSanity(data: SanityPortableText): RichText {
        return new RichText({
            paragraphs: data.map((p) => ({
                spans: p.children
                    .filter((block) => isPortableTextSpan(block))
                    .map((span) => ({ text: span.text as string, marks: span.marks as string[], level: p.level })),
            })),
        });
    }
}

export type TitleWithHighlights = { title: ParagraphWithHighlights };

export type BodyText = { body?: RichText };

export class TitleAndBody implements TitleWithHighlights, BodyText {
    readonly title: ParagraphWithHighlights;
    readonly body?: RichText;

    constructor(props: PropsOf<TitleAndBody>) {
        this.title = props.title;
        this.body = props.body;
    }

    static fromSanityTitleAndBody(data: SanityTitleAndBody) {
        return new TitleAndBody({
            title: ParagraphWithHighlights.fromSanity(data.title),
            body: data.body ? RichText.fromSanity(data.body) : undefined,
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

export class TitleBodyIllustrationSection extends TechnicolorBlock {
    readonly illustration: Illustration;

    constructor(props: PropsOf<TitleBodyIllustrationSection>) {
        super(props);
        this.illustration = props.illustration;
    }

    static override fromSanity(data: SanityTitleBodyIllustrationSection, db: SanityDataset) {
        return new TitleBodyIllustrationSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                illustration: illustrationFromSanity(db.resolveRef(data.illustration), db),
            })
        );
    }
}

export const titleAndBodySchemaName = "titleAndBody";

export const titleBodyActionsSectionSchemaName = "titleBodyActionsSection";

export const titleBodyIllustrationSectionSchemaName = "titleBodyIllustrationSection";

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
    fields: [titleFieldWithHighlights, bodyFieldRichText, optionalActionsField],
});

const titleBodyIllustrationSectionSchema = defineType({
    name: titleBodyIllustrationSectionSchemaName,
    title: "Title, Body & Illustration",
    type: "document",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        sectionIconField,
        sectionIdField,
        illustrationField,
        isVisibleField,
    ],
});

export const textSchemas = [titleAndBodySchema, titleBodyActionsSectionSchema, titleBodyIllustrationSectionSchema];
