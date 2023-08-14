import { Component, Input, OnInit } from "@angular/core";
import { Testimonial } from "typedb-web-schema";
import { ImageBuilder } from "src/service/image-builder.service";

@Component({
    selector: "td-testimonials-carousel",
    templateUrl: "testimonials-carousel.component.html",
    styleUrls: ["./testimonials-carousel.component.scss"],
})
export class TestimonialsCarouselComponent implements OnInit {
    @Input() testimonials!: Testimonial[];
    focusedIndex = 0;

    constructor(private imageBuilder: ImageBuilder) {}

    ngOnInit(): void {
        this.focusedIndex = this.getMiddleIndex();
    }

    previous() {
        this.focusedIndex = (this.focusedIndex - 1 + this.testimonials.length) % this.testimonials.length;
    }

    next() {
        this.focusedIndex = (this.focusedIndex + 1) % this.testimonials.length;
    }

    cardTransform(index: number): string {
        const middleIndex = this.getMiddleIndex();
        const indexDelta =
            ((index - this.focusedIndex + this.testimonials.length + middleIndex) % this.testimonials.length) -
            middleIndex;
        const offsetBase = 26;
        const x = offsetBase * indexDelta;
        const z = (Math.abs(indexDelta) * 25 * (6 + Math.abs(indexDelta) + 1)) / -2;
        return `translate3d(${x}%, 0, ${z}px)`;
    }

    getHeadshotUrl(testimonial: Testimonial) {
        return this.imageBuilder.image(testimonial.author.headshotURL).height(48).url();
    }

    getLogoUrl(testimonial: Testimonial) {
        return this.imageBuilder.image(testimonial.author.organisation.logoURL).height(48).url();
    }

    private getMiddleIndex(): number {
        return Math.floor((this.testimonials.length - 1) / 2);
    }

    private getMiddleIndex(): number {
        return Math.floor((this.testimonials.length - 1) / 2);
    }
}
