import { defineField, defineType } from "@sanity/types";
import { LinkButton } from "./button";
import { bodyFieldRichText, sectionIconField, titleField } from "./common-fields";
import { SanityCoreSection, SectionBase } from "./component/section";
import { SanityImageRef } from "./image";
import { SanityDataset, SanityReference } from "./sanity-core";
import { BodyTextField, ParagraphWithHighlights, PortableText, SanityBodyTextField, SanityTitleField } from "./text";
import { PropsOf } from "./util";

export type SanityKeyPoint = SanityTitleField & SanityBodyTextField;

export interface SanityKeyPointWithIcon extends SanityKeyPoint {
    icon: SanityReference<SanityImageRef>;
}

export interface SanityServicesKeyPoint extends SanityKeyPointWithIcon {
    checklist: string[];
}

export interface SanityKeyPointsSection extends SanityCoreSection {
    keyPoints: SanityKeyPoint[];
}

export interface SanityKeyPointsWithIconsSection extends SanityCoreSection {
    keyPoints: SanityKeyPointWithIcon[];
}

export class KeyPoint implements BodyTextField {
    readonly title: string;
    readonly body: PortableText;

    constructor(data: SanityKeyPoint) {
        this.title = data.title;
        this.body = data.body;
    }
}

export class KeyPointWithIcon extends KeyPoint {
    readonly iconURL: string;

    constructor(data: SanityKeyPointWithIcon, db: SanityDataset) {
        super(data);
        this.iconURL = db.resolveImageRef(data.icon).url;
    }
}

export class ServicesKeyPoint extends KeyPointWithIcon {
    readonly checklist: string[];

    constructor(data: SanityServicesKeyPoint, db: SanityDataset) {
        super(data, db);
        this.checklist = data.checklist;
    }
}

export class KeyPointsSection extends SectionBase {
    readonly keyPoints: KeyPoint[];

    constructor(props: PropsOf<KeyPointsSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static fromSanityKeyPointsSection(data: SanityKeyPointsSection, db: SanityDataset) {
        return new KeyPointsSection({
            title: ParagraphWithHighlights.fromSanity(data.title),
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            keyword: data.keyword,
            keyPoints: data.keyPoints.map((x) => new KeyPoint(x)),
            sectionId: ParagraphWithHighlights.fromSanity(data.title).toSectionID(),
        });
    }
}

export class KeyPointsWithIconsSection extends SectionBase {
    readonly keyPoints: KeyPointWithIcon[];

    constructor(props: PropsOf<KeyPointsWithIconsSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static override fromSanity(data: SanityKeyPointsWithIconsSection, db: SanityDataset) {
        return new KeyPointsWithIconsSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                keyPoints: data.keyPoints.map((x) => new KeyPointWithIcon(x, db)),
            })
        );
    }
}

export const keyPointSchemaName = "keyPoint";

const keyPointSchema = defineType({
    name: keyPointSchemaName,
    title: "Key Point",
    type: "object",
    fields: [titleField, bodyFieldRichText],
});

export const keyPointWithIconSchemaName = "keyPointWithIcon";

const keyPointWithIconSchema = defineType({
    name: keyPointWithIconSchemaName,
    title: "Key Point",
    type: "object",
    fields: [titleField, bodyFieldRichText, sectionIconField],
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
        sectionIconField,
    ],
});

export const keyPointSchemas = [keyPointSchema, keyPointWithIconSchema, servicesKeyPointSchema];
