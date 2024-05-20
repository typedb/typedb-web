import { escapeHtml, generateLink } from "../shared";
import { SiteBannerData } from "./topbar-query";

export const generateBanner = (banner: SiteBannerData, urlPrefix: string) => {
    if (!banner.isEnabled) {
        return "";
    }

    const spans = banner.spans
        .map(({ marks, text }) => {
            const tag = marks.includes("strong") ? "strong" : "span";
            return `<${tag}>${escapeHtml(text)}</${tag}>`;
        })
        .join("");
    const content = `<p class="text-aside">${spans}</p>`;

    return generateLink({
        content,
        link: banner.link,
        urlPrefix,
        attributes: { class: "td-topbar-banner" },
    });
};
