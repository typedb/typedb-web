import { UsersIcon } from "@sanity/icons";
import { Asset, defineField, defineType, SanityDocument } from "@sanity/types";
import { nameField } from "./common-fields";
import { SanityOrganisation } from "./organisation";
import { SanityDataset } from "./sanity-core";
import { Document } from "./sanity-core/document";
import { schemaName } from "./util";

const organisationsFieldName = "organisations";

export interface SanityOrganisationLogosStrip extends SanityDocument {
    organisations: SanityOrganisation[]
}

export class OrganisationLogosStrip extends Document {
    readonly logoURLs: string[];

    constructor(data: SanityOrganisationLogosStrip, db: SanityDataset) {
        super(data);
        this.logoURLs = data[organisationsFieldName].map(x => db.resolveReference<Asset>(x.logo.asset!).url);
    }
}

export const organisationLogosStripSchemaName = schemaName(OrganisationLogosStrip);

export const organisationLogosStripSchema = defineType({
    name: organisationLogosStripSchemaName,
    title: "Strip of Organisation Logos",
    description: "Typically used to showcase users of a particular product, e.g. TypeDB",
    icon: UsersIcon,
    type: "document",
    fields: [
        nameField,
        defineField({
            name: "organisations",
            type: "array",
            of: [{"type": "organisation"}],
        }),
    ],
    preview: {
        select: { name: "name" },
        prepare: (selection) => ({ title: selection.name, subtitle: "Strip of Organisation Logos" }),
    },
});

export const organisationLogosStripField = defineType({
    name: "organisationLogos",
    title: "Organisation Logos",
    type: schemaName(OrganisationLogosStrip),
});
