import React from "react";
import clsx from "clsx";
import {VaticleButton} from "../../common/button/button";
import { Carousel } from "../../common/carousel/carousel";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {ClassProps} from "../../common/class-props";
import { hashRoutes } from "../router";
import { typeDBTestimonials } from "./data/typedb-testimonials";
import { Testimonial } from "./testimonial";
import { testimonialSize, testimonialsSectionStyles } from "./testimonials-styles";

export enum ContactButtonTarget {
    PopupForm,
    InlineForm,
}

interface ContactButtonProps {
    text?: string,
    target: ContactButtonTarget
}

interface TestimonialsSectionProps extends ClassProps {
    title: string,
    contactButton?: ContactButtonProps,
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({title, contactButton, className}) => {
    const classes = Object.assign({}, vaticleStyles(), testimonialsSectionStyles());
    const useInlineContactForm = contactButton?.target === ContactButtonTarget.InlineForm;

    return (
        <section className={clsx(className, classes.root)}>
            <h1 className={classes.h1}>{title}</h1>

            <Carousel itemSize={testimonialSize} itemCount={typeDBTestimonials.length} className={classes.subsectionMargin}>
                {typeDBTestimonials.map(testimonialData => <Testimonial {...testimonialData}/>)}
            </Carousel>

            <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                <VaticleButton size="small" type="secondary" to={!useInlineContactForm ? "?dialog=contact" : undefined}
                               href={useInlineContactForm ? hashRoutes.contactSection : undefined}>
                    {contactButton?.text || "Get in touch"}
                </VaticleButton>
            </div>
        </section>
    );
}
