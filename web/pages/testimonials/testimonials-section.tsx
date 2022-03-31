import React from "react";
import clsx from "clsx";
import {VaticleButton} from "../../common/button/button";
import { Carousel } from "../../common/carousel/carousel";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {ClassProps} from "../../common/class-props";
import { typeDBTestimonials } from "./data/typedb-testimonials";
import { Testimonial } from "./testimonial";
import { testimonialSize, testimonialsSectionStyles } from "./testimonials-styles";

export const TestimonialsSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), testimonialsSectionStyles());

    return (
        <section className={clsx(className, classes.root)}>
            <h1 className={classes.h1}>Become the pioneer of your industry</h1>

            <Carousel itemSize={testimonialSize} itemCount={typeDBTestimonials.length} className={classes.subsectionMargin}>
                {typeDBTestimonials.map(testimonialData => <Testimonial {...testimonialData}/>)}
            </Carousel>

            <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                <VaticleButton size="small" type="secondary" className={classes.contentMargin} to="?dialog=contact">
                    Get in touch
                </VaticleButton>
            </div>
        </section>
    );
}
