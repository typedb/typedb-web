import { CaseIcon, UsersIcon } from "@sanity/icons";
import { defineField, defineType, ImageRule, SanityDocument } from "@sanity/types";
import { nameField } from "./common-fields";
import { Document, SanityDataset, SanityImage } from "./sanity-core";

const logoFieldName = "logo";

export interface SanityOrganisation extends SanityDocument {
    name: string;
    logo: SanityImage;
}

export class Organisation extends Document {
    readonly name: string;
    readonly logoURL: string;

    constructor(data: SanityOrganisation, db: SanityDataset) {
        super(data);
        this.name = data.name;
        this.logoURL = db.resolveRef(data.logo.asset).url;
    }
}

export const organisationSchemaName = "organisation";

const organisationSchema = defineType({
    name: organisationSchemaName,
    title: "Organisation",
    icon: CaseIcon,
    type: "document",
    fields: [
        nameField,
        defineField({
            name: logoFieldName,
            title: "Logo",
            type: "image",
            validation: (rule: ImageRule) => rule.required(),
        }),
    ],
});

export const organisationLogosField = defineType({
    name: "organisationLogos",
    title: "Organisation Logos",
    icon: UsersIcon,
    type: "array",
    of: [{type: "reference", to: [{type: organisationSchemaName}]}],
});

export const organisationSchemas = [organisationSchema];
