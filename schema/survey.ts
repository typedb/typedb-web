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
    showHideCondition: QuestionCondition;
}

export interface QuestionOption {
    text: string;
    posthogProperty: string;
}

export type QuestionPresentation = "chips" | "dropdown";

export interface QuestionCondition {
    enabled: boolean;
    showOrHide: ShowOrHide;
    match: MatchType;
    matchingAnswers: MatchingAnswers[];
}

export type ShowOrHide = "show" | "hide";
export type MatchType = "allMatch" | "anyMatch";

export interface MatchingAnswers {
    question: string;
    answers: string[];
}

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

export function multiSelectOtherOptionPosthogProperty(question: MultipleChoiceQuestion, otherOption: string) {
    const sanitisedOption = otherOption.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/,/g, "").replace(/&/g, "");
    return `${question.posthogProperty}__${sanitisedOption}`;
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

export const matchingAnswerSchemaName = "matchingAnswer"

const matchingAnswerSchema = defineType({
    name: matchingAnswerSchemaName,
    title: "Matching answer",
    type: "object",
    fields: [
        defineField({
            name: "question",
            title: "Question",
            description: "The posthogProperty of the question to check",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "validAnswers",
            title: "Valid Answers",
            description: "The posthogProperties of the answers to that question that will trigger the condition",
            type: "array",
            of: [ { type: "string" } ],
            validation: rule => rule.required().min(1)
        }),
    ]
});

export const questionConditionSchemaName = "questionCondition";

const questionConditionSchema = defineType({
    name: questionConditionSchemaName,
    title: "Question Condition",
    type: "object",
    fields: [
        defineField({
            name: "enabled",
            title: "Enabled",
            type: "boolean",
        }),
        defineField({
            name: "showOrHide",
            title: "Show or Hide",
            description: "Whether this condition dictates when to show the question or when to hide it",
            type: "string",
            validation: rule => rule.custom((field, context) => (context.parent?.enabled && field === undefined) ? "This field must be set." : true),
            options: {
                list: [{ title: "Show", value: "show" }, { title: "Hide", value: "hide" }],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "show",
            hidden: (context) => !context.parent?.enabled
        }),
        defineField({
            name: "match",
            title: "Match",
            type: "string",
            validation: rule => rule.custom((field, context) => (context.parent?.enabled && field === undefined) ? "This field must be set." : true),
            options: {
                list: [{ title: "All match", value: "allMatch" }, { title: "Any match", value: "anyMatch" }],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "allMatch",
            hidden: (context) => !context.parent?.enabled
        }),
        defineField({
            name: "matchingAnswers",
            title: "Matching answers",
            type: "array",
            of: [{ type: matchingAnswerSchemaName }],
            hidden: (context) => !context.parent?.enabled
        }),
    ]
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
        defineField({
            name: "showHideCondition",
            title: "Show/Hide condition",
            type: questionConditionSchemaName,
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
            description: "Used by the Cloud Platform website to determine how to render this question. Also used as the PostHog property name.",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "showHideCondition",
            title: "Show/Hide condition",
            type: questionConditionSchemaName,
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
            validation: (rule) => rule.required().custom((questions) => {
                if (!questions) return true;
                const errors = questions!.flatMap((question: any): string[] => {
                    if (!question["showHideCondition"]) return [];
                    const showHideCondition = question.showHideCondition;
                    if (!showHideCondition["enabled"] || !showHideCondition["matchingAnswers"]) return [];

                    return showHideCondition.matchingAnswers.flatMap((matchingAnswer: any): string[] => {
                        const targetQuestion: any | undefined = questions!.find((question: any) => question.posthogProperty === matchingAnswer.question || question.customId === matchingAnswer.question);
                        if (!targetQuestion) return [`Question ${matchingAnswer.question} not found when validating condition for question ${question.posthogProperty}`];
                        if (targetQuestion.customId) return [];

                        return matchingAnswer.validAnswers
                            .filter((validAnswer: any) => !targetQuestion.options.some((option: any) => option.posthogProperty === validAnswer))
                            .map((validAnswer: any) => `Option ${validAnswer} for question ${targetQuestion.posthogProperty} not found when validating condition for question ${question.posthogProperty}`);
                    })
                });
                if (errors.length == 0) return true;
                else return errors.join(", ");
            }),
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

export const surveySchemas = [optionSchema, questionConditionSchema, matchingAnswerSchema, multipleChoiceQuestionSchema, customQuestionSchema, sectionSchema, surveySchema];
