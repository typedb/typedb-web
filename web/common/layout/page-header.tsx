import React, { useState } from 'react';

import VaticleLogo from "../assets/logos/vaticle.svg";
import { CosmosBanner } from "./cosmos-banner";

import { eventBannerVisible, pageHeaderStyles } from "./layout-styles";
import { GithubButton } from "../button/github-button";
import { VaticleButton } from "../button/button";
import clsx from "clsx";
import { HamburgerCollapse } from "react-animated-burgers/lib";
import { vaticleStyles } from "../styles/vaticle-styles";
import { urls } from "../urls";
import { routes } from "../../pages/router";
import { VaticleLink } from "../link/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowLeft } from "@fortawesome/pro-light-svg-icons/faLongArrowLeft";
import { EventBanner } from "./event-banner";

export const PageHeader: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), pageHeaderStyles());

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileMenuInvisible, setMobileMenuInvisible] = useState(true);
    const [mobileMenuLocked, setMobileMenuLocked] = useState(false);

    const toggleMobileMenuOpen = () => {
        if (mobileMenuLocked) return;
        if (window.matchMedia("(min-width: 1360px)").matches) return;

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
        <div className={classes.headerSection}>
            {/*<CosmosBanner/>*/}
            {eventBannerVisible && <EventBanner/>}
            <header className={classes.appBar}>
                <nav className={classes.toolbar}>
                    <VaticleLink className={clsx(classes.logoContainer)} to={routes.home}>
                        <VaticleLogo className={classes.logo}/>
                    </VaticleLink>

                    <div className={clsx(classes.desktopItems, classes.showMediumDesktop)}>
                        <Sitemap toggleMobileMenuOpen={toggleMobileMenuOpen}/>

                        <div className={classes.filler}/>

                        <ImportantLinks/>
                    </div>

                    <HamburgerCollapse className={clsx(classes.hamburger, classes.hideMediumDesktop)} barColor="#FFF"
                                       isActive={mobileMenuOpen} toggleButton={() => toggleMobileMenuOpen()}/>
                </nav>
            </header>
            <nav className={clsx(classes.mobileMenu, classes.hideMediumDesktop, mobileMenuOpen && "open", mobileMenuInvisible && "invisible")}>
                <div className={classes.mobileMenuContent}>
                    <Sitemap toggleMobileMenuOpen={toggleMobileMenuOpen}/>

                    <div className={classes.filler}/>

                    <ImportantLinks/>
                </div>
            </nav>
        </div>
    );
};

interface SitemapProps {
    toggleMobileMenuOpen: () => void;
}

const Sitemap: React.FC<SitemapProps> = ({toggleMobileMenuOpen}) => {
    const classes = pageHeaderStyles();

    return (
        <ul className={classes.menu}>
            <SitemapSubmenu title="Technologies">
                <SitemapSubmenuItem to={routes.typeDB} onClick={toggleMobileMenuOpen}>TypeDB</SitemapSubmenuItem>
                <SitemapSubmenuItem to={routes.typeDBCluster} onClick={toggleMobileMenuOpen}>TypeDB Cluster</SitemapSubmenuItem>
            </SitemapSubmenu>
            <SitemapSubmenu title="Solutions">
                <SitemapSubmenuItem to={routes.services} onClick={toggleMobileMenuOpen}>Services</SitemapSubmenuItem>
                <SitemapSubmenuItem to={routes.support} onClick={toggleMobileMenuOpen}>Support</SitemapSubmenuItem>
            </SitemapSubmenu>
            <SitemapSubmenu title="Use Cases">
                <SitemapSubmenuItem to={routes.useCases.cyberSecurity} onClick={toggleMobileMenuOpen}>Cyber Security</SitemapSubmenuItem>
                <SitemapSubmenuItem to={routes.useCases.knowledgeGraphs} onClick={toggleMobileMenuOpen}>Knowledge Graphs</SitemapSubmenuItem>
                <SitemapSubmenuItem to={routes.useCases.lifeSciences} onClick={toggleMobileMenuOpen}>Life Sciences</SitemapSubmenuItem>
                <SitemapSubmenuItem to={routes.useCases.machineLearning} onClick={toggleMobileMenuOpen}>Machine Learning</SitemapSubmenuItem>
            </SitemapSubmenu>
            <SitemapSubmenu title="Developer">
                <SitemapSubmenuItem href={urls.docs.home} onClick={toggleMobileMenuOpen}>Documentation</SitemapSubmenuItem>
                <SitemapSubmenuItem href={urls.forum} onClick={toggleMobileMenuOpen}>Discussion Forum</SitemapSubmenuItem>
            </SitemapSubmenu>
            <SitemapSubmenu title="Conferences">
                <SitemapSubmenuItem href={urls.cosmos2020} onClick={toggleMobileMenuOpen}>TypeDB Cosmos 2020</SitemapSubmenuItem>
                <SitemapSubmenuItem href={urls.cosmos2022} onClick={toggleMobileMenuOpen}>TypeDB Cosmos 2022</SitemapSubmenuItem>
            </SitemapSubmenu>
            <li>
                <VaticleLink href={urls.blog} target="_blank"><span>Blog</span></VaticleLink>
            </li>
        </ul>
    );
}

interface SitemapSubmenuItemData {
    to?: string;
    href?: string;
}

interface SitemapSubmenuProps {
    title: string;
}

const SitemapSubmenu: React.FC<SitemapSubmenuProps> = ({title, children}) => {
    const classes = pageHeaderStyles();

    const backButton = (
        <li className={classes.backMenuItem}>
            <VaticleLink><span><FontAwesomeIcon className={classes.backButton} icon={faLongArrowLeft}/></span></VaticleLink>
        </li>
    );

    return (
        <li><div tabIndex={0}>
            {title}
            <ul>
                {backButton}
                {children}
            </ul>
        </div></li>
    );
}

interface SitemapSubmenuItemProps extends SitemapSubmenuItemData {
    onClick: () => void;
}

const SitemapSubmenuItem: React.FC<SitemapSubmenuItemProps> = ({children, to, href, onClick}) => (
    <li><VaticleLink onClick={onClick} to={to} href={href}><span>{children}</span></VaticleLink></li>
);

const ImportantLinks: React.FC = () => {
    const classes = pageHeaderStyles();

    return (
        <ul className={clsx(classes.menu, classes.linksMenu)}>
            <li><VaticleLink to="?dialog=contact"><span>Contact</span></VaticleLink></li>
            <li><VaticleLink href={urls.supportPlatform} target="_blank"><span>Support</span></VaticleLink></li>
            <li className={classes.download}>
                <VaticleButton className={classes.noHover} size="small" type="secondary" to={routes.download}>Download</VaticleButton>
            </li>
            <li className={classes.importantLinksGithub}><GithubButton/></li>
        </ul>
    );
};
