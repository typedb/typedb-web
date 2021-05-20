import React from 'react';
import { pageFooterStyles } from "./layout-styles";
import { discordURL, facebookURL, githubURL, linkedInURL, twitterURL } from "../urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebookSquare, faGithub, faLinkedin, faTwitter, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import clsx from "clsx";
import { VaticleButton } from "../button/button";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/pro-solid-svg-icons";
import { vaticleStyles } from "../styles/vaticle-styles";

export const PageFooter: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), pageFooterStyles());

    return (
        <footer className={classes.root}>
            <div className={classes.content}>
                <section>
                    <div className={classes.newsletterSection}>
                        <div className={classes.social}>
                            <a href={twitterURL} target="_blank">
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconTwitter)} icon={faTwitter} />
                            </a>
                            <a href={facebookURL} target="_blank" className={classes.socialLinkFacebook}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconFacebook)} icon={faFacebookSquare} />
                            </a>
                            <a href={linkedInURL} target="_blank" className={classes.socialLinkLinkedIn}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconLinkedIn)} icon={faLinkedin} />
                            </a>
                            <a href={githubURL} target="_blank" className={classes.socialLinkGithub}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconGithub)} icon={faGithub} />
                            </a>
                        </div>

                        <div className={classes.subscribe}>
                            <p className={classes.personalDataNotice}>
                                Subscribe to our newsletter here. By submitting your personal data, you consent to emails from Vaticle. <a>See our Privacy Policy</a>
                            </p>
                            <div className={classes.subscribeActionBlock}>
                                <input type="email" placeholder="Email address" className={classes.subscribeEmail}/>
                                <VaticleButton size="small" type="primary" className={classes.subscribeButton}>Subscribe</VaticleButton>
                            </div>
                        </div>
                    </div>

                    <hr className={classes.separator}/>
                </section>

                <section className={classes.sectionMarginSmall}>
                    <nav className={classes.linksSection}>
                        <div className={classes.contact}>
                            <h3 className={classes.h3}>Get in Touch</h3>
                            <ul className={classes.linkList}>
                                <ContactDetail href={githubURL} target="_blank" icon={faGithub}>Vaticle on GitHub</ContactDetail>
                                <ContactDetail href={discordURL} target="_blank" icon={faDiscord}>Vaticle on Discord</ContactDetail>
                                <ContactDetail icon={faPhoneAlt}>Get in touch</ContactDetail>
                                <ContactDetail icon={faMapMarkerAlt} type="address" classes={{anchor: classes.linkTwoLine}}>
                                    3rd floor, East, 47-50 Margaret St,
                                    London W1W 8SE, UK
                                </ContactDetail>
                            </ul>
                        </div>
                        <div className={classes.siteMap}>
                            <div>
                                <h3 className={classes.h3}>Products</h3>
                                <ul className={classes.siteMapSection}>
                                    <FooterLink>TypeDB</FooterLink>
                                    <FooterLink>TypeDB Cluster</FooterLink>
                                    <FooterLink>Quickstart</FooterLink>
                                    <FooterLink>Install</FooterLink>
                                </ul>
                            </div>
                            <div>
                                <h3 className={classes.h3}>Solutions</h3>
                                <ul className={classes.siteMapSection}>
                                    <FooterLink>Deployment</FooterLink>
                                    <FooterLink>Services</FooterLink>
                                    <FooterLink>Support</FooterLink>
                                </ul>
                            </div>
                            <div>
                                <h3 className={classes.h3}>Developer</h3>
                                <ul className={classes.siteMapSection}>
                                    <FooterLink>Documentation</FooterLink>
                                    <FooterLink>Community</FooterLink>
                                    <FooterLink>Discuss</FooterLink>
                                    <FooterLink href={githubURL} target="_blank">GitHub</FooterLink>
                                </ul>
                            </div>
                            <div>
                                <h3 className={classes.h3}>Company</h3>
                                <ul className={classes.siteMapSection}>
                                    <FooterLink>Blog</FooterLink>
                                    <FooterLink>Careers</FooterLink>
                                    <FooterLink>About</FooterLink>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </section>
            </div>
        </footer>
    );
};

interface FooterLinkProps {
    href?: string;
    // linkTo?: string;
    target?: string;
}

interface ContactDetailProps extends FooterLinkProps {
    icon?: IconDefinition;
    type?: "address";
    classes?: Partial<{ anchor: string }>;
}

const ContactDetail: React.FC<ContactDetailProps> = ({children, href, target, icon, type, classes}) => {
    const ownClasses = Object.assign({}, vaticleStyles(), pageFooterStyles());

    return (
        <li>
            <a href={href} target={target} className={clsx(ownClasses.contactLink, classes?.anchor)}>
                {icon &&
                <span className={ownClasses.linkIconContainer}>
                    <FontAwesomeIcon className={ownClasses.linkIcon} icon={icon} />
                </span>}
                {type === "address" ?
                <address className={ownClasses.linkText}>
                    {children}
                </address> :
                <p className={ownClasses.linkText}>{children}</p>}
            </a>
        </li>
    );
};

const FooterLink: React.FC<FooterLinkProps> = ({children, href, target}) => {
    const ownClasses = Object.assign({}, vaticleStyles(), pageFooterStyles());

    return (
        <li>
            <a href={href} target={target} className={ownClasses.sitemapLink}>
                <p className={ownClasses.linkText}>{children}</p>
            </a>
        </li>
    );
};
