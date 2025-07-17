import { CodeBlockIcon, CodeIcon, DocumentVideoIcon, ImageIcon, SplitVerticalIcon, SunIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, ReferenceRule, SanityDocument, Slug, SlugRule, StringRule, TextRule } from "@sanity/types";
import { CodeSnippet, codeSnippetSchemaName, isCodeSnippet, isPolyglotSnippet, PolyglotSnippet, polyglotSnippetSchemaName, SanityCodeSnippet, SanityPolyglotSnippet } from "./code";
import { titleField } from "./common-fields";
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

export interface SanityIllustrationField {
    illustration: SanityReference<SanityIllustration>;
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

    constructor(data: PropsOf<ImageIllustration>) {
        super({ _id: data.id });
        this.url = data.url;
        this.altText = data.altText;
    }

    static fromSanity(data: SanityImageIllustration, db: SanityDataset): ImageIllustration {
        const imageAsset = db.resolveRef(data.image.asset);
        return new ImageIllustration(Object.assign(new Document(data), {
            url: imageAsset.url,
            altText: imageAsset.altText || "",
        }));
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
        select: { assetTitle: "image.asset.title", originalFilename: "image.asset.originalFilename", dimensions: "image.asset.metadata.dimensions" },
        prepare: (selection) => ({
            title: selection.assetTitle || selection.originalFilename,
            subtitle: `${selection.dimensions.width}x${selection.dimensions.height}`,
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
});

export const illustrationFieldName = "illustration";

export const illustrationFieldTargetTypes = [
    { type: splitPaneIllustrationSchemaName }, { type: imageIllustrationSchemaName }, { type: videoEmbedSchemaName },
    { type: codeSnippetSchemaName }, { type: polyglotSnippetSchemaName }, { type: graphVisualisationSchemaName }
];

export const illustrationField = defineField({
    name: illustrationFieldName,
    title: "Illustration",
    type: "reference",
    to: illustrationFieldTargetTypes,
    validation: (rule: ReferenceRule) => rule.required(),
});

export const illustrationFieldOptional = defineField({
    name: illustrationFieldName,
    title: "Illustration (optional)",
    type: "reference",
    to: illustrationFieldTargetTypes,
});

export const illustrationSchemas = [imageIllustrationSchema, videoEmbedSchema, graphVisualisationSchema, splitPaneIllustrationSchema];
