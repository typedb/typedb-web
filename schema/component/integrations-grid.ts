import { DashboardIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, SanityDocument } from "@sanity/types";
import { CodeSnippetShort, codeSnippetShortSchemaName, isCodeSnippetShort } from "../code";
import { actionsFieldOptional, bodyFieldRichText, imageFieldOptional, isVisibleField, linkFieldOptional, nameField, requiredRule, SanityVisibleToggle, sectionIconField, sectionIconFieldOptional, tagsField, titleBodyIconFields, titleFieldOptional, titleFieldWithHighlights } from "../common-fields";
import { Illustration, illustrationFieldOptional, illustrationFieldTargetTypes, illustrationFromSanity, SanityIllustration } from "../illustration";
import { SanityImageRef } from "../image";
import { Link, SanityLink, SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import { SanityDataset, SanityImage, SanityReference } from "../sanity-core";
import { BodyTextField, PortableText } from "../text";
import { PropsOf } from "../util";
import { SanitySectionBase, SectionBase } from "./section";

export interface SanityIntegrationsGridSection extends SanitySectionBase, SanityVisibleToggle {
    primary: SanityIntegration[];
    secondary: SanityIntegration[];
    requestLink?: SanityTextLink;
}

export interface SanityIntegration extends SanityVisibleToggle {
    name: string;
    image?: SanityImage;
    link?: SanityReference<SanityLink>;
    tags: string[];
}

export class Integration {
    readonly name: string;
    readonly imageURL?: string;
    readonly link?: Link;
    readonly tags: string[];

    constructor(props: PropsOf<Integration>) {
        this.name = props.name;
        this.imageURL = props.imageURL;
        this.link = props.link;
        this.tags = props.tags;
    }

    static fromSanity(data: SanityIntegration, db: SanityDataset) {
        return new Integration({
            name: data.name,
            imageURL: data.image && db.resolveRef(data.image.asset).url,
            link: data.link ? Link.fromSanityLinkRef(data.link, db) : undefined,
            tags: data.tags,
        });
    }
}

export class IntegrationsGridSection extends SectionBase {
    readonly primary: Integration[];
    readonly secondary: Integration[];
    readonly requestLink?: TextLink;

    constructor(props: PropsOf<IntegrationsGridSection>) {
        super(props);
        this.primary = props.primary;
        this.secondary = props.secondary;
        this.requestLink = props.requestLink;
    }

    static override fromSanity(data: SanityIntegrationsGridSection, db: SanityDataset) {
        const visiblePrimaries = data.primary.filter((x) => x.isVisible);
        const visibleSecondaries = data.secondary.filter((x) => x.isVisible);
        return new IntegrationsGridSection(Object.assign(SectionBase.fromSanity(data, db), {
            primary: visiblePrimaries.map(x => Integration.fromSanity(x, db)),
            secondary: visibleSecondaries.map(x => Integration.fromSanity(x, db)),
            requestLink: data.requestLink ? TextLink.fromSanityTextLink(data.requestLink, db) : undefined,
        }));
    }
}

export const integrationSchemaName = `integration`;

const integrationSchema = defineType({
    name: integrationSchemaName,
    title: "Integration",
    type: "object",
    fields: [
        nameField,
        imageFieldOptional,
        linkFieldOptional,
        tagsField,
        isVisibleField,
    ],
});

export const integrationsGridSectionSchemaName = `integrationsGridSection`;

const integrationsGridSectionSchema = defineType({
    name: integrationsGridSectionSchemaName,
    title: "Integrations Grid Section",
    type: "document",
    icon: DashboardIcon,
    fields: [
        ...titleBodyIconFields,
        actionsFieldOptional,
        isVisibleField,
        defineField({
            name: "primary",
            title: "Primary",
            type: "array",
            of: [{ type: integrationSchemaName }],
        }),
        defineField({
            name: "secondary",
            title: "Secondary",
            type: "array",
            of: [{ type: integrationSchemaName }],
        }),
        defineField({
            name: "requestLink",
            title: "Request Link",
            type: textLinkSchemaName,
        }),
        illustrationFieldOptional,
    ],
});

export const integrationsGridSchemas = [integrationSchema, integrationsGridSectionSchema];
