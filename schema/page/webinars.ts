import { defineField, defineType } from "@sanity/types";
import { collapsibleOptions, isVisibleField, pageTitleField, requiredRule, SanityVisibleToggle, sectionIconField, titleAndBodyFields } from "../common-fields";
import { SanityTechnicolorBlock, TechnicolorBlock } from "../component/technicolor-block";
import { SanityDataset, SanityReference } from "../sanity-core";
import { ParagraphWithHighlights, RichText, SanityTitleAndBody, TitleAndBody, titleAndBodySchemaName } from "../text";
import { PropsOf } from "../util";
import { SanityWebinar, Webinar } from "../webinar";
import { SanityPage } from "./common";

export interface SanityWebinarsPage extends SanityPage {
    introSection: SanityIntroSection;
    featuredWebinarsSection: SanityFeaturedWebinarsSection;
    exploreWebinarsSection: SanityExploreWebinarsSection;
}

export interface SanityIntroSection extends SanityTitleAndBody {
    featuredWebinar?: SanityReference<SanityWebinar>;
}

export interface SanityFeaturedWebinarsSection extends SanityTechnicolorBlock, SanityVisibleToggle {
    featuredWebinars?: SanityReference<SanityWebinar>[];
}

export interface SanityExploreWebinarsSection extends SanityTechnicolorBlock, SanityVisibleToggle {}

export class WebinarsPage {
    readonly introSection: IntroSection;
    readonly featuredWebinarsSection?: FeaturedWebinarsSection;
    readonly exploreWebinarsSection?: ExploreWebinarsSection;

    constructor(data: SanityWebinarsPage, db: SanityDataset) {
        this.introSection = IntroSection.fromSanityIntroSection(data.introSection, db);
        this.featuredWebinarsSection = data.featuredWebinarsSection.isVisible ? FeaturedWebinarsSection.fromSanityFeaturedWebinarsSection(data.featuredWebinarsSection, db) : undefined;
        this.exploreWebinarsSection = data.exploreWebinarsSection.isVisible ? ExploreWebinarsSection.fromSanityExploreWebinarsSection(data.exploreWebinarsSection, db) : undefined;
    }
}

export class IntroSection extends TitleAndBody {
    featuredWebinar?: Webinar;

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.featuredWebinar = props.featuredWebinar;
    }

    static fromSanityIntroSection(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection(Object.assign(TitleAndBody.fromSanityTitleAndBody(data), {
            featuredWebinar: data.featuredWebinar ? Webinar.fromSanity(db.resolveRef(data.featuredWebinar), db) : undefined,
        }));
    }
}

export class FeaturedWebinarsSection extends TechnicolorBlock {
    featuredWebinars?: Webinar[];

    constructor(props: PropsOf<FeaturedWebinarsSection>) {
        super(props);
        this.featuredWebinars = props.featuredWebinars;
    }

    static fromSanityFeaturedWebinarsSection(data: SanityFeaturedWebinarsSection, db: SanityDataset) {
        return new FeaturedWebinarsSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            featuredWebinars: data.featuredWebinars ? data.featuredWebinars.map(x => Webinar.fromSanity(db.resolveRef(x), db)) : undefined,
        }));
    }
}

export class ExploreWebinarsSection extends TechnicolorBlock {
    constructor(props: PropsOf<ExploreWebinarsSection>) {
        super(props);
    }

    static fromSanityExploreWebinarsSection(data: SanityTechnicolorBlock, db: SanityDataset) {
        return new ExploreWebinarsSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {}));
    }
}

export const webinarsPageSchemaName = "webinarsPage";
const introSectionSchemaName = `${webinarsPageSchemaName}_introSection`;
const featuredWebinarsSectionSchemaName = `${webinarsPageSchemaName}_featuredWebinarsSection`;
const exploreWebinarsSectionSchemaName = `${webinarsPageSchemaName}_exploreWebinarsSection`;

const introSectionSchema = defineType({
    name: introSectionSchemaName,
    title: "Section",
    type: "object",
    fields: [
        ...titleAndBodyFields,
        isVisibleField,
    ],
});

const featuredWebinarsSectionSchema = defineType({
    name: featuredWebinarsSectionSchemaName,
    title: "Section",
    type: "object",
    fields: [
        ...titleAndBodyFields,
        sectionIconField,
        isVisibleField,
    ],
});

const exploreWebinarsSectionSchema = defineType({
    name: exploreWebinarsSectionSchemaName,
    title: "Section",
    type: "object",
    fields: [
        ...titleAndBodyFields,
        sectionIconField,
        isVisibleField,
    ],
});

const webinarsPageSchema = defineType({
    name: webinarsPageSchemaName,
    title: "Webinars Page",
    type: "document",
    fields: [
        pageTitleField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            description: "The primary featured webinar will be displayed in this section",
            type: introSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "featuredWebinarsSection",
            title: "Featured Webinars Section",
            description: "The secondary featured webinars will be displayed in this section",
            type: featuredWebinarsSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "exploreWebinarsSection",
            title: "Explore Webinars Section",
            description: "A searchable list of all our webinars will be displayed in this section",
            type: exploreWebinarsSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "Webinars Page" }),
    },
});

export const webinarsPageSchemas = [introSectionSchema, featuredWebinarsSectionSchema, exploreWebinarsSectionSchema, webinarsPageSchema];
