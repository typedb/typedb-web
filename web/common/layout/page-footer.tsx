import React, { useLayoutEffect, useState } from 'react';
import { pageFooterStyles } from "./layout-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebookSquare, faGithub, faLinkedin, faTwitter, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import clsx from "clsx";
import { VaticleButton } from "../button/button";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/pro-solid-svg-icons";
import { vaticleStyles } from "../styles/vaticle-styles";
import { urls } from "../urls";
import { Link } from "react-router-dom";
import { routes } from '../../pages/router';
import { VaticleSnackbar } from "../snackbar/snackbar";
import { ContactFormDialog } from "../../pages/common/contact/contact-form-dialog";

export const PageFooter: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), pageFooterStyles());

    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [subscribeSuccessSnackbarOpen, setSubscribeSuccessSnackbarOpen] = useState(false);
    const [subscribeErrorSnackbarOpen, setSubscribeErrorSnackbarOpen] = useState(false);
    const [contactFormDialogOpen, setContactFormDialogOpen] = useState(false);

    // TODO: This code was copied from ContactForm, we should extract it
    const subscribe = () => {
        const form = document.getElementById("newsletter-form") as HTMLFormElement;
        const isValid = form.reportValidity();
        if (!isValid) return;

        fetch(new Request(urls.hubspot.newsletterForm, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "fields": [{ "name": "email", "value": newsletterEmail }],
                "context": {
                    "pageUri": window.location.href,
                    "pageName": document.getElementsByTagName("title")[0].innerHTML,
                },
            }),
        }))
        .then((res) => {
            if (res.ok) setSubscribeSuccessSnackbarOpen(true);
            else setSubscribeErrorSnackbarOpen(true);
        }).catch((err) => {
            console.error(err);
        });
    };

    useLayoutEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("dialog") === "contact") {
            console.log("opening contact form!");
            setContactFormDialogOpen(true);
        }
    }, []);

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
                            <a href={urls.github.home} target="_blank" className={classes.socialLinkGithub}>
                                <FontAwesomeIcon className={clsx(classes.socialIcon, classes.socialIconGithub)} icon={faGithub} />
                            </a>
                        </div>

                        <div className={classes.subscribe}>
                            <form id="newsletter-form" className={classes.subscribeForm}>
                                <p className={classes.personalDataNotice}>
                                    By submitting your personal data, you consent to emails from Vaticle. See our <Link to={routes.privacyPolicy}>Privacy Policy</Link>.
                                </p>
                                <div className={classes.subscribeActionBlock}>
                                    <input type="email" placeholder="Email address" className={classes.subscribeEmail}
                                           value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required/>
                                    <VaticleButton size="small" type="primary" className={classes.subscribeButton} onClick={subscribe}>Subscribe</VaticleButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    <hr className={classes.separator}/>
                </section>

                <section className={classes.subsectionMargin}>
                    <nav className={classes.linksSection}>
                        <div className={classes.contact}>
                            <h3 className={classes.h3}>Contact</h3>
                            <ul className={classes.linkList}>
                                <ContactDetail href={urls.github.home} target="_blank" icon={faGithub}>Vaticle on GitHub</ContactDetail>
                                <ContactDetail href={urls.social.discord} target="_blank" icon={faDiscord}>Vaticle on Discord</ContactDetail>
                                <ContactDetail icon={faPhoneAlt} onClick={() => setContactFormDialogOpen(true)}>Get in Touch</ContactDetail>
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
                                    <FooterLink href={urls.docs.typeDBQuickstart}>Quickstart</FooterLink>
                                    <FooterLink to={routes.download}>Install</FooterLink>
                                    <FooterLink href={urls.support} target="_blank">Support</FooterLink>
                                </ul>
                            </div>
                            <div className={classes.linkBlock}>
                                <h3 className={classes.h3}>Developer</h3>
                                <ul className={classes.linkBlockList}>
                                    <FooterLink href={urls.docs.home}>Documentation</FooterLink>
                                    <FooterLink href={urls.forum}>Forum</FooterLink>
                                    <FooterLink href={urls.github.home} target="_blank">GitHub</FooterLink>
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

            <ContactFormDialog open={contactFormDialogOpen} setOpen={setContactFormDialogOpen}/>

            <VaticleSnackbar variant="success" message="Your email has been signed up to our newsletter." open={subscribeSuccessSnackbarOpen} setOpen={setSubscribeSuccessSnackbarOpen}/>
            <VaticleSnackbar variant="error" message="Failed to process signup, please try again later." open={subscribeErrorSnackbarOpen} setOpen={setSubscribeErrorSnackbarOpen}/>
        </footer>
    );
};

interface FooterLinkProps {
    href?: string;
    to?: string;
    target?: string;
    onClick?: () => void;
}

interface ContactDetailProps extends FooterLinkProps {
    icon?: IconDefinition;
    type?: "address";
    classes?: Partial<{ anchor: string }>;
}

const ContactDetail: React.FC<ContactDetailProps> = ({children, href, target, icon, type, onClick, classes}) => {
    const ownClasses = Object.assign({}, vaticleStyles(), pageFooterStyles());

    return (
        <li>
            <a href={href} target={target} className={clsx(ownClasses.contactLink, classes?.anchor)} onClick={onClick}>
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
