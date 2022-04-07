import React, { useLayoutEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { VaticleDialog } from "../../common/dialog/dialog";
import { VaticleSnackbar } from "../../common/snackbar/snackbar";
import { deleteSearchParam, getSearchParam } from "../../common/util/search-params";
import { ContactForm } from "./contact-form";

export const PopupContactForm: React.FC = () => {
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
            <VaticleDialog open={contactFormDialogOpen} setOpen={setContactFormDialogOpen}>
                <ContactForm id="contact-form-popup" onSubmitDone={onContactFormSubmitDone}/>
            </VaticleDialog>
            <VaticleSnackbar variant="success" message="Your message has been sent." open={contactSuccessSnackbarOpen} setOpen={setContactSuccessSnackbarOpen}/>
            <VaticleSnackbar variant="error" message="Your message failed to send, please try again later." open={contactErrorSnackbarOpen} setOpen={setContactErrorSnackbarOpen}/>
        </>
    );
}
