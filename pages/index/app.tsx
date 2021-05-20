import React from 'react';
import { indexStyles } from './index-styles';
import { Router } from "./router";
import { vaticleMuiTheme } from "../styles/theme";
import { ThemeProvider } from "@material-ui/core";

export const VaticleWebApp: React.FC = () => {
    const classes = indexStyles();

    return (
        <ThemeProvider theme={vaticleMuiTheme}>
            <div className={classes.root}>
                <Router/>
            </div>
        </ThemeProvider>
    );
};
