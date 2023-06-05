import { defineField, defineType } from "@sanity/types";
import { collapsibleOptions, pageTitleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SanityTitleAndBody, TitleAndBody, titleAndBodySchemaName } from "../text";
import { PropsOf } from "../util";
import { SanityWhitePaper, WhitePaper, whitePaperSchemaName } from "../white-paper";
import { SanityPage } from "./common";

export interface SanityWhitePapersPage extends SanityPage {
    introSection: SanityTitleAndBody;
    featuredWhitePaper: SanityReference<SanityWhitePaper>;
}

export class WhitePapersPage {
    readonly introSection: TitleAndBody;
    readonly featuredWhitePaper: WhitePaper;

    constructor(props: PropsOf<WhitePapersPage>) {
        this.introSection = props.introSection;
        this.featuredWhitePaper = props.featuredWhitePaper;
    }

    static fromSanity(data: SanityWhitePapersPage, db: SanityDataset): WhitePapersPage {
        return new WhitePapersPage({
            introSection: TitleAndBody.fromSanityTitleAndBody(data.introSection),
            featuredWhitePaper: WhitePaper.fromSanity(db.resolveRef(data.featuredWhitePaper), db),
        });
    }
}

export const whitePapersPageSchemaName = "whitePapersPage";

export const whitePapersPageSchema = defineType({
    name: whitePapersPageSchemaName,
    title: "White Papers Page",
    type: "document",
    fields: [
        pageTitleField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            type: titleAndBodySchemaName,
            options: collapsibleOptions,
        }),
        defineField({
            name: "featuredWhitePaper",
            title: "Featured White Paper",
            type: "reference",
            to: [{type: whitePaperSchemaName}],
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "White Papers Page" }),
    },
});
