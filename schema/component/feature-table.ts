import { ArrayRule, defineField, defineType } from "@sanity/types";
import { buttonSchemaName, LinkButton, SanityLinkButton } from "../button";
import { buttonField, descriptionField, isVisibleField, nameField, plainTextField, requiredRule, titleAndBodyFields } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SanitySectionBase, SectionBase } from "./section";

export interface SanityFeatureTable {
    products: SanityProduct[];
    rows: SanityFeatureTableRow[];
}

interface SanityProduct {
    name: string;
    priceString: string;
    button: SanityLinkButton;
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

type SanityFeatureTableCell = SanityFeatureTableBooleanCell | SanityFeatureTableTextCell | SanityLinkButton;

function isBooleanCell(cell: SanityFeatureTableCell): cell is SanityFeatureTableBooleanCell {
    return "isChecked" in cell;
}

function isTextCell(cell: SanityFeatureTableCell): cell is SanityFeatureTableTextCell {
    return !isBooleanCell(cell) && !isButtonCell(cell);
}

function isButtonCell(cell: SanityFeatureTableCell): cell is SanityLinkButton {
    return "link" in cell;
}

export interface SanityFeatureTableSection extends SanitySectionBase {
    featureTable: SanityFeatureTable;
}

export const featureTableSectionSchemaName = `featureTableSection`;

export class FeatureTable {
    readonly products: Product[];
    readonly rows: FeatureTableRow[];

    constructor(props: PropsOf<FeatureTable>) {
        this.products = props.products;
        this.rows = props.rows;
    }

    static fromSanity(data: SanityFeatureTable, db: SanityDataset) {
        return new FeatureTable({
            products: data.products.map(x => Product.fromSanity(x, db)),
            rows: data.rows.map(x => FeatureTableRow.fromSanity(x, db)),
        });
    }
}

class Product {
    readonly name: string;
    readonly priceString: string;
    readonly button: LinkButton;

    constructor(props: PropsOf<Product>) {
        this.name = props.name;
        this.priceString = props.priceString;
        this.button = props.button;
    }

    static fromSanity(data: SanityProduct, db: SanityDataset) {
        return new Product({
            name: data.name,
            priceString: data.priceString,
            button: LinkButton.fromSanity(data.button, db),
        });
    }
}

class FeatureTableRow {
    readonly heading: string;
    readonly description?: string;
    readonly cells: FeatureTableCell[];

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

export class FeatureTableSection extends SectionBase {
    readonly featureTable: FeatureTable;

    constructor(props: PropsOf<FeatureTableSection>) {
        super(props);
        this.featureTable = props.featureTable;
    }

    static override fromSanity(data: SanityFeatureTableSection, db: SanityDataset) {
        return new FeatureTableSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                featureTable: FeatureTable.fromSanity(data.featureTable, db),
            })
        );
    }
}

const booleanCellSchemaName = "featureTableBooleanCell";
const textCellSchemaName = "featureTableTextCell";
const productSchemaName = "featureTableProduct";
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
        Object.assign({}, plainTextField, { validation: requiredRule }),
    ],
    preview: {
        select: { text: "text" },
        prepare: (selection) => ({ title: selection.text, subtitle: "Text Cell" }),
    },
});

const productSchema = defineType({
    name: productSchemaName,
    title: "Product",
    type: "object",
    fields: [
        nameField,
        defineField({
            name: "priceString",
            title: "Price String",
            type: "string",
            validation: requiredRule,
        }),
        buttonField,
    ],
    preview: {
        select: { name: "name" },
        prepare: (selection) => ({ title: selection.name }),
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
            validation: (rule: ArrayRule<any>) => rule.required(),
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
            name: "products",
            title: "Products",
            type: "array",
            of: [{type: productSchemaName}],
            validation: requiredRule,
        }),
        defineField({
            name: "rows",
            title: "Rows",
            type: "array",
            of: [{type: rowSchemaName}],
            validation: requiredRule,
        }),
    ],
});

const featureTableSectionSchema = defineType({
    name: featureTableSectionSchemaName,
    title: "Feature Table Section",
    type: "object",
    fields: [
        ...titleAndBodyFields,
        defineField({
            name: "featureTable",
            title: "Feature Table",
            type: featureTableSchemaName,
            validation: requiredRule,
        }),
        isVisibleField,
    ],
});

export const featureTableSchemas = [
    featureTableSchema, productSchema, rowSchema, booleanCellSchema, textCellSchema, featureTableSectionSchema
];
