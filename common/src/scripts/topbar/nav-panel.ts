import { escapeHtml, linkHtml, sanitiseHtmlID } from "../shared";
import { NavPanel, NavPanelCta, NavProductGroup, NavResource } from "./schema";

export const navPanel = (panel: NavPanel, urlPrefix: string) => {
    const productGroups = panel.productGroups
        .map((productGroup_) => {
            const titleEl = `<h5 class="td-topbar-column-title">${escapeHtml(productGroup_.title)}</h5>`;
            const content = [titleEl, productGroup(productGroup_, urlPrefix)].join("");
            return `<div class="td-topbar-panel-column">${content}</div>`;
        })
        .join("");
    const bottomLinks = bottomLinksHtml(panel.bottomLinks || [], urlPrefix);
    const ctas = ctasHtml(panel.ctas || [], urlPrefix);
    return `
<div class="td-topbar-menu-panel">
  <div class="td-topbar-menu-panel-primary-area">
    <div class="td-topbar-product-groups">
      ${productGroups}
    </div>
    ${bottomLinks}
  </div>
  ${ctas}
</div>
`;
};

const productGroup = (productGroup: NavProductGroup, urlPrefix: string) => {
    const items = productGroup.items
        .map(({ title, description, link: link_, iconName, iconVariant }) => {
            const icon = iconName ? `<i class="fa-${iconVariant} fa-${iconName}"></i>` : null;
            const itemLabel = `<dt>${escapeHtml(title)}</dt>`;
            const itemDescription = description ? `<dd class="text-aside">${escapeHtml(description)}</dd>` : "";
            const content = icon ? `<div class="td-icon-container">${icon}</div><div>${itemLabel}${itemDescription}</div>` : `<div>${itemLabel}${itemDescription}</div>`;
            if (!link_) return `<div>${content}</div>`;
            else return linkHtml({
                content,
                link: link_,
                id: sanitiseHtmlID(`topbar_${productGroup.title}_${title}`),
                urlPrefix,
            });
        }).join("");
    return `<dl>${items}</dl>`;
};

const bottomLinksHtml = (resources: NavResource[], urlPrefix: string) => {
    if (!resources?.length) return ``;
    const items = resources.map(({ title, description, link }) => {
        const itemLabel = `<dt><span>${escapeHtml(title)}</span></dt>`;
        const itemDescription = description ? `<dd class="text-aside">${escapeHtml(description)}</dd>` : "";
        const content = `${itemLabel}${itemDescription}`;
        return linkHtml({
            content,
            link: link,
            id: sanitiseHtmlID(`topbar_${title}`),
            urlPrefix,
        });
    }).join("");
    return `<dl class="td-topbar-bottom-links">${items}</dl>`;
};

const ctasHtml = (ctas: NavPanelCta[], urlPrefix: string) => {
    if (!ctas?.length) return ``;
    const items = ctas.map(({ title, description, link }) => {
        const itemLabel = `<h5><span>${escapeHtml(title)}</span></h5>`;
        const itemDescription = description ? `<p class="text-aside">${escapeHtml(description)}</p>` : "";
        const content = `${itemLabel}${itemDescription}`;
        const buttonClasses = "td-topbar-link-tertiary link-tertiary";
        const button = linkHtml({
            content: link.text,
            link: link.link,
            id: sanitiseHtmlID(`topbar_${title}_${link.text}`),
            urlPrefix,
            attributes: { class: buttonClasses, tabindex: "0" },
        });
        return `<li>${content}${button}</li>`;
    }).join("");
    return `<ul class="td-topbar-menu-panel-ctas">${items}</ul>`;
};
