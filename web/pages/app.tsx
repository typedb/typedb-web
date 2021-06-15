import React from 'react';
import {indexStyles} from './index-styles';
import {VaticleRouter} from "./router";
import {vaticleMuiTheme} from "../common/styles/theme";
import {ThemeProvider} from "@material-ui/core";

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
