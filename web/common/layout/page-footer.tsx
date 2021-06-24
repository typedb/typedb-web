import React, { useLayoutEffect, useState } from "react";
import { pageFooterStyles } from "./layout-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebookSquare, faGithub, faLinkedin, faTwitter, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import clsx from "clsx";
import { VaticleButton } from "../button/button";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/pro-solid-svg-icons";
import { vaticleStyles } from "../styles/vaticle-styles";
import { urls } from "../urls";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../pages/router";
import { VaticleDialog } from "../dialog/dialog";
import { NewsletterForm } from "../../pages/newsletter/newsletter-form";
import { getSearchParam } from "../util/search-params";

// TODO: The routes used in this Footer must be parameterised. Otherwise, it depends on pages, which is not allowed.
export const PageFooter: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), pageFooterStyles());

    const [newsletterFormOpen, setNewsletterFormOpen] = useState(false);

    const routerLocation = useLocation();

    useLayoutEffect(() => {
        setNewsletterFormOpen(getSearchParam("dialog") === "newsletter");
    }, [routerLocation.search]);

    return (
        <footer className={clsx(classes.root, classes.sectionMargin)}>
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
                            <a href={urls.github.org} target="_blank" className={classes.socialLinkGithub}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconGithub)} icon={faGithub} />
                            </a>
                        </div>

                        <div className={classes.subscribe}>
                            <VaticleButton size="small" type="secondary" to="?dialog=newsletter">Subscribe to our newsletter</VaticleButton>
                        </div>
                    </div>

                    <hr className={classes.separator}/>
                </section>

                <section className={classes.subsectionMargin}>
                    <nav className={classes.linksSection}>
                        <div className={classes.contact}>
                            <h3 className={classes.h3}>Contact</h3>
                            <ul className={classes.linkList}>
                                <ContactDetail href={urls.github.org} target="_blank" icon={faGithub}>Vaticle on GitHub</ContactDetail>
                                <ContactDetail href={urls.social.discord} target="_blank" icon={faDiscord}>Vaticle on Discord</ContactDetail>
                                <ContactDetail icon={faPhoneAlt} to="?dialog=contact">Get in Touch</ContactDetail>
                                <ContactDetail href={urls.officeLocation} target="_blank" icon={faMapMarkerAlt} type="address" classes={{anchor: classes.linkTwoLine}}>
                                    47-50 Margaret St, 3rd floor
                                    London W1W 8SE, UK
                                </ContactDetail>
                            </ul>
                        </div>
                        <div className={classes.allOtherLinks}>
                            <div className={classes.linkBlock}>
                                <h3 className={classes.h3}>TypeDB</h3>
                                <ul className={classes.linkBlockList}>
                                    <FooterLink to={routes.typeDB}>TypeDB</FooterLink>
                                    <FooterLink to={routes.typeDBCluster}>TypeDB Cluster</FooterLink>
                                    <FooterLink href={urls.docs.typeDBQuickstart}>Quickstart</FooterLink>
                                    <FooterLink href={urls.support} target="_blank">Support</FooterLink>
                                </ul>
                            </div>
                            <div className={classes.linkBlock}>
                                <h3 className={classes.h3}>Developer</h3>
                                <ul className={classes.linkBlockList}>
                                    <FooterLink href={urls.docs.home}>Documentation</FooterLink>
                                    <FooterLink href={urls.forum}>Forum</FooterLink>
                                    <FooterLink href={urls.github.org} target="_blank">GitHub</FooterLink>
                                    <FooterLink href={urls.stackOverflow} target="_blank">Stack Overflow</FooterLink>
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

            <VaticleDialog open={newsletterFormOpen} setOpen={setNewsletterFormOpen}>
                <NewsletterForm/>
            </VaticleDialog>
        </footer>
    );
};

interface FooterLinkProps {
    href?: string;
    to?: string;
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
                </address> : <p className={ownClasses.linkText}>{children}</p>}
            </a>
        </li>
    );
};

const FooterLink: React.FC<FooterLinkProps> = ({children, to, href, target}) => {
    const ownClasses = Object.assign({}, vaticleStyles(), pageFooterStyles());

    if (to) {
        return (
            <li>
                <Link to={to} className={ownClasses.sitemapLink}>
                    <p className={ownClasses.linkText}>{children}</p>
                </Link>
            </li>
        );
    }

    return (
        <li>
            <a href={href} target={target} className={ownClasses.sitemapLink}>
                <p className={ownClasses.linkText}>{children}</p>
            </a>
        </li>
    );
};
