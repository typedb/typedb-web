import { CaseIcon, UsersIcon } from "@sanity/icons";
import { Asset, defineField, defineType, Image, SanityDocument } from "@sanity/types";
import { nameField } from "./common-fields";
import { SanityDataset } from "./sanity-core";
import { Document } from "./sanity-core/document";

const logoFieldName = "logo";

export interface SanityOrganisation extends SanityDocument {
    name: string;
    logo: Image;
}

export class Organisation extends Document {
    readonly name: string;
    readonly logoURL: string;

    constructor(data: SanityOrganisation, db: SanityDataset) {
        super(data);
        this.name = data.name;
        this.logoURL = db.resolveRef<Asset>(data.logo.asset!).url;
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
