import { defineField, defineType, DocumentRule } from "@sanity/types";
import {
    bodyFieldRichText,
    collapsibleOptions,
    isVisibleField,
    pageTitleField,
    requiredRule,
    sectionIconField,
    sectionIdField,
    titleFieldWithHighlights,
} from "../common-fields";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { FeatureTable, featureTableSchemaName, SanityFeatureTable } from "../component/feature-table";
import { ProductPanel, productPanelSchemaName, SanityProductPanel } from "../component/link-panel";
import { SanityTechnicolorBlock, TechnicolorBlock } from "../component/technicolor-block";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { metaTagsField, Page, SanityPage } from "./common";

export interface SanityDeploymentPage extends SanityPage {
    introSection: SanityIntroSection;
    featureTableSection: SanityFeatureTableSection;
    finalSection: SanityConclusionSection;
}

export interface SanityIntroSection extends SanityTechnicolorBlock {
    productPanels: SanityProductPanel[];
}

export interface SanityFeatureTableSection extends SanityTechnicolorBlock {
    featureTable: SanityFeatureTable;
}

export class DeploymentPage extends Page {
    readonly introSection: IntroSection;
    readonly featureTableSection: FeatureTableSection;
    readonly finalSection: ConclusionSection;

    constructor(data: SanityDeploymentPage, db: SanityDataset) {
        super(data, db);
        this.introSection = IntroSection.fromSanity(data.introSection, db);
        this.featureTableSection = FeatureTableSection.fromSanity(data.featureTableSection, db);
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

export class IntroSection extends TechnicolorBlock {
    readonly productPanels: ProductPanel[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.productPanels = props.productPanels;
    }

    static override fromSanity(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                productPanels: data.productPanels.map((x) => ProductPanel.fromSanityProductPanel(x, db)),
            })
        );
    }
}

export class FeatureTableSection extends TechnicolorBlock {
    readonly featureTable: FeatureTable;

    constructor(props: PropsOf<FeatureTableSection>) {
        super(props);
        this.featureTable = props.featureTable;
    }

    static override fromSanity(data: SanityFeatureTableSection, db: SanityDataset) {
        return new FeatureTableSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                featureTable: FeatureTable.fromSanity(data.featureTable, db),
            })
        );
    }
}

export const deploymentPageSchemaName = "deploymentPage";

const introSectionSchemaName = `${deploymentPageSchemaName}_introSection`;
const featureTableSectionSchemaName = `${deploymentPageSchemaName}_featureTableSection`;

const introSectionSchema = defineType({
    name: introSectionSchemaName,
    title: "Intro Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        sectionIconField,
        defineField({
            name: "productPanels",
            title: "Product Panels",
            type: "array",
            of: [{ type: productPanelSchemaName }],
        }),
        isVisibleField,
    ],
});

const featureTableSectionSchema = defineType({
    name: featureTableSectionSchemaName,
    title: "Feature Table Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        sectionIconField,
        sectionIdField,
        defineField({
            name: "featureTable",
            title: "Feature Table",
            type: featureTableSchemaName,
            validation: requiredRule,
        }),
        isVisibleField,
    ],
});

const deploymentPageSchema = defineType({
    name: deploymentPageSchemaName,
    title: "Deployment Page",
    type: "document",
    fields: [
        pageTitleField,
        metaTagsField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            type: introSectionSchemaName,
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
            name: "finalSection",
            title: "Final Section",
            type: conclusionSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Deployment Page" }) },
    validation: (rule: DocumentRule) =>
        rule.custom((value) => {
            if (!value || !value["featureTableSection"]) return true; // handled at lower level
            const featureTableSection = value["featureTableSection"] as { featureTable?: any };
            if (!featureTableSection.featureTable) return true;
            const featureTable = featureTableSection.featureTable as {
                headerRow?: string[];
                bodyRows: { heading: string; cells: any[] }[];
            };
            if (!featureTable.headerRow || !featureTable.bodyRows) return true;
            const requiredRowSize = featureTable.headerRow!.length - 1;
            const invalidRow = featureTable.bodyRows.find((x) => x.cells?.length !== requiredRowSize);
            if (invalidRow)
                return `All rows must have the same number of cells as the header row (${requiredRowSize}), but the row "${invalidRow.heading}" has (${invalidRow.cells?.length}) cells`;
            return true;
        }),
});

export const deploymentPageSchemas = [introSectionSchema, featureTableSectionSchema, deploymentPageSchema];
