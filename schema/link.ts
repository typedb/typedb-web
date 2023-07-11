import { LinkIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument, Slug, SlugRule } from "@sanity/types";
import { comingSoonField, linkField, plainTextField, requiredRule, titleField, titleFieldName } from "./common-fields";
import { SanityDataset, SanityReference } from "./sanity-core";

export type LinkType = "route" | "external";
export type SanityLinkType = LinkType | "autoDetect";

export interface SanityLink extends SanityDocument {
    destination: Slug;
    type: SanityLinkType;
    opensNewTab: boolean;
}

export interface SanityTextLink {
    text: string;
    link: SanityReference<SanityLink>;
    comingSoon: boolean;
}

export class Link {
    readonly destination: string;
    readonly type: LinkType;
    readonly opensNewTab: boolean;

    constructor(props: { destination: string, type: LinkType, opensNewTab: boolean }) {
        this.destination = props.destination;
        this.type = props.type;
        this.opensNewTab = props.opensNewTab;
    }

    static fromSanityLink(data: SanityLink): Link {
        let type: LinkType;
        if (data.type === "autoDetect") {
            try {
                new URL(data.destination.current);
                type = "external";
            } catch {
                type = "route";
            }
        } else {
            type = data.type;
        }
        return new Link({ destination: data.destination.current, type: type, opensNewTab: data.opensNewTab });
    }

    static fromAddress(address: string): Link {
        let type: LinkType;
        try {
            new URL(address);
            type = "external";
        } catch {
            type = "route";
        }
        return new Link({ destination: address, type: type, opensNewTab: type === "external" });
    }

    static fromSanityLinkRef(ref: SanityReference<SanityLink>, db: SanityDataset) {
        return Link.fromSanityLink(db.resolveRef(ref));
    }

    isForExternalDomain(): boolean {
        return this.destination.startsWith("http");
    }
}

export class TextLink extends Link {
    readonly text: string;
    readonly comingSoon: boolean;

    constructor(props: { text: string, destination: string, type: LinkType, opensNewTab: boolean, comingSoon: boolean }) {
        super(props);
        this.text = props.text;
        this.comingSoon = props.comingSoon;
    }

    static fromSanityTextLink(data: SanityTextLink, db: SanityDataset) {
        const link = Link.fromSanityLinkRef(data.link, db);
        return new TextLink({ text: data.text, destination: link.destination, type: link.type, opensNewTab: link.opensNewTab, comingSoon: data.comingSoon });
    }
}

export const linkSchemaName = "link";

const linkSchema = defineType({
    name: linkSchemaName,
    title: "Link",
    icon: LinkIcon,
    type: "document",
    fields: [
        Object.assign({}, titleField, { title: "Description" }),
        defineField({
            name: "destination",
            title: "Link Address",
            type: "slug",
            validation: (rule: SlugRule) => rule.custom((value) => {
                if (!value?.current) return "Required";
                if (value.current.startsWith("http://")) return true;
                if (value.current.startsWith("https://")) return true;
                if (value.current.startsWith("/")) return true;
                if (value.current.startsWith("?")) return true;
                return "URL must start with either '/', '?', 'http://' or 'https://'";
            }),
        }),
        defineField({
            name: "type",
            title: "Link Type",
            type: "string",
            initialValue: "autoDetect",
            options: {
                list: [
                    { title: "Auto-detect", value: "autoDetect" },
                    { title: "Route", value: "route" },
                    { title: "External Link", value: "external" },
                ],
                layout: "radio",
                direction: "horizontal",
            },
        }),
        defineField({
            name: "opensNewTab",
            title: "Opens in New Tab",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: { title: titleFieldName, destination: "destination.current" },
        prepare: (selection) => ({ title: selection.title, subtitle: selection.destination }),
    },
});

export const textLinkSchemaName = "textLink";

export const textLinkSchema = defineType({
    name: textLinkSchemaName,
    type: "object",
    title: "Text Link",
    icon: LinkIcon,
    fields: [
        Object.assign({}, plainTextField, { initialValue: "Learn more", validation: requiredRule }),
        linkField,
        comingSoonField,
    ],
    preview: {
        select: { text: "text", destination: "link.destination.current" },
        prepare: (selection) => ({ title: selection.text, subtitle: selection.destination }),
    },
});

export const linkSchemas = [linkSchema, textLinkSchema];
