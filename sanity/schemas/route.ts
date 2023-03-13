import { LinkIcon } from "@sanity/icons";
import { defineField, defineType, ReferenceRule, SlugRule } from "sanity";

export const routeSchema = defineType({
    name: "route",
    type: "document",
    icon: LinkIcon,
    fields: [
        defineField({
            name: "route",
            title: "Route",
            type: "slug",
            initialValue: {current: "/"},
            validation: (rule: SlugRule) => rule.custom((value, _context) => {
                if (!value?.current) return "Required";
                if (!value.current.startsWith("/") || value.current.startsWith("//")) return "Must start with a single '/'";
                return true;
            }),
        }),
        defineField({
            name: "destination",
            title: "Destination",
            type: "reference",
            to: [{type: "page"}],
            validation: (rule: ReferenceRule) => rule.required(),
        }),
    ],
    preview: {
        select: { route: "route.current", destination: "destination.title" },
        prepare: (selection) => ({ title: selection.route, subtitle: selection.destination }),
    },
});
