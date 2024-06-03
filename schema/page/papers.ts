import { ArrayRule, defineField, defineType } from "@sanity/types";
import { collapsible } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SanityTitleAndBody, TitleAndBody, titleAndBodySchemaName } from "../text";
import { Paper } from "../resource/paper";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";
import { SanityPaper, paperSchemaName } from "../resource/sanity";

export interface SanityPapersPage extends SanityPage {
    introSection: SanityTitleAndBody;
    featuredPaper: SanityReference<SanityPaper>;
    papersList: SanityReference<SanityPaper>[];
}

export class PapersPage extends Page {
    readonly introSection: TitleAndBody;
    readonly featuredPaper: Paper;
    readonly papersList: Paper[];

    constructor(data: SanityPapersPage, db: SanityDataset) {
        super(data, db);
        this.introSection = TitleAndBody.fromSanity(data.introSection, db);
        this.featuredPaper = Paper.fromSanity(db.resolveRef(data.featuredPaper), db);
        this.papersList = data.papersList.map((x) => Paper.fromSanity(db.resolveRef(x), db));
    }
}

export const papersPageSchemaName = "papersPage";

export const papersPageSchema = defineType({
    name: papersPageSchemaName,
    title: "Papers Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            type: titleAndBodySchemaName,
            options: collapsible,
        }),
        defineField({
            name: "featuredPaper",
            title: "Featured Paper",
            type: "reference",
            to: [{ type: paperSchemaName }],
        }),
        defineField({
            name: "papersList",
            title: "Papers List",
            description: "Displayed as a tiled grid with 2 columns",
            type: "array",
            of: [{ type: "reference", to: [{ type: paperSchemaName }] }],
            validation: (rule: ArrayRule<any>) =>
                rule.custom((value: any[] | undefined) => {
                    if (!value) return "Required";
                    if (value.length % 2 === 1) return "Must contain an even number of items";
                    else return true;
                }),
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "Papers Page" }),
    },
});
