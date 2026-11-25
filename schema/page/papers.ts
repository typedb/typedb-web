import { ArrayRule, defineField, defineType } from "@sanity/types";
import { collapsibleOptions } from "../common-fields";
import {
    OrganisationRow, organisationRowSchemaName, organisationRowsFromSanity, SanityOrganisationRow,
} from "../component/organisation-logos-section";
import { SanitySectionCore, SectionCore } from "../component/section";
import { SanityDataset, SanityReference } from "../sanity-core";
import { titleAndBodySchemaName } from "../text";
import { Paper } from "../resource/paper";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";
import { SanityPaper, paperSchemaName } from "../resource/sanity";

export interface SanityPapersPage extends SanityPage {
    introSection: SanitySectionCore;
    organisationRows?: SanityOrganisationRow[];
    featuredPaper: SanityReference<SanityPaper>;
    papersList: SanityReference<SanityPaper>[];
}

export class PapersPage extends Page {
    readonly introSection: SectionCore;
    readonly organisationRows: OrganisationRow[];
    readonly featuredPaper: Paper;
    readonly papersList: Paper[];

    constructor(data: SanityPapersPage, db: SanityDataset) {
        super(data, db);
        this.introSection = SectionCore.fromSanity(data.introSection, db);
        this.organisationRows = organisationRowsFromSanity(data.organisationRows, db);
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
            options: collapsibleOptions,
        }),
        defineField({
            name: "organisationRows",
            title: "Logo Rows",
            description: "Rows of publisher and institution logos shown under the intro",
            type: "array",
            of: [{ type: organisationRowSchemaName }],
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
            description: "Grouped by category on the page; this order is kept within each category",
            type: "array",
            of: [{ type: "reference", to: [{ type: paperSchemaName }] }],
            validation: (rule: ArrayRule<any>) => rule.required(),
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "Papers Page" }),
    },
});
