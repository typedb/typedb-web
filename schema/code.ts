import { CodeBlockIcon, CodeIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, SanityDocument, StringRule, TextRule } from "@sanity/types";
import { requiredRule, titleField } from "./common-fields";
import { Link, SanityLink, textLinkSchema } from "./link";
import { Document, SanityDataset, SanityReference } from "./sanity-core";
import { PropsOf } from "./util";

export const codeSnippetSchemaName = "codeSnippet";
export const codeSnippetShortSchemaName = "codeSnippetShort";
export const polyglotSnippetSchemaName = "polyglotSnippet";

export function isCodeSnippetShort(doc: SanityDocument): doc is SanityCodeSnippet {
    return doc._type === codeSnippetShortSchemaName;
}

export function isCodeSnippet(doc: SanityDocument): doc is SanityCodeSnippet {
    return doc._type === codeSnippetSchemaName;
}

export function isPolyglotSnippet(doc: SanityDocument): doc is SanityPolyglotSnippet {
    return doc._type === polyglotSnippetSchemaName;
}

export const languages = {
    "typeql": "TypeQL",
    "sql": "SQL",
    "cypher": "Cypher",
    "typedb-console": "Console",
    "bash": "Bash",
    "rust": "Rust",
    "java": "Java",
    "python": "Python",
    "typescript": "TypeScript",
} as const;

export type Language = keyof typeof languages;

export interface SanityCodeSnippet extends SanityDocument {
    language: Language;
    code: string;
}

export interface SanityPolyglotSnippet extends SanityDocument {
    snippets: SanityCodeSnippet[];
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

export class CodeSnippetShort extends Document {
    readonly language: Language;
    readonly code: string;

    constructor(data: PropsOf<CodeSnippetShort>) {
        super({ _id: data.id });
        this.language = data.language;
        this.code = data.code;
    }

    static fromSanity(data: SanityCodeSnippet): CodeSnippetShort {
        return new CodeSnippetShort(Object.assign(new Document(data), { language: data.language, code: data.code }));
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

const snippetTitleField = Object.assign({}, titleField, { title: "Description" });

const languageField = defineField({
    name: "language",
    title: "Language",
    type: "string",
    description: "N.B. For MongoDB query language, select TypeScript",
    options: {
        layout: "dropdown",
        list: Object.entries(languages).map(([id, displayName]) => ({ title: displayName, value: id })),
    },
    initialValue: "typeql",
    validation: requiredRule,
});

const codeField = defineField({
    name: "code",
    title: "Code",
    type: "text",
    validation: requiredRule,
});

const codeSnippetSchema = defineType({
    name: codeSnippetSchemaName,
    title: "Code Snippet",
    icon: CodeIcon,
    type: "document",
    fields: [
        snippetTitleField,
        languageField,
        codeField,
    ],
});

const codeSnippetShortSchema = defineField({
    name: codeSnippetShortSchemaName,
    title: "Code Snippet (short)",
    icon: CodeIcon,
    type: "document",
    fields: [
        snippetTitleField,
        languageField,
        codeField,
    ]
});

const polyglotSnippetSchema = defineType({
    name: polyglotSnippetSchemaName,
    title: "Polyglot Code Snippet",
    icon: CodeBlockIcon,
    type: "document",
    fields: [
        snippetTitleField,
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

export const codeSchemas = [codeSnippetShortSchema, codeSnippetSchema, polyglotSnippetSchema];
