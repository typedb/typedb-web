import React from "react";
import { PopupContactForm } from "../../pages/contact/popup-contact-form";
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";
import { vaticleStyles } from "../styles/vaticle-styles";
import CookieConsent from "react-cookie-consent";
import { VaticleLink } from "../link/link";
import { routes } from "../../pages/router";

export const VaticleLayout: React.FC = ({ children }) => {
    const classes = Object.assign({}, vaticleStyles(), defaultLayoutStyles());

    return (
        <>
            <PageHeader/>
            {/*<div className={ownClasses.underDevelopmentRibbon}>site under development</div>*/}
            <main className={classes.main}>
                <article>{children}</article>
            </main>
            <PageFooter/>

            <CookieConsent buttonClasses={classes.cookieConsentButton}>
                <p className={classes.mediumText}>
                    We use cookies to improve the user experience on our website. If you want to know more about it,
                    you can read our <VaticleLink to={routes.privacyPolicy}>privacy policy</VaticleLink>.
                </p>
            </CookieConsent>

            <PopupContactForm/>
        </>
    );
};
