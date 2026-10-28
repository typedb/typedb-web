import { defineArrayMember, defineField, defineType } from "@sanity/types";
import {
    collapsibleOptions, descriptionField, isVisibleField, linkFieldOptional, nameField, requiredRule, titleBodyActionsFields,
} from "../common-fields";
import { ClosingPanelSection, closingPanelSectionSchemaName, SanityClosingPanelSection } from "../component/closing-panel-section";
import { SanitySectionCore, SectionCore } from "../component/section";
import { Link, SanityLink } from "../link";
import { SanityDataset, SanityImage, SanityReference } from "../sanity-core";
import { ParagraphWithHighlights } from "../text";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityIntegrationEntry {
    _key: string;
    name: string;
    description?: string;
    icon?: SanityImage;
    link?: SanityReference<SanityLink>;
}

export interface SanityIntegrationGroup {
    _key: string;
    name: string;
    description?: string;
    integrations?: SanityIntegrationEntry[];
}

export interface SanityIntegrationsPage extends SanityPage {
    introSection?: SanitySectionCore;
    groups?: SanityIntegrationGroup[];
    closingSection?: SanityClosingPanelSection;
}

export interface IntegrationEntry {
    key: string;
    name: string;
    description?: string;
    iconURL?: string;
    link?: Link;
}

export interface IntegrationGroup {
    id: string;
    name: string;
    description?: string;
    integrations: IntegrationEntry[];
}

export class IntegrationsPage extends Page {
    readonly introSection?: SectionCore;
    readonly groups: IntegrationGroup[];
    readonly closingSection?: ClosingPanelSection;

    constructor(data: SanityIntegrationsPage, db: SanityDataset) {
        super(data, db);
        this.introSection = data.introSection?.isVisible ? SectionCore.fromSanity(data.introSection, db) : undefined;
        this.groups = (data.groups || []).map((group) => ({
            id: ParagraphWithHighlights.fromPlainText(group.name).toSectionID(),
            name: group.name,
            description: group.description || undefined,
            integrations: (group.integrations || []).map((x) => ({
                key: x._key,
                name: x.name,
                description: x.description || undefined,
                iconURL: x.icon?.asset ? db.resolveRef(x.icon.asset).url : undefined,
                link: x.link ? Link.fromSanityLinkRef(x.link, db) : undefined,
            })),
        }));
        this.closingSection = data.closingSection?.isVisible ? ClosingPanelSection.fromSanity(data.closingSection, db) : undefined;
    }
}

export const integrationsPageSchemaName = "integrationsPage";
const integrationEntrySchemaName = "integrationEntry";
const integrationGroupSchemaName = "integrationGroup";
const introSectionSchemaName = `${integrationsPageSchemaName}_introSection`;

const integrationEntrySchema = defineType({
    name: integrationEntrySchemaName,
    title: "Integration",
    type: "object",
    fields: [
        nameField,
        descriptionField,
        defineField({
            name: "icon",
            title: "Icon",
            type: "image",
            description: "Square, shown at 24px. SVG works best",
        }),
        linkFieldOptional,
    ],
    preview: { select: { title: "name", subtitle: "description", media: "icon" } },
});

const integrationGroupSchema = defineType({
    name: integrationGroupSchemaName,
    title: "Category",
    type: "object",
    fields: [
        nameField,
        descriptionField,
        defineField({
            name: "integrations",
            title: "Integrations",
            type: "array",
            of: [defineArrayMember({ type: integrationEntrySchemaName })],
            validation: requiredRule,
        }),
    ],
    preview: { select: { title: "name", subtitle: "description" } },
});

const introSectionSchema = defineType({
    name: introSectionSchemaName,
    title: "Intro Section",
    type: "object",
    fields: [...titleBodyActionsFields, isVisibleField],
});

const integrationsPageSchema = defineType({
    name: integrationsPageSchemaName,
    title: "Integrations Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({ name: "introSection", title: "Intro Section", type: introSectionSchemaName, options: collapsibleOptions }),
        defineField({
            name: "groups",
            title: "Categories",
            type: "array",
            description: "Each category gets a section and a sidebar link",
            of: [defineArrayMember({ type: integrationGroupSchemaName })],
        }),
        defineField({ name: "closingSection", title: "Closing Section", type: closingPanelSectionSchemaName, options: collapsibleOptions }),
    ],
    preview: { prepare: (_selection) => ({ title: "Integrations Page" }) },
});

export const integrationsPageSchemas = [integrationsPageSchema, integrationGroupSchema, integrationEntrySchema, introSectionSchema];
