import { escapeHtml, generateLink, sanitiseHtmlID } from "../shared";
import { TopbarColumn, TopbarMenuPanel } from "./topbar-query";

export const generateMenuPanel = (panel: TopbarMenuPanel, urlPrefix: string) => {
    const columns = panel.columns
        .map((column) => {
            const titleEl =
                (column._type as unknown) === "topbarSpotlightColumn"
                    ? ""
                    : `<h5 class="td-topbar-column-title">${escapeHtml(column.title)}</h5>`;
            const content = [titleEl, generateColumnContent(column, urlPrefix)].join("");
            return `<div class="td-topbar-panel-column">${content}</div>`;
        })
        .join("");
    return `<div class="td-topbar-menu-panel">${columns}</div>`;
};

const generateColumnContent = (column: TopbarColumn, urlPrefix: string) => {
    switch (column._type) {
        case "topbarListColumn": {
            const items = column.items
                .map(({ comingSoon, description, link, title }) => {
                    const icon = link?.destination.current.startsWith("http")
                        ? `<div class="td-topbar-external-icon"></div>`
                        : "";
                    const itemLabel = `<dt><span>${escapeHtml(title)}</span>${icon}</dt>`;
                    const itemDescription = `<dd class="text-aside">${escapeHtml(description)}</dd>`;
                    const content = `${itemLabel}${itemDescription}`;
                    if (comingSoon || !link) {
                        return `<div>${content}</div>`;
                    }
                    return generateLink({
                        content,
                        link,
                        id: sanitiseHtmlID(`topbar_${column.title}_${title}`),
                        urlPrefix,
                    });
                })
                .join("");
            return `<dl>${items}</dl>`;
        }
        case "topbarVideoColumn": {
            return `<div>TODO: Video</div>`;
        }
        case "topbarSpotlightColumn": {
            const icon = `<img src="${escapeHtml(column.iconURL)}" alt="" />`;
            const title = `<h4>${column.title}</h4>`;
            const link = generateLink({
                content: `${icon}${title}`,
                link: column.link,
                id: sanitiseHtmlID(`topbar_${title}`),
                urlPrefix,
                attributes: { class: "td-topbar-spotlight" },
            });
            return `<div class="td-topbar-spotlight-column">${link}</div>`;
        }
    }
};
