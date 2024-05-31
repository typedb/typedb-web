import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { linkField, nameField, nameFieldName, required, titleField } from "../common-fields";
import { Link } from "../link";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { genericResourceSchemaName, SanityGenericResource } from "./sanity";

export class GenericResource {
    readonly title: string;
    readonly description: string;
    readonly link: Link;
    readonly linkText: string;

    constructor(props: PropsOf<GenericResource>) {
        this.title = props.title;
        this.description = props.description;
        this.link = props.link;
        this.linkText = props.linkText;
    }

    static fromSanity(data: SanityGenericResource, db: SanityDataset): GenericResource {
        return new GenericResource({
            title: data.title,
            description: data.description,
            link: Link.fromSanityLinkRef(data.link, db)!,
            linkText: data.linkText,
        });
    }
}

export const genericResourceSchema = defineType({
    name: genericResourceSchemaName,
    title: "Generic Resource",
    icon: LinkIcon,
    type: "document",
    fields: [
        nameField,
        titleField,
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            validation: required,
        }),
        Object.assign({}, linkField, { validation: required }),
        defineField({
            name: "linkText",
            title: "Link Text",
            type: "string",
            validation: required,
        }),
    ],
    preview: {
        select: { name: nameFieldName, linkDestination: "link.destination.current", linkRoute: "link.route.current" },
        prepare: (selection) => ({
            title: selection.name,
            subtitle: selection.linkDestination || selection.linkRoute,
        }),
    },
});
