import { OlistIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, ObjectRule, SanityDocument } from "@sanity/types";
import { descriptionField, nameField, nameFieldOptional, requiredRule } from "./common-fields";
import { PropsOf } from "./util";

export interface SanitySurvey extends SanityDocument {
    name: string;
    description?: string;
    posthogConfig: SanityPosthogConfig;
    sections: SurveySection[];
}

interface SanityPosthogConfig {
    developmentId: string;
    productionId: string;
}

export interface SurveySection {
    name?: string;
    questions: SurveyQuestion[];
}

export interface SurveyQuestion {
    body: string;
    isMultiSelect: boolean;
    options: string[];
    hasOpenEndedOption: boolean;
    presentation: SurveyQuestionPresentation;
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

export const posthogConfigSchemaName = "surveyPosthogConfig";

const posthogConfigSchema = defineType({
    name: posthogConfigSchemaName,
    title: "PostHog Configuration",
    type: "object",
    fields: [
        defineField({
            name: "developmentId",
            title: "ID (development)",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "productionId",
            title: "ID (production)",
            type: "string",
            validation: requiredRule,
        }),
    ],
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
            of: [{ type: "string" }],
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
            name: "posthogConfig",
            title: "PostHog Configuration",
            type: posthogConfigSchemaName,
            validation: requiredRule,
        }),
        defineField({
            name: "sections",
            title: "Sections",
            type: "array",
            of: [{ type: sectionSchemaName }],
            validation: requiredRule,
        }),
    ],
});

export const surveySchemas = [posthogConfigSchema, questionSchema, sectionSchema, surveySchema];
