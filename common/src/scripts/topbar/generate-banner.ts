import { generateLink } from "./generate-link";
import { SiteBanner } from "./topbar-query";
import { escapeHtml } from "./utils";

export const generateBanner = (banner: SiteBanner, urlPrefix: string) => {
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
        urlPrefix: urlPrefix,
        attributes: { class: "td-topbar-banner" },
    });
};
