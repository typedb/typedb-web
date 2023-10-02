import { BlockContentIcon, LinkIcon, PlayIcon } from "@sanity/icons";
import { ArrayRule, defineField, RuleDef } from "@sanity/types";

// IMPORTANT: Do not reference other schema files from this file, as this generally creates cyclic dependencies.

export const requiredRule = (rule: RuleDef<any>) => rule.required();

export const collapsibleOptions = {
    collapsible: true,
    collapsed: true,
};

export const nameFieldName = "name";

export const nameField = defineField({
    name: nameFieldName,
    title: "Name",
    type: "string",
    validation: requiredRule,
});

export const textFieldName = "text";

export const plainTextField = defineField({
    name: textFieldName,
    title: "Text",
    type: "string",
});

export const titleFieldName = "title";

export const titleField = defineField({
    name: titleFieldName,
    title: "Title",
    type: "string",
    validation: requiredRule,
});

export const pageTitleField = Object.assign({}, titleField, {
    title: "Web Page Title",
    description: "Displayed in the browser's address bar",
});

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
    validation: requiredRule,
});

export const iconFieldName = "icon";

export const sectionIconField = defineField({
    name: iconFieldName,
    title: "Icon",
    type: "reference",
    to: [{ type: "sectionIcon" }],
    validation: requiredRule,
    options: { disableNew: true },
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
    validation: requiredRule,
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
    validation: requiredRule,
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
    validation: requiredRule,
});

export const videoEmbedFieldName = "videoEmbed";

export const videoEmbedField = defineField({
    name: videoEmbedFieldName,
    title: "Video Embed",
    type: "reference",
    to: [{ type: "videoEmbed" }],
    validation: requiredRule,
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

export const linkPanelsFieldName = "links";

export const linkPanelsField = defineField({
    name: linkPanelsFieldName,
    title: "Links",
    type: "array",
    of: [{ type: "linkPanel" }],
    validation: (rule: ArrayRule<any>) => rule.length(3),
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
    validation: requiredRule,
});

export const sectionIdFieldName = "sectionId";

export const sectionIdField = defineField({
    name: sectionIdFieldName,
    title: "Section ID",
    type: "string",
});
