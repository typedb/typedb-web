import clsx from "clsx";
import React, { useState } from "react";
import { VaticleSnackbar } from "../../common/snackbar/snackbar";
import { ContactForm } from "./contact-form";
import { ClassProps } from "../../common/class-props";
import { contactFormStyles } from "./contact-styles";

export const InlineContactForm: React.FC<ClassProps> = ({className}) => {
    const classes = contactFormStyles();

    const [contactSuccessSnackbarOpen, setContactSuccessSnackbarOpen] = useState(false);
    const [contactErrorSnackbarOpen, setContactErrorSnackbarOpen] = useState(false);

    const onContactFormSubmitDone = (res: Response) => {
        if (res.ok) {
            setContactSuccessSnackbarOpen(true);
        } else {
            setContactErrorSnackbarOpen(true);
        }
    };

    return (
        <>
            <div className={clsx(classes.inlineForm, className)}>
                <ContactForm id="contact-form-inline" onSubmitDone={onContactFormSubmitDone}/>
            </div>
            <VaticleSnackbar variant="success" message="Your message has been sent." open={contactSuccessSnackbarOpen} setOpen={setContactSuccessSnackbarOpen}/>
            <VaticleSnackbar variant="error" message="Your message failed to send, please try again later." open={contactErrorSnackbarOpen} setOpen={setContactErrorSnackbarOpen}/>
        </>
    );
}
