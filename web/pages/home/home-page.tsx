import React, { useEffect, useState } from 'react';
import { homePageStyles } from "./home-styles";
import { VaticleAtom } from "../../common/images/vaticle-atom";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VaticleButton } from "../../common/button/button";
import clsx from "clsx";
import { IndustrySection } from './industry-section';
import { ClusterSection } from "./cluster-section";
import { TestimonialsSection } from "./testimonials-section";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { getTypeDBVersion } from "../api/typedb-service";
import VaticleWorld from "../assets/graphics/vaticle-world.svg";
import { CorporateLogosSection } from "./corporate-logos-section";
import { TypeQLExamplesSection } from "./typeql-examples-section";
import { DefaultLayout } from "../../common/layout/default-layout";
import { urls } from "../../common/urls";

export const HomePage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), homePageStyles());

    // TODO: Ideally we don't do this for every page
    const [typeDBVersion, setTypeDBVersion] = useState("TypeDB");
    useEffect(() => {
        getTypeDBVersion().then(version => {
            setTypeDBVersion(version);
        });
    }, []);

    return (
        <DefaultLayout typeDBVersion={typeDBVersion}>
            <section className={classes.firstSection}>
                <div className={classes.vaticleAtomContainer}>
                    <VaticleAtom/>
                </div>

                <h1 className={clsx(classes.typeDBIntro, classes.h1, classes.sectionMarginSmall)}>Introducing TypeDB: a strongly-typed database</h1>
                <h1 className={clsx(classes.typeDBIntroMobile, classes.h1)}>
                    Introducing TypeDB:<br/>
                    a strongly-typed database
                </h1>
                <p className={clsx(classes.largeText, classes.typeDBIntroBody)}>
                    TypeDB is a database with a rich and logical type system. TypeDB empowers you to build
                    complex systems easily, using TypeQL as its query language.
                </p>

                <div className={clsx(classes.mainLinks, classes.sectionMarginSmall)}>
                    <a href={urls.social.github} target="_blank" className={clsx(classes.mainLink, classes.firstMainLink)}>
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
                        <VaticleButton className={classes.downloadTypeDBButton} size="small" type="primary" to="/download">
                            Download {typeDBVersion}
                        </VaticleButton>
                    </div>
                </div>
            </section>

            <CorporateLogosSection className={classes.sectionMarginLarge}/>

            <TypeQLExamplesSection className={classes.sectionMarginLarge} typeDBVersion={typeDBVersion}/>

            <IndustrySection className={classes.sectionMarginLarge}/>

            <ClusterSection className={classes.sectionMarginLarge}/>

            <TestimonialsSection className={classes.sectionMarginLarge}/>

            <section className={clsx(classes.communitySection, classes.sectionMarginLarge)}>
                <h1 className={classes.h1}>Join the Vaticle community around the world</h1>
                <VaticleWorld className={clsx(classes.vaticleWorld, classes.sectionMarginSmall)}/>
                <VaticleButton size="small" type="primary" disabled={true} comingSoon={true} className={classes.sectionMarginSmall}>
                    Join the Vaticle community<span className={classes.hideMobile}> around the world</span>
                </VaticleButton>
            </section>

        </DefaultLayout>
    );
};
