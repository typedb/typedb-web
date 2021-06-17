import React, { useLayoutEffect, useState } from 'react';
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";
import { vaticleStyles } from "../styles/vaticle-styles";
import { ContactForm } from "../../pages/contact/contact-form";
import { VaticleDialog } from "../dialog/dialog";
import { useLocation, useHistory } from 'react-router-dom';
import { getSearchParam, setSearchParam } from "../util/search-params";

export const DefaultLayout: React.FC = ({ children }) => {
    const ownClasses = Object.assign({}, vaticleStyles(), defaultLayoutStyles());

    const [contactFormDialogOpen, setContactFormDialogOpen] = useState(false);
    const routerLocation = useLocation();
    const routerHistory = useHistory();

    const navigateToContactForm = () => {
        setSearchParam(routerHistory, routerLocation, "dialog", "contact");
    };

    useLayoutEffect(() => {
        setContactFormDialogOpen(getSearchParam("dialog") === "contact");
    }, [routerLocation.search]);

    return (
        <>
            <PageHeader onContactClick={navigateToContactForm}/>
            <div className={ownClasses.underDevelopmentRibbon}>site under development</div>
            <main className={ownClasses.main}>
                <article>
                    {children}
                </article>
            </main>
            <PageFooter onContactClick={navigateToContactForm}/>

            <VaticleDialog open={contactFormDialogOpen} setOpen={setContactFormDialogOpen}>
                <ContactForm/>
            </VaticleDialog>
        </>
    );
};
