import { defineField, defineType, DocumentRule } from "@sanity/types";
import { collapsible, isVisibleField, required, titleBodyIconFields } from "../common-fields";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { FeatureTable, featureTableSchemaName, SanityFeatureTable } from "../component/feature-table";
import {
    LinkPanelWithIcon, linkPanelWithIconSchemaName, ProductPanel, productPanelSchemaName,
    SanityLinkPanelWithIcon, SanityProductPanel,
} from "../component/link-panel";
import { SanityCoreSection, SanitySectionBase, SectionBase } from "../component/section";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityDeploymentPage extends SanityPage {
    introSection: SanityIntroSection;
    featureTableSection: SanityFeatureTableSection;
    finalSection: SanityConclusionSection;
    linkPanelsSection: SanityLinkPanelsSection;
}

export interface SanityIntroSection extends SanitySectionBase {
    productPanels: SanityProductPanel[];
}

export interface SanityFeatureTableSection extends SanitySectionBase {
    featureTable: SanityFeatureTable;
}

interface SanityLinkPanelsSection extends SanityCoreSection {
    panels: SanityLinkPanelWithIcon[];
}

export class DeploymentPage extends Page {
    readonly introSection: IntroSection;
    readonly featureTableSection: FeatureTableSection;
    readonly linkPanelsSection?: LinkPanelsSection;
    readonly finalSection: ConclusionSection;

    constructor(data: SanityDeploymentPage, db: SanityDataset) {
        super(data, db);
        this.introSection = IntroSection.fromSanity(data.introSection, db);
        this.featureTableSection = FeatureTableSection.fromSanity(data.featureTableSection, db);
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
        this.linkPanelsSection = data.linkPanelsSection?.isVisible
            ? LinkPanelsSection.fromSanity(data.linkPanelsSection, db)
            : undefined;
    }
}

export class IntroSection extends SectionBase {
    readonly productPanels: ProductPanel[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.productPanels = props.productPanels;
    }

    static override fromSanity(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                productPanels: data.productPanels.map((x) => ProductPanel.fromSanity(x, db)),
            })
        );
    }
}

export class FeatureTableSection extends SectionBase {
    readonly featureTable: FeatureTable;

    constructor(props: PropsOf<FeatureTableSection>) {
        super(props);
        this.featureTable = props.featureTable;
    }

    static override fromSanity(data: SanityFeatureTableSection, db: SanityDataset) {
        return new FeatureTableSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                featureTable: FeatureTable.fromSanity(data.featureTable, db),
            })
        );
    }
}

export class LinkPanelsSection extends SectionBase {
    readonly panels: LinkPanelWithIcon[];

    constructor(props: PropsOf<LinkPanelsSection>) {
        super(props);
        this.panels = props.panels;
    }

    static override fromSanity(data: SanityLinkPanelsSection, db: SanityDataset) {
        return new LinkPanelsSection({
            ...super.fromSanity(data, db),
            panels: data.panels.map((x) => LinkPanelWithIcon.fromSanity(x, db)),
        });
    }
}

export const deploymentPageSchemaName = "deploymentPage";

const introSectionSchemaName = `${deploymentPageSchemaName}_introSection`;
const featureTableSectionSchemaName = `${deploymentPageSchemaName}_featureTableSection`;
const linkPanelsSectionSchemaName = `${deploymentPageSchemaName}_linkPanelsSection`;

const introSectionSchema = defineType({
    name: introSectionSchemaName,
    title: "Intro Section",
    type: "object",
    fields: [
        ...titleBodyIconFields,
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
        ...titleBodyIconFields,
        defineField({
            name: "featureTable",
            title: "Feature Table",
            type: featureTableSchemaName,
            validation: required,
        }),
        isVisibleField,
    ],
});

const linkPanelsSectionSchema = defineType({
    name: linkPanelsSectionSchemaName,
    title: "Link Panels Section",
    type: "object",
    fields: [
        ...titleBodyIconFields,
        defineField({
            name: "panels",
            title: "Panels",
            type: "array",
            of: [{ type: linkPanelWithIconSchemaName }],
            validation: (rule) => rule.required().length(3),
        }),
        isVisibleField,
    ],
});

const deploymentPageSchema = defineType({
    name: deploymentPageSchemaName,
    title: "Deployment Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            type: introSectionSchemaName,
            options: collapsible,
            validation: required,
        }),
        defineField({
            name: "featureTableSection",
            title: "Feature Table Section",
            type: featureTableSectionSchemaName,
            options: collapsible,
            validation: required,
        }),
        defineField({
            name: "linkPanelsSection",
            title: "Link Panels Section",
            type: linkPanelsSectionSchemaName,
            options: collapsible,
            validation: required,
        }),
        defineField({
            name: "finalSection",
            title: "Final Section",
            type: conclusionSectionSchemaName,
            options: collapsible,
            validation: required,
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

export const deploymentPageSchemas = [
    introSectionSchema, featureTableSectionSchema, linkPanelsSectionSchema, deploymentPageSchema,
];
