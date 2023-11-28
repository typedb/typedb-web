import { Link } from "./link";
import { escapeHtml } from "./utils";

export const generateLink = ({
    content,
    link,
    urlPrefix,
    attributes = {},
}: {
    link: Link | null;
    content: string;
    urlPrefix: string;
    attributes?: Record<string, string>;
}) => {
    if (link) {
        attributes["href"] = createHref(link, urlPrefix);
        attributes["data-type"] = link.type;
        if (link.opensNewTab) {
            attributes["target"] = "_blank";
        }
    }
    const attributesPart = Object.entries(attributes)
        .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
        .join(" ");
    return `<a ${attributesPart}>${content}</a>`;
};

const createHref = (link: Link, urlPrefix: string) => {
    try {
        return new URL(link.destination.current, urlPrefix).toString();
    } catch {
        return link.destination.current;
    }
};
