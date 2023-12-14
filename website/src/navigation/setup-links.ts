import { Router } from "@angular/router";

export const setupLinks = (el: HTMLElement | null, router: Router) => {
    const links = el?.querySelectorAll("a");
    links?.forEach((link) =>
        link.addEventListener("click", (ev) => {
            if (ev.ctrlKey || ev.metaKey || link.dataset["type"] === "external") {
                return;
            }
            const href = link.getAttribute("href");
            if (!href || href.includes("//")) {
                return;
            }
            ev.preventDefault();

            const url = href.startsWith("?") ? `${window.location.pathname}${href}` : href;
            router.navigateByUrl(url);
        }),
    );
};
