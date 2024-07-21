import { BlockContentIcon, LinkIcon, PlayIcon } from "@sanity/icons";
import { ArrayRule, defineField, RuleDef } from "@sanity/types";
import { SanityImageRef } from "./image";
import { SanityReference } from "./sanity-core";

// IMPORTANT: Do not reference other schema files from this file, as this generally creates cyclic dependencies.

export interface SanityIconField {
    icon: SanityReference<SanityImageRef>;
}

export const required = (rule: RuleDef<any>) => rule.required();

export const collapsible = {
    collapsible: true,
    collapsed: true,
};

export const nameFieldName = "name";

export const nameFieldOptional = defineField({
    name: nameFieldName,
    title: "Name",
    type: "string",
});

export const nameField = Object.assign({}, nameFieldOptional, { validation: required });

export const textFieldName = "text";

export const plainTextField = defineField({
    name: textFieldName,
    title: "Text",
    type: "string",
});

export const titleFieldName = "title";

export const titleFieldOptional = defineField({
    name: titleFieldName,
    title: "Title",
    type: "string",
});

export const titleField = Object.assign({}, titleFieldOptional, { validation: required });

export const subtitleFieldName = "subtitle";

export const subtitleFieldOptional = defineField({
    name: subtitleFieldName,
    title: "Subtitle",
    type: "string",
});

export const subtitleField = Object.assign({}, subtitleFieldOptional, { validation: required });

export const titleFieldWithHighlights = defineField({
    name: titleFieldName,
    title: "Title",
    description: "Text marked as 'bold' will instead be rendered in this section's theme color",
    type: "array",
    of: [{ type: "block" }],
    validation: (rule: ArrayRule<any>) =>
        rule.required().custom((value, _context) => {
            return value?.length === 1 ? true : "Must contain exactly one paragraph";
        }),
});

export function titleWithHighlightsPreview(value: any[]): string {
    return ((value || [])[0]?.children.map((x: any) => x.text).join("") as string) || "Untitled";
}

export const textFieldWithHighlights = defineField({
    name: textFieldName,
    title: "Text",
    description: "Text marked as 'bold' will instead be rendered in the highlight color",
    type: "array",
    of: [{ type: "block" }],
    validation: (rule: ArrayRule<any>) =>
        rule.custom((value, _context) => {
            return !value || value.length <= 1 ? true : "Must contain exactly one paragraph";
        }),
});

export const bodyFieldName = "body";

export const bodyFieldRichText = defineField({
    name: bodyFieldName,
    type: "array",
    icon: BlockContentIcon,
    of: [{ type: "block" }],
});

export const titleAndBodyFields = [titleFieldWithHighlights, bodyFieldRichText];

export const slugFieldName = "slug";

export const slugField = defineField({
    name: slugFieldName,
    title: "Slug",
    description: "URL fragment for this resource displayed in the browser's address bar",
    type: "slug",
    validation: required,
});

export const iconFieldName = "icon";

export const sectionIconFieldOptional = defineField({
    name: iconFieldName,
    title: "Icon",
    type: "reference",
    to: [{ type: "sectionIcon" }],
    options: { disableNew: true },
});

export const sectionIconField = Object.assign({}, sectionIconFieldOptional, {
    validation: required,
});

export const titleBodyIconFields = [...titleAndBodyFields, sectionIconField];

export const descriptionFieldName = "description";

export const descriptionField = defineField({
    name: descriptionFieldName,
    title: "Description",
    type: "string",
});

export const descriptionFieldRichText = defineField({
    name: descriptionFieldName,
    title: "Description",
    type: "array",
    of: [{ type: "block" }],
});

export const buttonFieldName = "button";

export const buttonField = defineField({
    name: buttonFieldName,
    title: "Button",
    type: "button",
    icon: LinkIcon,
    validation: required,
});

export const actionsFieldName = "actions";

export const optionalActionsField = defineField({
    name: actionsFieldName,
    title: "Actions (optional)",
    type: "actions",
    icon: PlayIcon,
});

export const routeFieldName = "route";

export const routeField = defineField({
    name: routeFieldName,
    title: "Route",
    type: "slug",
    description: "URL fragment for this page. e.g. typedb-studio",
    validation: required,
});

export const linkFieldName = "link";

export const linkField = defineField({
    name: linkFieldName,
    type: "reference",
    to: [{ type: "link" }],
    // TODO: should be required - but isn't in certain cases. Rethink
});

export const textLinkField = defineField({
    name: linkFieldName,
    title: "Link",
    type: "textLink",
});

export const learnMoreLinkFieldName = "learnMoreLink";

export const learnMoreLinkField = Object.assign({}, linkField, {
    name: learnMoreLinkFieldName,
    title: "'Learn More' link",
});

export const comingSoonField = defineField({
    name: "comingSoon",
    title: "Coming soon?",
    description: "If set, this link will be disabled and 'Coming Soon' text will be shown",
    type: "boolean",
    initialValue: false,
    validation: required,
});

export const imageFieldName = "image";

export const imageFieldOptional = defineField({
    name: imageFieldName,
    title: "Image",
    type: "image",
});

export const imageField = Object.assign({}, imageFieldOptional, { validation: required });

export const videoEmbedFieldName = "videoEmbed";

export const videoEmbedField = defineField({
    name: videoEmbedFieldName,
    title: "Video Embed",
    type: "reference",
    to: [{ type: "videoEmbed" }],
    validation: required,
});

export const keyPointsFieldName = "keyPoints";

export const keyPointsField = (count?: number) =>
    defineField({
        name: keyPointsFieldName,
        title: "Key Points",
        type: "array",
        of: [{ type: "keyPoint" }],
        validation: count != null ? (rule: ArrayRule<any>) => rule.length(count) : undefined,
    });

export const keyPointsWithIconsField = (count?: number) =>
    defineField({
        name: keyPointsFieldName,
        title: "Key Points",
        type: "array",
        of: [{ type: "keyPointWithIcon" }],
        validation: count != null ? (rule: ArrayRule<any>) => rule.length(count) : undefined,
    });

export interface SanityVisibleToggle {
    isVisible: boolean;
}

export const isVisibleFieldName = "isVisible";

export const isVisibleField = defineField({
    name: isVisibleFieldName,
    title: "Is Visible",
    type: "boolean",
    initialValue: true,
    validation: required,
});

export const authorFieldName = "author";

export const authorField = defineField({
    name: authorFieldName,
    title: "Author",
    type: "reference",
    to: [{type: "person"}],
    validation: required,
});

export const resourcesFieldName = "resources";

export const resourcesFieldOptional = defineField({
    name: "resources",
    title: "Resources",
    type: "array",
    of: [{
        type: "reference",
        to: [
            {type: "fundamentalArticle"}, {type: "applicationArticle"}, {type: "blogPost"},
            {type: "lecture"}, {type: "paper"}, {type: "liveEvent"}, {type: "genericResource"}
        ],
    }],
});

export const resourcesField = Object.assign({}, resourcesFieldOptional, { validation: required });
