import { defineArrayMember, defineField, defineType } from "@sanity/types";
import { UsersIcon } from "@sanity/icons";
import { isVisibleField, sectionPreview, titleBodyActionsFields } from "../common-fields";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { SanityDataset, SanityReference } from "../sanity-core";
import { PropsOf } from "../util";
import { SanitySectionCore, SectionCore } from "./section";

export const organisationRowDisplays = [
    { title: "Logos", value: "logos" },
    { title: "Names", value: "names" },
] as const;

export type OrganisationRowDisplay = (typeof organisationRowDisplays)[number]["value"];

export interface SanityOrganisationRow {
    _key: string;
    label?: string;
    display?: OrganisationRowDisplay;
    organisationLogos?: SanityReference<SanityOrganisation>[];
    names?: string[];
}

export interface SanityOrganisationLogosSection extends SanitySectionCore {
    rows?: SanityOrganisationRow[];
}

/** A row of organisations, shown either as their logos or as their names set in text */
export type OrganisationRow =
    | { key: string; label?: string; display: "logos"; organisations: Organisation[] }
    | { key: string; label?: string; display: "names"; names: string[] };

function organisationsFromSanity(refs: SanityReference<SanityOrganisation>[] | undefined, db: SanityDataset) {
    // Skip references to organisations that are missing or have no logo yet (e.g. half-edited drafts)
    return (refs || [])
        .map((x) => db.resolveRef(x))
        .filter((x) => !!x?.logo?.asset)
        .map((x) => new Organisation(x, db));
}

function rowFromSanity(data: SanityOrganisationRow, db: SanityDataset): OrganisationRow {
    const label = data.label || undefined;
    return data.display === "names"
        ? { key: data._key, label, display: "names", names: (data.names || []).filter((x) => !!x?.trim()) }
        : { key: data._key, label, display: "logos", organisations: organisationsFromSanity(data.organisationLogos, db) };
}

export class OrganisationLogosSection extends SectionCore {
    readonly rows: OrganisationRow[];

    constructor(props: PropsOf<OrganisationLogosSection>) {
        super(props);
        this.rows = props.rows;
    }

    static override fromSanity(data: SanityOrganisationLogosSection, db: SanityDataset) {
        return new OrganisationLogosSection({
            ...SectionCore.fromSanity(data, db),
            rows: (data.rows || [])
                .map((x) => rowFromSanity(x, db))
                .filter((x) => (x.display === "names" ? x.names.length : x.organisations.length) > 0),
        });
    }
}

export const organisationRowSchemaName = "organisationRow";

const hiddenUnlessDisplay = (display: OrganisationRowDisplay) =>
    ({ parent }: { parent?: SanityOrganisationRow }) => (parent?.display || "logos") !== display;

const organisationRowSchema = defineType({
    name: organisationRowSchemaName,
    title: "Row",
    type: "object",
    icon: UsersIcon,
    fields: [
        defineField({
            name: "label",
            title: "Label (optional)",
            type: "string",
            description: "Shown on a divider above the row, e.g. 'In research at'",
        }),
        defineField({
            name: "display",
            type: "string",
            description: "Names suit organisations without a logo uploaded, such as universities",
            options: { list: [...organisationRowDisplays], layout: "radio", direction: "horizontal" },
            initialValue: "logos",
        }),
        Object.assign({}, organisationLogosField, { hidden: hiddenUnlessDisplay("logos") }),
        defineField({
            name: "names",
            type: "array",
            of: [{ type: "string" }],
            hidden: hiddenUnlessDisplay("names"),
        }),
    ],
    preview: {
        select: { label: "label", display: "display", logos: "organisationLogos", names: "names" },
        prepare: ({ label, display, logos, names }: {
            label?: string; display?: OrganisationRowDisplay; logos?: unknown[]; names?: string[];
        }) => ({
            title: label || "Unlabelled row",
            subtitle: display === "names" ? (names || []).join(", ") || "No names" : `${logos?.length || 0} logos`,
        }),
    },
});

export const organisationLogosSectionSchemaName = "organisationLogosSection";

const organisationLogosSectionSchema = defineType({
    name: organisationLogosSectionSchemaName,
    title: "Organisations",
    type: "object",
    icon: UsersIcon,
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "rows",
            type: "array",
            description: "Each row shows organisations as logos or as names; label rows after the first to group them",
            of: [defineArrayMember({ type: organisationRowSchemaName })],
            validation: (rule) => rule.required().min(1).error("Add at least one row of organisations"),
        }),
        isVisibleField,
    ],
    preview: sectionPreview("Organisations"),
});

export const organisationLogosSectionSchemas = [organisationRowSchema, organisationLogosSectionSchema];
