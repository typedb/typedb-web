import { defineType } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "../button";
import {
    bodyFieldRichText,
    isVisibleField,
    linkPanelsField, optionalActionsField, resourcesField,
    SanityVisibleToggle, sectionIconField,
    sectionIdField, titleBodyIconFields, titleFieldWithHighlights,
} from "../common-fields";
import { Illustration, illustrationField, illustrationFromSanity, SanityIllustrationField } from "../illustration";
import { ResourceLink } from "../resource/base";
import { SanityResource } from "../resource/sanity";
import { SanityDataset, SanityReference } from "../sanity-core";
import { ParagraphWithHighlights, SanityBodyTextField } from "../text";
import { PropsOf } from "../util";
import { LinkPanel, SanityLinkPanel } from "./link-panel";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";

// TODO: there are two other 'SanityCoreSection' interfaces which are similar, but not quite identical
export interface SanityCoreSection extends SanityBodyTextField, SanityOptionalActions, SanityVisibleToggle {}

export type SanityTitleBodyIllustrationSection = SanityTechnicolorBlock & SanityIllustrationField & SanityVisibleToggle;

export interface SanityFurtherReadingSection extends SanityCoreSection {
    links: SanityLinkPanel[];
    sectionId?: string;
}

export interface SanityResourceSection extends SanityTechnicolorBlock, SanityVisibleToggle {
    resources: SanityReference<SanityResource>[];
}

export class TitleBodyIllustrationSection extends TechnicolorBlock {
    readonly illustration: Illustration;

    constructor(props: PropsOf<TitleBodyIllustrationSection>) {
        super(props);
        this.illustration = props.illustration;
    }

    static override fromSanity(data: SanityTitleBodyIllustrationSection, db: SanityDataset) {
        return new TitleBodyIllustrationSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                illustration: illustrationFromSanity(db.resolveRef(data.illustration), db),
            })
        );
    }
}

export class FurtherReadingSection extends TechnicolorBlock {
    readonly links: LinkPanel[];

    constructor(props: PropsOf<FurtherReadingSection>) {
        super(props);
        this.links = props.links;
    }

    static fromSanityFurtherReadingSection(data: SanityFurtherReadingSection, db: SanityDataset) {
        return new FurtherReadingSection({
            title: new ParagraphWithHighlights({
                spans: [
                    { text: "Further", highlight: false },
                    { text: " Learning", highlight: true },
                ],
            }),
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            iconURL: "https://cdn.sanity.io/images/xndl14mc/production/5cc35cf9f1d71af32a5d65426f2a6409cb0f72da-89x98.svg",
            links: data.links.map((x) => LinkPanel.fromSanityLinkPanel(x, db)),
            sectionId: data.sectionId,
        });
    }
}

export class ResourceSection extends TechnicolorBlock {
    readonly resources: ResourceLink[];

    constructor(props: PropsOf<ResourceSection>) {
        super(props);
        this.resources = props.resources;
    }

    static override fromSanity(data: SanityResourceSection, db: SanityDataset) {
        return new ResourceSection(Object.assign(TechnicolorBlock.fromSanity(data, db), {
            resources: data.resources.map(x => ResourceLink.fromSanity(db.resolveRef(x), db)),
        }));
    }
}

export const titleBodyIllustrationSectionSchemaName = "titleBodyIllustrationSection";

export const furtherReadingSectionSchemaName = "furtherReadingSection";

const titleBodyIllustrationSectionSchema = defineType({
    name: titleBodyIllustrationSectionSchemaName,
    title: "Title, Body & Illustration",
    type: "document",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        sectionIconField,
        sectionIdField,
        illustrationField,
        isVisibleField,
    ],
});

const furtherReadingSectionSchema = defineType({
    name: furtherReadingSectionSchemaName,
    title: `Further Reading Section`,
    type: "object",
    fields: [bodyFieldRichText, linkPanelsField, sectionIdField, isVisibleField],
});

export const resourceSectionSchemaName = `resourceSection`;

const resourceSectionSchema = defineType({
    name: resourceSectionSchemaName,
    title: "Resources Section",
    type: "object",
    fields: [
        ...titleBodyIconFields,
        optionalActionsField,
        sectionIdField,
        resourcesField,
        isVisibleField,
    ],
});

export const pageSectionSchemas = [furtherReadingSectionSchema, resourceSectionSchema, titleBodyIllustrationSectionSchema];
