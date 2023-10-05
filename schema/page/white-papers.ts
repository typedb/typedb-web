import { ArrayRule, defineField, defineType } from "@sanity/types";
import { collapsibleOptions, pageTitleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SanityTitleAndBody, TitleAndBody, titleAndBodySchemaName } from "../text";
import { SanityWhitePaper, WhitePaper, whitePaperSchemaName } from "../white-paper";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityWhitePapersPage extends SanityPage {
    introSection: SanityTitleAndBody;
    featuredWhitePaper: SanityReference<SanityWhitePaper>;
    whitePapersList: SanityReference<SanityWhitePaper>[];
}

export class WhitePapersPage extends Page {
    readonly introSection: TitleAndBody;
    readonly featuredWhitePaper: WhitePaper;
    readonly whitePapersList: WhitePaper[];

    constructor(data: SanityWhitePapersPage, db: SanityDataset) {
        super(data, db);
        this.introSection = TitleAndBody.fromSanityTitleAndBody(data.introSection);
        this.featuredWhitePaper = WhitePaper.fromSanity(db.resolveRef(data.featuredWhitePaper), db);
        this.whitePapersList = data.whitePapersList.map((x) => WhitePaper.fromSanity(db.resolveRef(x), db));
    }
}

export const whitePapersPageSchemaName = "whitePapersPage";

export const whitePapersPageSchema = defineType({
    name: whitePapersPageSchemaName,
    title: "White Papers Page",
    type: "document",
    fields: [
        pageTitleField,
        metaTagsField,
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
            to: [{ type: whitePaperSchemaName }],
        }),
        defineField({
            name: "whitePapersList",
            title: "White Papers List",
            description: "Displayed as a tiled grid with 2 columns",
            type: "array",
            of: [{ type: "reference", to: [{ type: whitePaperSchemaName }] }],
            validation: (rule: ArrayRule<any>) =>
                rule.custom((value: any[] | undefined) => {
                    if (!value) return "Required";
                    if (value.length % 2 === 1) return "Must contain an even number of items";
                    else return true;
                }),
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "White Papers Page" }),
    },
});
