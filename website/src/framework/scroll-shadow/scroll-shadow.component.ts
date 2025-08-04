import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, DOCUMENT,
    ElementRef,
    HostBinding, Inject,
    Input,
    NgZone,
    ViewChild,
} from "@angular/core";

@Component({
    selector: "td-scroll-shadow",
    templateUrl: "./scroll-shadow.component.html",
    styleUrls: ["./scroll-shadow.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ScrollShadowComponent implements AfterViewInit {
    @Input() color: "deep-purple" | "black-purple" = "black-purple";
    @Input() showControls = false;
    @Input() collectionItemWidth = 360;
    @ViewChild("scrollContainer") scrollContainerRef!: ElementRef<HTMLDivElement>;
    @ViewChild("shadowLeft") shadowLeftRef!: ElementRef<HTMLDivElement>;
    @ViewChild("shadowRight") shadowRightRef!: ElementRef<HTMLDivElement>;
    @ViewChild("shadowTop") shadowTopRef!: ElementRef<HTMLDivElement>;
    @ViewChild("shadowBottom") shadowBottomRef!: ElementRef<HTMLDivElement>;
    @ViewChild('scrollLeftButton') scrollLeftButtonRef!: ElementRef<HTMLDivElement>;
    @ViewChild('scrollRightButton') scrollRightButtonRef!: ElementRef<HTMLDivElement>;

    @HostBinding("class") get classes() {
        return `${this.color}`;
    }

    constructor(private ngZone: NgZone, @Inject(DOCUMENT) private doc: Document) {}


    ngAfterViewInit(): void {

        this.ngZone.runOutsideAngular(() => {
            const scrollEl = this.scrollContainerRef.nativeElement;

            // Scroll shadow logic
            const handleScroll = () => {
                const scrollLeft = scrollEl.scrollLeft;
                const maxScrollLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
                const scrollRight = scrollEl.scrollWidth - scrollEl.scrollLeft - scrollEl.clientWidth;
                const scrollTop = scrollEl.scrollTop;
                const scrollBottom = scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight;

                const leftShadowOpacity = Math.min(1, scrollLeft / this.shadowLeftRef.nativeElement.clientWidth);
                const rightShadowOpacity = Math.min(1, scrollRight / this.shadowRightRef.nativeElement.clientWidth);
                const topShadowOpacity = Math.min(1, scrollTop / this.shadowTopRef.nativeElement.clientHeight);
                const bottomShadowOpacity = Math.min(1, scrollBottom / this.shadowBottomRef.nativeElement.clientHeight);

                this.shadowLeftRef.nativeElement.style.opacity = `${leftShadowOpacity}`;
                this.shadowRightRef.nativeElement.style.opacity = `${rightShadowOpacity}`;
                this.shadowTopRef.nativeElement.style.opacity = `${topShadowOpacity}`;
                this.shadowBottomRef.nativeElement.style.opacity = `${bottomShadowOpacity}`;

                // Scroll button visibility
                this.scrollLeftButtonRef.nativeElement.style.opacity = scrollLeft > 0 ? '1' : '0';
                this.scrollRightButtonRef.nativeElement.style.opacity = scrollLeft < maxScrollLeft ? '1' : '0';
            };

            scrollEl.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();

            let isDragging = false;
            let startX = 0;
            let scrollLeft = 0;

            scrollEl.addEventListener('mousedown', (e) => {
                isDragging = false;
                startX = e.pageX;
                scrollLeft = scrollEl.scrollLeft;

                const onMouseMove = (moveEvent: MouseEvent) => {
                    const dx = moveEvent.pageX - startX;
                    if (Math.abs(dx) > 5) isDragging = true;
                    scrollEl.scrollLeft = scrollLeft - dx;
                };

                const onMouseUp = (upEvent: MouseEvent) => {
                    this.doc.removeEventListener('mousemove', onMouseMove);
                    this.doc.removeEventListener('mouseup', onMouseUp);

                    if (isDragging) {
                        // Prevent the click that follows
                        scrollEl.classList.add('suppress-click');
                        setTimeout(() => scrollEl.classList.remove('suppress-click'), 0);
                    }
                };

                this.doc.addEventListener('mousemove', onMouseMove);
                this.doc.addEventListener('mouseup', onMouseUp);
            });

            scrollEl.addEventListener('click', (e) => {
                if (scrollEl.classList.contains('suppress-click')) {
                    e.preventDefault();
                    e.stopImmediatePropagation(); // cancel even Angular-bound handlers
                }
            }, true); // <-- use capture phase to intercept early
        });
    }

    scrollBy(direction: 1 | -1) {
        const scrollEl = this.scrollContainerRef.nativeElement;
        scrollEl.scrollBy({
            left: direction * this.collectionItemWidth,
            behavior: "smooth",
        });
    }
}
