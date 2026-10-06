import { CaseIcon, UsersIcon } from "@sanity/icons";
import { defineField, defineType, ImageRule, SanityDocument } from "@sanity/types";
import { collapsibleOptions, nameField } from "./common-fields";
import { Document, SanityDataset, SanityImage } from "./sanity-core";

const logoFieldName = "logo";

export interface SanityOrganisation extends SanityDocument {
    name: string;
    logo: SanityImage;
    logoScale?: number;
}

export class Organisation extends Document {
    readonly name: string;
    readonly logoURL: string;
    /** Width / height of the logo image, used to balance logos of different shapes; undefined if unknown */
    readonly logoAspectRatio?: number;
    /** Multiplier on the balanced logo size, for logos with lots of empty space (e.g. a multi-part lockup) */
    readonly logoScale: number;

    constructor(data: SanityOrganisation, db: SanityDataset) {
        super(data);
        const asset = db.resolveRef(data.logo.asset);
        const dimensions = asset.metadata?.dimensions;
        this.name = data.name;
        this.logoURL = asset.url;
        this.logoAspectRatio = dimensions?.width && dimensions?.height ? dimensions.width / dimensions.height : undefined;
        this.logoScale = data.logoScale || 1;
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
        defineField({
            name: "logoScale",
            title: "Logo size adjustment (optional)",
            type: "number",
            description: "Logos are sized automatically by shape so they look balanced in a row. Use e.g. 1.5 to "
                + "enlarge one with lots of empty space, or 0.8 to shrink one that looks heavy. Leave empty for 1",
            validation: (rule) => rule.min(0.5).max(2).error("Use a value between 0.5 and 2"),
        }),
    ],
});

export const organisationLogosField = defineField({
    name: "organisationLogos",
    title: "Organisation Logos",
    icon: UsersIcon,
    type: "array",
    of: [{type: "reference", to: [{type: organisationSchemaName}]}],
});

export const organisationSchemas = [organisationSchema];
