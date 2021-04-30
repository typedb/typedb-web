import React from 'react';
import { pageFooterStyles } from "./layout-styles";
import { commonStyles } from "../common-styles";
import { facebookURL, githubURL, linkedInURL, twitterURL } from "../../urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import clsx from "clsx";
import { VaticleButton } from "../button/button";

export const PageFooter: React.FC = () => {
    const classes = Object.assign({}, commonStyles(), pageFooterStyles());

    return (
        <footer className={classes.root}>
            <div className={classes.content}>
                <section>
                    <div className={classes.newsletterSection}>
                        <div className={classes.social}>
                            <a href={twitterURL} target="_blank" className={classes.socialLink}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconTwitter)} icon={faTwitter} />
                            </a>
                            <a href={facebookURL} target="_blank" className={classes.socialLink}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconFacebook)} icon={faFacebookSquare} />
                            </a>
                            <a href={linkedInURL} target="_blank" className={classes.socialLink}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconLinkedIn)} icon={faLinkedin} />
                            </a>
                            <a href={githubURL} target="_blank" className={classes.socialLink}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconGithub)} icon={faGithub} />
                            </a>
                        </div>

                        <div className={classes.subscribePanel}>
                            <p className={classes.personalDataNotice}>
                                By submitting your personal data, you consent to emails from Vaticle. <a>See our Privacy Policy</a>
                            </p>
                            <VaticleButton type="primary">Subscribe</VaticleButton>
                        </div>
                    </div>

                    <hr className={classes.separator}/>
                </section>

                <section>

                </section>
            </div>
        </footer>
    );
};
