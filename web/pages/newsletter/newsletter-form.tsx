import React, { useState } from "react";
import {ClassProps} from "../../common/class-props";
import {VaticleTextField} from "../../common/input/text-field";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {urls} from "../../common/urls";
import { formStyles } from "../../common/form/form-styles";
import { VaticleForm } from "../../common/form/form";
import { newsletterStyles } from "./newsletter-styles";
import clsx from "clsx";

export const NewsletterForm: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), formStyles(), newsletterStyles());

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const submit = () => {
        return fetch(new Request(urls.hubspot.newsletterForm, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "fields": [
                    {"name": "firstname", "value": firstName},
                    {"name": "lastname", "value": lastName},
                    {"name": "email", "value": email},
                ],
                "context": {
                    "pageUri": window.location.href,
                    "pageName": document.getElementsByTagName("title")[0].innerHTML,
                },
            }),
        }));
    };

    return (
        <VaticleForm classes={{root: className, form: classes.newsletterForm}} id="newsletter-form" submitText="Subscribe to our newsletter" onSubmit={submit}
                     successMessage="Your email has been signed up to our newsletter."
                     errorMessage="Failed to process signup, please try again later.">
            <div className={clsx(classes.formRow, classes.newsletterFormRow)}>
                <VaticleTextField name="first-name" autocomplete="given-name" value={firstName} setValue={setFirstName} label="First Name" required/>
                <VaticleTextField name="last-name" autocomplete="family-name" value={lastName} setValue={setLastName} label="Last Name" required/>
                <VaticleTextField name="email" autocomplete="email" value={email} setValue={setEmail} label="Email" type="email" required/>
            </div>
        </VaticleForm>
    );
}
