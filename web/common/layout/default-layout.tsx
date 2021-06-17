import React, { useLayoutEffect, useState } from 'react';
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";
import { vaticleStyles } from "../styles/vaticle-styles";
import { urls } from "../urls";
import { ContactFormDialog } from "../../pages/contact/contact-form-dialog";

export const DefaultLayout: React.FC = ({ children }) => {
    const ownClasses = Object.assign({}, vaticleStyles(), defaultLayoutStyles());

    const [contactFormDialogOpen, setContactFormDialogOpen] = useState(false);

    useLayoutEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("dialog") === "contact") {
            setContactFormDialogOpen(true);
        }
    }, []);

    return (
        <>
            <PageHeader onContactClick={() => setContactFormDialogOpen(true)}/>
            <div className={ownClasses.underDevelopmentRibbon}>site under development</div>
            <main className={ownClasses.main}>
                <article>
                    {children}
                </article>
            </main>
            <PageFooter onContactClick={() => setContactFormDialogOpen(true)}/>

            <ContactFormDialog open={contactFormDialogOpen} setOpen={setContactFormDialogOpen}/>
        </>
    );
};
