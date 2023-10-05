import { defineField, defineType } from "@sanity/types";

import { Page, SanityPage, metaTagsField } from "./common";
import { collapsibleOptions, pageTitleField, titleFieldWithHighlights } from "../common-fields";
import { hubspotFormIDField } from "../form";
import {
    ParagraphWithHighlights,
    SanityPortableText,
    SanityTitleAndBody,
    TitleAndBody,
    TitleBodyActions,
    titleAndBodySchemaName,
} from "../text";
import { SanityDataset } from "../sanity-core";

export interface SanityRequestTechTalkPage extends SanityPage {
    introTitle: SanityPortableText;
    details: SanityTitleAndBody;
    hubspotFormID: string;
}

export class RequestTechTalkPage extends Page {
    readonly introTitle: ParagraphWithHighlights;
    readonly details: TitleBodyActions;
    readonly hubspotFormID: string;

    constructor(data: SanityRequestTechTalkPage, db: SanityDataset) {
        super(data, db);
        this.introTitle = ParagraphWithHighlights.fromSanity(data.introTitle);
        this.details = TitleAndBody.fromSanityTitleAndBody(data.details);
        this.hubspotFormID = data.hubspotFormID;
    }
}

export const requestTechTalkPageSchemaName = "requestTechTalkPage";

export const requestTechTalkPageSchema = defineType({
    name: requestTechTalkPageSchemaName,
    title: "Request Tech Talk Page",
    type: "document",
    fields: [
        pageTitleField,
        metaTagsField,
        defineField({ ...titleFieldWithHighlights, name: "introTitle" }),
        defineField({
            name: "details",
            title: "Details Section",
            type: titleAndBodySchemaName,
            options: collapsibleOptions,
        }),
        hubspotFormIDField,
    ],
    preview: {
        prepare: (_selection) => ({ title: "Request Tech Talk Page" }),
    },
});
