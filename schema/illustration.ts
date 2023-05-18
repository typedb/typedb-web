import { CodeBlockIcon, CodeIcon, DocumentVideoIcon, ImageIcon, SplitVerticalIcon, SunIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, SanityDocument, Slug, SlugRule, StringRule, TextRule } from "@sanity/types";
import { titleField } from "./common-fields";
import { Document, SanityDataset, SanityImage, SanityReference } from "./sanity-core";
import { PropsOf } from "./util";
import Vertex = GraphVisualisation.Vertex;
import Edge = GraphVisualisation.Edge;

export const imageIllustrationSchemaName = "imageIllustration";
export const videoEmbedSchemaName = "videoEmbed";
export const codeSnippetSchemaName = "codeSnippet";
export const polyglotSnippetSchemaName = "polyglotSnippet";
export const graphVisualisationSchemaName = "graphVisualisation";
export const splitPaneIllustrationSchemaName = "splitPaneIllustration";

interface SanityImageIllustration extends SanityDocument {
    image: SanityImage;
}

export interface SanityVideoEmbed extends SanityDocument {
    url: Slug;
}

export const languages = {
    "typeql": "TypeQL",
    "typedb-console": "Console",
    "rust": "Rust",
    "java": "Java",
    "python": "Python",
    "typescript": "TypeScript",
} as const;

export type Language = keyof typeof languages;

interface SanityCodeSnippet extends SanityDocument {
    language: Language;
    code: string;
}

interface SanityPolyglotSnippet extends SanityDocument {
    snippets: SanityCodeSnippet[];
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

export function isImageIllustration(doc: SanityDocument): doc is SanityImageIllustration {
    return doc._type === imageIllustrationSchemaName;
}

export function isVideoEmbed(doc: SanityDocument): doc is SanityVideoEmbed {
    return doc._type === videoEmbedSchemaName;
}

export function isCodeSnippet(doc: SanityDocument): doc is SanityCodeSnippet {
    return doc._type === codeSnippetSchemaName;
}

export function isPolyglotSnippet(doc: SanityDocument): doc is SanityPolyglotSnippet {
    return doc._type === polyglotSnippetSchemaName;
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

export class CodeSnippet extends Document {
    readonly language: Language;
    readonly code: string;

    constructor(data: PropsOf<CodeSnippet>) {
        super({ _id: data.id });
        this.language = data.language;
        this.code = data.code;
    }

    static fromSanity(data: SanityCodeSnippet): CodeSnippet {
        return new CodeSnippet(Object.assign(new Document(data), { language: data.language, code: data.code }));
    }
}

export class PolyglotSnippet extends Document {
    readonly snippets: CodeSnippet[];

    constructor(data: PropsOf<PolyglotSnippet>) {
        super({ _id: data.id });
        this.snippets = data.snippets;
    }

    static fromSanity(data: SanityPolyglotSnippet): PolyglotSnippet {
        return new PolyglotSnippet(Object.assign(new Document(data), { snippets: data.snippets.map(x => CodeSnippet.fromSanity(x)) }));
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
    else if (isPolyglotSnippet(data)) return PolyglotSnippet.fromSanity(data);
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

const codeSnippetSchema = defineType({
    name: codeSnippetSchemaName,
    title: "Code Snippet",
    icon: CodeIcon,
    type: "document",
    fields: [
        Object.assign({}, titleField, { title: "Description" }),
        defineField({
            name: "language",
            title: "Language",
            type: "string",
            options: {
                layout: "dropdown",
                list: Object.entries(languages).map(([id, displayName]) => ({ title: displayName, value: id })),
            },
            initialValue: "typeql",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "code",
            title: "Code",
            type: "text",
            validation: (rule: TextRule) => rule.required(),
        }),
    ],
});

const polyglotSnippetSchema = defineType({
    name: polyglotSnippetSchemaName,
    title: "Polyglot Code Snippet",
    icon: CodeBlockIcon,
    type: "document",
    fields: [
        Object.assign({}, titleField, { title: "Description" }),
        defineField({
            name: "snippets",
            title: "Snippets",
            type: "array",
            of: [{ type: codeSnippetSchemaName }],
            validation: (rule: ArrayRule<SanityCodeSnippet[]>) => rule.custom((snippets) => {
                if (!snippets) return "Required";
                const langs = new Set<string>();
                for (const snippet of snippets) {
                    if (langs.has(snippet.language)) return `Language '${snippet.language}' is used more than once`;
                    langs.add(snippet.language);
                }
                return true;
            }),
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

export const illustrationField = defineField({
    name: illustrationFieldName,
    title: "Illustration",
    type: "reference",
    to: [
        { type: splitPaneIllustrationSchemaName }, { type: imageIllustrationSchemaName }, { type: videoEmbedSchemaName },
        { type: codeSnippetSchemaName }, { type: polyglotSnippetSchemaName }, { type: graphVisualisationSchemaName }
    ],
});

export const illustrationSchemas = [imageIllustrationSchema, videoEmbedSchema, codeSnippetSchema, polyglotSnippetSchema, graphVisualisationSchema, splitPaneIllustrationSchema];
