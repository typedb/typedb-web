import { CommonModule, DOCUMENT } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from "@angular/core";

@Component({
    selector: 'td-back-to-top-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <!-- Back to Top Button -->
    @if (showButton()) {
      <button
        (click)="scrollToTop()"
        type="button"
        class="back-to-top-button"
        aria-label="Scroll to top"
      >
        <i class="fa-light fa-arrow-up"></i>
      </button>
    }
  `,
    styleUrls: ['./back-to-top-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTopButtonComponent {
    // Signal to track button visibility
    showButton = signal(false);
    document = inject(DOCUMENT);

    // Threshold in pixels to show the button
    private scrollThreshold = 200;

    // Listen to the window's scroll event
    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        const scrollY = window.scrollY || this.document.documentElement.scrollTop;
        this.showButton.set(scrollY > this.scrollThreshold);
    }

    // Scroll to the top of the page
    scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
}
