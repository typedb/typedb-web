import { LinkIcon } from "@sanity/icons";
import { defineType } from "@sanity/types";
import { descriptionField, descriptionFieldRichText, linkField, nameField, nameFieldName, requiredRule, titleField } from "../common-fields";
import { Link } from "../link";
import { SanityDataset } from "../sanity-core";
import { PortableText } from "../text";
import { PropsOf } from "../util";
import { genericResourceSchemaName, SanityGenericResource } from "./sanity";

export class GenericResource {
    readonly title: string;
    readonly description: PortableText;
    readonly link: Link;

    constructor(props: PropsOf<GenericResource>) {
        this.title = props.title;
        this.description = props.description;
        this.link = props.link;
    }

    static fromSanity(data: SanityGenericResource, db: SanityDataset): GenericResource {
        return new GenericResource({
            title: data.title,
            description: data.description,
            link: Link.fromSanityLinkRef(data.link, db)!,
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
        Object.assign({}, descriptionFieldRichText, { validation: requiredRule }),
        Object.assign({}, linkField, { validation: requiredRule }),
    ],
    preview: {
        select: { name: nameFieldName, linkDestination: "link.destination.current", linkRoute: "link.route.current" },
        prepare: (selection) => ({
            title: selection.name,
            subtitle: selection.linkDestination || selection.linkRoute,
        }),
    },
});
