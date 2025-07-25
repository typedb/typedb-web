import { CodeBlockIcon, CodeIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, SanityDocument } from "@sanity/types";
import { requiredRule, titleField } from "./common-fields";
import { Document } from "./sanity-core";
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
    "cpp": "C++",
    "csharp": "C#",
} as const;

export type Language = keyof typeof languages;

export interface SanityCodeSnippet extends SanityDocument {
    tabText?: string;
    language: Language;
    code: string;
}

export interface SanityPolyglotSnippet extends SanityDocument {
    snippets: SanityCodeSnippet[];
}

export class CodeSnippet extends Document {
    readonly tabText?: string;
    readonly language: Language;
    readonly code: string;

    constructor(data: PropsOf<CodeSnippet>) {
        super({ _id: data.id });
        this.tabText = data.tabText;
        this.language = data.language;
        this.code = data.code;
    }

    static fromSanity(data: SanityCodeSnippet): CodeSnippet {
        return new CodeSnippet(Object.assign(new Document(data), {
            tabText: data.tabText,
            language: data.language,
            code: data.code,
        }));
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

const snippetTitleField = Object.assign({}, titleField, { title: "Description", description: "Internal use only - not visible to users" });

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
        defineField({
            name: "tabText",
            title: "Tab Text",
            description: "Only displayed within a polyglot snippet; defaults to language name",
            type: "string",
        }),
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
            validation: requiredRule,
        }),
    ],
});

export const codeSchemas = [codeSnippetShortSchema, codeSnippetSchema, polyglotSnippetSchema];
