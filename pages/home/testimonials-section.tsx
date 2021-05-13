import { homePageStyles } from "./home-styles";
import React, { useState } from "react";
import clsx from "clsx";
import CircleDecoration from "../assets/graphics/circle-decoration.svg";
import { VaticleIconButton } from "../common/ui/button/icon-button";
import { commonStyles } from "../common/ui/common-styles";
import { ClassProps } from "../common/class-props";
import FlipkartCircleLogo from "../assets/logos/flipkart-circle.svg";
import FredericCorralAvatar from "../assets/images/frederic-corral.jpg";
import JonThompsonAvatar from "../assets/images/jon-thompson.jpg";
import JorisSijsAvatar from "../assets/images/joris-sijs.jpeg";
import NikSharmaAvatar from "../assets/images/nik-sharma.jpg";
import RamAnveshAvatar from "../assets/images/ram-anvesh.jpg";

interface Testimonial {
    companyName: string;
    companyLogo: React.FC<any>;
    personName: string;
    jobTitle: string;
    avatar: string;
    body: string;
}

export const TestimonialsSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, commonStyles(), homePageStyles());
    const [selectedIndex, setSelectedIndex] = useState(1);

    const testimonials: Testimonial[] = [{
        companyName: "Flipkart",
        companyLogo: FlipkartCircleLogo,
        personName: "Ram Anvesh",
        jobTitle: "Software Engineer",
        avatar: RamAnveshAvatar,
        body: `With its simple yet immensely powerful query language, native support for n-ary relationships and focus on
        semantic schema, TypeDB solves all our modelling problems so that we can focus more on solving higher level
        problems instead of tweaking traditional graph databases to fit our use cases.`,
    }, {
        companyName: "A5",
        companyLogo: FlipkartCircleLogo,
        personName: "Frederic Corral",
        jobTitle: "",
        avatar: FredericCorralAvatar,
        body: `TypeDB is the only solution that makes it possible to unify data from different IT systems into one
        knowledge graph based on an industry ontology. This is a giant step to enable data exploration for enterprises.`,
    }, {
        companyName: "TNO",
        companyLogo: FlipkartCircleLogo,
        personName: "Joris Sijs",
        jobTitle: "",
        avatar: JorisSijsAvatar,
        body: `TypeDB makes it easy for our robots to operate autonomously in the real world by being the centre of their
        understanding. TypeDB makes it easy to incorporate expert knowledge and advanced reasoning into its knowledge base.`,
    }, {
        companyName: "BioCortex",
        companyLogo: FlipkartCircleLogo,
        personName: "Nik Sharma",
        jobTitle: "Founder & CEO",
        avatar: NikSharmaAvatar,
        body: `For developers, TypeDB is really easy to work with. Its unique and expressive type system enables us to
        spend less time data modelling. We can easily integrate complex biomedical datasets. TypeDB provides us the
        backbone to our therapeutics platform to cure neurodegenerative deceases.`,
    }, {
        companyName: "Gravr",
        companyLogo: FlipkartCircleLogo,
        personName: "Jon Thompson",
        jobTitle: "Founder",
        avatar: JonThompsonAvatar,
        body: `TypeDB performs complicated logic queries at blazing speeds. Its strongly typed data model elegantly
        represents virtually any domain, and enforces well-formed models and data consistency - which is why we picked
        TypeDB to power Gravr, our general-purpose knowledge app.`,
    }];

    return (
        <section className={className}>
            <h1 className={classes.h1}>Become the pioneer of your industry</h1>

            <div className={classes.carouselContainer}>
                <div className={clsx(classes.carousel, classes.testimonialCarousel, classes.sectionMarginSmall)}
                     style={{transform: `translateX(${(((testimonials.length - 1) / 2) - selectedIndex) * 400}px)`}}>
                    {testimonials.map(({companyName, companyLogo, personName, jobTitle, avatar, body}) => (
                        <div className={classes.testimonialContainer}>
                            {React.createElement(companyLogo, {className: classes.testimonialCompanyLogo})}
                            <CircleDecoration className={classes.testimonialCompanyLogoDecoration}/>

                            <div className={classes.testimonial}>
                                <p className={clsx(classes.testimonialBody, classes.mediumText)}>{body}</p>
                                <hr className={classes.testimonialDivider}/>

                                <div className={classes.testimonialPerson}>
                                    <img src={avatar} alt={personName} className={classes.testimonialAvatar}/>
                                    <div className={classes.testimonialPersonDetails}>
                                        <p className={classes.testimonialPersonName}>{personName}</p>
                                        <p className={classes.smallText}>{jobTitle}, {companyName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={classes.carouselControlPanel}>
                <VaticleIconButton disabled={selectedIndex === 0} onClick={() => setSelectedIndex(selectedIndex - 1)}>
                    <div className={clsx(classes.leftChevron, selectedIndex === 0 && classes.iconDisabled)}/>
                </VaticleIconButton>

                <div className={classes.carouselPips}>
                    {testimonials.map((_, idx) => (
                        <a className={clsx(classes.carouselPip, idx > 0 && classes.carouselPipGap, idx === selectedIndex && classes.carouselPipSelected)}
                           onClick={() => setSelectedIndex(idx)}/>
                    ))}
                </div>

                <VaticleIconButton disabled={selectedIndex === testimonials.length - 1} onClick={() => setSelectedIndex(selectedIndex + 1)}>
                    <div className={clsx(classes.rightChevron, selectedIndex === testimonials.length - 1 && classes.iconDisabled)}/>
                </VaticleIconButton>
            </div>
        </section>
    );
}
