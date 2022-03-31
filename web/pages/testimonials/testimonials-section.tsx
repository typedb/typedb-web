import React from "react";
import clsx from "clsx";
import {VaticleButton} from "../../common/button/button";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {ClassProps} from "../../common/class-props";
import { typeDBTestimonials } from "./data/typedb-testimonials";
import { Testimonial } from "./testimonial";
import { testimonialsStyles } from "./testimonials-styles";

export const TestimonialsSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), testimonialsStyles());

    return (
        <section className={clsx(className, classes.section)}>
            <h1 className={classes.h1}>Become the pioneer of your industry</h1>

            <div className={clsx(classes.carouselContainer, classes.testimonialCarouselContainer, classes.subsectionMargin)}>
                <div className={clsx(classes.carousel, classes.testimonialCarousel)}>
                {[0, 0, 0].map(() => (
                    <span className={classes.carouselHalf}>
                        {typeDBTestimonials.map(testimonialData => <Testimonial {...testimonialData}/>)}
                    </span>
                ))}
                </div>
            </div>

            <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                <VaticleButton size="small" type="secondary" className={classes.contentMargin} to="?dialog=contact">
                    Get in touch
                </VaticleButton>
            </div>
        </section>
    );
}
