import { OlistIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, ObjectRule, SanityDocument, StringRule } from "@sanity/types";
import { descriptionField, nameField, nameFieldOptional, requiredRule } from "./common-fields";
import { PropsOf } from "./util";

export interface SanitySurvey extends SanityDocument {
    name: string;
    description?: string;
    sections: SurveySection[];
}

export interface SurveySection {
    name?: string;
    questions: SurveyQuestion[];
}

export interface SurveyQuestion {
    body: string;
    isMultiSelect: boolean;
    options: SurveyQuestionOption[];
    hasOpenEndedOption: boolean;
    presentation: SurveyQuestionPresentation;
    posthogProperty: string;
}

export interface SurveyQuestionOption {
    text: string;
    posthogProperty: string;
}

export type SurveyQuestionPresentation = "chips" | "dropdown";

export class Survey {
    readonly sections: SurveySection[];

    constructor(data: PropsOf<Survey>) {
        this.sections = data.sections;
    }

    static fromSanity(data: SanitySurvey) {
        return new Survey({ sections: data.sections });
    }
}

export function multiSelectOptionPosthogProperty(question: SurveyQuestion, option: SurveyQuestionOption) {
    return `${question.posthogProperty}__${option.posthogProperty}`;
}

export function openEndedFieldPosthogProperty(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/,/g, "").replace(/&/g, "");
}

export const optionSchemaName = "surveyQuestionOption";

const optionSchema = defineType({
    name: optionSchemaName,
    title: "Option",
    type: "object",
    fields: [
        defineField({
            name: "text",
            title: "Text",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "posthogProperty",
            title: "PostHog Property",
            description: "e.g. machine_learning",
            type: "string",
            validation: (rule: StringRule) => rule.custom((value) => {
                if (!value) return "Required";
                if (!/^[a-z0-9_]*$/.test(value)) return "Must consist of lowercase letters, numbers and underscores";
                return true;
            }),
        }),
    ],
    preview: {
        select: { text: "text", posthogProperty: "posthogProperty" },
        prepare: (selection) => ({ title: selection.text, subtitle: selection.posthogProperty || "" }),
    },
});

export const questionSchemaName = "surveyQuestion";

const questionSchema = defineType({
    name: questionSchemaName,
    title: "Survey Question",
    type: "object",
    fields: [
        defineField({
            name: "body",
            title: "Body",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "isMultiSelect",
            title: "Is Multi-Select",
            type: "boolean",
            validation: requiredRule,
            initialValue: false,
        }),
        defineField({
            name: "options",
            title: "Options",
            type: "array",
            of: [{ type: optionSchemaName }],
            validation: (rule: ArrayRule<any>) => rule.required().min(2),
        }),
        defineField({
            name: "hasOpenEndedOption",
            title: "Has Open-Ended Option",
            type: "boolean",
            validation: requiredRule,
            initialValue: false,
        }),
        defineField({
            name: "presentation",
            title: "Presentation",
            type: "string",
            validation: requiredRule,
            options: {
                list: [{ title: "Chips", value: "chips" }, { title: "Dropdown", value: "dropdown" }],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "chips",
        }),
        defineField({
            name: "posthogProperty",
            title: "PostHog Property",
            description: "e.g. cloud_onboarding_why_typedb_cloud",
            type: "string",
            validation: (rule: StringRule) => rule.custom((value) => {
                if (!value) return "Required";
                if (!/^[a-z0-9_]*$/.test(value)) return "Must consist of lowercase letters, numbers and underscores";
                return true;
            }),
        }),
    ],
    validation: (rule: ObjectRule) => rule.custom((obj) => {
        if (!obj) return true;
        if (obj["hasOpenEndedOption"] && obj["presentation"] !== "chips") return `An open-ended option is only supported when presentation is set to 'chips'`;
        return true;
    }),
});

const sectionSchemaName = "surveySection";

const sectionSchema = defineType({
    name: sectionSchemaName,
    title: "Survey Section",
    type: "object",
    fields: [
        nameFieldOptional,
        defineField({
            name: "questions",
            title: "Questions",
            type: "array",
            of: [{ type: questionSchemaName }],
            validation: requiredRule,
        }),
    ],
});

export const surveySchemaName = "survey";

const surveySchema = defineType({
    name: surveySchemaName,
    title: "Survey",
    type: "document",
    icon: OlistIcon,
    fields: [
        nameField,
        descriptionField,
        defineField({
            name: "sections",
            title: "Sections",
            type: "array",
            of: [{ type: sectionSchemaName }],
            validation: requiredRule,
        }),
    ],
});

export const surveySchemas = [optionSchema, questionSchema, sectionSchema, surveySchema];
