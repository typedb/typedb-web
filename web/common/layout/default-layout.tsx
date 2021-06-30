import React, { useLayoutEffect, useState } from "react";
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";
import { vaticleStyles } from "../styles/vaticle-styles";
import { ContactForm } from "../../pages/contact/contact-form";
import { VaticleDialog } from "../dialog/dialog";
import { useLocation } from "react-router-dom";
import { getSearchParam } from "../util/search-params";
import CookieConsent from "react-cookie-consent";
import { VaticleLink } from "../link/link";
import { routes } from "../../pages/router";

export const DefaultLayout: React.FC = ({ children }) => {
    const classes = Object.assign({}, vaticleStyles(), defaultLayoutStyles());

    const [contactFormDialogOpen, setContactFormDialogOpen] = useState(false);
    const routerLocation = useLocation();

    useLayoutEffect(() => {
        setContactFormDialogOpen(getSearchParam("dialog") === "contact");
    }, [routerLocation.search]);

    return (
        <>
            <PageHeader/>
            {/*<div className={ownClasses.underDevelopmentRibbon}>site under development</div>*/}
            <main className={classes.main}>
                <article>
                    {children}
                </article>
            </main>
            <PageFooter/>

            <CookieConsent buttonClasses={classes.cookieConsentButton}>
                <p>
                    We use cookies to improve the user experience on our website. If you want to know more about it,
                    you can read our <VaticleLink to={routes.privacyPolicy}>privacy policy</VaticleLink>.
                </p>
            </CookieConsent>

            <VaticleDialog open={contactFormDialogOpen} setOpen={setContactFormDialogOpen}>
                <ContactForm/>
            </VaticleDialog>
        </>
    );
};
