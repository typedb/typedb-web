import { defineField, defineType } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "./button";
import { actionsFieldOptional, bodyFieldRichText, iconFieldName, isVisibleField, titleBodyActionsFields, titleField, titleFieldWithHighlights } from "./common-fields";
import { SanitySectionCore, SectionCore } from "./component/section";
import { SanityImageRef } from "./image";
import { SanityDataset, SanityReference } from "./sanity-core";
import { BodyTextField, ParagraphWithHighlights, PortableText, SanityBodyTextField, SanityTitleField } from "./text";
import { PropsOf } from "./util";

export interface SanityKeyPointWithIcon extends SanitySectionCore {
    icon: SanityReference<SanityImageRef>;
}

export interface SanityServicesKeyPoint extends SanityKeyPointWithIcon {
    checklist: string[];
}

export interface SanityKeyPointsSection extends SanitySectionCore {
    keyPoints: SanitySectionCore[];
}

export interface SanityKeyPointsWithIconsSection extends SanitySectionCore {
    keyPoints: SanityKeyPointWithIcon[];
}

export class KeyPointWithIcon extends SectionCore {
    readonly iconURL: string;

    constructor(props: PropsOf<KeyPointWithIcon>) {
        super(props);
        this.iconURL = props.iconURL;
    }

    static override fromSanity(data: SanityKeyPointWithIcon, db: SanityDataset) {
        return Object.assign(SectionCore.fromSanity(data, db), {
            iconURL: db.resolveImageRef(data.icon).url,
        });
    }
}

export class ServicesKeyPoint extends KeyPointWithIcon {
    readonly checklist: string[];

    constructor(props: PropsOf<ServicesKeyPoint>) {
        super(props);
        this.checklist = props.checklist;
    }

    static override fromSanity(data: SanityServicesKeyPoint, db: SanityDataset) {
        return Object.assign(KeyPointWithIcon.fromSanity(data, db), {
            checklist: data.checklist,
        });
    }
}

export class KeyPointsSection extends SectionCore {
    readonly keyPoints: SectionCore[];

    constructor(props: PropsOf<KeyPointsSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static override fromSanity(data: SanityKeyPointsSection, db: SanityDataset) {
        return new KeyPointsSection({
            title: ParagraphWithHighlights.fromSanity(data.title),
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            keyPoints: data.keyPoints.map((x) => SectionCore.fromSanity(x, db)),
            sectionId: ParagraphWithHighlights.fromSanity(data.title).toSectionID(),
        });
    }
}

export class KeyPointsWithIconsSection extends SectionCore {
    readonly keyPoints: KeyPointWithIcon[];

    constructor(props: PropsOf<KeyPointsWithIconsSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static override fromSanity(data: SanityKeyPointsWithIconsSection, db: SanityDataset) {
        return new KeyPointsWithIconsSection(
            Object.assign(SectionCore.fromSanity(data, db), {
                keyPoints: data.keyPoints.map((x) => KeyPointWithIcon.fromSanity(x, db)),
            })
        );
    }
}

export const keyPointSchemaName = "keyPoint";

const keyPointSchema = defineType({
    name: keyPointSchemaName,
    title: "Key Point",
    type: "object",
    fields: [titleFieldWithHighlights, bodyFieldRichText, actionsFieldOptional],
});

export const servicesKeyPointSchemaName = "servicesKeyPoint";

const servicesKeyPointSchema = defineType({
    name: servicesKeyPointSchemaName,
    title: "Key Point",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        defineField({
            name: "checklist",
            title: "Check List",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "grid",
            },
        }),
        defineField({
            name: iconFieldName,
            title: "Icon",
            type: "reference",
            to: [{ type: "sectionIcon" }],
            options: { disableNew: true },
        }),
    ],
});

export const keyPointsSectionSchemaName = "keyPointsSection";

const keyPointsSectionSchema = defineType({
    name: keyPointsSectionSchemaName,
    title: "Key Points Section",
    type: "object",
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "keyPoints",
            title: "Key Points",
            type: "array",
            of: [{ type: keyPointSchemaName }],
        }),
        isVisibleField,
    ],
});

export const keyPointSchemas = [keyPointSchema, servicesKeyPointSchema, keyPointsSectionSchema];
