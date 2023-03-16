import { BlockContentIcon } from "@sanity/icons";
import { ArrayRule, defineField, StringRule } from "@sanity/types";

export const nameFieldName = "name";

export const nameField = defineField({
    name: "name",
    title: "Name",
    type: "string",
    validation: (rule: StringRule) => rule.required(),
});

export const titleFieldName = "title";

export const titleField = defineField({
    name: "title",
    title: "Title",
    type: "string",
    validation: (rule: StringRule) => rule.required(),
});

export const bodyFieldName = "body";

export const bodyFieldRichText = defineField({
    name: "body",
    type: "array",
    icon: BlockContentIcon,
    of: [{type: "block"}],
    validation: (rule: ArrayRule<any>) => rule.required(),
});
