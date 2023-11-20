import { defineType } from "@sanity/types";
import { SanityOptionalActions } from "../button";
import {
    bodyFieldRichText,
    isVisibleField,
    optionalActionsField, resourcesFieldOptional,
    SanityVisibleToggle, sectionIconField,
    titleBodyIconFields, titleFieldWithHighlights,
} from "../common-fields";
import { Illustration, illustrationField, illustrationFromSanity, SanityIllustrationField } from "../illustration";
import { SanityDataset } from "../sanity-core";
import { SanityBodyTextField } from "../text";
import { PropsOf } from "../util";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";

// TODO: there are two other 'SanityCoreSection' interfaces which are similar, but not quite identical
export interface SanityCoreSection extends SanityBodyTextField, SanityOptionalActions, SanityVisibleToggle {}

export type SanityTitleBodyIllustrationSection = SanityTechnicolorBlock & SanityIllustrationField & SanityVisibleToggle;

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

export const titleBodyIllustrationSectionSchemaName = "titleBodyIllustrationSection";

const titleBodyIllustrationSectionSchema = defineType({
    name: titleBodyIllustrationSectionSchemaName,
    title: "Title, Body & Illustration",
    type: "document",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        sectionIconField,
        illustrationField,
        isVisibleField,
    ],
});

export const resourceSectionSchemaName = `resourceSection`;

const resourceSectionSchema = defineType({
    name: resourceSectionSchemaName,
    title: "Resources Section",
    type: "object",
    fields: [
        ...titleBodyIconFields,
        optionalActionsField,
        resourcesFieldOptional,
        isVisibleField,
    ],
});

export const pageSectionSchemas = [resourceSectionSchema, titleBodyIllustrationSectionSchema];
