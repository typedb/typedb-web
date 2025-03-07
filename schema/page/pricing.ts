import { defineField, defineType, DocumentRule } from "@sanity/types";
import { collapsibleOptions, isVisibleField, requiredRule, titleBodyIconFields } from "../common-fields";
import { FeatureTableSection, featureTableSectionSchemaName, SanityFeatureTableSection } from "../component/feature-table";
import { coreSectionSchemaName, SanityCoreSection, SanityTitleBodyPanelSection, TitleBodyPanelSection, titleBodyPanelSectionSchemaName } from "../component/section";
import { PricingPanel, pricingPanelSchemaName, SanityPricingPanel } from "../component/pricing-panel";
import { SanitySectionBase, SectionBase } from "../component/section";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityPricingPage extends SanityPage {
    introSection: SanityIntroSection;
    providersSection: SanityTitleBodyPanelSection;
    featureTableSection: SanityFeatureTableSection;
    contactSection: SanityCoreSection;
}

export interface SanityIntroSection extends SanitySectionBase {
    panelsCaption?: string;
    panels: SanityPricingPanel[];
}

export class PricingPage extends Page {
    readonly introSection: IntroSection;
    readonly providersSection: TitleBodyPanelSection;
    readonly featureTableSection: FeatureTableSection;
    readonly contactSection: SectionBase;

    constructor(data: SanityPricingPage, db: SanityDataset) {
        super(data, db);
        this.introSection = IntroSection.fromSanity(data.introSection, db);
        this.providersSection = TitleBodyPanelSection.fromSanity(data.providersSection, db);
        this.featureTableSection = FeatureTableSection.fromSanity(data.featureTableSection, db);
        this.contactSection = SectionBase.fromSanity(data.contactSection, db);
    }
}

export class IntroSection extends SectionBase {
    readonly panelsCaption?: string;
    readonly panels: PricingPanel[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.panelsCaption = props.panelsCaption;
        this.panels = props.panels;
    }

    static override fromSanity(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                panelsCaption: data.panelsCaption,
                panels: data.panels.map((x) => PricingPanel.fromSanity(x, db)),
            })
        );
    }
}

export const pricingPageSchemaName = "pricingPage";

const introSectionSchemaName = `${pricingPageSchemaName}_introSection`;

const introSectionSchema = defineType({
    name: introSectionSchemaName,
    title: "Intro Section",
    type: "object",
    fields: [
        ...titleBodyIconFields,
        defineField({
            name: "panelsCaption",
            title: "Pricing Panels Caption",
            type: "string",
        }),
        defineField({
            name: "panels",
            title: "Pricing Panels",
            type: "array",
            of: [{ type: pricingPanelSchemaName }],
        }),
        isVisibleField,
    ],
});

const pricingPageSchema = defineType({
    name: pricingPageSchemaName,
    title: "Pricing Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            type: introSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "providersSection",
            title: "Providers Section",
            type: titleBodyPanelSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "featureTableSection",
            title: "Feature Table Section",
            type: featureTableSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "contactSection",
            title: "Contact Section",
            type: coreSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Pricing Page" }) },
    validation: (rule: DocumentRule) =>
        rule.custom((value) => {
            if (!value || !value["featureTableSection"]) return true; // handled at lower level
            const featureTableSection = value["featureTableSection"] as { featureTable?: any };
            if (!featureTableSection.featureTable) return true;
            const featureTable = featureTableSection.featureTable as {
                products?: any[];
                rows: { heading: string; cells: any[] }[];
            };
            if (!featureTable.products || !featureTable.rows) return true;
            const requiredRowSize = featureTable.products.length;
            const invalidRow = featureTable.rows.find((x) => x.cells?.length !== requiredRowSize);
            if (invalidRow)
                return `All rows must have the same number of cells as the number of products (${requiredRowSize}), but the row "${invalidRow.heading}" has (${invalidRow.cells?.length}) cells`;
            return true;
        }),
});

export const pricingPageSchemas = [introSectionSchema, pricingPageSchema];
