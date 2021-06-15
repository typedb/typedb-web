import React from "react";
import { homePageStyles } from "./home-styles";
import { VaticleGalaxy } from "./vaticle-galaxy";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VaticleButton } from "../../common/button/button";
import clsx from "clsx";
import { IndustrySection } from "./industry-section";
import { ClusterSection } from "./cluster-section";
import { TestimonialsSection } from "./testimonials-section";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import VaticleWorld from "../../assets/graphics/vaticle-world.svg";
import { CorporateLogosSection } from "./corporate-logos-section";
import { TypeQLExamplesSection } from "./typeql-examples-section";
import { DefaultLayout } from "../../common/layout/default-layout";
import { urls } from "../../common/urls";
import { useTypeDBVersion } from "../../state/typedb-version";
import { routes } from "../router";

export const HomePage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), homePageStyles());

    const typeDBVersion = useTypeDBVersion()[0];

    return (
        <DefaultLayout>
            <section className={classes.firstSection}>
                <div className={classes.vaticleAtomContainer}>
                    <VaticleGalaxy/>
                </div>

                <h1 className={clsx(classes.typeDBIntro, classes.h1, classes.subsectionMargin)}>Introducing TypeDB: a strongly-typed database</h1>
                <h1 className={clsx(classes.typeDBIntroMobile, classes.h1)}>
                    Introducing TypeDB:<br/>
                    a strongly-typed database
                </h1>
                <p className={clsx(classes.largeText, classes.typeDBIntroBody)}>
                    TypeDB is a database with a rich and logical type system. TypeDB empowers you to solve
                    complex problems, using TypeQL as its query language.
                </p>

                <div className={clsx(classes.mainLinks, classes.subsectionMargin)}>
                    <a href={urls.github.typedb} target="_blank" className={clsx(classes.mainLink, classes.firstMainLink)}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faGithub} />
                        <div className={classes.mainLinkCaption}>GitHub</div>
                    </a>
                    <a href={urls.social.discord} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faDiscord} />
                        <div className={classes.mainLinkCaption}>Discord</div>
                    </a>
                    <a href={urls.social.twitter} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIconCircle} icon={faTwitter} />
                        <div className={classes.mainLinkCaption}>Twitter</div>
                    </a>
                    <div className={classes.mainLink}>
                        <VaticleButton className={classes.downloadTypeDBButton} size="small" type="primary" to={routes.download}>
                            Download TypeDB {typeDBVersion}
                        </VaticleButton>
                    </div>
                </div>
            </section>

            <CorporateLogosSection className={classes.sectionMargin}/>

            <TypeQLExamplesSection className={classes.sectionMargin} typeDBVersion={typeDBVersion}/>

            <IndustrySection className={classes.sectionMargin}/>

            <ClusterSection className={classes.sectionMargin}/>

            <TestimonialsSection className={classes.sectionMargin}/>

            <section className={clsx(classes.communitySection, classes.sectionMargin)}>
                <h1 className={classes.h1}>Join the Vaticle community around the world</h1>
                <VaticleWorld className={clsx(classes.vaticleWorld, classes.subsectionMargin)}/>
                <VaticleButton size="small" type="primary" disabled comingSoon className={classes.subsectionMargin}>
                    Join the Vaticle community<span className={clsx(classes.aroundTheWorld, classes.hideMobile)}>around the world</span>
                </VaticleButton>
            </section>

        </DefaultLayout>
    );
};
