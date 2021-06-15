import React from "react";
import { VaticleDialog } from "../../common/dialog/dialog";
import { ContactForm } from "./contact-form";

interface ContactFormDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const ContactFormDialog: React.FC<ContactFormDialogProps> = ({open, setOpen}) => {
    return (
        <VaticleDialog open={open} setOpen={setOpen}>
            <ContactForm/>
        </VaticleDialog>
    );
};
