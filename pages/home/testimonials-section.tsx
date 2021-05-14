import { homePageStyles } from "./home-styles";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import CircleDecoration from "../assets/graphics/circle-decoration.svg";
import { commonStyles } from "../common/ui/common-styles";
import { ClassProps } from "../common/class-props";
import FredericCorralAvatar from "../assets/images/frederic-corral.png";
import JonThompsonAvatar from "../assets/images/jon-thompson.jpg";
import JorisSijsAvatar from "../assets/images/joris-sijs.jpeg";
import NikSharmaAvatar from "../assets/images/nik-sharma.jpg";
import RamAnveshAvatar from "../assets/images/ram-anvesh.jpg";
import FlipkartSquareLogo from "../assets/logos/flipkart-square-white.png";
import FiveASquareLogo from "../assets/logos/5a-square-white.png";
import BioCortexSquareLogo from "../assets/logos/biocortex-square-white.png";
import GravrSquareLogo from "../assets/logos/gravr-square-white.png";
import TNOSquareLogo from "../assets/logos/tno-square-white.png";

interface Testimonial {
    companyName: string;
    companyLogo: string;
    personName: string;
    jobTitle: string;
    avatar: string;
    body: string;
}

export const TestimonialsSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, commonStyles(), homePageStyles());
    const [mobile, setMobile] = useState(window.matchMedia("(max-width: 767px)").matches);

    useEffect(() => {
        const newMobile = window.matchMedia("(max-width: 767px)").matches;
        if (mobile != newMobile) setMobile(newMobile);
    }, [window.innerWidth]); // TODO: resizing window doesn't seem to trigger this hook

    const testimonials: Testimonial[] = [{
        companyName: "Flipkart",
        companyLogo: FlipkartSquareLogo,
        personName: "Ram Anvesh",
        jobTitle: "Software Engineer",
        avatar: RamAnveshAvatar,
        body: `With its simple yet immensely powerful query language, native support for n-ary relationships and focus on
        semantic schema, TypeDB solves all our modelling problems so that we can focus more on solving higher level
        problems instead of tweaking traditional graph databases to fit our use cases.`,
    }, {
        companyName: "5a Solutions",
        companyLogo: FiveASquareLogo,
        personName: "Frederic Corral",
        jobTitle: "Business Analyst R&D",
        avatar: FredericCorralAvatar,
        body: `TypeDB is the only solution that makes it possible to unify data from different IT systems into one
        knowledge graph based on an industry ontology. This is a giant step to enable data exploration for enterprises.`,
    }, {
        companyName: "TNO",
        companyLogo: TNOSquareLogo,
        personName: "Joris Sijs",
        jobTitle: "Senior Research Lead",
        avatar: JorisSijsAvatar,
        body: `TypeDB makes it easy for our robots to operate autonomously in the real world by being the centre of their
        understanding. TypeDB makes it easy to incorporate expert knowledge and advanced reasoning into its knowledge base.`,
    }, {
        companyName: "BioCortex",
        companyLogo: BioCortexSquareLogo,
        personName: "Nik Sharma",
        jobTitle: "Founder & CEO",
        avatar: NikSharmaAvatar,
        body: `For developers, TypeDB is really easy to work with. Its unique and expressive type system enables us to
        spend less time data modelling. We can easily integrate complex biomedical datasets. TypeDB provides us the
        backbone to our therapeutics platform to cure neurodegenerative diseases.`,
    }, {
        companyName: "Gravr",
        companyLogo: GravrSquareLogo,
        personName: "Jon Thompson",
        jobTitle: "Founder",
        avatar: JonThompsonAvatar,
        body: `TypeDB performs complicated logic queries at blazing speeds. Its strongly typed data model elegantly
        represents virtually any domain, and enforces well-formed models and data consistency - which is why we picked
        TypeDB to power Gravr, our general-purpose knowledge app.`,
    }];

    return (
        <section className={clsx(className, classes.testimonialsSection)}>
            <h1 className={classes.h1}>Become the pioneer of your industry</h1>

            <div className={clsx(classes.carouselContainer, classes.testimonialCarouselContainer, classes.sectionMarginSmall)}>
                <div className={clsx(classes.carousel, classes.testimonialCarousel)}>
                    {[0, 0].map(() => (
                    <span className={classes.carouselHalf}>
                    {testimonials.map(({companyName, companyLogo, personName, jobTitle, avatar, body}) => (
                        <div className={classes.testimonialContainer}>
                            <img src={companyLogo} alt={companyName} className={classes.testimonialCompanyLogo}/>
                            <CircleDecoration className={classes.testimonialCompanyLogoDecoration}/>

                            <div className={classes.testimonial}>
                                <p className={clsx(classes.testimonialBody, classes.mediumText)}>{body}</p>
                                <hr className={classes.testimonialDivider}/>

                                <div className={classes.testimonialPerson}>
                                    <img src={avatar} alt={personName} className={classes.testimonialAvatar}/>
                                    <div className={classes.testimonialPersonDetails}>
                                        <p className={classes.testimonialPersonName}>{personName}</p>
                                        <p className={classes.testimonialPersonJob}>{jobTitle}, {companyName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                    </span>))}
                </div>
            </div>
        </section>
    );
}
