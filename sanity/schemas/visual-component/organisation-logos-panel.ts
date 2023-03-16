import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const organisationLogosPanelSchema = defineType({
    name: "organisationLogosPanel",
    title: "Panel of Organisation Logos",
    description: "Typically used to showcase users of a particular product, e.g. TypeDB",
    icon: UsersIcon,
    type: "document",
    fields: [
        defineField({
            name: "name",
            type: "string",
        }),
        defineField({
            name: "organisations",
            type: "array",
            of: [{"type": "organisation"}],
        }),
    ],
});
