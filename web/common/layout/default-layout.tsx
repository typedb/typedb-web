import React, { useLayoutEffect, useState } from "react";
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";
import { vaticleStyles } from "../styles/vaticle-styles";
import { ContactForm } from "../../pages/contact/contact-form";
import { VaticleDialog } from "../dialog/dialog";
import { useHistory, useLocation } from "react-router-dom";
import { deleteSearchParam, getSearchParam } from "../util/search-params";
import CookieConsent from "react-cookie-consent";
import { VaticleLink } from "../link/link";
import { routes } from "../../pages/router";
import { VaticleSnackbar } from "../snackbar/snackbar";

export const DefaultLayout: React.FC = ({ children }) => {
    const classes = Object.assign({}, vaticleStyles(), defaultLayoutStyles());

    const [contactFormDialogOpen, setContactFormDialogOpen] = useState(false);
    const [contactSuccessSnackbarOpen, setContactSuccessSnackbarOpen] = useState(false);
    const [contactErrorSnackbarOpen, setContactErrorSnackbarOpen] = useState(false);

    const routerHistory = useHistory();
    const routerLocation = useLocation();

    useLayoutEffect(() => {
        setContactFormDialogOpen(getSearchParam("dialog") === "contact");
    }, [routerLocation.search]);

    const onContactFormSubmitDone = (res: Response) => {
        if (res.ok) {
            deleteSearchParam(routerHistory, routerLocation, "dialog");
            setContactSuccessSnackbarOpen(true);
        } else {
            setContactErrorSnackbarOpen(true);
        }
    };

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
                <p className={classes.mediumText}>
                    We use cookies to improve the user experience on our website. If you want to know more about it,
                    you can read our <VaticleLink to={routes.privacyPolicy}>privacy policy</VaticleLink>.
                </p>
            </CookieConsent>

            <VaticleDialog open={contactFormDialogOpen} setOpen={setContactFormDialogOpen}>
                <ContactForm id="contact-form-popup" onSubmitDone={onContactFormSubmitDone}/>
            </VaticleDialog>
            <VaticleSnackbar variant="success" message="Your message has been sent." open={contactSuccessSnackbarOpen} setOpen={setContactSuccessSnackbarOpen}/>
            <VaticleSnackbar variant="error" message="Your message failed to send, please try again later." open={contactErrorSnackbarOpen} setOpen={setContactErrorSnackbarOpen}/>
        </>
    );
};
