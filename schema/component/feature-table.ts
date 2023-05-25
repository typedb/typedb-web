import { defineField, defineType } from "@sanity/types";
import { buttonSchemaName, LinkButton, SanityButton } from "../button";
import { descriptionField, requiredRule } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";

export interface SanityFeatureTable {
    headerRow: string[];
    bodyRows: SanityFeatureTableRow[];
}

interface SanityFeatureTableRow {
    heading: string;
    description?: string;
    cells: SanityFeatureTableCell[];
}

interface SanityFeatureTableBooleanCell {
    isChecked: boolean;
}

interface SanityFeatureTableTextCell {
    text: string;
}

type SanityFeatureTableCell = SanityFeatureTableBooleanCell | SanityFeatureTableTextCell | SanityButton;

function isBooleanCell(cell: SanityFeatureTableCell): cell is SanityFeatureTableBooleanCell {
    return "isChecked" in cell;
}

function isTextCell(cell: SanityFeatureTableCell): cell is SanityFeatureTableTextCell {
    return !isBooleanCell(cell) && !isButtonCell(cell);
}

function isButtonCell(cell: SanityFeatureTableCell): cell is SanityButton {
    return "link" in cell;
}

export class FeatureTable {
    headerRow: string[];
    bodyRows: FeatureTableRow[];

    constructor(props: PropsOf<FeatureTable>) {
        this.headerRow = props.headerRow;
        this.bodyRows = props.bodyRows;
    }

    static fromSanity(data: SanityFeatureTable, db: SanityDataset) {
        return new FeatureTable({
            headerRow: data.headerRow,
            bodyRows: data.bodyRows.map(x => FeatureTableRow.fromSanity(x, db)),
        });
    }
}

class FeatureTableRow {
    heading: string;
    description?: string;
    cells: FeatureTableCell[];

    constructor(props: PropsOf<FeatureTableRow>) {
        this.heading = props.heading;
        this.description = props.description;
        this.cells = props.cells;
    }

    static fromSanity(data: SanityFeatureTableRow, db: SanityDataset) {
        return new FeatureTableRow({
            heading: data.heading,
            description: data.description,
            cells: data.cells.map(x => featureTableCellFromSanity(x, db)),
        });
    }
}

export type FeatureTableCell = boolean | string | LinkButton;

function featureTableCellFromSanity(data: SanityFeatureTableCell, db: SanityDataset): FeatureTableCell {
    if (isBooleanCell(data)) return data.isChecked;
    else if (isTextCell(data)) return data.text;
    else if (isButtonCell(data)) return LinkButton.fromSanity(data, db);
    else throw "Found unexpected value in feature table cell: " + data;
}

const booleanCellSchemaName = "featureTableBooleanCell";
const textCellSchemaName = "featureTableTextCell";
const rowSchemaName = "featureTableRow";

const booleanCellSchema = defineType({
    name: booleanCellSchemaName,
    title: "Boolean (check/blank)",
    type: "object",
    fields: [
        defineField({
            name: "isChecked",
            title: "Is Checked",
            type: "boolean",
            initialValue: true,
            validation: requiredRule,
        }),
    ],
    preview: {
        select: { isChecked: "isChecked" },
        prepare: (selection) => ({ title: selection.isChecked ? "Yes (checked)" : "No (blank)", subtitle: "Boolean Cell" }),
    },
});

const textCellSchema = defineType({
    name: textCellSchemaName,
    title: "Text",
    type: "object",
    fields: [
        defineField({
            name: "text",
            title: "Text",
            type: "string",
            validation: requiredRule,
        }),
    ],
    preview: {
        select: { text: "text" },
        prepare: (selection) => ({ title: selection.text, subtitle: "Text Cell" }),
    },
});

const rowSchema = defineType({
    name: rowSchemaName,
    title: "Feature Table Row",
    type: "object",
    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "string",
            validation: requiredRule,
        }),
        descriptionField,
        defineField({
            name: "cells",
            title: "Cells",
            type: "array",
            of: [{ type: booleanCellSchemaName }, { type: textCellSchemaName }, { type: buttonSchemaName }],
        }),
    ],
    preview: {
        select: { heading: "heading" },
        prepare: (selection) => ({ title: selection.heading }),
    },
});

export const featureTableSchemaName = "featureTable";

const featureTableSchema = defineType({
    name: featureTableSchemaName,
    title: "Feature Table",
    type: "object",
    fields: [
        defineField({
            name: "headerRow",
            title: "Header Row",
            type: "array",
            of: [{type: "string"}],
            validation: requiredRule,
        }),
        defineField({
            name: "bodyRows",
            title: "Body Rows",
            type: "array",
            of: [{type: rowSchemaName}],
            validation: requiredRule,
        }),
    ],
});

export const featureTableSchemas = [featureTableSchema, rowSchema, booleanCellSchema, textCellSchema];
