import React from 'react';
import {indexStyles} from './index-styles';
import {VaticleRouter} from "./router";
import { vaticleMuiTheme, vaticleTheme } from "../common/styles/theme";
import {ThemeProvider} from "@material-ui/core";
import { Helmet } from "react-helmet";
import ogImageVaticle from "../assets/images/og-image-vaticle.png";

export const VaticleWebApp: React.FC = () => {
    const classes = indexStyles();

    return (
        <ThemeProvider theme={vaticleMuiTheme}>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="Vaticle"/>
                <meta name="theme-color" content={vaticleTheme.palette.purple["700"]}/>
                <meta property="og:title" content="Introducing TypeDB: a strongly-typed database"/>
                <meta property="og:url" content="https://vaticle.com/"/>
                <meta name="description" content="TypeDB is a database with a rich and logical type system. TypeDB empowers you to solve complex problems, using TypeQL as its query language."/>
                <meta property="og:description" content="TypeDB is a database with a rich and logical type system. TypeDB empowers you to solve complex problems, using TypeQL as its query language."/>
                <meta property="og:image" content={ogImageVaticle}/>
            </Helmet>

            <div className={classes.root}>
                <VaticleRouter/>
            </div>
        </ThemeProvider>
    );
};
