import { defineField, defineType } from "@sanity/types";

import { Page, SanityPage } from "./common";
import { collapsibleOptions,  titleFieldWithHighlights } from "../common-fields";
import { cioFormIDField } from "../form";
import {
    ParagraphWithHighlights,
    PortableText,
    SanityTitleAndBody,
    TitleAndBody,
    TitleBodyActions,
    titleAndBodySchemaName,
} from "../text";
import { SanityDataset } from "../sanity-core";
import { metaTagsField } from "./meta-tags";

export interface SanityRequestTechTalkPage extends SanityPage {
    introTitle: PortableText;
    details: SanityTitleAndBody;
    cioFormID: string;
}

export class RequestTechTalkPage extends Page {
    readonly introTitle: ParagraphWithHighlights;
    readonly details: TitleBodyActions;
    readonly cioFormID: string;

    constructor(data: SanityRequestTechTalkPage, db: SanityDataset) {
        super(data, db);
        this.introTitle = ParagraphWithHighlights.fromSanity(data.introTitle);
        this.details = TitleAndBody.fromSanityTitleAndBody(data.details);
        this.cioFormID = data.cioFormID;
    }
}

export const requestTechTalkPageSchemaName = "requestTechTalkPage";

export const requestTechTalkPageSchema = defineType({
    name: requestTechTalkPageSchemaName,
    title: "Request Tech Talk Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({ ...titleFieldWithHighlights, name: "introTitle" }),
        defineField({
            name: "details",
            title: "Details Section",
            type: titleAndBodySchemaName,
            options: collapsibleOptions,
        }),
        cioFormIDField,
    ],
    preview: {
        prepare: (_selection) => ({ title: "Request Tech Talk Page" }),
    },
});
