import React, { useLayoutEffect } from 'react';
import { indexStyles } from './index-styles';
import { VaticleRouter } from "./router";
import { vaticleMuiTheme } from "../common/styles/theme";
import { ThemeProvider } from "@material-ui/core";
import { useLocation } from "react-router-dom";

export const VaticleWebApp: React.FC = () => {
    const classes = indexStyles();

    return (
        <ThemeProvider theme={vaticleMuiTheme}>
            <div className={classes.root}>
                <VaticleRouter/>
            </div>
        </ThemeProvider>
    );
};
