import { escapeHtml, linkHtml } from "../shared";
import { SiteBanner } from "./schema";

export const generateBanner = (banner: SiteBanner, urlPrefix: string = "") => {
    if (!banner.isEnabled) {
        return "";
    }

    const spans = banner.spans
        .map(({ marks, text }) => {
            const tag = marks.includes("strong") ? "strong" : "span";
            const content = marks.includes("em") ? `<em>${escapeHtml(text)}</em>` : escapeHtml(text);
            return `<${tag}>${content}</${tag}>`;
        })
        .join("");
    const content = `<p>${spans}</p>`;

    return linkHtml({
        content,
        link: banner.link,
        id: `site-banner`,
        urlPrefix,
        attributes: { class: "td-topbar-banner" },
    });
};
