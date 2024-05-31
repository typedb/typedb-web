import { defineField, defineType } from "@sanity/types";
import { LinkButton } from "../button";
import { bodyFieldRichText, isVisibleField, required, resourcesField } from "../common-fields";
import { SectionBase } from "../component/section";
import { SanityDataset } from "../sanity-core";
import { ParagraphWithHighlights } from "../text";
import { PropsOf } from "../util";
import { ResourceLink } from "./base";
import { SanityResourceSection } from "./sanity";

export class ResourceSection extends SectionBase {
    readonly resources: ResourceLink[];

    constructor(props: PropsOf<ResourceSection>) {
        super(props);
        this.resources = props.resources;
    }

    static override fromSanity(data: SanityResourceSection, db: SanityDataset): ResourceSection {
        return new ResourceSection(Object.assign(SectionBase.fromSanity(data, db), {
            resources: data.resources?.map(x => ResourceLink.fromSanity(db.resolveRef(x), db, true)) || [],
        }));
    }

    static fromSanityFurtherLearningSection(data: SanityResourceSection, db: SanityDataset): ResourceSection {
        return new ResourceSection({
            title: new ParagraphWithHighlights({
                spans: [
                    { text: "Further", highlight: false },
                    { text: " Learning", highlight: true },
                ],
            }),
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            iconURL: "https://cdn.sanity.io/images/xndl14mc/production/5cc35cf9f1d71af32a5d65426f2a6409cb0f72da-89x98.svg",
            resources: data.resources?.map(x => ResourceLink.fromSanity(db.resolveRef(x), db)) || [],
            sectionId: "further-learning",
        });
    }
}

// TODO: refactor schema name
export const furtherLearningSectionSchemaName = "furtherReadingSection";

const furtherLearningSectionSchema = defineType({
    name: furtherLearningSectionSchemaName,
    title: `Further Reading Section`,
    type: "object",
    fields: [bodyFieldRichText, resourcesField, isVisibleField],
});

const furtherLearningFieldName = "furtherLearning";

export const furtherLearningFieldOptional = defineField({
    name: furtherLearningFieldName,
    title: "Further Learning",
    type: furtherLearningSectionSchemaName,
});

export const furtherLearningField = Object.assign({}, furtherLearningFieldOptional, { validation: required });

export const sectionSchemas = [furtherLearningSectionSchema];
