import { EarthAmericasIcon, EarthGlobeIcon, TagIcon } from "@sanity/icons";
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

export const cloudPricingQuery =
    `*[_type == 'cloudProvider']{
  "id": id.current,
  pricingTiers[] {
    machineTier,
    cpuType,
    vcpus,
    ramGb,
    storageGb,
    hourlyRateUsd,
  },
  storagePricePerGbHourUsd,
}`;

export interface CloudProviderPricing {
    id: string;
    pricingTiers: CloudPricingTier[];
    storagePricePerGbHourUsd: number;
}

export type CpuType = "Dedicated" | "Burstable";

export interface CloudPricingTier {
    machineTier: string;
    cpuType: CpuType;
    vcpus: number;
    ramGb: number;
    storageGb: number;
    hourlyRateUsd: number;
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

export const cloudPricingTierSchemaName = "cloudPricingTier";

const cloudPricingTierSchema = defineType({
    name: cloudPricingTierSchemaName,
    title: "Pricing Tier",
    icon: TagIcon,
    type: "object",
    fields: [
        defineField({
            name: "machineTier",
            title: "Machine Tier",
            description: "The vendor's machine type identifier, e.g. 'e2-medium'",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "cpuType",
            title: "CPU Type",
            type: "string",
            options: { list: ["Dedicated", "Burstable"], layout: "radio" },
            initialValue: "Dedicated",
            validation: requiredRule,
        }),
        defineField({
            name: "vcpus",
            title: "vCPUs",
            type: "number",
            validation: requiredRule,
        }),
        defineField({
            name: "ramGb",
            title: "RAM (GB)",
            type: "number",
            validation: requiredRule,
        }),
        defineField({
            name: "storageGb",
            title: "Storage (GB)",
            description: "Sample storage size shown alongside this tier",
            type: "number",
            validation: requiredRule,
        }),
        defineField({
            name: "hourlyRateUsd",
            title: "Hourly Rate (USD)",
            description: "Combined compute + storage price per node, for the guideline region (US East)",
            type: "number",
            validation: requiredRule,
        }),
    ],
    preview: {
        select: { machineTier: "machineTier", cpuType: "cpuType", hourlyRateUsd: "hourlyRateUsd" },
        prepare: (selection) => ({
            title: `${selection.machineTier} (${selection.cpuType})`,
            subtitle: `$${selection.hourlyRateUsd}/hr`,
        }),
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
        defineField({
            name: "pricingTiers",
            title: "Pricing Tiers",
            description:
                "Sample machine tiers shown in the pricing details dialog on typedb.com, ordered cheapest to " +
                "most expensive, priced for the guideline region (US East)",
            type: "array",
            of: [{ type: cloudPricingTierSchemaName }],
        }),
        defineField({
            name: "storagePricePerGbHourUsd",
            title: "Storage Price (USD per GB per hour)",
            description: "Shown in the pricing details dialog's footnote; charged whether a cluster is running or suspended",
            type: "number",
        }),
    ],
});

export const cloudProviderSchemas = [cloudRegionSchema, cloudPricingTierSchema, cloudProviderSchema];
