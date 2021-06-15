export const languageNames = {
    "typeql": "TypeQL",
    "java": "Java",
    "python": "Python",
    "nodejs": "Node.js",
    "console": "Console",
} as const;

export type Language = keyof typeof languageNames;

export type LanguageDisplayName = typeof languageNames[keyof typeof languageNames];

export interface Code {
    language: Language;
    body: string;
}
