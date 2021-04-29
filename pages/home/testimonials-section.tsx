import { homePageStyles } from "./home-styles";
import React from "react";
import clsx from "clsx";
import HighAvailabilityIcon from "../assets/icons/high-availability-icon.svg";
import ClusterManagementIcon from "../assets/icons/cluster-management-icon.svg";
import CircleDecoration from "../assets/images/circle-decoration.svg";

export interface TestimonialsSectionProps {
    className?: string;
}

interface Testimonial {
    companyName: string;
    companyLogo: React.FC<any>;
    personName: string;
    jobTitle: string;
    avatarURL: string;
    body: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({className}) => {
    const classes = homePageStyles();

    const allTestimonials: Testimonial[] = [{
        companyName: "Vaticle",
        companyLogo: ClusterManagementIcon,
        personName: "Ganeshwara Hananda",
        jobTitle: "Lead Engineer",
        avatarURL: "https://avatars.githubusercontent.com/u/464164?v=4",
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id justo sagittis,
        semper enim sit amet, rutrum ligula. Aenean fermentum a felis sit amet lacinia. Duis sed finibus metus.
        Mauris venenatis ex non nunc eleifend, at pharetra leo tristique.`,
    }, {
        companyName: "Vaticle",
        companyLogo: HighAvailabilityIcon,
        personName: "Ganeshwara Hananda",
        jobTitle: "Lead Engineer",
        avatarURL: "https://avatars.githubusercontent.com/u/464164?v=4",
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ultrices dui. Donec ullamcorper
        maximus eros, a condimentum est mollis nec. Suspendisse consequat pellentesque quam, vitae maximus dolor porta at.`,
    }, {
        companyName: "Vaticle",
        companyLogo: ClusterManagementIcon,
        personName: "Ganeshwara Hananda",
        jobTitle: "Lead Engineer",
        avatarURL: "https://avatars.githubusercontent.com/u/464164?v=4",
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend, tellus id mattis interdum, odio
        massa porttitor massa, ut interdum purus dui quis est. Nam commodo lobortis nunc vitae egestas.`,
    }, {
        companyName: "Vaticle",
        companyLogo: ClusterManagementIcon,
        personName: "Ganeshwara Hananda",
        jobTitle: "Lead Engineer",
        avatarURL: "https://avatars.githubusercontent.com/u/464164?v=4",
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla eu metus sed finibus. Integer
        varius dapibus placerat. Nullam egestas ex nisl, placerat tempor turpis laoreet eget. Donec facilisis diam quis dui varius eleifend.`,
    }, {
        companyName: "Vaticle",
        companyLogo: ClusterManagementIcon,
        personName: "Ganeshwara Hananda",
        jobTitle: "Lead Engineer",
        avatarURL: "https://avatars.githubusercontent.com/u/464164?v=4",
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt iaculis elit, vitae consequat est
        aliquam vitae. Ut lacus nibh, vulputate nec lectus quis, fermentum lacinia libero. Vestibulum semper nec lacus at volutpat.`,
    }];

    return (
        <section className={className}>
            <h1 className={classes.h1}>Become the pioneer of your industry</h1>

            <div className={clsx(classes.testimonialCarousel, classes.sectionMarginSmall)}>
                {allTestimonials.map(({companyName, companyLogo, personName, jobTitle, avatarURL, body}) => (
                    <div className={classes.testimonialContainer}>
                        {React.createElement(companyLogo, {className: classes.testimonialCompanyLogo})}
                        <CircleDecoration className={classes.testimonialCompanyLogoDecoration}/>

                        <div className={classes.testimonial}>
                            <p className={clsx(classes.testimonialBody, classes.mediumText)}>{body}</p>
                            <hr className={classes.testimonialDivider}/>

                            <div className={classes.testimonialPerson}>
                                <img src={avatarURL} alt={personName} className={classes.testimonialAvatar}/>
                                <div className={classes.testimonialPersonDetails}>
                                    <p className={classes.testimonialPersonName}>{personName}</p>
                                    <p className={classes.testimonialPersonJob}>{jobTitle}, {companyName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
