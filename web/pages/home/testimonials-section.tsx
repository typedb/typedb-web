import React from "react";
import clsx from "clsx";
import CircleDecoration from "../../assets/graphics/circle-decoration.svg";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {ClassProps} from "../../common/class-props";
import JonThompsonAvatar from "../../assets/images/jon-thompson.jpg";
import JorisSijsAvatar from "../../assets/images/joris-sijs.jpeg";
import NikSharmaAvatar from "../../assets/images/nik-sharma.jpg";
import RamAnveshAvatar from "../../assets/images/ram-anvesh.jpg";
import EnzoMartoglioAvatar from "../../assets/images/enzo-martoglio.jpg";
import MichaelBishopAvatar from "../../assets/images/michael-bishop.jpg";
import RadouaneOudrhiriAvatar from "../../assets/images/radouane-oudrhiri.jpg";
import SamuelPouytAvatar from "../../assets/images/samuel-pouyt.jpg";
import AlexDengAvatar from "../../assets/images/alex-deng.jpg";
import JeanPaulMochetAvatar from "../../assets/images/jean-paul-mochet.jpg";
import KimWagerAvatar from "../../assets/images/kim-wager.png";
import KonradMysliwiecAvatar from "../../assets/images/konrad-mysliwiec.jpeg";
import MichaelDoyleAvatar from "../../assets/images/michael-doyle.png";
import MuhannadAlomariAvatar from "../../assets/images/muhannad-alomari.jpg";
import FlipkartSquareLogo from "../../assets/logos/squarewhite/flipkart-square-white.png";
import BioCortexSquareLogo from "../../assets/logos/squarewhite/biocortex-square-white.png";
import GravrSquareLogo from "../../assets/logos/squarewhite/gravr-square-white.png";
import TNOSquareLogo from "../../assets/logos/squarewhite/tno-square-white.png";
import AlphaVertexSquareLogo from "../../assets/logos/squarewhite/alpha-vertex-square-white.png";
import EagleGenomicsSquareLogo from "../../assets/logos/squarewhite/eagle-genomics-square-white.png";
import EuropeanRespiratorySocietySquareLogo
    from "../../assets/logos/squarewhite/european-respiratory-society-square-white.png";
import InfosysSquareLogo from "../../assets/logos/squarewhite/infosys-square-white.png";
import CapgeminiSquareLogo from "../../assets/logos/squarewhite/capgemini-square-white.png";
import ChinaMerchantsBankSquareLogo from "../../assets/logos/squarewhite/china-merchants-bank-square-white.png";
import OxfordPharmagenesisSquareLogo from "../../assets/logos/squarewhite/oxford-pharmagenesis-square-white.png";
import RAIRHealthSquareLogo from "../../assets/logos/squarewhite/rair-health-square-white.png";
import RocheSquareLogo from "../../assets/logos/squarewhite/roche-square-white.png";
import RollsRoyceSquareLogo from "../../assets/logos/squarewhite/rolls-royce-square-white.png";
import {homePageTestimonialsStyles} from "./home-styles";
import { VaticleButton } from "../../common/button/button";

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
        companyName: "Rolls-Royce",
        companyLogo: RollsRoyceSquareLogo,
        personName: "Muhannad Alomari",
        jobTitle: "European Hub AI Lead",
        avatar: MuhannadAlomariAvatar,
        body: `We here at Rolls-Royce are steadily moving into the knowledge-graph age; where design and business
        decisions are being led through data mined from millions of internal reports, accumulated into a deep knowledge
        graph. TypeDB allows us to move faster to developing this capability for Rolls-Royce.`,
    }, {
        companyName: "Oxford Pharmagenesis",
        companyLogo: OxfordPharmagenesisSquareLogo,
        personName: "Kim Wager",
        jobTitle: "Scientific Director",
        avatar: KimWagerAvatar,
        body: `TypeDB and TypeQL allow us to model the biomedical domain, enabling us to surface insights that are
        explainable and transparent; key requirements for AI in healthcare. Crucially, the Vaticle team provide more
        than software, you gain access to a community. This is how the best work gets done – collaboratively.`,
    }, {
        companyName: "Alpha Vertex",
        companyLogo: AlphaVertexSquareLogo,
        personName: "Michael Bishop",
        jobTitle: "Chief Technology Officer",
        avatar: MichaelBishopAvatar,
        body: `TypeDB significantly streamlines our knowledge engineering process. TypeDB’s expressive schema allows us
        to verify the logical consistency of patterns detected by our learning algorithms and improve accuracy.`,
    }, {
        companyName: "China Merchants Bank",
        companyLogo: ChinaMerchantsBankSquareLogo,
        personName: "Alex Deng",
        jobTitle: "Senior Engineer/Product Owner",
        avatar: AlexDengAvatar,
        body: `TypeDB is a unique technology that is so incredibly powerful in its ability to express and model
        complex data while remaining simple and elegant in its use. We are so pleased with TypeDB, in particular as it
        saves us from hiring an additional AI scientist to utilise semantic technologies in our projects.`,
    }, {
        companyName: "RAIR Health",
        companyLogo: RAIRHealthSquareLogo,
        personName: "Michael Doyle",
        jobTitle: "Chief Technology Officer",
        avatar: MichaelDoyleAvatar,
        body: `With TypeDB, we spend less time writing code and more time with clinical researchers exploring
        relationships between genes, drugs and diseases. As one of our core technologies, it elegantly and concisely
        models knowledge, allowing us to build a single system from our various bioinformatics databases.`,
    }, {
        companyName: "Capgemini",
        companyLogo: CapgeminiSquareLogo,
        personName: "Jean-Paul Mochet",
        jobTitle: "Chief Enterprise Architect",
        avatar: JeanPaulMochetAvatar,
        body: `TypeDB is a powerful framework for data exploration. The way data, attributes and relations can be
        expressed in a polymorphism manner allows us to build a rich network of multi-levels analysis and open
        opportunities to query, discover and infer interactions between complex epidemic factors.`,
    }, {
        companyName: "Infosys",
        companyLogo: InfosysSquareLogo,
        personName: "Enzo Martoglio",
        jobTitle: "AI Architect",
        avatar: EnzoMartoglioAvatar,
        body: `No business-centric implementation of AI can avoid having a Knowledge Graph at its core. Vaticle is one
        of the few companies developing this tool that any AI business solution will require.`,
    }, {
        companyName: "Eagle Genomics",
        companyLogo: EagleGenomicsSquareLogo,
        personName: "Radouane Oudrhiri",
        jobTitle: "Chief Technology Officer",
        avatar: RadouaneOudrhiriAvatar,
        body: `TypeDB's query language, TypeQL, should be the de facto language for any graph representation because of
        two things: the semantic expressiveness of the language and the optimisation of query execution.`,
    }, {
        companyName: "Roche",
        companyLogo: RocheSquareLogo,
        personName: "Konrad Myśliwiec",
        jobTitle: "Data Science Software Engineer",
        avatar: KonradMysliwiecAvatar,
        body: `TypeDB provides a strongly typed database with n-ry relations that enables modelling the world much
        closer to reality compared to other databases. In addition, its built-in inference engine enables to build next
        generation AI systems — one of the many reasons to choose TypeDB to model biomedical data.`,
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
        companyName: "European Respiratory Society",
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

            <div
                className={clsx(classes.carouselContainer, classes.testimonialCarouselContainer, classes.subsectionMargin)}>
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
                                        <p className={classes.testimonialPersonJob}>{jobTitle}</p>
                                        <p className={classes.testimonialPersonJob}>{companyName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                    </span>))}
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
