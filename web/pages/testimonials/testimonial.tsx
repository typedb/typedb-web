import clsx from "clsx";
import React from "react";
import CircleDecoration from "../../assets/graphics/circle-decoration.svg";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { TestimonialData } from "./data/testimonial-data";
import { testimonialStyles } from "./testimonials-styles";

export const Testimonial: React.FC<TestimonialData> = ({companyName, companyLogo, personName, jobTitle, avatar, body}) => {
    const classes = Object.assign({}, vaticleStyles(), testimonialStyles());

    return (
        <div className={classes.root}>
            <img src={companyLogo} alt={companyName} className={classes.companyLogo}/>
            <CircleDecoration className={classes.companyLogoDecoration}/>

            <div className={classes.panel}>
                <p className={clsx(classes.panelBody, classes.mediumText)}>{body}</p>
                <hr className={classes.panelDivider}/>

                <div className={classes.person}>
                    <img src={avatar} alt={personName} className={classes.avatar}/>
                    <div className={classes.personDetails}>
                        <p className={classes.personName}>{personName}</p>
                        <p className={classes.personJobDetail}>{jobTitle}</p>
                        <p className={classes.personJobDetail}>{companyName}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
