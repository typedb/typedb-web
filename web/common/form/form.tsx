import React, {useState} from "react";
import {ClassProps} from "../class-props";
import clsx from "clsx";
import {vaticleStyles} from "../styles/vaticle-styles";
import {VaticleButton} from "../button/button";
import {Link} from "react-router-dom";
import {VaticleSnackbar} from "../snackbar/snackbar";
import { formStyles } from "./form-styles";
import { routes } from "../../pages/router";

interface FormProps extends ClassProps {
    id: string;
    submitText: string;
    onSubmit: () => Promise<Response>;
    successMessage: string;
    errorMessage: string;
}

export const VaticleForm: React.FC<FormProps> = ({className, children, id, submitText, onSubmit, successMessage, errorMessage}) => {
    const classes = Object.assign({}, vaticleStyles(), formStyles());

    const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const submit = () => {
        const form = document.getElementById(id) as HTMLFormElement;
        const isValid = form.reportValidity();
        if (!isValid) return;

        onSubmit().then((res) => {
            if (res.ok) setConfirmationSnackbarOpen(true);
            else setErrorSnackbarOpen(true);
        }).catch((err) => {
            console.error(err);
        });
    };

    return (
        <div className={clsx(classes.formContainer, className)}>
            <form className={classes.form} id={id}>
                {children}

                <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                    <VaticleButton size="small" type="primary" onClick={submit}>{submitText}</VaticleButton>
                </div>

                <aside className={clsx(classes.smallText, classes.buttonCaption)}>By submitting your personal data, you
                    consent to emails from Vaticle. See our <Link to={routes.privacyPolicy}>Privacy Policy</Link>.
                </aside>
            </form>

            <VaticleSnackbar variant="success" message={successMessage} open={confirmationSnackbarOpen} setOpen={setConfirmationSnackbarOpen}/>
            <VaticleSnackbar variant="error" message={errorMessage} open={errorSnackbarOpen} setOpen={setErrorSnackbarOpen}/>
        </div>
    );
}

interface FormOptionProps {
    value: string;
}

export const FormOption: React.FC<FormOptionProps> = ({value}) => <option value={value}>{value}</option>;
