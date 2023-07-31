import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from "@angular/core";

@Component({
    selector: "td-scroll-shadow",
    templateUrl: "./scroll-shadow.component.html",
    styleUrls: ["./scroll-shadow.component.scss"],
})
export class ScrollShadowComponent implements AfterViewInit {
    @ViewChild("scrollContainer") scrollContainerRef!: ElementRef<HTMLDivElement>;
    @ViewChild("shadowLeft") shadowLeftRef!: ElementRef<HTMLDivElement>;
    @ViewChild("shadowRight") shadowRightRef!: ElementRef<HTMLDivElement>;
    @ViewChild("shadowTop") shadowTopRef!: ElementRef<HTMLDivElement>;
    @ViewChild("shadowBottom") shadowBottomRef!: ElementRef<HTMLDivElement>;

    constructor(private ngZone: NgZone) {}

    ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            const scrollEl = this.scrollContainerRef.nativeElement;
            const handleScroll = () => {
                const scrollLeft = scrollEl.scrollLeft;
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
            };
            scrollEl.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();
        });
    }
}
