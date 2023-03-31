import { defineField, defineType, SanityDocument } from "@sanity/types";
import { buttonSchemaName } from "../action";
import { bodyFieldRichText, collapsibleOptions, iconField, keyPointsField, linkField, linkFieldName, optionalActionsField, pageTitleField, titleAndBodyFields, titleBodyIconFields, titleField, titleFieldWithHighlights, videoURLField } from "../common-fields";
import { formEmailOnlyComponentSchemaName } from "../form-component";
import { OrganisationLogosStrip, organisationLogosStripField, SanityOrganisationLogosStrip } from "../organisation-logos-strip";
import { SanityDataset } from "../sanity-core";
import { socialMedias } from "../social-media";
import { testimonialSchemaName } from "../testimonial";
import { BodyText, ParagraphWithHighlights, RichText, SanityBodyText, SanityTitleBodyActionsSection, SanityTitleWithHighlights, TitleBodyActionsSection, TitleWithHighlights } from "../text";

import { schemaName } from "../util";
import { displayedSectionsField, Page, SanityPage } from "./common";

const displayedSections = "displayedSections";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    features: { id: "featuresSection", title: "Features" },
    useCases: { id: "useCasesSection", title: "Use Cases" },
    tooling: { id: "toolingSection", title: "Tooling" },
    cloud: { id: "cloudSection", title: "Cloud" },
    community: { id: "communitySection", title: "Community" },
    testimonials: { id: "testimonialsSection", title: "Testimonials" },
    conclusion: { id: "conclusionSection", title: "Conclusion" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = typeof sections[SectionKey]["id"];

interface SanitySection<CONTENT extends SanityDocument> extends SanityTitleWithHighlights, SanityBodyText {
    visualContent: CONTENT;
}

export interface SanityHomePage extends SanityPage {
    [displayedSections]: SectionID[];
    [sections.intro.id]: SanitySection<SanityOrganisationLogosStrip>;
    [sections.features.id]: SanitySection<SanityOrganisationLogosStrip>;
    [sections.useCases.id]: SanitySection<SanityOrganisationLogosStrip>;
    [sections.tooling.id]: SanitySection<SanityOrganisationLogosStrip>;
    [sections.cloud.id]: SanitySection<SanityOrganisationLogosStrip>;
    [sections.community.id]: SanitySection<SanityOrganisationLogosStrip>;
    [sections.testimonials.id]: SanitySection<SanityOrganisationLogosStrip>;
    [sections.conclusion.id]: SanityTitleBodyActionsSection;
}

export class HomePage extends Page {
    readonly [sections.intro.id]?: HomePageSection<OrganisationLogosStrip, SanityOrganisationLogosStrip>;
    readonly [sections.features.id]?: HomePageSection<OrganisationLogosStrip, SanityOrganisationLogosStrip>;
    // readonly [useCasesSection]?: HomePageSection<OrganisationLogosStrip, SanityOrganisationLogosStrip>;
    // readonly [toolingSection]?: HomePageSection<OrganisationLogosStrip, SanityOrganisationLogosStrip>;
    // readonly [cloudSection]?: HomePageSection<OrganisationLogosStrip, SanityOrganisationLogosStrip>;
    // readonly [communitySection]?: HomePageSection<OrganisationLogosStrip, SanityOrganisationLogosStrip>;
    // readonly [testimonialsSection]?: HomePageSection<OrganisationLogosStrip, SanityOrganisationLogosStrip>;
    readonly [sections.conclusion.id]?: TitleBodyActionsSection;

    constructor(data: SanityHomePage, db: SanityDataset) {
        super(data);
        this.introSection = data.displayedSections.includes(sections.intro.id) ? new HomePageSection(data.introSection, db, VisualContentFactory.organisationLogosStrip) : undefined;
        this.featuresSection = data.displayedSections.includes(sections.features.id) ? new HomePageSection(data.featuresSection, db, VisualContentFactory.organisationLogosStrip) : undefined;
        this.conclusionSection = data.displayedSections.includes(sections.conclusion.id) ? new TitleBodyActionsSection(data.conclusionSection) : undefined;
    }
}

class HomePageSection<CONTENT extends VisualContent, SANITY_CONTENT extends SanityDocument> implements TitleWithHighlights, BodyText {
    readonly body: RichText;
    readonly title: ParagraphWithHighlights;
    readonly visualContent: CONTENT;

    constructor(
        data: SanitySection<SANITY_CONTENT>,
        db: SanityDataset,
        visualContentFn: VisualContentFactory.Method<CONTENT, SANITY_CONTENT>
    ) {
        this.body = new RichText(data.body);
        this.title = new ParagraphWithHighlights(data.body);
        this.visualContent = visualContentFn(data.visualContent, db);
    }
}

type VisualContent = OrganisationLogosStrip;

namespace VisualContentFactory {
    export type Method<CONTENT extends VisualContent, SANITY_CONTENT extends SanityDocument> = (sanityContent: SANITY_CONTENT, db: SanityDataset) => CONTENT;

    export const organisationLogosStrip: Method<OrganisationLogosStrip, SanityOrganisationLogosStrip>
        = (data, db) => new OrganisationLogosStrip(data, db);
}

export const homePageSchemaName = schemaName(HomePage);

const sectionSchemaName = (key: SectionKey) => `${homePageSchemaName}_${sections[key].id}`;

const sectionSchema = (key: SectionKey, fields: any[]) => defineType({
    name: sectionSchemaName(key),
    title: `${sections[key].title} Section`,
    type: "object",
    fields: fields,
});

const useCaseSchemaName = `${homePageSchemaName}_useCase`;

const useCaseSchema = defineType({
    name: useCaseSchemaName,
    title: "Use Case",
    type: "object",
    fields: [
        titleField,
        iconField,
        videoURLField,
        bodyFieldRichText,
        Object.assign({}, linkField, { title: "Link to Use Case Page" }),
    ],
});

const sectionSchemas = [
    sectionSchema("intro", [
        ...titleBodyIconFields,
        defineField({
            name: "button",
            title: "Button (optional)",
            type: buttonSchemaName,
        }),
        defineField({
            name: "formEmailOnly",
            title: "Form (email only, optional)",
            type: formEmailOnlyComponentSchemaName,
        }),
        organisationLogosStripField,
    ]),
    sectionSchema("features", [
        ...titleBodyIconFields,
        // featuresField
    ]),
    sectionSchema("useCases", [
        ...titleBodyIconFields,
        defineField({
            name: "useCases",
            title: "Use Cases",
            type: "array",
            of: [{type: useCaseSchemaName}],
        }),
    ]),
    sectionSchema("tooling", [
        ...titleBodyIconFields,
        keyPointsField(3),
    ]),
    sectionSchema("cloud", [
        ...titleBodyIconFields,
        keyPointsField(5),
    ]),
    sectionSchema("community", [
        ...titleBodyIconFields,
        defineField({
            name: "socialMediaLinks",
            title: "Social Media Links",
            type: "array",
            of: [{type: "string"}],
            options: {
                layout: "grid",
                list: Object.entries(socialMedias).map(([id, title]) => ({ value: id, title: title })),
            },
        }),
    ]),
    sectionSchema("testimonials", [
        ...titleBodyIconFields,
        defineField({
            name: "testimonials",
            title: "Testimonials",
            type: "array",
            of: [{type: testimonialSchemaName}],
        }),
    ]),
    sectionSchema("conclusion", [
        ...titleAndBodyFields,
        optionalActionsField,
    ]),
];

const sectionFields = (Object.keys(sections) as SectionKey[]).map(key => defineField({
    name: sections[key].id,
    title: `${sections[key].title} Section`,
    type: sectionSchemaName(key),
    options: collapsibleOptions,
}));

const homePageSchema = defineType({
    name: homePageSchemaName,
    title: "Home Page",
    type: "document",
    fields: [
        pageTitleField,
        displayedSectionsField(sections),
        ...sectionFields,
    ],
    preview: { prepare: (_selection) => ({ title: "Home Page" }), },
});

export const homePageSchemas = [homePageSchema, ...sectionSchemas, useCaseSchema];
