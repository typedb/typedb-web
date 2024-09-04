import { OlistIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, ObjectRule, SanityDocument, StringRule } from "@sanity/types";
import { nameField, requiredRule } from "./common-fields";
import { PropsOf } from "./util";

export interface SanitySurvey extends SanityDocument {
    name: string;
    sections: SurveySection[];
}

export interface SurveySection {
    name: string;
    questions: SurveyQuestion[];
}

export type SurveyQuestion = MultipleChoiceQuestion | CustomQuestion;

export interface MultipleChoiceQuestion {
    _type: typeof multipleChoiceQuestionSchemaName;
    body: string;
    isMultiSelect: boolean;
    options: QuestionOption[];
    hasOpenEndedOption: boolean;
    presentation: QuestionPresentation;
    posthogProperty: string;
}

export interface QuestionOption {
    text: string;
    posthogProperty: string;
}

export type QuestionPresentation = "chips" | "dropdown";

export interface CustomQuestion {
    _type: typeof customQuestionSchemaName;
    body: string;
    customId: string;
}

export function isMultipleChoiceQuestion(question: SurveyQuestion): question is MultipleChoiceQuestion {
    return question._type === multipleChoiceQuestionSchemaName;
}

export function isCustomQuestion(question: SurveyQuestion): question is CustomQuestion {
    return question._type === customQuestionSchemaName;
}

export class Survey {
    readonly sections: SurveySection[];

    constructor(data: PropsOf<Survey>) {
        this.sections = data.sections;
    }

    static fromSanity(data: SanitySurvey) {
        return new Survey({ sections: data.sections });
    }
}

export function multiSelectOptionPosthogProperty(question: MultipleChoiceQuestion, option: QuestionOption) {
    return `${question.posthogProperty}__${option.posthogProperty}`;
}

export function multiSelectOpenEndedPosthogProperty(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/,/g, "").replace(/&/g, "");
}

export const optionSchemaName = "questionOption";

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

export const multipleChoiceQuestionSchemaName = "multipleChoiceQuestion";

const multipleChoiceQuestionSchema = defineType({
    name: multipleChoiceQuestionSchemaName,
    title: "Multiple Choice Question",
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
            description: "e.g. job_title",
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
    preview: {
        select: { body: "body", isMultiSelect: "isMultiSelect" },
        prepare: (selection) => ({
            title: selection.body,
            subtitle: selection.isMultiSelect ? "Multi-select" : "Single select"
        }),
    },
});

export const customQuestionSchemaName = "customQuestion";

const customQuestionSchema = defineType({
    name: customQuestionSchemaName,
    title: "Custom Question",
    type: "object",
    fields: [
        defineField({
            name: "body",
            title: "Body",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "customId",
            title: "Custom ID",
            description: "Used by the Cloud Platform website to determine how to render this question",
            type: "string",
            validation: requiredRule,
        }),
    ],
    preview: {
        select: { body: "body", customId: "customId" },
        prepare: (selection) => ({ title: selection.body, subtitle: `Custom (${selection.customId})` }),
    },
});

const sectionSchemaName = "surveySection";

const sectionSchema = defineType({
    name: sectionSchemaName,
    title: "Survey Section",
    type: "object",
    fields: [
        nameField,
        defineField({
            name: "questions",
            title: "Questions",
            type: "array",
            of: [{ type: multipleChoiceQuestionSchemaName }, { type: customQuestionSchemaName }],
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
        defineField({
            name: "sections",
            title: "Sections",
            type: "array",
            of: [{ type: sectionSchemaName }],
            validation: requiredRule,
        }),
    ],
});

export const surveySchemas = [optionSchema, multipleChoiceQuestionSchema, customQuestionSchema, sectionSchema, surveySchema];
