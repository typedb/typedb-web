import { defineField, defineType } from "@sanity/types";

import { Page, SanityPage } from "./common";
import { collapsible,  titleFieldWithHighlights } from "../common-fields";
import { hubspotFormIDField } from "../form";
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
    hubspotFormID: string;
}

export class RequestTechTalkPage extends Page {
    readonly introTitle: ParagraphWithHighlights;
    readonly details: TitleBodyActions;
    readonly hubspotFormID: string;

    constructor(data: SanityRequestTechTalkPage, db: SanityDataset) {
        super(data, db);
        this.introTitle = ParagraphWithHighlights.fromSanity(data.introTitle);
        this.details = TitleAndBody.fromSanity(data.details, db);
        this.hubspotFormID = data.hubspotFormID;
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
            options: collapsible,
        }),
        hubspotFormIDField,
    ],
    preview: {
        prepare: (_selection) => ({ title: "Request Tech Talk Page" }),
    },
});
