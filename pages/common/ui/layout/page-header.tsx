import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

import VaticleLogo from "../../../assets/images/vaticle-logo.svg";

import { pageHeaderStyles } from "./layout-styles";
import { GithubButton } from "../button/github-button";
import { VaticleButton } from "../button/button";
import { downloadTypeDBUrl } from "../../urls";

interface PageHeaderProps {
    typeDBVersion: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({typeDBVersion}) => {
    const classes = pageHeaderStyles();

    return (
        <AppBar className={classes.appBar}>
            <Toolbar className={`${classes.toolbar} page-header-toolbar`}>
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

                <a href={downloadTypeDBUrl} target="_blank">
                    <VaticleButton size="small" type="secondary">Download {typeDBVersion}</VaticleButton>
                </a>
                <GithubButton/>
            </Toolbar>
        </AppBar>
    );
};

const HeaderMenuItem: React.FC = ({children}) => {
    const classes = pageHeaderStyles();

    return <Typography className={classes.linkText}>{children}</Typography>;
}

const HeaderLink: React.FC = ({children}) => {
    const classes = pageHeaderStyles();

    return (
        <div>
            <Typography className={classes.linkText}>{children}</Typography>
            <hr className={classes.linkUnderline}/>
        </div>
    );
}
