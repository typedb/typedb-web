import { defineField, defineType } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import {
    bodyFieldRichText,
    collapsibleOptions,
    optionalActionsField,

    titleFieldWithHighlights,
} from "../common-fields";
import { FeatureGridSection, featureGridSectionSchemaName, SanityFeatureGridSection } from "../component/feature-grid";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SanityTitleBodyActions, TitleBodyActions } from "../text";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const introSection = "introSection";
const featureSections = "featureSections";
const finalSection = "finalSection";

export interface SanityFeaturesPage extends SanityPage {
    [introSection]: SanityIntroSection;
    [featureSections]: SanityFeatureGridSection[];
    [finalSection]: SanityConclusionSection;
}

interface SanityIntroSection extends SanityTitleBodyActions {
    userLogos: SanityReference<SanityOrganisation>[];
}

export class FeaturesPage extends Page {
    readonly [introSection]: IntroSection;
    readonly [featureSections]: FeatureGridSection[];
    readonly [finalSection]: ConclusionSection;

    constructor(data: SanityFeaturesPage, db: SanityDataset) {
        super(data, db);
        this.introSection = IntroSection.fromSanityIntroSection(data.introSection, db);
        this.featureSections = data.featureSections.map((x) => FeatureGridSection.fromSanity(x, db));
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

class IntroSection extends TitleBodyActions {
    readonly userLogos: Organisation[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.userLogos = props.userLogos;
    }

    static fromSanityIntroSection(data: SanityIntroSection, db: SanityDataset) {
        return Object.assign(TitleBodyActions.fromSanityTitleBodyActions(data, db), {
            userLogos: data.userLogos.map((x) => new Organisation(db.resolveRef(x), db)),
        });
    }
}

export const featuresPageSchemaName = "featuresPage";

const introSectionSchemaName = `${featuresPageSchemaName}_introSection`;

const introSectionSchema = defineType({
    name: introSectionSchemaName,
    title: "Intro Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        optionalActionsField,
        Object.assign({}, organisationLogosField, { name: "userLogos", title: "User Logos" }) as any,
    ],
});

const featuresPageSchema = defineType({
    name: featuresPageSchemaName,
    title: "Features Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: introSection,
            title: "Intro Section",
            type: introSectionSchemaName,
            options: collapsibleOptions,
        }),
        defineField({
            name: featureSections,
            title: "Feature Sections",
            type: "array",
            of: [{ type: featureGridSectionSchemaName }],
        }),
        defineField({
            name: finalSection,
            title: "Final Section",
            type: conclusionSectionSchemaName,
            options: collapsibleOptions,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Features Page" }) },
});

export const featuresPageSchemas = [featuresPageSchema, introSectionSchema];
