import React, { useLayoutEffect, useState } from "react";
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";
import { vaticleStyles } from "../styles/vaticle-styles";
import { ContactForm } from "../../pages/contact/contact-form";
import { VaticleDialog } from "../dialog/dialog";
import { useLocation } from "react-router-dom";
import { getSearchParam } from "../util/search-params";

export const DefaultLayout: React.FC = ({ children }) => {
    const ownClasses = Object.assign({}, vaticleStyles(), defaultLayoutStyles());

    const [contactFormDialogOpen, setContactFormDialogOpen] = useState(false);
    const routerLocation = useLocation();

    useLayoutEffect(() => {
        setContactFormDialogOpen(getSearchParam("dialog") === "contact");
    }, [routerLocation.search]);

    return (
        <>
            <PageHeader/>
            {/*<div className={ownClasses.underDevelopmentRibbon}>site under development</div>*/}
            <main className={ownClasses.main}>
                <article>
                    {children}
                </article>
            </main>
            <PageFooter/>

            <VaticleDialog open={contactFormDialogOpen} setOpen={setContactFormDialogOpen}>
                <ContactForm/>
            </VaticleDialog>
        </>
    );
};
