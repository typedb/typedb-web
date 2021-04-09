import React from 'react';
import { homePageStyles } from "./home-styles";
import { VaticleAtom } from '../common/ui/images/vaticle-atom';
import { DefaultLayout } from "../common/ui/layout/default-layout";
import { discordUrl, githubUrl, twitterUrl } from "../common/urls";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VaticleButton } from "../common/ui/button/button";

export const HomePage: React.FC = () => {
    const classes = homePageStyles();
    const graknVersion = "2.0.1";

    return (
        <DefaultLayout classes={{ main: classes.layoutMain }}>
            <section className={classes.defaultSection}>
                <div className={classes.atom}>
                    <VaticleAtom/>
                </div>
                <h1 className={classes.h1}>Vaticle TypeDB: a strongly-typed database</h1>
                <p className={classes.largeText}>
                    Vaticle TypeDB is a database with a rich and logical type system. TypeDB empowers you to build
                    complex systems easily, using TypeQL as its query language.
                </p>
            </section>

            <section className={classes.defaultSection}>
                <div className={classes.mainLinks}>
                    <a href={githubUrl} target="_blank" className={classes.firstMainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faGithub} />
                        <div className={classes.mainLinkCaption}>GitHub</div>
                    </a>
                    <a href={discordUrl} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faDiscord} />
                        <div className={classes.mainLinkCaption}>Discord</div>
                    </a>
                    <a href={twitterUrl} target="_blank" className={classes.mainLink}>
                        <FontAwesomeIcon className={classes.mainLinkIcon} icon={faTwitter} />
                        <div className={classes.mainLinkCaption}>Twitter</div>
                    </a>
                    <div className={classes.mainLink}>
                        <a href="https://grakn.ai/download" target="_blank">
                            <VaticleButton classes={{root: classes.downloadGraknButton}} size="small" type="primary">Download {graknVersion}</VaticleButton>
                        </a>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
};
