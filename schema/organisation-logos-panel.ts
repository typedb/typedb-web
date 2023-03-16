import { UsersIcon } from "@sanity/icons";
import { Asset, defineField, defineType, SanityDocument } from "@sanity/types";
import { nameField } from "./common-fields";
import { Document } from "./document";
import { SanityOrganisation } from "./organisation";
import { SanityDataset } from "./sanity-core";
import { sanitySchemaName } from "./util";

const organisationsFieldName = "organisations";

export interface SanityOrganisationLogosPanel extends SanityDocument {
    organisations: SanityOrganisation[]
}

export class OrganisationLogosPanel extends Document {
    readonly logoURLs: string[];

    constructor(data: SanityOrganisationLogosPanel, db: SanityDataset) {
        super(data);
        this.logoURLs = data[organisationsFieldName].map(x => db.resolveReference<Asset>(x.logo.asset!).url);
    }
}

export const organisationLogosPanelSchema = defineType({
    name: sanitySchemaName(OrganisationLogosPanel),
    title: "Panel of Organisation Logos",
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
});
