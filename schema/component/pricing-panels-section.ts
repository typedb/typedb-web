import { CreditCardIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import {
    isVisibleField, requiredRule, sectionPreview, sectionTextAlignField, sectionWidthField, titleBodyActionsFields,
} from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { PricingPanel, pricingPanelSchemaName, SanityPricingPanel } from "./pricing-panel";
import { SanitySectionCore, SectionCore } from "./section";

export const pricingPanelsSectionSchemaName = "pricingPanelsSection";

export interface SanityPricingPanelsSection extends SanitySectionCore {
    panelsCaption?: string;
    panels: SanityPricingPanel[];
}

export class PricingPanelsSection extends SectionCore {
    readonly panelsCaption?: string;
    readonly panels: PricingPanel[];

    constructor(props: PropsOf<PricingPanelsSection>) {
        super(props);
        this.panelsCaption = props.panelsCaption;
        this.panels = props.panels;
    }

    static override fromSanity(data: SanityPricingPanelsSection, db: SanityDataset) {
        return new PricingPanelsSection(
            Object.assign(SectionCore.fromSanity(data, db), {
                panelsCaption: data.panelsCaption,
                panels: (data.panels || []).map((x) => PricingPanel.fromSanity(x, db)),
            })
        );
    }
}

const pricingPanelsSectionSchema = defineType({
    name: pricingPanelsSectionSchemaName,
    title: "Product Cards",
    icon: CreditCardIcon,
    type: "object",
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "panelsCaption",
            title: "Cards Caption (optional)",
            description: "Small heading rendered directly above the cards",
            type: "string",
        }),
        defineField({
            name: "panels",
            title: "Cards",
            description: "One card per product, rendered side by side",
            type: "array",
            of: [{ type: pricingPanelSchemaName }],
            validation: requiredRule,
        }),
        sectionWidthField,
        sectionTextAlignField,
        isVisibleField,
    ],
    preview: sectionPreview("Product Cards"),
});

export const pricingPanelsSectionSchemas = [pricingPanelsSectionSchema];
