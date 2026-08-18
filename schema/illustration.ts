import { CodeBlockIcon, CodeIcon, DocumentVideoIcon, ImageIcon, SplitVerticalIcon, SunIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, ReferenceRule, SanityDocument, Slug, SlugRule, StringRule, TextRule } from "@sanity/types";
import { CodeSnippet, isCodeSnippet, isPolyglotSnippet, PolyglotSnippet, SanityCodeSnippet, SanityPolyglotSnippet } from "./code";
import { codeSnippetSchemaName, polyglotSnippetSchemaName, requiredRule, titleField } from "./common-fields";
import { Document, SanityDataset, SanityImage, SanityReference } from "./sanity-core";
import { PropsOf } from "./util";

export const imageIllustrationSchemaName = "imageIllustration";
export const videoEmbedSchemaName = "videoEmbed";
export const graphVisualisationSchemaName = "graphVisualisation";
export const splitPaneIllustrationSchemaName = "splitPaneIllustration";

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

export type SanityIllustration = SanityImageIllustration | SanityVideoEmbed | SanityCodeSnippet | SanityPolyglotSnippet | SanityGraphVisualisation | SanitySplitPaneIllustration;

export const illustrationObjectSchemaName = "illustration";

export type IllustrationKind = "none" | "image" | "code" | "video" | "graph" | "splitPane";

export interface SanityIllustrationObject {
    _type: typeof illustrationObjectSchemaName;
    kind: IllustrationKind;
    image?: SanityImage;
    code?: SanityReference<SanityCodeSnippet | SanityPolyglotSnippet>;
    video?: SanityReference<SanityVideoEmbed>;
    graph?: SanityReference<SanityGraphVisualisation>;
    splitPane?: SanityReference<SanitySplitPaneIllustration>;
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

export type Illustration = ImageIllustration | VideoEmbed | CodeSnippet | PolyglotSnippet | GraphVisualisation | SplitPaneIllustration;

export function illustrationFromSanity(data: SanityIllustration, db: SanityDataset): Illustration {
    if (isSplitPaneIllustration(data)) return SplitPaneIllustration.fromSanity(data, db);
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

const illustrationKinds: { title: string; value: IllustrationKind }[] = [
    { title: "None", value: "none" },
    { title: "Image", value: "image" },
    { title: "Code", value: "code" },
    { title: "Video", value: "video" },
    { title: "Graph", value: "graph" },
    { title: "Split Pane", value: "splitPane" },
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

export const illustrationSchemas = [illustrationObjectSchema, imageIllustrationSchema, videoEmbedSchema, graphVisualisationSchema, splitPaneIllustrationSchema];
