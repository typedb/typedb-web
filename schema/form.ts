import { ClipboardIcon } from "@sanity/icons";
import { defineField, defineType, StringRule } from "@sanity/types";
import { nameField } from "./common-fields";

const formEmailOnlySchema = defineType({
    name: "formEmailOnly",
    title: "Simple Form (email only)",
    icon: ClipboardIcon,
    type: "document",
    fields: [
        nameField,
        defineField({
            name: "hubspotFormID",
            title: "Hubspot Form ID",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
    ],
});

export const formSchemas = [formEmailOnlySchema];
