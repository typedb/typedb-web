import { UlistIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType } from "@sanity/types";
import { bodyFieldRichText, nameField, titleField } from "./common-fields";

const keyPointSchema = defineType({
    name: "keyPoint",
    title: "Key Point",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        // TODO
        // defineField({
        //     name: "icon",
        //     type: ???
        // }),
    ]
});

const keyPointListSchema = defineType({
    name: "keyPointList",
    title: "List of Key Points",
    icon: UlistIcon,
    type: "document",
    fields: [
        nameField,
        defineField({
            name: "keyPoints",
            type: "array",
            of: [{type: "keyPoint"}],
            validation: (rule: ArrayRule<any>) => rule.required(),
        }),
    ],
});

export const keyPointSchemas = [keyPointSchema, keyPointListSchema];
