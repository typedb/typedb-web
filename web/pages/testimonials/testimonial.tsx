import clsx from "clsx";
import React from "react";
import CircleDecoration from "../../assets/graphics/circle-decoration.svg";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { TestimonialData } from "./data/testimonial-data";
import { testimonialsStyles } from "./testimonials-styles";

export const Testimonial: React.FC<TestimonialData> = ({companyName, companyLogo, personName, jobTitle, avatar, body}) => {
    const classes = Object.assign({}, vaticleStyles(), testimonialsStyles());

    return (
        <div className={classes.testimonialContainer}>
            <img src={companyLogo} alt={companyName} className={classes.companyLogo}/>
            <CircleDecoration className={classes.testimonialCompanyLogoDecoration}/>

            <div className={classes.testimonial}>
                <p className={clsx(classes.testimonialBody, classes.mediumText)}>{body}</p>
                <hr className={classes.testimonialDivider}/>

                <div className={classes.testimonialPerson}>
                    <img src={avatar} alt={personName} className={classes.testimonialAvatar}/>
                    <div className={classes.testimonialPersonDetails}>
                        <p className={classes.testimonialPersonName}>{personName}</p>
                        <p className={classes.testimonialPersonJob}>{jobTitle}</p>
                        <p className={classes.testimonialPersonJob}>{companyName}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
