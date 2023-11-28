import { escapeHtml, generateLink } from "../shared";
import { generateBanner } from "./generate-banner";
import { generateMenuPanel } from "./generate-menu-panel";
import { TopbarData } from "./topbar-query";

interface GenerateParams {
    data: TopbarData;
    urlPrefix: string;
}

export const generateTopbar = (data: TopbarData, urlPrefix = ""): string => {
    return generateHeader({ data, urlPrefix });
};

const generateHeader = (params: GenerateParams) => {
    const hasBannerClass = params.data.siteBanner.isEnabled ? " td-topbar-has-banner" : "";
    const headerContent = [generateBanner(params.data.siteBanner, params.urlPrefix), generateNav(params)].join("");
    return `<header class="td-topbar${hasBannerClass}">${headerContent}</header>`;
};

const generateNav = (params: GenerateParams) => {
    const navContent = [
        generateLogo(params),
        `<div class="td-topbar-content">${generateMainArea(params)}${generateSecondaryArea(params)}</div>`,
        `<button class="td-topbar-menu-button" aria-label="open links"></button>`,
    ].join("");
    return `<nav>${navContent}</nav>`;
};

const generateLogo = (params: GenerateParams) => {
    const { urlPrefix } = params;
    const logoImage = `<img src="${escapeHtml(urlPrefix)}/assets/image/vaticle-typedb.svg" alt="Vaticle TypeDB"/>`;
    return `<a href="${escapeHtml(urlPrefix)}/" class="td-topbar-logo-container">${logoImage}</a>`;
};

const generateMainArea = (params: GenerateParams) => {
    const {
        data: {
            topbar: { mainArea: data },
        },
        urlPrefix,
    } = params;
    const listItems = data
        .map((item) => {
            if (item._type === "textLink") {
                const icon = item.link?.type === "external" ? `<div class="td-topbar-external-icon"></div>` : "";
                const linkEl = generateLink({
                    content: `${item.text}${icon}`,
                    link: item.comingSoon ? null : item.link,
                    urlPrefix,
                    attributes: { class: "td-topbar-link" },
                });
                return `<li>${linkEl}</li>`;
            } else {
                const panelHeader = `<div class="td-topbar-panel-header" tabindex="0">${escapeHtml(item.title)}</div>`;
                const content = [panelHeader, generateMenuPanel(item, urlPrefix)].join("");
                return `<li>${content}</li>`;
            }
        })
        .join("");
    return `<ul class="td-topbar-main-area">${listItems}</ul>`;
};

const generateSecondaryArea = (params: GenerateParams) => {
    const {
        data: {
            topbar: { secondaryArea: data },
            githubURL,
        },
        urlPrefix,
    } = params;
    const listItems = data.links
        .map(({ comingSoon, link, text }) => {
            const linkEl = generateLink({
                content: text,
                link: comingSoon ? null : link,
                urlPrefix,
                attributes: { class: "td-topbar-link" },
            });
            return `<li>${linkEl}</li>`;
        })
        .join("");

    const buttonClasses = ["td-topbar-button", `button-${data.button.style}`, "td-button-size-s", "text-p2"].join(" ");
    const button = generateLink({
        content: data.button.text,
        link: data.button.link,
        urlPrefix,
        attributes: { class: buttonClasses, tabindex: "0" },
    });
    const buttonItem = `<li>${button}</li>`;

    const githubIcon = `<div class="td-topbar-github-icon">GitHub</div>`;
    const githubLink = `<a class="td-topbar-link" href="${escapeHtml(githubURL)}" target="_blank">${githubIcon}</a>`;
    const githubItem = `<li>${githubLink}</li>`;

    return `<ul class="td-topbar-secondary-area">${listItems}${buttonItem}${githubItem}</ul>`;
};
