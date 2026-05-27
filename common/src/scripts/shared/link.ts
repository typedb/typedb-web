import { Link } from "./schema";
import { escapeHtml } from "./utils";

export const linkHtml = ({ content, link, id, urlPrefix, attributes = {} }: {
    link: Link | null;
    content: string;
    id: string;
    urlPrefix: string;
    attributes?: Record<string, string>;
}) => {
    if (link) {
        attributes["href"] = href(link, urlPrefix);
        attributes["data-type"] = link.type;
        if (link.opensNewTab) {
            attributes["target"] = "_blank";
        }
    }
    const attributesPart = Object.entries(attributes)
        .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
        .join(" ");
    return `<a ${attributesPart} id="${id}">${content}</a>`;
};

const href = (link: Link, urlPrefix: string) => {
    const dest = link.destination.current;
    if (dest.startsWith("#") || dest.startsWith("?")) {
        return dest;
    }
    try {
        return new URL(dest, urlPrefix).toString();
    } catch {
        return dest;
    }
};
