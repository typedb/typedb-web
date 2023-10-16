import { defineType } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "../button";
import {
    bodyFieldRichText,
    isVisibleField,
    linkPanelsField,
    SanityVisibleToggle, sectionIconField,
    sectionIdField, titleFieldWithHighlights,
} from "../common-fields";
import { Illustration, illustrationField, illustrationFromSanity, SanityIllustrationField } from "../illustration";
import { SanityDataset } from "../sanity-core";
import { ParagraphWithHighlights, SanityBodyTextField } from "../text";
import { PropsOf } from "../util";
import { LinkPanel, SanityLinkPanel } from "./link-panel";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";

// TODO: there are two other 'SanityCoreSection' interfaces which are similar, but not quite identical
export interface SanityCoreSection extends SanityBodyTextField, SanityOptionalActions, SanityVisibleToggle {}

export type SanityTitleBodyIllustrationSection = SanityTechnicolorBlock & SanityIllustrationField & SanityVisibleToggle;

export interface SanityFurtherReadingSection extends SanityCoreSection {
    links: SanityLinkPanel[];
    sectionId?: string;
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

export class FurtherReadingSection extends TechnicolorBlock {
    readonly links: LinkPanel[];

    constructor(props: PropsOf<FurtherReadingSection>) {
        super(props);
        this.links = props.links;
    }

    static fromSanityFurtherReadingSection(data: SanityFurtherReadingSection, db: SanityDataset) {
        return new FurtherReadingSection({
            title: new ParagraphWithHighlights({
                spans: [
                    { text: "Further", highlight: false },
                    { text: " Learning", highlight: true },
                ],
            }),
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            iconURL: "/assets/icon/section/book-open.svg",
            links: data.links.map((x) => LinkPanel.fromSanityLinkPanel(x, db)),
            sectionId: data.sectionId,
        });
    }
}

export const titleBodyIllustrationSectionSchemaName = "titleBodyIllustrationSection";

export const furtherReadingSectionSchemaName = "furtherReadingSection";

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

const furtherReadingSectionSchema = defineType({
    name: furtherReadingSectionSchemaName,
    title: `Further Reading Section`,
    type: "object",
    fields: [bodyFieldRichText, linkPanelsField, sectionIdField, isVisibleField],
});

export const pageSectionSchemas = [furtherReadingSectionSchema, titleBodyIllustrationSectionSchema];
