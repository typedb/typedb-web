import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import React, { MouseEventHandler, useState } from 'react';

import VaticleLogo from "../assets/logos/vaticle.svg";

import { pageHeaderStyles } from "./layout-styles";
import { GithubButton } from "../button/github-button";
import { VaticleButton } from "../button/button";
import { downloadTypeDBURL, supportPlatformURL } from "../urls";
import clsx from 'clsx';
import { HamburgerCollapse } from "react-animated-burgers/lib";
import { vaticleStyles } from "../styles/vaticle-styles";

interface PageHeaderProps {
    typeDBVersion: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({typeDBVersion}) => {
    const classes = Object.assign({}, vaticleStyles(), pageHeaderStyles());

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuInvisible, setMenuInvisible] = useState(true);
    const [menuLocked, setMenuLocked] = useState(false);

    const toggleMenuOpen = () => {
        if (menuLocked) return;

        if (menuOpen) {
            setMenuOpen(false);
            setMenuLocked(true);
            setTimeout(() => {
                setMenuInvisible(true);
                setMenuLocked(false);
            }, 400);
        } else { // if (!menuOpen)
            setMenuOpen(true);
            setMenuInvisible(false);
            setMenuLocked(true);
            setTimeout(() => {
                setMenuLocked(false);
            }, 400);
        }
    };

    return (
        <>
            <header className={classes.appBar}>
                <nav className={classes.toolbar}>
                    <Link to="/" className={classes.toolbarFirstItem}>
                        <IconButton edge="start">
                            <VaticleLogo className={classes.logo}/>
                        </IconButton>
                    </Link>

                    <div className={clsx(classes.desktopItems, classes.showDesktop)}>
                        <Sitemap/>

                        <div className={classes.filler}/>

                        <ExternalLinks typeDBVersion={typeDBVersion}/>
                    </div>

                    <HamburgerCollapse className={clsx(classes.toolbarItem, classes.hideDesktop)}
                                       barColor="#FFF" isActive={menuOpen} toggleButton={() => toggleMenuOpen()}/>
                </nav>
            </header>
            <nav className={clsx(classes.mainMenu, classes.hideDesktop, menuOpen && "open", menuInvisible && "invisible")}>
                <div className={classes.mainMenuContent}>
                    <div className={classes.sitemapMenu}>
                        <Sitemap/>
                    </div>

                    <div className={classes.linksMenu}>
                        <ExternalLinks typeDBVersion={typeDBVersion}/>
                    </div>
                </div>
            </nav>
        </>
    );
};

// TODO: Add sitemap once most of the linked pages are implemented
const Sitemap: React.FC = () => (
    <>
        {/*<HeaderMenuItem>Databases</HeaderMenuItem>*/}
        {/*<HeaderMenuItem>Solutions</HeaderMenuItem>*/}
        {/*<HeaderMenuItem>Use Cases</HeaderMenuItem>*/}
        {/*<HeaderMenuItem>Developer</HeaderMenuItem>*/}
        {/*<HeaderMenuItem>Conference</HeaderMenuItem>*/}
        {/*<HeaderMenuItem>Community</HeaderMenuItem>*/}
        {/*<HeaderMenuItem>Blog</HeaderMenuItem>*/}
    </>
);

interface ExternalLinksProps {
    typeDBVersion: string;
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({typeDBVersion}) => {
    const classes = pageHeaderStyles();

    return (
        <>
            <ExternalLink>Contact</ExternalLink>
            <ExternalLink href={supportPlatformURL} target="_blank">Support</ExternalLink>
            <VaticleButton size="small" type="secondary" href={downloadTypeDBURL} target="_blank"
                           className={clsx(classes.toolbarItem, classes.externalLinksDownload)}>Download {typeDBVersion}</VaticleButton>
            <div className={classes.externalLinksGithub}>
                <GithubButton/>
            </div>
        </>
    );
};

const HeaderMenuItem: React.FC = ({children}) => {
    const classes = pageHeaderStyles();

    return <p className={clsx(classes.toolbarItem, classes.linkText)}>{children}</p>;
}

interface ExternalLinkProps {
    href?: string;
    target?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({children, href, target, onClick}) => {
    return (
        <a href={href} target={target} onClick={onClick}>
            <ExternalLinkText>{children}</ExternalLinkText>
        </a>
    );
}

const ExternalLinkText: React.FC = ({children}) => {
    const classes = pageHeaderStyles();

    return (
        <div className={clsx(classes.toolbarItem, classes.linkText)}>
            <p>{children}</p>
            <hr className={classes.linkUnderline}/>
        </div>
    );
}
