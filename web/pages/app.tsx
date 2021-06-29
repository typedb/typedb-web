import React from 'react';
import {indexStyles} from './index-styles';
import { VaticleRouter } from "./router";
import { vaticleMuiTheme, vaticleTheme } from "../common/styles/theme";
import {ThemeProvider} from "@material-ui/core";
import CookieConsent from "react-cookie-consent";

export const VaticleWebApp: React.FC = () => {
    const classes = indexStyles();

    return (
        <ThemeProvider theme={vaticleMuiTheme}>
            <div className={classes.root}>
                <VaticleRouter/>
            </div>
            <CookieConsent
                buttonStyle={{ backgroundColor: vaticleTheme.palette.green["1"], fontFamily: "Titillium Web",
                    color: vaticleTheme.palette.purple["3"], fontSize: 16, fontWeight: 600, borderRadius: 5, }}>
                We use cookies to improve the user experience on our website. If you want to know more about it,
                you can read our privacy policy.
            </CookieConsent>
        </ThemeProvider>
    );
};
