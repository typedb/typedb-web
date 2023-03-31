import { BlockContentIcon, PlayIcon } from "@sanity/icons";
import { ArrayRule, defineField, ReferenceRule, SlugRule, StringRule } from "@sanity/types";

// IMPORTANT: Do not reference other schema files from this file, as this generally creates cyclic dependencies.

export const collapsibleOptions = {
    collapsible: true,
    collapsed: true,
};

export const nameFieldName = "name";

export const nameField = defineField({
    name: nameFieldName,
    title: "Name",
    type: "string",
    validation: (rule: StringRule) => rule.required(),
});

export const titleFieldName = "title";

export const titleField = defineField({
    name: titleFieldName,
    title: "Title",
    type: "string",
    validation: (rule: StringRule) => rule.required(),
});

export const pageTitleField = Object.assign({}, titleField, { description: "Displayed in the browser's address bar" });

export const titleFieldWithHighlights = defineField({
    name: titleFieldName,
    title: "Title",
    description: "Text marked as 'bold' will instead be rendered in this section's theme color",
    type: "array",
    of: [{type: "block"}],
    validation: (rule: ArrayRule<any>) => rule.required().custom((value, _context) => {
        return value?.length === 1 ? true : "Must contain exactly one paragraph";
    }),
});

export function titleWithHighlightsPreview(value: any[]): string {
    return (value || [])[0]?.children.map((x: any) => x.text).join("") as string || "Untitled";
}

export const themeColorField = defineField({
    name: "themeColor",
    title: "Theme Color",
    type: "reference",
    to: [{type: "themeColor"}],
    validation: (rule: ReferenceRule) => rule.required(),
});

export const bodyFieldName = "body";

export const bodyFieldRichText = defineField({
    name: bodyFieldName,
    type: "array",
    icon: BlockContentIcon,
    of: [{type: "block"}],
    validation: (rule: ArrayRule<any>) => rule.required(),
});

export const titleAndBodyFields = [
    titleFieldWithHighlights,
    bodyFieldRichText,
];

export const iconFieldName = "icon";

export const iconField = defineField({
    name: iconFieldName,
    title: "Icon",
    type: "image",
});

export const titleBodyIconFields = [
    ...titleAndBodyFields,
    iconField,
];

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
    initialValue: {current: "/"},
    description: "URL fragment for this page. e.g. /typedb-studio",
    validation: (rule: SlugRule) => rule.custom((value, _context) => {
        if (!value?.current) return "Required";
        if (!value.current.startsWith("/") || value.current.startsWith("//")) return "Must start with a single '/'";
        return true;
    }),
});

export const linkFieldName = "link";

export const linkField = defineField({
    name: linkFieldName,
    type: "reference",
    to: [{type: "link"}],
    validation: (rule: ReferenceRule) => rule.required(),
});

export const videoURLFieldName = "videoURL";

export const videoURLField = defineField({
    name: videoURLFieldName,
    title: "Video URL",
    type: "url",
});

export const keyPointsFieldName = "keyPoints";

export const keyPointsField = (count?: number) => defineField({
    name: keyPointsFieldName,
    title: "Key Points",
    type: "array",
    of: [{type: "keyPoint"}],
    validation: count != null ? ((rule: ArrayRule<any>) => rule.length(count)) : undefined,
})

export const isVisibleFieldName = "isVisible";

export const isVisibleField = defineField({
    name: isVisibleFieldName,
    title: "Is Visible",
    type: "boolean",
    initialValue: true,
});

