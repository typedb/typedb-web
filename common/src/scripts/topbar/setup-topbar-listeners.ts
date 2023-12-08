export const setupTopbarListeners = () => {
    const headerEl = document.querySelector<HTMLElement>(".td-topbar");
    if (!headerEl) {
        return;
    }

    headerEl.querySelectorAll(".td-topbar-panel-header").forEach((el) =>
        el.addEventListener("click", () => {
            el.closest("li")?.classList.toggle("td-topbar-panel-expanded");
        })
    );

    const menuButton = headerEl.querySelector(".td-topbar-menu-button");
    menuButton?.addEventListener("click", () => {
        headerEl.classList.toggle("td-topbar-open");
        document.body.style.overflowY = headerEl.classList.contains("td-topbar-open") ? "hidden" : "unset";
    });

    let hoveredMenuItem: HTMLLIElement | null = null;

    const links = headerEl.querySelectorAll("a");
    links.forEach((link) =>
        link.addEventListener("click", () => {
            hoveredMenuItem = null;
            updateMenuPanelVisibility();
            headerEl.classList.remove("td-topbar-open");
            document.body.style.overflowY = "unset";
        })
    );

    const mainListItems = document.querySelectorAll<HTMLLIElement>(".td-topbar-main-area li");

    const updateMenuPanelVisibility = () =>
        mainListItems.forEach((el) => el.classList.toggle("td-topbar-panel-hovered", hoveredMenuItem === el));

    mainListItems.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            hoveredMenuItem = el;
            updateMenuPanelVisibility();
        });
        el.addEventListener("mouseleave", () => {
            hoveredMenuItem = null;
            updateMenuPanelVisibility();
        });
    });

    return headerEl;
};
