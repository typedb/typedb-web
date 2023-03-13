import { ClipboardIcon } from "@sanity/icons";
import { defineField, defineType, StringRule } from "sanity";

const formEmailOnlySchema = defineType({
    name: "formEmailOnly",
    title: "Simple Form (email only)",
    icon: ClipboardIcon,
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "hubspotFormID",
            title: "Hubspot Form ID",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
    ],
});

export const formSchemas = [formEmailOnlySchema];
