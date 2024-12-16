export const setupTopbarListeners = () => {
    const headerEl = document.querySelector<HTMLElement>(".td-topbar");
    if (!headerEl) {
        return;
    }

    const panelHeaders = [...headerEl.querySelectorAll(".td-topbar-panel-header")];
    panelHeaders.forEach((el) =>
        el.addEventListener("click", () => {
            el.closest("li")?.classList.toggle("td-topbar-panel-expanded");
        })
    );

    const menuButton = headerEl.querySelector(".td-topbar-menu-button");
    menuButton?.addEventListener("click", () => {
        headerEl.classList.toggle("td-topbar-open");
        const overflowStyle = headerEl.classList.contains("td-topbar-open") ? "hidden" : "unset";
        document.body.parentElement!.style.overflowY = overflowStyle;
        document.body.style.overflowY = overflowStyle;
    });

    let hoveredMenuElements: HTMLElement[] = [];

    const links = headerEl.querySelectorAll("a");
    links.forEach((link) =>
        link.addEventListener("click", () => {
            hoveredMenuElements.length = 0;
            updateMenuPanelVisibility();
            headerEl.classList.remove("td-topbar-open");
            document.body.parentElement!.style.overflowY = "unset";
            document.body.style.overflowY = "unset";
        })
    );

    const mainListItems = document.querySelectorAll<HTMLLIElement>(".td-topbar-main-area li");
    const panels = document.querySelectorAll<HTMLDivElement>(".td-topbar-menu-panel");

    const updateMenuPanelVisibility = () =>
        mainListItems.forEach((el) => {
            el.classList.toggle("td-topbar-panel-opened", hoveredMenuElements.includes(el));
        });

    [...mainListItems, ...panels].forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
            hoveredMenuElements.push(el);
            updateMenuPanelVisibility();
        });
        el.addEventListener("mouseleave", (e) => {
            const idx = hoveredMenuElements.indexOf(el);
            if (idx !== -1) hoveredMenuElements.splice(idx, 1);
            updateMenuPanelVisibility();
        });
    });

    return headerEl;
};
