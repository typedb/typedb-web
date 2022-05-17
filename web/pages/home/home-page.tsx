import React from "react";
import clsx from "clsx";
import { MainLink, MainLinkIcon, MainLinks } from "../../common/link/main-links";
import { TestimonialsSection } from "../testimonials/testimonials-section";
import {homePageStyles} from "./home-styles";
import {faDiscord, faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {urls} from "../../common/urls";
import {routes} from "../router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {VaticleButton} from "../../common/button/button";
import {VaticleLayout} from "../../common/layout/layout";
import {useTypeDBVersion} from "../../state/typedb-version";
import {VaticleGalaxy} from "./vaticle-galaxy";
import {UserLogosSection} from "./user-logos-section";
import {TypeDBSection} from "./typedb-section";
import {UseCaseSection} from "./use-case-section";
import {TypeDBClusterSection} from "./typedb-cluster-section";

export const HomePage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), homePageStyles());

    const typeDBVersion = useTypeDBVersion()[0];

    return (
        <VaticleLayout>
            <section className={classes.homePageFirstSection}>
                <div className={classes.vaticleGalaxyContainer}>
                    <VaticleGalaxy/>
                </div>

                <h1 className={clsx(classes.typeDBIntro, classes.h1, classes.subsectionMargin)}>Introducing TypeDB: a
                    strongly-typed database</h1>
                <h1 className={clsx(classes.typeDBIntroMobile, classes.h1)}>
                    Introducing TypeDB:<br/>
                    a strongly-typed database
                </h1>
                <p className={clsx(classes.headlineText, classes.typeDBIntroBody)}>
                    TypeDB is a database with a rich and logical type system. TypeDB empowers you to solve
                    complex problems, using TypeQL as its query language.
                </p>

                <MainLinks className={classes.subsectionMargin}>
                    <MainLink href={urls.github.typedb} target="_blank">
                        <MainLinkIcon icon={<FontAwesomeIcon icon={faGithub}/>} caption="GitHub"/>
                    </MainLink>
                    <MainLink href={urls.social.discord} target="_blank">
                        <MainLinkIcon icon={<FontAwesomeIcon icon={faDiscord}/>} caption="Discord"/>
                    </MainLink>
                    <MainLink href={urls.social.twitter} target="_blank">
                        <MainLinkIcon icon={<FontAwesomeIcon className={classes.mainLinkIconCircle} icon={faTwitter}/>}
                                      caption="Twitter"/>
                    </MainLink>
                    <MainLink>
                        <VaticleButton className={classes.downloadTypeDBButton} size="small" type="primary"
                                       to={routes.download}>
                            <span className={classes.hideTablet}>Download TypeDB {typeDBVersion}</span>
                            <span className={classes.showTablet}>Download<br/>TypeDB {typeDBVersion}</span>
                        </VaticleButton>
                    </MainLink>
                </MainLinks>
            </section>

            <UserLogosSection className={classes.sectionMargin}/>

            <TypeDBSection className={classes.sectionMargin}/>

            <UseCaseSection className={classes.sectionMargin}/>

            <TypeDBClusterSection className={classes.sectionMargin}/>

            <TestimonialsSection className={classes.sectionMargin} title="Become the pioneer of your industry" />

        </VaticleLayout>
    );
};
