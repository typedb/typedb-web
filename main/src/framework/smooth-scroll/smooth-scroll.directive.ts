import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
    selector: '[tdSmoothScroll]',
    standalone: true,
})
export class SmoothScrollDirective {
    private document = inject(DOCUMENT);
    constructor(private el: ElementRef<HTMLAnchorElement>) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        // Get the fragment (e.g., #section1) from the href
        const fragment = this.el.nativeElement.hash;

        // Normalize pathnames by removing trailing slashes for comparison
        const linkPathname = this.el.nativeElement.pathname.replace(/\/$/, '');
        const currentPathname = window.location.pathname.replace(/\/$/, '');

        // Check if the link is a simple anchor on the same page
        if (fragment && linkPathname === currentPathname) {
            try {
                const targetElement = this.document.querySelector(fragment);

                if (targetElement) {
                    // If the target exists, prevent the default "jump"
                    // TODO: I don't think this works with tdLink
                    event.preventDefault();

                    // Scroll smoothly to the target element
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });

                    // Update the URL to match the fragment
                    window.history.replaceState(null, '', this.el.nativeElement.href);
                }
            } catch (e) {
                // Handle cases where the fragment isn't a valid selector
                console.error(`[SmoothScrollDirective] Invalid fragment: ${fragment}`, e);
            }
        }
    }
}
