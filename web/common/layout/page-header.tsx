import { Link } from 'react-router-dom';
import { IconButton, Popover, Popper } from '@material-ui/core';
import React, { useLayoutEffect, useRef, useState } from 'react';

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

interface PageHeaderProps {
    onContactClick: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ onContactClick }) => {
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
                    <Link to={routes.home} className={classes.toolbarFirstItem}>
                        <IconButton edge="start">
                            <VaticleLogo className={classes.logo}/>
                        </IconButton>
                    </Link>

                    <div className={clsx(classes.desktopItems, classes.showDesktop)}>
                        <Sitemap/>

                        <div className={classes.filler}/>

                        <ExternalLinks onContactClick={onContactClick}/>
                    </div>

                    <HamburgerCollapse className={clsx(classes.toolbarItem, classes.hideDesktop)}
                                       barColor="#FFF" isActive={menuOpen} toggleButton={() => toggleMenuOpen()}/>
                </nav>
            </header>
            <nav className={clsx(classes.mobileMenu, classes.hideDesktop, menuOpen && "open", menuInvisible && "invisible")}>
                <div className={classes.mobileMenuContent}>
                    <div className={classes.sitemapMenu}>
                        <Sitemap/>
                    </div>

                    <div className={classes.linksMenu}>
                        <ExternalLinks onContactClick={onContactClick}/>
                    </div>
                </div>
            </nav>
        </>
    );
};

// interface Submenu {
//     open: boolean;
//     setOpen: (value: boolean) => void;
//     element: typeof SubmenuElement;
// }

// TODO: Add sitemap once most of the linked pages are implemented
const Sitemap: React.FC = () => {
    const classes = pageHeaderStyles();

    const [technologiesOpen, setTechnologiesOpen] = useState(false);
    const anchorElRef = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement>(null);

    useLayoutEffect(() => {
        setAnchorEl(anchorElRef.current);
    }, []);

    // const technologiesElement: React.FC = () => (
    //     <SubmenuElement open={technologiesOpen}>
    //         <MenuItem text="TypeDB" to={routes.typeDB}/>
    //         <MenuItem text="TypeDB Cluster" to={routes.typeDBCluster}/>
    //     </SubmenuElement>
    // );

    return (
        <ul className={classes.sitemap}>
            <li className={classes.menuItem}>
                <VaticleLink className={clsx(classes.toolbarItem, classes.linkText)}>Technologies</VaticleLink>
                <ul className={classes.submenu} style={{width: 158}}>
                    <li className={classes.submenuItem}>
                        <VaticleLink className={clsx(classes.submenuLink, classes.linkText)} to={routes.typeDB}>TypeDB</VaticleLink>
                    </li>
                    <li className={classes.submenuItem}>
                        <VaticleLink className={clsx(classes.submenuLink, classes.linkText)} to={routes.typeDBCluster}>TypeDB Cluster</VaticleLink>
                    </li>
                </ul>
            </li>
            {/*<MenuItem text="Technologies" submenu={{open: technologiesOpen, setOpen: setTechnologiesOpen, element: technologiesElement}}/>*/}
            {/*<MenuItem href={urls.docs.home}>Documentation</MenuItem>*/}
            {/*<MenuItem href={urls.forum}>Forum</MenuItem>*/}
            {/*<MenuItem>Databases</MenuItem>*/}
            {/*<MenuItem>Solutions</MenuItem>*/}
            {/*<MenuItem>Use Cases</MenuItem>*/}
            {/*<MenuItem>Developer</MenuItem>*/}
            {/*<MenuItem>Conference</MenuItem>*/}
            {/*<MenuItem>Community</MenuItem>*/}
            {/*<MenuItem href={urls.blog} target="_blank">Blog</MenuItem>*/}
        </ul>
    );
}

const ExternalLinks: React.FC<PageHeaderProps> = ({ onContactClick }) => {
    const classes = pageHeaderStyles();

    return (
        <>
            <ExternalLink text="Contact" onClick={onContactClick}/>
            <ExternalLink text="Support" href={urls.support} target="_blank"/>
            <VaticleButton size="small" type="secondary" to={routes.download}
                           className={clsx(classes.toolbarItem, classes.externalLinksDownload)}>Download</VaticleButton>
            <div className={classes.externalLinksGithub}>
                <GithubButton/>
            </div>
        </>
    );
};

interface HeaderLinkProps extends VaticleLinkProps {
    text: string;
    // submenu?: Submenu;
}

const MenuItem: React.FC<HeaderLinkProps> = ({text, href, target, to}) => {
    const classes = pageHeaderStyles();

    return (
        <div>
            <VaticleLink href={href} target={target} to={to} className={clsx(classes.toolbarItem, classes.linkText)}>{text}</VaticleLink>
        </div>
    );
}

interface SubmenuProps {
    open: boolean;
    anchorEl: Element;
}

// const SubmenuElement: React.FC<SubmenuProps> = ({children, open, anchorEl}) => {
//     return (
//         <Popper open={open} anchorOrigin={{vertical: "bottom", horizontal: "left"}}
//                  transformOrigin={{vertical: "top", horizontal: "left"}}>
//             {children}
//         </Popper>
//     );
// }

const ExternalLink: React.FC<HeaderLinkProps> = ({children, href, target, onClick}) => {
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
