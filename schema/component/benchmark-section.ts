import { defineArrayMember, defineField, defineType } from "@sanity/types";
import { BarChartIcon } from "@sanity/icons";
import { isVisibleField, sectionPreview, titleBodyActionsFields } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SanitySectionCore, SectionCore } from "./section";

export const benchmarkSegmentTones = [
    { title: "Neutral", value: "neutral" },
    { title: "Accent", value: "accent" },
    { title: "Muted", value: "muted" },
] as const;

export type BenchmarkSegmentTone = (typeof benchmarkSegmentTones)[number]["value"];

export interface SanityBenchmarkSegment {
    _key: string;
    name: string;
    tone?: BenchmarkSegmentTone;
    summaryLabel?: string;
}

export interface SanityBenchmarkRow {
    _key: string;
    label: string;
    values: number[];
    emphasis?: "default" | "highlight";
}

export interface SanityBenchmarkChart {
    _key: string;
    title: string;
    segments: SanityBenchmarkSegment[];
    rows: SanityBenchmarkRow[];
    caption?: string;
}

export interface SanityBenchmarkSection extends SanitySectionCore {
    footnote?: string;
    charts: SanityBenchmarkChart[];
}

export interface BenchmarkSegment {
    key: string;
    name: string;
    tone: BenchmarkSegmentTone;
    summaryLabel?: string;
}

export interface BenchmarkRow {
    key: string;
    label: string;
    values: number[];
    isHighlighted: boolean;
}

export interface BenchmarkChart {
    key: string;
    title: string;
    segments: BenchmarkSegment[];
    rows: BenchmarkRow[];
    caption?: string;
}

export class BenchmarkSection extends SectionCore {
    readonly footnote?: string;
    readonly charts: BenchmarkChart[];

    constructor(props: PropsOf<BenchmarkSection>) {
        super(props);
        this.footnote = props.footnote;
        this.charts = props.charts;
    }

    static override fromSanity(data: SanityBenchmarkSection, db: SanityDataset) {
        return new BenchmarkSection({
            ...SectionCore.fromSanity(data, db),
            footnote: data.footnote || undefined,
            charts: (data.charts || []).map((chart) => ({
                key: chart._key,
                title: chart.title,
                caption: chart.caption || undefined,
                segments: (chart.segments || []).map((x) => ({
                    key: x._key, name: x.name, tone: x.tone || "neutral", summaryLabel: x.summaryLabel || undefined,
                })),
                rows: (chart.rows || []).map((x) => ({
                    key: x._key, label: x.label, values: x.values || [], isHighlighted: x.emphasis === "highlight",
                })),
            })),
        });
    }
}

export const benchmarkSegmentSchemaName = "benchmarkSegment";

const benchmarkSegmentSchema = defineType({
    name: benchmarkSegmentSchemaName,
    title: "Segment",
    type: "object",
    fields: [
        defineField({
            name: "name",
            type: "string",
            description: "Shown in the legend, e.g. 'Failed with a visible error'",
            validation: (rule) => rule.required().error("Segments need a name for the legend"),
        }),
        defineField({
            name: "tone",
            type: "string",
            description: "Accent draws the eye to the segment the chart is about",
            options: { list: [...benchmarkSegmentTones], layout: "radio", direction: "horizontal" },
            initialValue: "neutral",
        }),
        defineField({
            name: "summaryLabel",
            title: "Summary Label (optional)",
            type: "string",
            description: "If set, each row's value for this segment is summarised beside the row, e.g. 'flagged'",
        }),
    ],
    preview: { select: { title: "name", subtitle: "tone" } },
});

export const benchmarkRowSchemaName = "benchmarkRow";

const benchmarkRowSchema = defineType({
    name: benchmarkRowSchemaName,
    title: "Row",
    type: "object",
    fields: [
        defineField({
            name: "label",
            type: "string",
            validation: (rule) => rule.required().error("Rows need a label, e.g. 'TypeQL'"),
        }),
        defineField({
            name: "values",
            type: "array",
            of: [{ type: "number" }],
            description: "Percentages, one per segment, in the same order as the segments",
            validation: (rule) => rule.required().min(1).error("Add a value for each segment"),
        }),
        defineField({
            name: "emphasis",
            type: "string",
            description: "Highlight draws a single-segment bar in the accent colour",
            options: {
                list: [{ title: "Default", value: "default" }, { title: "Highlight", value: "highlight" }],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "default",
        }),
    ],
    preview: {
        select: { title: "label", values: "values" },
        prepare: ({ title, values }: { title?: string; values?: number[] }) => ({
            title: title || "Untitled row",
            subtitle: (values || []).map((x) => `${x}%`).join(" · "),
        }),
    },
});

export const benchmarkChartSchemaName = "benchmarkChart";

const benchmarkChartSchema = defineType({
    name: benchmarkChartSchemaName,
    title: "Chart",
    type: "object",
    icon: BarChartIcon,
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (rule) => rule.required().error("Charts need a title, e.g. 'First attempt'"),
        }),
        defineField({
            name: "segments",
            type: "array",
            description: "One segment draws a bar per row; several draw a stacked bar with a legend",
            of: [defineArrayMember({ type: benchmarkSegmentSchemaName })],
            validation: (rule) => rule.required().min(1).error("Add at least one segment"),
        }),
        defineField({
            name: "rows",
            type: "array",
            of: [defineArrayMember({ type: benchmarkRowSchemaName })],
            validation: (rule) => [
                rule.required().min(1).error("Add at least one row"),
                rule.custom((rows: SanityBenchmarkRow[] | undefined, context) => {
                    const segmentCount = ((context.parent as SanityBenchmarkChart | undefined)?.segments || []).length;
                    const mismatched = (rows || []).filter((x) => (x.values || []).length !== segmentCount);
                    return mismatched.length
                        ? `Each row needs ${segmentCount} values, one per segment (check: ${mismatched.map((x) => x.label).join(", ")})`
                        : true;
                }),
            ],
        }),
        defineField({
            name: "caption",
            title: "Caption (optional)",
            type: "string",
            description: "Small print under the chart",
        }),
    ],
    preview: { select: { title: "title" } },
});

export const benchmarkSectionSchemaName = "benchmarkSection";

const benchmarkSectionSchema = defineType({
    name: benchmarkSectionSchemaName,
    title: "Benchmark",
    type: "object",
    icon: BarChartIcon,
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "footnote",
            title: "Footnote (optional)",
            type: "text",
            rows: 2,
            description: "Methodology summary shown under the body, e.g. dataset and model",
        }),
        defineField({
            name: "charts",
            type: "array",
            of: [defineArrayMember({ type: benchmarkChartSchemaName })],
            validation: (rule) => rule.required().min(1).error("Add at least one chart"),
        }),
        isVisibleField,
    ],
    preview: sectionPreview("Benchmark"),
});

export const benchmarkSectionSchemas = [
    benchmarkSegmentSchema, benchmarkRowSchema, benchmarkChartSchema, benchmarkSectionSchema,
];
