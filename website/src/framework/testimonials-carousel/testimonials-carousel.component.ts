import { Component, Input } from "@angular/core";
import { Testimonial } from "typedb-web-schema";

@Component({
    selector: "td-testimonials-carousel",
    templateUrl: "testimonials-carousel.component.html",
    styleUrls: ["./testimonials-carousel.component.scss"],
})
export class TestimonialsCarouselComponent {
    @Input() testimonials!: Testimonial[];
    startIndex = 0;

    get focusedIndex() {
        return (10 - this.startIndex) % 7;
    }

    cardClass(idx: number) {
        return `tc-card-${(idx + this.startIndex) % 7}`;
    }

    previous() {
        this.startIndex++;
        if (this.startIndex > 6) this.startIndex = 0;
    }

    next() {
        this.startIndex--;
        if (this.startIndex < 0) this.startIndex = 6;
    }
}
