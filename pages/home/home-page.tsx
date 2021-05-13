import React, { useEffect, useState } from 'react';
import { homePageStyles } from "./home-styles";
import { VaticleAtom } from '../common/ui/images/vaticle-atom';
import { DefaultLayout } from "../common/ui/layout/default-layout";
import { discordURL, downloadTypeDBURL, githubURL, twitterURL } from "../common/urls";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VaticleButton } from "../common/ui/button/button";
import clsx from "clsx";
import { IndustrySection } from './industry-section';
import { ClusterSection } from "./cluster-section";
import { TestimonialsSection } from "./testimonials-section";
import { commonStyles } from "../common/ui/common-styles";
import { getTypeDBVersion } from "../api/typedb-service";
import VaticleWorld from "../assets/graphics/vaticle-world.svg";
import { CorporateLogosSection } from "./corporate-logos-section";
import { TypeQLExamplesSection } from "./typeql-examples-section";

export const HomePage: React.FC = () => {
    const classes = Object.assign({}, commonStyles(), homePageStyles());
    const [typeDBVersion, setTypeDBVersion] = useState("");
    useEffect(() => {
        getTypeDBVersion().then(version => {
            setTypeDBVersion(version);
        }, error => {
            console.error(error);
            setTypeDBVersion("TypeDB");
        });
    }, []);

    return (
        <DefaultLayout>
            <section>
                <div className={classes.vaticleAtomContainer}>
                    <VaticleAtom/>
                </div>

                <h1 className={clsx(classes.vaticleTypeDB, classes.h1, classes.sectionMarginSmall)}>Vaticle TypeDB: a strongly-typed database</h1>
                <h1 className={clsx(classes.vaticleTypeDBMobile, classes.h1)}>
                    Vaticle TypeDB: a<br/>
                    strongly-typed database
                </h1>
                <p className={classes.largeText}>
                    Vaticle TypeDB is a database with a rich and logical type system. TypeDB empowers you to build
                    complex systems easily, using TypeQL as its query language.
                </p>

                <div className={clsx(classes.mainLinks, classes.sectionMarginSmall)}>
                    <a href={githubURL} target="_blank" className={classes.firstMainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faGithub} />
                        <div className={classes.mainLinkCaption}>GitHub</div>
                    </a>
                    <a href={discordURL} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faDiscord} />
                        <div className={classes.mainLinkCaption}>Discord</div>
                    </a>
                    <a href={twitterURL} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIconCircle} icon={faTwitter} />
                        <div className={classes.mainLinkCaption}>Twitter</div>
                    </a>
                    <div className={classes.mainLink}>
                        <VaticleButton className={classes.downloadGraknButton} size="small" type="primary"
                                       href={downloadTypeDBURL} target="_blank">
                            Download {typeDBVersion}
                        </VaticleButton>
                    </div>
                </div>
            </section>

            <CorporateLogosSection className={classes.sectionMarginLarge}/>

            <TypeQLExamplesSection className={classes.sectionMarginLarge} typeDBVersion={typeDBVersion}/>

            <section className={classes.sectionMarginLarge}>
                <h1 className={classes.h1}>Empower your organisation to solve complex problems</h1>
                <iframe src="https://www.youtube.com/embed/DbnS1feTyOs" title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen className={clsx(classes.videoPlayer, classes.sectionMarginSmall)}/>
            </section>

            <IndustrySection className={classes.sectionMarginLarge}/>

            <ClusterSection className={classes.sectionMarginLarge}/>

            <TestimonialsSection className={classes.sectionMarginLarge}/>

            <section className={clsx(classes.communitySection, classes.sectionMarginLarge)}>
                <h1 className={classes.h1}>Join the global movement of the Vaticle Community</h1>
                <VaticleWorld className={classes.sectionMarginSmall}/>
                <VaticleButton size="small" type="primary" className={classes.sectionMarginSmall}>Join the Vaticle Community around the world</VaticleButton>
            </section>

        </DefaultLayout>
    );
};
