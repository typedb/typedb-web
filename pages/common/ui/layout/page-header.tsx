import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import React from 'react';

import VaticleLogo from "../../../assets/images/vaticle-logo.svg";

import { pageHeaderStyles } from "./layout-styles";
import { GithubButton } from "../button/github-button";
import { VaticleButton } from "../button/button";
import { downloadTypeDBURL } from "../../urls";

interface PageHeaderProps {
    typeDBVersion: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({typeDBVersion}) => {
    const classes = pageHeaderStyles();

    return (
        <header className={classes.appBar}>
            <nav className={`${classes.toolbar} page-header-toolbar`}>
                <Link to="/">
                    <IconButton edge="start">
                        <VaticleLogo className={classes.logo}/>
                    </IconButton>
                </Link>

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

                <VaticleButton size="small" type="secondary" href={downloadTypeDBURL} target="_blank">Download {typeDBVersion}</VaticleButton>
                <GithubButton/>
            </nav>
        </header>
    );
};

const HeaderMenuItem: React.FC = ({children}) => {
    const classes = pageHeaderStyles();

    return <p className={classes.linkText}>{children}</p>;
}

const HeaderLink: React.FC = ({children}) => {
    const classes = pageHeaderStyles();

    return (
        <div>
            <p className={classes.linkText}>{children}</p>
            <hr className={classes.linkUnderline}/>
        </div>
    );
}
