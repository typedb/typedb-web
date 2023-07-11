import { defineType } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "../button";
import { bodyFieldRichText, isVisibleField, linkPanelsField, SanityVisibleToggle } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { ParagraphWithHighlights, RichText, SanityBodyText } from "../text";
import { PropsOf } from "../util";
import { LinkPanel, SanityLinkPanel } from "./link-panel";
import { TechnicolorBlock } from "./technicolor-block";

// TODO: there are two other 'SanityCoreSection' interfaces which are similar, but not quite identical
export interface SanityCoreSection extends SanityBodyText, SanityOptionalActions, SanityVisibleToggle {}

export interface SanityFurtherReadingSection extends SanityCoreSection {
    links: SanityLinkPanel[];
}

export class FurtherReadingSection extends TechnicolorBlock {
    readonly links: LinkPanel[];

    constructor(props: PropsOf<FurtherReadingSection>) {
        super(props);
        this.links = props.links;
    }

    static fromSanityFurtherReadingSection(data: SanityFurtherReadingSection, db: SanityDataset) {
        return new FurtherReadingSection({
            title: new ParagraphWithHighlights({ spans: [{ text: "Further", highlight: false }, { text: " Learning", highlight: true }] }),
            body: new RichText(data.body),
            actions: data.actions?.map(x => LinkButton.fromSanity(x, db)),
            iconURL: "/assets/icon/section/book-open.svg",
            links: data.links.map(x => LinkPanel.fromSanityLinkPanel(x, db)),
        });
    }
}

export const furtherReadingSectionSchemaName = "furtherReadingSection";

export const furtherReadingSectionSchema = defineType({
    name: furtherReadingSectionSchemaName,
    title: `Further Reading Section`,
    type: "object",
    fields: [
        bodyFieldRichText,
        linkPanelsField,
        isVisibleField,
    ],
});
