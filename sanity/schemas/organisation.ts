import { CaseIcon } from "@sanity/icons";
import { defineField, defineType, StringRule } from "sanity";

export const organisationSchema = defineType({
    name: "organisation",
    title: "Organisation",
    icon: CaseIcon,
    type: "object",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
        }),
    ],
});
