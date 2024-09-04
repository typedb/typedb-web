import { EarthAmericasIcon, EarthGlobeIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { nameField, requiredRule } from "../common-fields";
import { countrySchemaName } from "./geography";

export const providerRegionsQuery =
    `{
  "providers": *[_type == 'cloudProvider']{
    name,
    "id": id.current,
    regions[] {
      vendorId,
      location,
      country -> {
        name,
        code,
        "continent": continent -> name
      }
    }
  },
  "continents": *[_type == 'continent']{
    name,
    ordinal
  }
}`;

export interface ProviderRegionData {
    providers: ProviderRegionInfo[];
    continents: Continent[];
}

export interface ProviderRegionInfo {
    id: string;
    regions: CloudRegion[];
}

export interface CloudRegion {
    vendorId: string;
    location?: string;
    country: Country;
}

export interface Country {
    name: string;
    code: string;
    continent: string;
}

export interface Continent {
    name: string;
    ordinal: number;
}

export const cloudRegionSchemaName = "cloudRegion";

const cloudRegionSchema = defineType({
    name: cloudRegionSchemaName,
    title: "Region",
    icon: EarthAmericasIcon,
    type: "object",
    fields: [
        defineField({
            name: "vendorId",
            title: "Vendor ID",
            description: "Vendor ID (GCP, AWS, Azure)",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "location",
            title: "Location",
            description: "City / state name (GCP, AWS)",
            type: "string",
        }),
        defineField({
            name: "country",
            title: "Country",
            type: "reference",
            to: [{ type: countrySchemaName }],
            validation: requiredRule,
        }),
    ],
    preview: {
        select: { vendorId: "vendorId", location: "location" },
        prepare: (selection) => ({ title: selection.vendorId, subtitle: selection.location || "" }),
    },
});

export const cloudProviderSchemaName = "cloudProvider";

const cloudProviderSchema = defineType({
    name: cloudProviderSchemaName,
    title: "Provider Region Info",
    icon: EarthGlobeIcon,
    type: "document",
    fields: [
        defineField({
            name: "id",
            title: "Provider ID",
            description: "e.g: 'gcp'",
            type: "slug",
            validation: requiredRule,
        }),
        nameField,
        defineField({
            name: "regions",
            title: "Regions",
            type: "array",
            of: [{ type: cloudRegionSchemaName }],
            validation: requiredRule,
        }),
    ],
});

export const cloudProviderSchemas = [cloudRegionSchema, cloudProviderSchema];
