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

        // Check if the link is a simple anchor on the same page
        if (fragment && this.el.nativeElement.pathname === window.location.pathname) {
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
                }
            } catch (e) {
                // Handle cases where the fragment isn't a valid selector
                console.error(`[SmoothScrollDirective] Invalid fragment: ${fragment}`);
            }
        }
    }
}
