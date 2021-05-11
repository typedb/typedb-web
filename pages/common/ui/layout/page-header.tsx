import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import React from 'react';

import VaticleLogo from "../../../assets/images/vaticle-logo.svg";

import { pageHeaderStyles } from "./layout-styles";
import { GithubButton } from "../button/github-button";
import { VaticleButton } from "../button/button";
import { downloadTypeDBURL } from "../../urls";
import clsx from 'clsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";
import { commonStyles } from "../common-styles";

interface PageHeaderProps {
    typeDBVersion: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({typeDBVersion}) => {
    const classes = Object.assign({}, commonStyles(), pageHeaderStyles());

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
                        <HeaderMenuItem>Databases</HeaderMenuItem>
                        <HeaderMenuItem>Solutions</HeaderMenuItem>
                        <HeaderMenuItem>Use Cases</HeaderMenuItem>
                        <HeaderMenuItem>Developer</HeaderMenuItem>
                        <HeaderMenuItem>Conference</HeaderMenuItem>
                        <HeaderMenuItem>Community</HeaderMenuItem>
                        <HeaderMenuItem>Blog</HeaderMenuItem>

                        <div className={classes.filler}/>

                        <HeaderLink>Contact</HeaderLink>
                        <HeaderLink>Support</HeaderLink>
                        <Link to="/cloud">
                            <HeaderLink>Cloud</HeaderLink>
                        </Link>

                        <VaticleButton size="small" type="secondary" href={downloadTypeDBURL} target="_blank" className={classes.toolbarItem}>Download {typeDBVersion}</VaticleButton>
                        <div className={classes.toolbarItem}>
                            <GithubButton/>
                        </div>
                    </div>

                    <IconButton edge="end" className={clsx(classes.toolbarItem, classes.hideDesktop)}>
                        <FontAwesomeIcon className={classes.hamburger} icon={faBars} />
                    </IconButton>
                </nav>
            </header>
            <nav className={classes.mainMenu}>
                <div className={classes.siteSectionsMenu}>
                    <HeaderMenuItem>Databases</HeaderMenuItem>
                    <HeaderMenuItem>Solutions</HeaderMenuItem>
                    <HeaderMenuItem>Use Cases</HeaderMenuItem>
                    <HeaderMenuItem>Developer</HeaderMenuItem>
                    <HeaderMenuItem>Conference</HeaderMenuItem>
                    <HeaderMenuItem>Community</HeaderMenuItem>
                    <HeaderMenuItem>Blog</HeaderMenuItem>
                </div>

                <div className={classes.otherLinksMenu}>
                    <div className={classes.externalLinksMenu}>
                        <VaticleButton size="small" type="secondary" href={downloadTypeDBURL} target="_blank" className={classes.toolbarItem}>Download {typeDBVersion}</VaticleButton>
                        <div className={classes.externalLinksMenuItem}>
                            <GithubButton/>
                        </div>
                    </div>
                    <div className={classes.internalLinksMenu}>
                        <HeaderLink>Contact</HeaderLink>
                        <HeaderLink>Support</HeaderLink>
                        <Link to="/cloud">
                            <HeaderLink>Cloud</HeaderLink>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

const HeaderMenuItem: React.FC = ({children}) => {
    const classes = pageHeaderStyles();

    return <p className={clsx(classes.toolbarItem, classes.linkText)}>{children}</p>;
}

const HeaderLink: React.FC = ({children}) => {
    const classes = pageHeaderStyles();

    return (
        <div className={clsx(classes.toolbarItem, classes.linkText)}>
            <p>{children}</p>
            <hr className={classes.linkUnderline}/>
        </div>
    );
}
