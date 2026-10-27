import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { LinkDirective } from "../link/link.directive";

/**
 * Smoothly scrolls to a same-page fragment instead of letting the browser jump to it.
 *
 * Only for plain `href` anchors: a `tdLink` on the same element navigates through the router, and the
 * root component already scrolls to the fragment smoothly off the back of that, so this steps aside.
 */
@Directive({
    selector: '[tdSmoothScroll]',
    standalone: true,
})
export class SmoothScrollDirective {
    private document = inject(DOCUMENT);
    private routerLink = inject(LinkDirective, { optional: true, self: true });

    constructor(private el: ElementRef<HTMLAnchorElement>) {}

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.routerLink) return;

        // Let the browser handle the modified clicks that open a new tab or window
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;

        const fragment = this.el.nativeElement.hash;
        if (!fragment) return;

        // Trailing slashes are insignificant here, but would break the comparison
        const linkPathname = this.el.nativeElement.pathname.replace(/\/$/, '');
        const currentPathname = this.document.location.pathname.replace(/\/$/, '');
        if (linkPathname !== currentPathname) return;

        // By id rather than by selector: section ids come from titles, so they can start with a digit
        // (e.g. "01-structure"), which is a valid id but not a valid selector
        const target = this.document.getElementById(decodeURIComponent(fragment.slice(1)));
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.document.defaultView?.history.replaceState(null, '', this.el.nativeElement.href);
    }
}
