import React from "react";
import clsx from "clsx";
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
import {TestimonialsSection} from "./testimonials-section";

export const HomePage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), homePageStyles());

    const typeDBVersion = useTypeDBVersion()[0];

    return (
        <VaticleLayout>
            <section className={classes.firstSectionMargin}>
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

                <div className={clsx(classes.mainLinks, classes.subsectionMargin)}>
                    <a href={urls.github.typedb} target="_blank"
                       className={clsx(classes.mainLink, classes.firstMainLink)}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faGithub}/>
                        <div className={classes.mainLinkCaption}>GitHub</div>
                    </a>
                    <a href={urls.social.discord} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faDiscord}/>
                        <div className={classes.mainLinkCaption}>Discord</div>
                    </a>
                    <a href={urls.social.twitter} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIconCircle} icon={faTwitter}/>
                        <div className={classes.mainLinkCaption}>Twitter</div>
                    </a>
                    <div className={classes.mainLink}>
                        <VaticleButton className={classes.downloadTypeDBButton} size="small" type="primary"
                                       to={routes.download}>
                            Download TypeDB {typeDBVersion}
                        </VaticleButton>
                    </div>
                </div>
            </section>

            <UserLogosSection className={classes.sectionMargin}/>

            <TypeDBSection className={classes.sectionMargin}/>

            <UseCaseSection className={classes.sectionMargin}/>

            <TypeDBClusterSection className={classes.sectionMargin}/>

            <TestimonialsSection className={classes.sectionMargin}/>

        </VaticleLayout>
    );
};
