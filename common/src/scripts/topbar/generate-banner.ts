import { escapeHtml, linkHtml } from "../shared";
import { SiteBanner } from "./schema";

export const generateBanner = (banner: SiteBanner, urlPrefix: string = "") => {
    if (!banner.isEnabled) {
        return "";
    }

    const spans = banner.spans
        .map(({ marks, text }) => {
            const tag = marks.includes("strong") ? "strong" : "span";
            return `<${tag}>${escapeHtml(text)}</${tag}>`;
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
