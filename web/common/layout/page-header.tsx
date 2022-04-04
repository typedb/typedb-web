import React, { useState } from 'react';

import VaticleLogo from "../assets/logos/vaticle.svg";
import { CosmosBanner } from "./cosmos-banner";

import { pageHeaderStyles } from "./layout-styles";
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

export const PageHeader: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), pageHeaderStyles());

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileMenuInvisible, setMobileMenuInvisible] = useState(true);
    const [mobileMenuLocked, setMobileMenuLocked] = useState(false);

    const toggleMobileMenuOpen = () => {
        if (mobileMenuLocked) return;
        if (window.matchMedia("(min-width: 1350px)").matches) return;

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
            <li>
                <div tabIndex={0}>
                    Technologies
                    <ul>
                        <li className={classes.backMenuItem}>
                            <VaticleLink><span><FontAwesomeIcon className={classes.backButton} icon={faLongArrowLeft}/></span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} to={routes.typeDB}><span>TypeDB</span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} to={routes.typeDBCluster}><span>TypeDB Cluster</span></VaticleLink>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div tabIndex={0}>
                    Solutions
                    <ul>
                        <li className={classes.backMenuItem}>
                            <VaticleLink><span><FontAwesomeIcon className={classes.backButton} icon={faLongArrowLeft}/></span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} to={routes.support}><span>Support</span></VaticleLink>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div tabIndex={0}>
                    Use Cases
                    <ul>
                        <li className={classes.backMenuItem}>
                            <VaticleLink><span><FontAwesomeIcon className={classes.backButton} icon={faLongArrowLeft}/></span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} to={routes.useCases.lifeSciences}><span>Life Sciences</span></VaticleLink>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div tabIndex={0}>
                    Developer
                    <ul>
                        <li className={classes.backMenuItem}>
                            <VaticleLink><span><FontAwesomeIcon className={classes.backButton} icon={faLongArrowLeft}/></span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} href={urls.docs.home}><span>Documentation</span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} href={urls.forum}><span>Discussion Forum</span></VaticleLink>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div tabIndex={0}>
                    Conferences
                    <ul>
                        <li className={classes.backMenuItem}>
                            <VaticleLink><span><FontAwesomeIcon className={classes.backButton} icon={faLongArrowLeft}/></span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} href={urls.cosmos2020}><span>TypeDB Cosmos 2020</span></VaticleLink>
                        </li>
                        <li>
                            <VaticleLink onClick={toggleMobileMenuOpen} href={urls.cosmos2022}><span>TypeDB Cosmos 2022</span></VaticleLink>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <VaticleLink href={urls.blog} target="_blank"><span>Blog</span></VaticleLink>
            </li>
        </ul>
    );
}

const ImportantLinks: React.FC = () => {
    const classes = pageHeaderStyles();

    return (
        <ul className={clsx(classes.menu, classes.linksMenu)}>
            <li>
                <VaticleLink to="?dialog=contact"><span>Contact</span></VaticleLink>
            </li>
            <li>
                <VaticleLink href={urls.supportPlatform} target="_blank"><span>Support</span></VaticleLink>
            </li>
            <li className={classes.download}>
                <VaticleButton className={classes.noHover} size="small" type="secondary" to={routes.download}>Download</VaticleButton>
            </li>
            <li className={classes.importantLinksGithub}>
                <GithubButton/>
            </li>
        </ul>
    );
};
