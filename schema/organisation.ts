import { CaseIcon } from "@sanity/icons";
import { defineField, defineType, Image, SanityDocument } from "@sanity/types";
import { nameField } from "./common-fields";

const logoFieldName = "logo";

export interface SanityOrganisation extends SanityDocument {
    name: string;
    logo: Image;
}

export const organisationSchema = defineType({
    name: "organisation",
    title: "Organisation",
    icon: CaseIcon,
    type: "object",
    fields: [
        nameField,
        defineField({
            name: logoFieldName,
            title: "Logo",
            type: "image",
        }),
    ],
});
