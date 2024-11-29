export * from "./generate-banner";
export * from "./get-topbar-data";
export * from "./platform-ui-banner-query";
export * from "./setup-topbar-listeners";
export { TopnavData, topbarQuery, SiteBanner } from "./schema";

import { escapeHtml, linkHtml, sanitiseHtmlID } from "../shared";
import { generateBanner } from "./generate-banner";
import { navPanel } from "./nav-panel";
import { NavItem, TopnavData } from "./schema";

interface GenerateParams {
    data: TopnavData;
    urlPrefix: string;
}

export const topbar = (data: TopnavData, urlPrefix = ""): string => {
    return header({ data, urlPrefix });
};

const header = (params: GenerateParams) => {
    const hasBannerClass = params.data.siteBanner.isEnabled ? " td-topbar-has-banner" : "";
    const headerContent = [generateBanner(params.data.siteBanner, params.urlPrefix), nav(params)].join("");
    return `<header class="td-topbar${hasBannerClass}">${headerContent}</header>`;
};

const nav = (params: GenerateParams) => {
    const content = [
        logo(params),
        `<div class="td-topbar-content">${primaryItems(params)}${secondaryArea(params)}</div>`,
        `<button class="td-topbar-menu-button" aria-label="open links"></button>`,
    ].join("");
    return `<nav>${content}</nav>`;
};

const logo = (params: GenerateParams) => {
    const { urlPrefix } = params;
    const logoImage = `<svg viewBox="0 0 2025 687" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M800 486.998V277.003H879.006V237H677V277.003H756V486.998H800Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M990.5 559L1073.7 303.391L1076 297.004H1033L985.01 450.001L980 450L932 297H889L891.117 303.391L950.847 487H972.702L947.122 559H990.5Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M1150 559.012V486.999H1212.52C1250.41 486.999 1269 467.862 1269 429.731V354.2C1269 316.069 1250.41 297.004 1212.52 297.004H1108.01V559.012H1150ZM1210.35 450.003H1150V334H1210.35C1221.45 334 1227 339.551 1227 350.58V433.351C1227 444.452 1221.45 450.003 1210.35 450.003Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M1460 487L1471 450.001H1376C1364.9 450.001 1359 444.451 1359 433.349L1359.01 408.003H1478V354.063C1478 315.933 1459.06 296.867 1421.17 296.867H1374.2C1336.07 296.867 1317.01 315.933 1317.01 354.063L1317 429.729C1317 467.86 1336.07 487 1374.2 487H1460ZM1435.65 375.003H1359.01V350.443C1359.01 339.342 1364.91 334 1376.01 334C1387.11 334 1419 334 1419 334C1430.1 334 1435.65 339.342 1435.65 350.443V375.003Z" fill="white"/>
  <path d="M1625.43 487.002C1690.59 487.002 1723.02 454.302 1723.02 388.9V334.92C1723.02 269.519 1690.59 237.007 1625.43 237.007H1529L1529 487.002H1625.43ZM1627.97 446.82H1573.01L1573.01 277H1627.97C1661.99 277 1679.01 294.014 1679.01 328.042L1679.01 395.778C1679.01 429.806 1661.99 446.82 1627.97 446.82Z" fill="white"/>
  <path d="M1903.34 487C1942.67 487 1961.99 467.331 1961.99 427.994V396.638C1961.99 383.847 1958.01 374.194 1950.05 367.678L1934.84 355.008L1947.51 339.804C1952.34 334.012 1954.75 327.013 1954.75 318.808V296.002C1954.75 256.665 1935.43 236.996 1896.1 236.996L1779 236.996V487H1903.34ZM1895.01 337.27H1823V277.178H1895.01C1905.63 277.178 1910.94 282.367 1910.94 292.744V321.342C1910.94 331.961 1905.63 337.27 1895.01 337.27ZM1902.25 446.818H1823V377.452H1902.25C1912.87 377.452 1918.18 382.641 1918.18 393.018V431.252C1918.18 441.629 1912.87 446.818 1902.25 446.818Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M318 131.276C449.444 131.276 556 237.77 556 369.138C556 500.506 449.444 607 318 607C186.556 607 80 500.506 80 369.138C80 237.77 186.556 131.276 318 131.276ZM410.82 253.852L222.166 253.852L221.868 253.853C157.86 254.182 106.237 306.308 106.566 370.28C106.897 434.692 159.212 486.746 223.662 486.795L410.907 486.936C475.285 486.936 527.473 434.778 527.473 370.438C527.473 306.049 475.245 253.852 410.82 253.852Z" fill="white"/>
  <path d="M244.073 420.735C272.438 420.735 295.433 398.522 295.433 371.122C295.433 343.721 272.438 321.509 244.073 321.509C215.708 321.509 192.714 343.721 192.714 371.122C192.714 398.522 215.708 420.735 244.073 420.735Z" fill="white"/>
  <path class="tp-right-eye" d="M400.292 420.735C428.657 420.735 451.652 398.522 451.652 371.122C451.652 343.721 428.657 321.509 400.292 321.509C371.927 321.509 348.932 343.721 348.932 371.122C348.932 398.522 371.927 420.735 400.292 420.735Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M134.797 80C160.075 80 180.566 100.48 180.566 125.743C180.566 144.461 169.317 160.553 153.207 167.634L153.207 271.148H116.591L116.591 167.723C100.372 160.688 89.028 144.539 89.028 125.743C89.028 100.48 109.52 80 134.797 80Z" fill="white"/>
</svg>
`;
    return `<a href="${escapeHtml(urlPrefix)}/" class="td-topbar-logo-container" id="topbar_typedb-logo">${logoImage}</a>`;
};

const primaryItems = (params: GenerateParams) => {
    const { data: { topnav: { primaryItems: data } }, urlPrefix} = params;
    const listItems = data.map((item) => navItem(item, urlPrefix)).join("");
    return `<ul class="td-topbar-main-area">${listItems}</ul>`;
};

const secondaryArea = (params: GenerateParams) => {
    const { data: { topnav }, urlPrefix } = params;
    const listItems = topnav.secondaryItems.map((item) => navItem(item, urlPrefix)).join("");

    const buttonClasses = ["td-topbar-button", `button-${topnav.cta.style}`, "td-button-size-xs", "text-p2"].join(" ");
    const button = linkHtml({
        content: topnav.cta.text,
        link: topnav.cta.link,
        id: sanitiseHtmlID(`topbar_${topnav.cta.text}`),
        urlPrefix,
        attributes: { class: buttonClasses, tabindex: "0" },
    });
    const buttonItem = `<li>${button}</li>`;

    return `<ul class="td-topbar-secondary-area">${listItems}${buttonItem}</ul>`;
};

const navItem = (item: NavItem, urlPrefix: string) => {
    if (!item.panel) {
        const icon = "";
        // const icon = item.link?.type === "external" ? `<div class="td-topbar-external-icon"></div>` : "";
        const linkEl = linkHtml({
            content: `${item.title}${icon}`,
            link: item.link!,
            id: sanitiseHtmlID(`topbar_${item.title}`),
            urlPrefix,
            attributes: { class: "td-topbar-link" },
        });
        return `<li>${linkEl}</li>`;
    } else {
        const panelHeader = `<div class="td-topbar-panel-header" tabindex="0">${escapeHtml(item.title)}<span class="td-topbar-chevron"><i class="fa-regular fa-chevron-down"></i></span></div>`;
        const content = [panelHeader, navPanel(item.panel, urlPrefix)].join("");
        return `<li>${content}</li>`;
    }
}
