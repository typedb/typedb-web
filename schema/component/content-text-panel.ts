import { defineField, defineType } from "@sanity/types";
import { Illustration, illustrationField, illustrationFromSanity, SanityIllustrationField } from "../illustration";
import { Link, linkSchemaName, SanityLink } from "../link";
import { bodyFieldName, bodyFieldRichText, learnMoreLinkFieldName, required, titleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, PortableText, SanityBodyTextField, SanityTitleField } from "../text";

export interface SanityContentTextPanel extends SanityIllustrationField, SanityBodyTextField {
    learnMoreLink?: SanityReference<SanityLink>;
    learnMoreLinkText?: string;
}

export interface SanityContentTextTab extends SanityContentTextPanel, SanityTitleField {}

export interface SanityContentProsConsTab extends SanityIllustrationField, SanityTitleField {
    prosAndCons: ProCon[];
}

export type ProConType = "pro" | "con";

export interface ProCon {
    body: PortableText;
    proConType: ProConType;
}

export interface SanityMultiComparisonTabs {
    primaryTab: SanityContentProsConsTab;
    secondaryTabs: SanityContentProsConsTab[];
}

export class ContentTextPanel implements BodyTextField {
    readonly body: PortableText;
    readonly illustration: Illustration;
    readonly learnMoreLinkText: string;
    readonly learnMoreLink?: Link;

    constructor(data: SanityContentTextPanel, db: SanityDataset) {
        this.illustration = illustrationFromSanity(db.resolveRef(data.illustration), db);
        this.body = data.body;
        this.learnMoreLink = data.learnMoreLink ? Link.fromSanityLinkRef(data.learnMoreLink, db) : undefined;
        this.learnMoreLinkText = data.learnMoreLinkText || "Learn more";
    }
}

export class ContentTextTab extends ContentTextPanel {
    readonly title: string;

    constructor(data: SanityContentTextTab, db: SanityDataset) {
        super(data, db);
        this.title = data.title;
    }
}

export class ContentProsConsTab {
    readonly title: string;
    readonly prosAndCons: ProCon[];
    readonly illustration: Illustration;

    constructor(data: SanityContentProsConsTab, db: SanityDataset) {
        this.title = data.title;
        this.prosAndCons = data.prosAndCons;
        this.illustration = illustrationFromSanity(db.resolveRef(data.illustration), db);
    }
}

export class MultiComparisonTabs {
    readonly primaryTab: ContentProsConsTab;
    readonly secondaryTabs: ContentProsConsTab[];

    constructor(data: SanityMultiComparisonTabs, db: SanityDataset) {
        this.primaryTab = new ContentProsConsTab(data.primaryTab, db);
        this.secondaryTabs = data.secondaryTabs.map(x => new ContentProsConsTab(x, db));
    }
}

export const contentTextPanelSchemaName = "contentTextPanel";
export const contentTextTabSchemaName = "contentTextTab";
export const contentProsConsTabSchemaName = "contentProsConsTab";
export const proConSchemaName = "proCon";
export const multiComparisonTabsSchemaName = "multiComparisonTabs";

const contentTextPanelSchema = defineType({
    name: contentTextPanelSchemaName,
    title: "Text + Illustration Panel",
    type: "object",
    fields: [
        bodyFieldRichText,
        illustrationField,
        defineField({
            name: "learnMoreLinkText",
            title: "'Learn More' link text",
            description: "Defaults to the text 'Learn more'",
            type: "string",
            initialValue: "Learn more",
        }),
        defineField({
            name: learnMoreLinkFieldName,
            title: "'Learn More' link",
            type: "reference",
            to: [{ type: linkSchemaName }],
        }),
    ],
});

const contentTextTabSchema = defineType({
    ...contentTextPanelSchema,
    name: contentTextTabSchemaName,
    fields: [titleField, ...contentTextPanelSchema.fields],
});

const contentProsConsTabSchema = defineType({
    name: contentProsConsTabSchemaName,
    title: "Pros/Cons Panel",
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "prosAndCons",
            title: "Pros/Cons",
            type: "array",
            of: [{ type: proConSchemaName }],
            validation: required,
        }),
        illustrationField,
    ]
});

const proConTypeFieldName = "proConType";

const proConSchema = defineType({
    name: proConSchemaName,
    title: "Pro/Con",
    type: "object",
    fields: [
        bodyFieldRichText,
        defineField({
            name: proConTypeFieldName,
            title: "Type",
            type: "string",
            options: {
                list: [{ title: "Pro", value: "pro" }, { title: "Con", value: "con" }],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "pro",
            validation: required,
        }),
    ],
    preview: {
        select: { title: bodyFieldName, type: proConTypeFieldName },
        prepare: (selection) => ({
            title: `[${selection.type === "pro" ? "✔" : "✗"}] ${selection.title ? selection.title[0].children.filter((x: any) => x._type === "span").map((x: any) => x.text).join("") : ""}`,
        }),
    },
});

const multiComparisonTabsSchema = defineType({
    name: multiComparisonTabsSchemaName,
    title: "Multi-Comparison Tabs",
    type: "object",
    fields: [
        defineField({
            name: "primaryTab",
            title: "Primary Tab",
            type: contentProsConsTabSchemaName,
            validation: required,
        }),
        defineField({
            name: "secondaryTabs",
            title: "Secondary Tabs",
            type: "array",
            of: [{ type: contentProsConsTabSchemaName }],
            validation: required,
        }),
    ],
});

export const contentTextPanelSchemas = [
    contentTextPanelSchema, contentTextTabSchema, contentProsConsTabSchema, proConSchema, multiComparisonTabsSchema,
];
