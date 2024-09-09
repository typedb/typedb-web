import { EarthAmericasIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { nameField, requiredRule } from "../common-fields";

export const continentSchemaName = "continent";
export const countrySchemaName = "country";

const continentSchema = defineType({
    name: continentSchemaName,
    title: "Continent",
    icon: EarthAmericasIcon,
    type: "document",
    fields: [
        nameField,
        defineField({
            name: "ordinal",
            title: "Ordinal",
            description: "Lower ordinals are displayed first in lists",
            type: "number",
            validation: requiredRule,
        }),
    ],
});

const countrySchema = defineType({
    name: countrySchemaName,
    title: "Country",
    icon: EarthAmericasIcon,
    type: "document",
    fields: [
        nameField,
        defineField({
            name: "code",
            title: "Code",
            description: "e.g. 'GB'",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "continent",
            title: "Continent",
            type: "reference",
            to: [{ type: continentSchemaName }],
            validation: requiredRule,
        }),
    ],
});

export const geographySchemas = [continentSchema, countrySchema];
