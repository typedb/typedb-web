import React, { useState } from 'react';

import VaticleLogo from "../assets/logos/vaticle.svg";

import { pageHeaderStyles } from "./layout-styles";
import { GithubButton } from "../button/github-button";
import { VaticleButton } from "../button/button";
import clsx from 'clsx';
import { HamburgerCollapse } from "react-animated-burgers/lib";
import { vaticleStyles } from "../styles/vaticle-styles";
import { urls } from "../urls";
import { routes } from "../../pages/router";
import { VaticleLink, VaticleLinkProps } from "../link/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowLeft } from "@fortawesome/pro-light-svg-icons/faLongArrowLeft";

interface PageHeaderProps {
    onContactClick: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ onContactClick }) => {
    const classes = Object.assign({}, vaticleStyles(), pageHeaderStyles());

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileMenuInvisible, setMobileMenuInvisible] = useState(true);
    const [mobileMenuLocked, setMobileMenuLocked] = useState(false);

    const toggleMobileMenuOpen = () => {
        if (mobileMenuLocked) return;
        if (window.matchMedia("(min-width: 1200px)").matches) return;

        if (mobileMenuOpen) {
            setMobileMenuOpen(false);
            setMobileMenuLocked(true);
            setTimeout(() => {
                setMobileMenuInvisible(true);
                setMobileMenuLocked(false);
            }, 400);
        } else { // if (!mobileMenuOpen)
            setMobileMenuOpen(true);
            setMobileMenuInvisible(false);
            setMobileMenuLocked(true);
            setTimeout(() => {
                setMobileMenuLocked(false);
            }, 400);
        }
    };

    return (
        <>
            <header className={classes.appBar}>
                <nav className={classes.toolbar}>
                    <VaticleLink className={classes.logoContainer} to={routes.home}>
                        <VaticleLogo className={classes.logo}/>
                    </VaticleLink>

                    <div className={clsx(classes.desktopItems, classes.showDesktop)}>
                        <Sitemap toggleMobileMenuOpen={toggleMobileMenuOpen}/>

                        <div className={classes.filler}/>

                        <ExternalLinks onContactClick={onContactClick}/>
                    </div>

                    <HamburgerCollapse className={clsx(classes.hamburger, classes.hideDesktop)} barColor="#FFF"
                                       isActive={mobileMenuOpen} toggleButton={() => toggleMobileMenuOpen()}/>
                </nav>
            </header>
            <nav className={clsx(classes.mobileMenu, classes.hideDesktop, mobileMenuOpen && "open", mobileMenuInvisible && "invisible")}>
                <div className={classes.mobileMenuContent}>
                    <Sitemap toggleMobileMenuOpen={toggleMobileMenuOpen}/>

                    <div className={classes.filler}/>

                    <ExternalLinks onContactClick={onContactClick}/>
                </div>
            </nav>
        </>
    );
};

interface SitemapProps {
    toggleMobileMenuOpen: () => void;
}

const Sitemap: React.FC<SitemapProps> = ({toggleMobileMenuOpen}) => {
    const classes = pageHeaderStyles();

    return (
        <ul className={classes.menu}>
            <li>
                <VaticleLink>
                    Technologies
                    <ul>
                        <li className={classes.backMenuItem}>
                            <VaticleLink><span><FontAwesomeIcon className={classes.backButton} icon={faLongArrowLeft}/></span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} className={classes.standardMenuLink} to={routes.typeDB}><span>TypeDB</span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} className={classes.standardMenuLink} to={routes.typeDBCluster}><span>TypeDB Cluster</span></VaticleLink>
                        </li>
                    </ul>
                </VaticleLink>
            </li>
            <li>
                <VaticleLink>
                    Developer
                    <ul>
                        <li className={classes.backMenuItem}>
                            <VaticleLink><span><FontAwesomeIcon className={classes.backButton} icon={faLongArrowLeft}/></span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} className={classes.standardMenuLink} href={urls.docs.home}><span>Documentation</span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} className={classes.standardMenuLink} href={urls.forum}><span>Discussion Forum</span></VaticleLink>
                        </li>
                    </ul>
                </VaticleLink>
            </li>
            <li>
                <VaticleLink className={classes.standardMenuLink} href={urls.blog} target="_blank"><span>Blog</span></VaticleLink>
            </li>
        </ul>
    );
}

const ExternalLinks: React.FC<PageHeaderProps> = ({ onContactClick }) => {
    const classes = pageHeaderStyles();

    return (
        <ul className={clsx(classes.menu, classes.linksMenu, classes.flat)}>
            <li>
                <ExternalLink className={classes.standardMenuLink} onClick={onContactClick}><span>Contact</span></ExternalLink>
            </li>
            <li>
                <ExternalLink className={classes.standardMenuLink} href={urls.support} target="_blank"><span>Support</span></ExternalLink>
            </li>
            <li className={classes.download}>
                <VaticleButton className={classes.noHover} size="small" type="secondary" to={routes.download}>Download</VaticleButton>
            </li>
            <li className={classes.externalLinksGithub}>
                <GithubButton/>
            </li>
        </ul>
    );
};

const ExternalLink: React.FC<VaticleLinkProps> = ({className, children, href, target, onClick}) => {
    return (
        <a className={className} href={href} target={target} onClick={onClick}>
            {children}
        </a>
    );
}
