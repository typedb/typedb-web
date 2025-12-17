import { DashboardIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, SanityDocument } from "@sanity/types";
import { CodeSnippetShort, codeSnippetShortSchemaName, isCodeSnippetShort } from "../code";
import { bodyFieldRichText, isVisibleField, nameField, requiredRule, SanityVisibleToggle, tagsField, titleFieldOptional, titleFieldWithHighlights, titleFieldWithHighlightsOptional } from "../common-fields";
import { Illustration, illustrationFieldOptional, illustrationFieldTargetTypes, illustrationFromSanity, SanityIllustration } from "../illustration";
import { SanityImageRef } from "../image";
import { SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, ParagraphWithHighlights, PortableText, SanityTitleField } from "../text";
import { PropsOf } from "../util";
import { SanitySectionCore, SectionCore } from "./section";

export interface SanityFeatureGridSection extends SanitySectionCore {
    featureGrids: SanityReference<SanityFeatureGrid>[];
}

export interface SanityFeatureGridRow {
    cells: SanityFeatureGridCell[];
}

export interface SanityFeatureGrid extends SanityDocument {
    name: string;
    title?: PortableText;
    description?: PortableText;
    rows: SanityFeatureGridRow[];
    illustration?: SanityReference<SanityIllustration>;
}

export interface SanityFeatureGridCell extends SanityVisibleToggle {
    title: string;
    body: PortableText;
    links?: SanityTextLink[];
    illustration?: SanityReference<SanityIllustration>;
    tags: string[];
    isIllustrationBlurred: boolean;
    layoutDirection?: 'row' | 'column' | 'auto';
}

export function featureGridIllustrationFromSanity(data: SanityIllustration, db: SanityDataset): Illustration {
    if (isCodeSnippetShort(data)) return CodeSnippetShort.fromSanity(data);
    else return illustrationFromSanity(data, db);
}

export class FeatureGridCell implements Partial<BodyTextField> {
    readonly title?: string;
    readonly body?: PortableText;
    readonly links?: TextLink[];
    readonly illustration?: Illustration;
    readonly tags: string[];
    readonly isIllustrationBlurred: boolean;
    readonly layoutDirection: 'row' | 'column' | 'auto';

    constructor(props: PropsOf<FeatureGridCell>) {
        this.title = props.title;
        this.body = props.body;
        this.links = props.links;
        this.illustration = props.illustration;
        this.tags = props.tags;
        this.isIllustrationBlurred = props.isIllustrationBlurred;
        this.layoutDirection = props.layoutDirection;
    }

    static fromSanity(data: SanityFeatureGridCell, db: SanityDataset) {
        return new FeatureGridCell({
            title: data.title,
            body: data.body,
            links: data.links?.map(x => TextLink.fromSanityTextLink(x, db)).filter(x => !!x) as TextLink[],
            illustration: data.illustration && featureGridIllustrationFromSanity(db.resolveRef(data.illustration), db),
            tags: data.tags,
            isIllustrationBlurred: data.isIllustrationBlurred,
            layoutDirection: data.layoutDirection || 'auto',
        });
    }
}

export class FeatureGridRow {
    readonly cells: FeatureGridCell[];

    constructor(props: PropsOf<FeatureGridRow>) {
        this.cells = props.cells;
    }

    static fromSanity(data: SanityFeatureGridRow, db: SanityDataset) {
        const visibleCells = data.cells.filter(cell => cell.isVisible);
        return new FeatureGridRow({
            cells: visibleCells.map(cell => FeatureGridCell.fromSanity(cell, db)),
        });
    }
}

export class FeatureGrid { // not used in FeatureGridSection to flatten the structure, but used elsewhere
    readonly name: string;
    readonly title?: ParagraphWithHighlights;
    readonly description?: PortableText;
    readonly rows: FeatureGridRow[];
    readonly illustration?: Illustration;

    constructor(props: PropsOf<FeatureGrid>) {
        this.name = props.name;
        this.title = props.title;
        this.description = props.description;
        this.rows = props.rows;
        this.illustration = props.illustration;
    }

    static fromSanity(featureGrid: SanityFeatureGrid, db: SanityDataset) {
        const rows = featureGrid.rows.map(row => FeatureGridRow.fromSanity(row, db));
        return new FeatureGrid({
            name: featureGrid.name,
            title: featureGrid.title ? ParagraphWithHighlights.fromSanity(featureGrid.title) : undefined,
            description: featureGrid.description,
            rows: rows,
            illustration: featureGrid.illustration
                ? featureGridIllustrationFromSanity(db.resolveRef(featureGrid.illustration), db)
                : undefined,
        });
    }
}

export class FeatureGridSection extends SectionCore {
    readonly featureGrids: FeatureGrid[];
    readonly illustration?: Illustration;

    constructor(props: PropsOf<FeatureGridSection>) {
        super(props);
        this.featureGrids = props.featureGrids;
        this.illustration = props.illustration;
    }

    static override fromSanity(data: SanityFeatureGridSection, db: SanityDataset) {
        const featureGrids = data.featureGrids.map(x => db.resolveRef(x));
        return new FeatureGridSection(
            Object.assign(SectionCore.fromSanity(data, db), {
                featureGrids: featureGrids.map(x => FeatureGrid.fromSanity(x, db)),
            })
        );
    }
}

export const featureGridCellSchemaName = `featureGridCell`;

const featureGridCellSchema = defineType({
    name: featureGridCellSchemaName,
    title: "Feature",
    type: "object",
    fields: [
        titleFieldOptional,
        bodyFieldRichText,
        defineField({
            name: "illustration",
            title: "Illustration",
            type: "reference",
            to: [{type: codeSnippetShortSchemaName}, ...illustrationFieldTargetTypes]
        }), // TODO: hide this field when block type is 'text only'
        defineField({
            name: "links",
            title: "Links",
            type: "array",
            of: [{type: textLinkSchemaName}],
        }),
        tagsField,
        defineField({
            name: "isIllustrationBlurred",
            title: "Blur Illustration?",
            type: "boolean",
            initialValue: false,
            validation: requiredRule,
        }),
        defineField({
            name: "layoutDirection",
            title: "Layout Direction",
            type: "string",
            options: {
                list: [
                    { title: "Use row default", value: "auto" },
                    { title: "Row", value: "row" },
                    { title: "Column", value: "column" },
                ],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "auto",
        }),
        isVisibleField,
    ],
});

export const featureGridRowSchemaName = `featureGridRow`;

const featureGridRowSchema = defineType({
    name: featureGridRowSchemaName,
    title: "Feature Grid Row",
    type: "object",
    fields: [
        defineField({
            name: "cells",
            title: "Cells",
            type: "array",
            of: [{ type: featureGridCellSchemaName }],
            validation: (rule: ArrayRule<any>) => rule.required().min(1),
        }),
    ],
    preview: {
        select: {
            cells: "cells",
        },
        prepare({ cells }) {
            const titles = cells?.map((cell: any) => cell.title || "Untitled").join(", ") || "No cells";
            return {
                title: titles,
            };
        },
    },
});

export const featureGridSchemaName = `featureGrid`;

const featureGridSchema = defineType({
    name: featureGridSchemaName,
    title: "Feature Grid",
    type: "document",
    icon: DashboardIcon,
    fields: [
        nameField,
        titleFieldWithHighlightsOptional,
        defineField({
            name: "description",
            title: "Description",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "rows",
            title: "Rows",
            type: "array",
            of: [{ type: featureGridRowSchemaName }],
            validation: (rule: ArrayRule<any>) => rule.required().min(1),
        }),
        illustrationFieldOptional,
    ],
    preview: {
        select: {
            name: "name",
        },
        prepare({ name }) {
            return {
                title: name || "Untitled Feature Grid",
            };
        },
    },
});

export const featureGridSectionSchemaName = `featureGridSection`;

const featureGridSectionSchema = defineType({
    name: featureGridSectionSchemaName,
    title: "Feature Grid Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        defineField({
            name: "featureGrids",
            title: "Feature Grids",
            type: "array",
            of: [{type: "reference", to: [{type: featureGridSchemaName}]}],
            validation: requiredRule,
        }),
        isVisibleField,
    ],
});

export const featureGridSchemas = [featureGridSchema, featureGridSectionSchema, featureGridRowSchema, featureGridCellSchema];
