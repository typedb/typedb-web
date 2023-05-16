import { CodeBlockIcon, CodeIcon, DocumentVideoIcon, ImageIcon, SplitVerticalIcon, SunIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, Image, ImageAsset, SanityDocument, Slug, SlugRule, StringRule, TextRule } from "@sanity/types";
import { titleField } from "./common-fields";
import { Document, SanityDataset, SanityReference } from "./sanity-core";
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
    image: Image;
}

export interface SanityVideoEmbed extends SanityDocument {
    url: Slug;
}

type Language = "typeql" | "typedb-console" | "rust" | "java" | "python" | "typescript" | "sql" | "cypher";

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

export interface SanitySplitPaneIllustration {
    left: SanityReference<SanitySplitPaneIllustrationContent>;
    right: SanityReference<SanitySplitPaneIllustrationContent>;
}

export function isImageIllustration(doc: SanityDocument): doc is SanityImageIllustration {
    return doc._type === imageIllustrationSchemaName;
}

export function isCodeSnippet(doc: SanityDocument): doc is SanityCodeSnippet {
    return doc._type === codeSnippetSchemaName;
}

export function isGraphVisualisation(doc: SanityDocument): doc is SanityGraphVisualisation {
    return doc._type === graphVisualisationSchemaName;
}

export class ImageIllustration extends Document {
    readonly url: string;

    constructor(data: PropsOf<ImageIllustration>) {
        super({ _id: data.id });
        this.url = data.url;
    }

    static fromSanity(data: SanityImageIllustration, db: SanityDataset): ImageIllustration {
        return new ImageIllustration(Object.assign(new Document(data), { url: db.resolveRef<ImageAsset>(data.image.asset!).url }));
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

const imageIllustrationSchema = defineType({
    name: imageIllustrationSchemaName,
    title: "Image",
    icon: ImageIcon,
    type: "document",
    fields: [
        titleField,
        defineField({
            name: "image",
            title: "Image",
            type: "image",
        }),
    ],
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
                list: [
                    { title: "TypeQL", value: "typeql" },
                    { title: "Console", value: "typedb-console" },
                    { title: "Rust", value: "rust" },
                    { title: "Java", value: "java" },
                    { title: "Python", value: "python" },
                    { title: "TypeScript", value: "typescript" },
                ],
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

const jsonFieldDescription =
`
Root element: { "vertices": [], "edges": [] }

Vertex: { "id": number, "label": string, "encoding": "entity" | "attribute" | "relation", "x": number, "y": number }

Edge: { "source": number, "target": number, "label": string, "highlight": "inferred" | "error" }

Example:
{
    "vertices": [{
        "id": 1,
        "label": "person",
        "encoding": "entity",
        "x": 50,
        "y": 20
    }, {
        "id": 2,
        "label": "name",
        "encoding": "attribute",
        "x": 50,
        "y": 80
    }],
    "edges": [{
        "source": 1,
        "target": 2,
        "label": "owns"
    }]
}
`;

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
            description: jsonFieldDescription,
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
