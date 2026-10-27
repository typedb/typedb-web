import { CodeBlockIcon, CodeIcon, DocumentVideoIcon, ImageIcon, SplitVerticalIcon, StackCompactIcon, SunIcon } from "@sanity/icons";
import {
    ArrayRule, defineArrayMember, defineField, defineType, ReferenceRule, SanityDocument, Slug, SlugRule, StringRule, TextRule,
} from "@sanity/types";
import { CodeSnippet, isCodeSnippet, isPolyglotSnippet, PolyglotSnippet, SanityCodeSnippet, SanityPolyglotSnippet } from "./code";
import { codeSnippetSchemaName, polyglotSnippetSchemaName, requiredRule, titleField } from "./common-fields";
import { Document, SanityDataset, SanityImage, SanityReference } from "./sanity-core";
import { PropsOf } from "./util";

export const imageIllustrationSchemaName = "imageIllustration";
export const videoEmbedSchemaName = "videoEmbed";
export const graphVisualisationSchemaName = "graphVisualisation";
export const splitPaneIllustrationSchemaName = "splitPaneIllustration";
export const stackDiagramSchemaName = "stackDiagram";
export const stackDiagramColumnSchemaName = "stackDiagramColumn";
export const stackDiagramLayerSchemaName = "stackDiagramLayer";

interface SanityImageIllustration extends SanityDocument {
    image: SanityImage;
}

export interface SanityVideoEmbed extends SanityDocument {
    url: Slug;
}

interface SanityGraphVisualisation extends SanityDocument {
    json: string;
}

type SanitySplitPaneIllustrationContent = SanityImageIllustration | SanityCodeSnippet | SanityGraphVisualisation;

export interface SanitySplitPaneIllustration extends SanityDocument {
    left: SanityReference<SanitySplitPaneIllustrationContent>;
    right: SanityReference<SanitySplitPaneIllustrationContent>;
}

/** Which side of the comparison a column represents; decides the colour of its marker */
export const stackSubjects = [
    { title: "TypeDB", value: "typedb" },
    { title: "Competitor", value: "competitor" },
    { title: "Neutral", value: "neutral" },
] as const;

export type StackSubject = (typeof stackSubjects)[number]["value"];

/** What a layer is in the stack, which decides how it is drawn */
export const stackLayerEmphases = [
    { title: "Normal", value: "none" },
    { title: "Highlighted", value: "highlighted" },
    { title: "Notional", value: "notional" },
] as const;

export type StackLayerEmphasis = (typeof stackLayerEmphases)[number]["value"];

export interface SanityStackDiagramLayer {
    _key: string;
    title: string;
    body?: string;
    emphasis?: StackLayerEmphasis;
}

export interface SanityStackDiagramColumn {
    _key: string;
    label: string;
    subject?: StackSubject;
    layers?: SanityStackDiagramLayer[];
}

export interface SanityStackDiagram extends SanityDocument {
    caption?: string;
    columns?: SanityStackDiagramColumn[];
}

export type SanityIllustration = SanityImageIllustration | SanityVideoEmbed | SanityCodeSnippet | SanityPolyglotSnippet | SanityGraphVisualisation | SanitySplitPaneIllustration | SanityStackDiagram;

export const illustrationObjectSchemaName = "illustration";

export type IllustrationKind = "none" | "image" | "code" | "video" | "graph" | "splitPane" | "stackDiagram";

export interface SanityIllustrationObject {
    _type: typeof illustrationObjectSchemaName;
    kind: IllustrationKind;
    image?: SanityImage;
    code?: SanityReference<SanityCodeSnippet | SanityPolyglotSnippet>;
    video?: SanityReference<SanityVideoEmbed>;
    graph?: SanityReference<SanityGraphVisualisation>;
    splitPane?: SanityReference<SanitySplitPaneIllustration>;
    stackDiagram?: SanityReference<SanityStackDiagram>;
}

/** Documents published before the illustration migration still hold the legacy reference shape */
export type SanityIllustrationFieldValue = SanityIllustrationObject | SanityReference<SanityIllustration>;

export interface SanityIllustrationField {
    illustration: SanityIllustrationFieldValue;
}

export function isLegacyIllustrationRef(value: SanityIllustrationFieldValue): value is SanityReference<SanityIllustration> {
    return "_ref" in value;
}

export function isImageIllustration(doc: SanityDocument): doc is SanityImageIllustration {
    return doc._type === imageIllustrationSchemaName;
}

export function isVideoEmbed(doc: SanityDocument): doc is SanityVideoEmbed {
    return doc._type === videoEmbedSchemaName;
}

export function isGraphVisualisation(doc: SanityDocument): doc is SanityGraphVisualisation {
    return doc._type === graphVisualisationSchemaName;
}

export function isSplitPaneIllustration(doc: SanityDocument): doc is SanitySplitPaneIllustration {
    return doc._type === splitPaneIllustrationSchemaName;
}

export function isStackDiagram(doc: SanityDocument): doc is SanityStackDiagram {
    return doc._type === stackDiagramSchemaName;
}

export class ImageIllustration extends Document {
    readonly url: string;
    readonly altText: string;
    readonly width?: number;
    readonly height?: number;

    constructor(data: PropsOf<ImageIllustration>) {
        super({ _id: data.id });
        this.url = data.url;
        this.altText = data.altText;
        this.width = data.width;
        this.height = data.height;
    }

    static fromSanity(data: SanityImageIllustration, db: SanityDataset): ImageIllustration {
        const imageAsset = db.resolveRef(data.image.asset);
        return new ImageIllustration(Object.assign(new Document(data), {
            url: imageAsset.url,
            altText: imageAsset.altText || "",
            width: imageAsset.metadata?.dimensions?.width,
            height: imageAsset.metadata?.dimensions?.height,
        }));
    }

    static fromSanityImageField(image: SanityImage, db: SanityDataset): ImageIllustration {
        const imageAsset = db.resolveRef(image.asset);
        return new ImageIllustration({
            id: image.asset._ref,
            url: imageAsset.url,
            altText: imageAsset.altText || "",
            width: imageAsset.metadata?.dimensions?.width,
            height: imageAsset.metadata?.dimensions?.height,
        });
    }
}

export class VideoEmbed extends Document {
    readonly url: string;

    constructor(data: PropsOf<VideoEmbed>) {
        super({ _id: data.id });
        this.url = data.url;
    }

    static fromSanity(data: SanityVideoEmbed): VideoEmbed {
        return new VideoEmbed(Object.assign(new Document(data), { url: data.url.current }));
    }
}

export declare namespace GraphVisualisation {
    export interface Vertex {
        id: number;
        label: string;
        encoding: VertexEncoding;
        x: number;
        y: number;
    }

    export type VertexEncoding = "entity" | "relation" | "attribute";

    export interface Edge {
        source: number;
        target: number;
        label: string;
        highlight?: EdgeHighlight;
    }

    export type EdgeHighlight = "inferred" | "error";
}

export class GraphVisualisation extends Document {
    readonly vertices: Vertex[];
    readonly edges: Edge[];

    constructor(data: PropsOf<GraphVisualisation>) {
        super({ _id: data.id });
        this.vertices = data.vertices;
        this.edges = data.edges;
    }

    static fromSanity(data: SanityGraphVisualisation): GraphVisualisation {
        const parsedJSONData: Pick<GraphVisualisation, "vertices" | "edges"> = JSON.parse(data.json);
        return new GraphVisualisation(Object.assign(new Document(data), parsedJSONData));
    }
}
type Vertex = GraphVisualisation.Vertex;
type Edge = GraphVisualisation.Edge;

export type SplitPaneIllustrationContent = ImageIllustration | CodeSnippet | GraphVisualisation;

function splitPaneIllustrationContentFromSanity(data: SanitySplitPaneIllustrationContent, db: SanityDataset) {
    if (isImageIllustration(data)) return ImageIllustration.fromSanity(data, db);
    else if (isCodeSnippet(data)) return CodeSnippet.fromSanity(data);
    else if (isGraphVisualisation(data)) return GraphVisualisation.fromSanity(data);
    else throw `Found split pane illustration content with illegal document type '${(data as any)._type}'`;
}

export class SplitPaneIllustration extends Document {
    readonly left: SplitPaneIllustrationContent;
    readonly right: SplitPaneIllustrationContent;

    constructor(data: PropsOf<SplitPaneIllustration>) {
        super({ _id: data.id });
        this.left = data.left;
        this.right = data.right;
    }

    static fromSanity(data: SanitySplitPaneIllustration, db: SanityDataset): SplitPaneIllustration {
        return new SplitPaneIllustration(Object.assign(new Document(data), {
            left: splitPaneIllustrationContentFromSanity(db.resolveRef(data.left), db),
            right: splitPaneIllustrationContentFromSanity(db.resolveRef(data.right), db)
        }));
    }
}

export interface StackDiagramLayer {
    key: string;
    title: string;
    body?: string;
    emphasis: StackLayerEmphasis;
}

export interface StackDiagramColumn {
    key: string;
    label: string;
    subject: StackSubject;
    layers: StackDiagramLayer[];
}

/** Two or more stacks side by side, showing where something sits in each product's architecture */
export class StackDiagram extends Document {
    readonly caption?: string;
    readonly columns: StackDiagramColumn[];

    constructor(data: PropsOf<StackDiagram>) {
        super({ _id: data.id });
        this.caption = data.caption;
        this.columns = data.columns;
    }

    static fromSanity(data: SanityStackDiagram): StackDiagram {
        return new StackDiagram(Object.assign(new Document(data), {
            caption: data.caption || undefined,
            columns: (data.columns || []).map((column) => ({
                key: column._key,
                label: column.label,
                subject: column.subject || "neutral",
                layers: (column.layers || []).map((layer) => ({
                    key: layer._key,
                    title: layer.title,
                    body: layer.body || undefined,
                    emphasis: layer.emphasis || "none",
                })),
            })),
        }));
    }
}

export type Illustration = ImageIllustration | VideoEmbed | CodeSnippet | PolyglotSnippet | GraphVisualisation | SplitPaneIllustration | StackDiagram;

export function illustrationFromSanity(data: SanityIllustration, db: SanityDataset): Illustration {
    if (isSplitPaneIllustration(data)) return SplitPaneIllustration.fromSanity(data, db);
    else if (isStackDiagram(data)) return StackDiagram.fromSanity(data);
    else if (isImageIllustration(data)) return ImageIllustration.fromSanity(data, db);
    else if (isVideoEmbed(data)) return VideoEmbed.fromSanity(data);
    else if (isCodeSnippet(data)) return CodeSnippet.fromSanity(data);
    else if (isPolyglotSnippet(data)) return PolyglotSnippet.fromSanity(data, db);
    else if (isGraphVisualisation(data)) return GraphVisualisation.fromSanity(data);
    else throw `Found illustration with illegal document type '${(data as any)._type}'`;
}

/**
 * Transforms an illustration field value in either shape: the current inline object
 * (kind + one content field) or the legacy reference to an illustration document.
 * Returns undefined for an object whose content field is not yet filled in (e.g. a half-edited draft).
 */
export function illustrationFieldValueFromSanity(value: SanityIllustrationFieldValue, db: SanityDataset): Illustration | undefined {
    if (isLegacyIllustrationRef(value)) return illustrationFromSanity(db.resolveRef(value), db);
    switch (value.kind) {
        case "none":
            return undefined;
        case "image":
            return value.image?.asset ? ImageIllustration.fromSanityImageField(value.image, db) : undefined;
        case "code": {
            if (!value.code) return undefined;
            const snippet = db.resolveRef(value.code);
            return isPolyglotSnippet(snippet) ? PolyglotSnippet.fromSanity(snippet, db) : CodeSnippet.fromSanity(snippet);
        }
        case "video":
            return value.video ? VideoEmbed.fromSanity(db.resolveRef(value.video)) : undefined;
        case "graph":
            return value.graph ? GraphVisualisation.fromSanity(db.resolveRef(value.graph)) : undefined;
        case "splitPane":
            return value.splitPane ? SplitPaneIllustration.fromSanity(db.resolveRef(value.splitPane), db) : undefined;
        case "stackDiagram":
            return value.stackDiagram ? StackDiagram.fromSanity(db.resolveRef(value.stackDiagram)) : undefined;
        default:
            return undefined;
    }
}

const imageIllustrationSchema = defineType({
    name: imageIllustrationSchemaName,
    title: "Image",
    icon: ImageIcon,
    type: "document",
    fields: [
        defineField({
            name: "image",
            title: "Image",
            type: "image",
        }),
    ],
    preview: {
        select: { media: "image", assetTitle: "image.asset.title", originalFilename: "image.asset.originalFilename", dimensions: "image.asset.metadata.dimensions" },
        prepare: (selection) => ({
            title: selection.assetTitle || selection.originalFilename,
            subtitle: selection.dimensions ? `Image · ${selection.dimensions.width}x${selection.dimensions.height}` : "Image",
            media: selection.media,
        }),
    },
});

const videoEmbedSchema = defineType({
    name: videoEmbedSchemaName,
    title: "Video (Embed)",
    icon: DocumentVideoIcon,
    type: "document",
    fields: [
        Object.assign({}, titleField, { title: "Description" }),
        defineField({
            name: "url",
            title: "URL",
            type: "slug",
            validation: (rule: SlugRule) => rule.required(),
        }),
    ],
    preview: {
        select: { title: "title", url: "url.current" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: selection.url ? `Video · ${selection.url}` : "Video",
        }),
    },
});

const graphVisualisationSchema = defineType({
    name: graphVisualisationSchemaName,
    title: "Graph Visualisation",
    icon: SunIcon,
    type: "document",
    fields: [
        Object.assign({}, titleField, { title: "Description" }),
        defineField({
            name: "json",
            title: "JSON",
            type: "text",
            description: "See CMS reference materials for the JSON schema",
            validation: (rule: TextRule) => rule.custom(value => {
                if (!value) return "Required";
                try {
                    JSON.parse(value);
                    return true;
                } catch (e) {
                    return "Invalid JSON. You can debug this error using an online JSON validator";
                }
            }),
        }),
    ],
    preview: {
        select: { title: "title", json: "json" },
        prepare: (selection) => {
            let subtitle = "Graph visualisation";
            try {
                const { vertices, edges } = JSON.parse(selection.json);
                subtitle = `Graph · ${vertices?.length ?? 0} vertices, ${edges?.length ?? 0} edges`;
            } catch (e) { /* fall back to the generic subtitle */ }
            return { title: selection.title, subtitle };
        },
    },
});

const splitPaneIllustrationSchema = defineType({
    name: splitPaneIllustrationSchemaName,
    title: "Split Pane",
    icon: SplitVerticalIcon,
    type: "document",
    fields: [
        Object.assign({}, titleField, { title: "Description" }),
        defineField({
            name: "left",
            title: "Left Side Illustration",
            type: "reference",
            to: [{ type: imageIllustrationSchemaName }, { type: codeSnippetSchemaName }, { type: graphVisualisationSchemaName }],
        }),
        defineField({
            name: "right",
            title: "Right Side Illustration",
            type: "reference",
            to: [{ type: imageIllustrationSchemaName }, { type: codeSnippetSchemaName }, { type: graphVisualisationSchemaName }],
        }),
    ],
    preview: {
        select: { title: "title", leftTitle: "left.title", rightTitle: "right.title" },
        prepare: (selection) => ({
            title: selection.title,
            // only image illustrations have no title field
            subtitle: `Split pane · ${selection.leftTitle || "Image"} | ${selection.rightTitle || "Image"}`,
        }),
    },
});

export const illustrationFieldName = "illustration";

export const illustrationFieldTargetTypes = [
    { type: splitPaneIllustrationSchemaName }, { type: imageIllustrationSchemaName }, { type: videoEmbedSchemaName },
    { type: codeSnippetSchemaName }, { type: polyglotSnippetSchemaName }, { type: graphVisualisationSchemaName }
];

const stackDiagramLayerSchema = defineType({
    name: stackDiagramLayerSchemaName,
    title: "Layer",
    icon: StackCompactIcon,
    type: "object",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (rule: StringRule) => rule.required().error("Every layer needs a name"),
        }),
        defineField({
            name: "body",
            title: "Description (optional)",
            type: "string",
            description: "One short line under the name, e.g. 'Where the data still lives'",
            validation: (rule: StringRule) => rule.max(90).warning("Layers read best as a single line"),
        }),
        defineField({
            name: "emphasis",
            type: "string",
            description: "Highlighted marks the layer the comparison turns on. Notional is a layer mapped on top rather than stored, and is outlined instead of filled",
            options: { list: [...stackLayerEmphases], layout: "radio", direction: "horizontal" },
            initialValue: "none",
        }),
    ],
    preview: {
        select: { title: "title", body: "body", emphasis: "emphasis" },
        prepare: ({ title, body, emphasis }) => ({
            title,
            subtitle: [emphasis && emphasis !== "none" ? emphasis : null, body].filter(Boolean).join(" · "),
        }),
    },
});

const stackDiagramColumnSchema = defineType({
    name: stackDiagramColumnSchemaName,
    title: "Column",
    icon: StackCompactIcon,
    type: "object",
    fields: [
        defineField({
            name: "label",
            type: "string",
            description: "The product this stack belongs to, e.g. 'TypeDB'",
            validation: (rule: StringRule) => rule.required().error("Every column needs a label"),
        }),
        defineField({
            name: "subject",
            type: "string",
            description: "Colours the square beside the label; TypeDB's is highlighted",
            options: { list: [...stackSubjects], layout: "radio", direction: "horizontal" },
            initialValue: "neutral",
        }),
        defineField({
            name: "layers",
            type: "array",
            description: "Top of the stack first, e.g. the applications, then what they sit on",
            of: [defineArrayMember({ type: stackDiagramLayerSchemaName })],
            validation: (rule: ArrayRule<unknown[]>) => rule.required().min(1).error("A column needs at least one layer"),
        }),
    ],
    preview: {
        select: { label: "label", subject: "subject", layers: "layers" },
        prepare: ({ label, subject, layers }) => ({
            title: label,
            subtitle: `${subject === "typedb" ? "TypeDB" : subject === "competitor" ? "Competitor" : "Neutral"} · ${(layers || []).length} layers`,
        }),
    },
});

const stackDiagramSchema = defineType({
    name: stackDiagramSchemaName,
    title: "Stack Diagram",
    icon: StackCompactIcon,
    type: "document",
    description: "Two or more stacks side by side, showing where something sits in each product's architecture",
    fields: [
        Object.assign({}, titleField, { title: "Description" }),
        defineField({
            name: "columns",
            type: "array",
            of: [defineArrayMember({ type: stackDiagramColumnSchemaName })],
            validation: (rule: ArrayRule<unknown[]>) => rule.required().min(2).error("A stack diagram compares at least two stacks"),
        }),
        defineField({
            name: "caption",
            title: "Caption (optional)",
            type: "string",
            description: "Shown under the diagram, e.g. 'Where the meaning lives in each'",
            validation: (rule: StringRule) => rule.max(80).warning("Captions read best as a short line"),
        }),
    ],
    preview: {
        select: { title: "title", columns: "columns" },
        prepare: ({ title, columns }) => ({
            title,
            subtitle: `Stack diagram · ${((columns || []) as { label?: string }[]).map((x) => x.label).filter(Boolean).join(" | ")}`,
        }),
    },
});

const illustrationKinds: { title: string; value: IllustrationKind }[] = [
    { title: "None", value: "none" },
    { title: "Image", value: "image" },
    { title: "Code", value: "code" },
    { title: "Video", value: "video" },
    { title: "Graph", value: "graph" },
    { title: "Split Pane", value: "splitPane" },
    { title: "Stack Diagram", value: "stackDiagram" },
];

const illustrationKindTitles = Object.fromEntries(illustrationKinds.map((x) => [x.value, x.title]));

const hiddenUnlessKind = (kind: IllustrationKind) =>
    (ctx: { parent?: SanityIllustrationObject }) => ctx.parent?.kind !== kind;

const illustrationObjectSchema = defineType({
    name: illustrationObjectSchemaName,
    title: "Illustration",
    type: "object",
    fields: [
        defineField({
            name: "kind",
            title: "Content Type",
            type: "string",
            options: { list: illustrationKinds, layout: "radio", direction: "horizontal" },
            initialValue: "image",
            validation: requiredRule,
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            hidden: hiddenUnlessKind("image"),
        }),
        defineField({
            name: "code",
            title: "Code Snippet",
            type: "reference",
            to: [{ type: codeSnippetSchemaName }, { type: polyglotSnippetSchemaName }],
            hidden: hiddenUnlessKind("code"),
        }),
        defineField({
            name: "video",
            title: "Video",
            type: "reference",
            to: [{ type: videoEmbedSchemaName }],
            hidden: hiddenUnlessKind("video"),
        }),
        defineField({
            name: "graph",
            title: "Graph Visualisation",
            type: "reference",
            to: [{ type: graphVisualisationSchemaName }],
            hidden: hiddenUnlessKind("graph"),
        }),
        defineField({
            name: "splitPane",
            title: "Split Pane",
            type: "reference",
            to: [{ type: splitPaneIllustrationSchemaName }],
            hidden: hiddenUnlessKind("splitPane"),
        }),
        defineField({
            name: "stackDiagram",
            title: "Stack Diagram",
            type: "reference",
            to: [{ type: stackDiagramSchemaName }],
            hidden: hiddenUnlessKind("stackDiagram"),
        }),
    ],
    validation: (rule) => rule.custom((value: any) => {
        // absence and an explicit "none" are both valid; field-level required() rules govern presence
        if (!value || !value.kind || value.kind === "none") return true;
        return value[value.kind]
            ? true
            : `Select the content for this ${(illustrationKindTitles[value.kind] || "illustration").toLowerCase()} illustration`;
    }),
    preview: {
        select: {
            kind: "kind", media: "image", imageTitle: "image.asset.title", imageFilename: "image.asset.originalFilename",
            codeTitle: "code.title", videoTitle: "video.title", graphTitle: "graph.title", splitPaneTitle: "splitPane.title",
        },
        prepare: (selection) => ({
            title: selection.imageTitle || selection.imageFilename || selection.codeTitle || selection.videoTitle
                || selection.graphTitle || selection.splitPaneTitle || "No content selected",
            subtitle: illustrationKindTitles[selection.kind] || "Illustration",
            media: selection.media,
        }),
    },
});

export const illustrationField = defineField({
    name: illustrationFieldName,
    title: "Illustration",
    type: illustrationObjectSchemaName,
    options: { collapsible: true, collapsed: false },
    validation: requiredRule,
});

export const illustrationFieldOptional = defineField({
    name: illustrationFieldName,
    title: "Illustration (optional)",
    type: illustrationObjectSchemaName,
    options: { collapsible: true, collapsed: false },
});

export const illustrationSchemas = [
    illustrationObjectSchema, imageIllustrationSchema, videoEmbedSchema, graphVisualisationSchema, splitPaneIllustrationSchema,
    stackDiagramSchema, stackDiagramColumnSchema, stackDiagramLayerSchema,
];
