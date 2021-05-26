import React from 'react';
import { pageFooterStyles } from "./layout-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebookSquare, faGithub, faLinkedin, faTwitter, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import clsx from "clsx";
import { VaticleButton } from "../button/button";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/pro-solid-svg-icons";
import { vaticleStyles } from "../styles/vaticle-styles";
import { urls } from "../urls";

export const PageFooter: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), pageFooterStyles());

    return (
        <footer className={classes.root}>
            <div className={classes.content}>
                <section>
                    <div className={classes.newsletterSection}>
                        <div className={classes.social}>
                            <a href={urls.social.twitter} target="_blank">
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconTwitter)} icon={faTwitter} />
                            </a>
                            <a href={urls.social.facebook} target="_blank" className={classes.socialLinkFacebook}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconFacebook)} icon={faFacebookSquare} />
                            </a>
                            <a href={urls.social.linkedIn} target="_blank" className={classes.socialLinkLinkedIn}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconLinkedIn)} icon={faLinkedin} />
                            </a>
                            <a href={urls.social.github} target="_blank" className={classes.socialLinkGithub}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconGithub)} icon={faGithub} />
                            </a>
                        </div>

                        <div className={classes.subscribe}>
                            <p className={classes.personalDataNotice}>
                                By submitting your personal data, you consent to emails from Vaticle. <a>See our Privacy Policy</a>
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
                                <ContactDetail href={urls.social.github} target="_blank" icon={faGithub}>Vaticle on GitHub</ContactDetail>
                                <ContactDetail href={urls.social.discord} target="_blank" icon={faDiscord}>Vaticle on Discord</ContactDetail>
                                <ContactDetail icon={faPhoneAlt}>Get in touch</ContactDetail>
                                <ContactDetail href={urls.officeLocation} target="_blank" icon={faMapMarkerAlt} type="address" classes={{anchor: classes.linkTwoLine}}>
                                    3rd floor, East, 47-50 Margaret St,
                                    London W1W 8SE, UK
                                </ContactDetail>
                            </ul>
                        </div>
                        <div className={classes.allOtherLinks}>
                            <div className={classes.linkBlock}>
                                <h3 className={classes.h3}>TypeDB</h3>
                                <ul className={classes.linkBlockList}>
                                    <FooterLink href={urls.docs.typeDBQuickstart}>Quickstart</FooterLink>
                                    <FooterLink href={urls.downloadTypeDB}>Install</FooterLink>
                                    <FooterLink href={urls.support} target="_blank">Support</FooterLink>
                                </ul>
                            </div>
                            <div className={classes.linkBlock}>
                                <h3 className={classes.h3}>Developer</h3>
                                <ul className={classes.linkBlockList}>
                                    <FooterLink href={urls.docs.home}>Documentation</FooterLink>
                                    <FooterLink href={urls.discuss}>Discuss</FooterLink>
                                    <FooterLink href={urls.social.github} target="_blank">GitHub</FooterLink>
                                </ul>
                            </div>
                            <div className={classes.linkBlock}>
                                <h3 className={classes.h3}>Company</h3>
                                <ul className={classes.linkBlockList}>
                                    <FooterLink href={urls.blog} target="_blank">Blog</FooterLink>
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
    // to?: string;
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
                <p className={ownClasses.linkText}>
                {type === "address" ?
                    <address className={ownClasses.linkText}>
                        {children}
                    </address> : <>{children}</>}
                </p>
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
