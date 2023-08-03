import { Component, Input } from "@angular/core";
import { Testimonial } from "typedb-web-schema";
import { ImageBuilder } from "src/service/image-builder.service";

@Component({
    selector: "td-testimonials-carousel",
    templateUrl: "testimonials-carousel.component.html",
    styleUrls: ["./testimonials-carousel.component.scss"],
})
export class TestimonialsCarouselComponent {
    @Input() testimonials!: Testimonial[];
    startIndex = 0;
    fadeIndexes: number[] = [];

    constructor(private imageBuilder: ImageBuilder) {}

    get focusedIndex() {
        return (10 - this.startIndex) % 7;
    }

    cardClass(idx: number) {
        let clazz = `tc-card-${(idx + this.startIndex) % 7}`;
        if (this.fadeIndexes.includes(idx)) {
            clazz += ` tc-fade`;
        }
        return clazz;
    }

    previous() {
        this.startIndex++;
        if (this.startIndex > 6) this.startIndex = 0;
    }

    next() {
        this.startIndex--;
        if (this.startIndex < 0) this.startIndex = 6;
    }

    getHeadshotUrl(testimonial: Testimonial) {
        return this.imageBuilder.image(testimonial.headshotURL).height(48).url();
    }

    getLogoUrl(testimonial: Testimonial) {
        return this.imageBuilder.image(testimonial.organisation.logoURL).height(48).url();
    }
}
