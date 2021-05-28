import React from 'react';
import { indexStyles } from './index-styles';
import { VaticleRouter } from "./router";
import { vaticleMuiTheme } from "../common/styles/theme";
import { ThemeProvider } from "@material-ui/core";
import { Storage } from "./state/storage";

export const VaticleWebApp: React.FC = () => {
    const classes = indexStyles();

    return (
        <ThemeProvider theme={vaticleMuiTheme}>
            <Storage>
                <div className={classes.root}>
                    <VaticleRouter/>
                </div>
            </Storage>
        </ThemeProvider>
    );
};
