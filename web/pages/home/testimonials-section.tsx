import React, { useEffect, useState } from "react";
import clsx from "clsx";
import CircleDecoration from "../assets/graphics/circle-decoration.svg";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { ClassProps } from "../../common/class-props";
import JonThompsonAvatar from "../assets/images/jon-thompson.jpg";
import JorisSijsAvatar from "../assets/images/joris-sijs.jpeg";
import NikSharmaAvatar from "../assets/images/nik-sharma.jpg";
import RamAnveshAvatar from "../assets/images/ram-anvesh.jpg";
import EnzoMartoglioAvatar from "../assets/images/enzo-martoglio.jpg";
import MichaelBishopAvatar from "../assets/images/michael-bishop.jpg";
import RadouaneOudrhiriAvatar from "../assets/images/radouane-oudrhiri.jpg";
import SamuelPouytAvatar from "../assets/images/samuel-pouyt.jpg";
import FlipkartSquareLogo from "../assets/logos/squarewhite/flipkart-square-white.png";
import BioCortexSquareLogo from "../assets/logos/squarewhite/biocortex-square-white.png";
import GravrSquareLogo from "../assets/logos/squarewhite/gravr-square-white.png";
import TNOSquareLogo from "../assets/logos/squarewhite/tno-square-white.png";
import AlphaVertexSquareLogo from "../assets/logos/squarewhite/alpha-vertex-square-white.png";
import EagleGenomicsSquareLogo from "../assets/logos/squarewhite/eagle-genomics-square-white.png";
import EuropeanRespiratorySocietySquareLogo from "../assets/logos/squarewhite/european-respiratory-society-square-white.png";
import InfosysSquareLogo from "../assets/logos/squarewhite/infosys-square-white.png";
import { homePageTestimonialsStyles } from "./home-styles";

interface Testimonial {
    companyName: string;
    companyLogo: string;
    personName: string;
    jobTitle: string;
    avatar: string;
    body: string;
}

export const TestimonialsSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageTestimonialsStyles());
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
    }, {
        companyName: "Alpha Vertex",
        companyLogo: AlphaVertexSquareLogo,
        personName: "Michael Bishop",
        jobTitle: "CTO",
        avatar: MichaelBishopAvatar,
        body: `TypeDB significantly streamlines our knowledge engineering process. TypeDB’s expressive schema allows us
        to verify the logical consistency of patterns detected by our learning algorithms and improve accuracy.`,
    }, {
        companyName: "Eagle Genomics",
        companyLogo: EagleGenomicsSquareLogo,
        personName: "Radouane Oudrhiri",
        jobTitle: "CTO",
        avatar: RadouaneOudrhiriAvatar,
        body: `TypeDB's query language, TypeQL, should be the de facto language for any graph representation because of
        two things: the semantic expressiveness of the language and the optimisation of query execution.`,
    }, {
        companyName: "Infosys",
        companyLogo: InfosysSquareLogo,
        personName: "Enzo Martoglio",
        jobTitle: "AI Architect",
        avatar: EnzoMartoglioAvatar,
        body: `No business-centric implementation of AI can avoid having a Knowledge Graph at its core. Vaticle is one
        of the few companies developing this tool that any AI business solution will require.`,
    }, {
        companyName: "ERS",
        companyLogo: EuropeanRespiratorySocietySquareLogo,
        personName: "Samuel Pouyt",
        jobTitle: "Software Architect",
        avatar: SamuelPouytAvatar,
        body: `Whether it is for content recommendation, managing GDPR, or text classification, the more I use TypeDB,
        the more I discover suitable use cases. Its power and simplicity make it an everyday tool.`,
    }];

    return (
        <section className={clsx(className, classes.testimonialsSection)}>
            <h1 className={classes.h1}>Become the pioneer of your industry</h1>

            <div className={clsx(classes.carouselContainer, classes.testimonialCarouselContainer, classes.subsectionMargin)}>
                <div className={clsx(classes.carousel, classes.testimonialCarousel)}>
                    {[0, 0, 0].map(() => (
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
