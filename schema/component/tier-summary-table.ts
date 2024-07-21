import { ArrayRule, defineField, defineType } from "@sanity/types";
import { buttonSchemaName, LinkButton, SanityLinkButton } from "../button";
import { bodyFieldRichText, descriptionField, plainTextField, required } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PortableText } from "../text";
import { PropsOf } from "../util";

export interface SanityTierSummaryTable {
    headerRow: string[];
    bodyRows: TierSummaryTableRow[];
}

interface TierSummaryTableRow {
    description?: string;
    cells: TierSummaryTableCell[];
}

interface TierSummaryTableCell {
    value: PortableText;
}

export class TierSummaryTable {
    headerRow: string[];
    bodyRows: TierSummaryTableRow[];

    constructor(props: PropsOf<TierSummaryTable>) {
        this.headerRow = props.headerRow;
        this.bodyRows = props.bodyRows;
    }

    static fromSanity(data: TierSummaryTable, db: SanityDataset) {
        return new TierSummaryTable({
            headerRow: data.headerRow,
            bodyRows: data.bodyRows,
        });
    }
}

export const tierSummaryTableSchemaName = "tierSummaryTable";
const rowSchemaName = "tierSummaryTableRow";
const cellSchemaName = "tierSummaryTableCell";

const cellSchema = defineType({
    name: cellSchemaName,
    title: "Table Cell",
    type: "object",
    fields: [Object.assign({}, bodyFieldRichText, { name: "value", title: "Text", validation: required, })],
});

const rowSchema = defineType({
    name: rowSchemaName,
    title: "Table Row",
    type: "object",
    fields: [
        descriptionField,
        defineField({
            name: "cells",
            title: "Cells",
            type: "array",
            of: [{ type: cellSchemaName }],
            validation: required,
        }),
    ],
    preview: {
        select: { description: "description" },
        prepare: (selection) => ({ title: selection.description }),
    },
});

const tableSchema = defineType({
    name: tierSummaryTableSchemaName,
    title: "Tier Summary Table",
    type: "object",
    fields: [
        defineField({
            name: "headerRow",
            title: "Header Row",
            type: "array",
            of: [{type: "string"}],
            validation: required,
        }),
        defineField({
            name: "bodyRows",
            title: "Body Rows",
            type: "array",
            of: [{type: rowSchemaName}],
            validation: required,
        }),
    ],
});

export const tierSummaryTableSchemas = [tableSchema, rowSchema, cellSchema];
