import React, { useLayoutEffect, useState } from "react";
import {ClassProps} from "../../common/class-props";
import {VaticleTextField} from "../../common/input/text-field";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {urls} from "../../common/urls";
import { formStyles } from "../../common/form/form-styles";
import { VaticleForm } from "../../common/form/form";
import { getSearchParam, setSearchParam } from "../../common/util/search-params";
import { useHistory, useLocation } from "react-router-dom";

export const NewsletterForm: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), formStyles());

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
        <VaticleForm className={className} id="newsletter-form" submitText="Subscribe to our newsletter" onSubmit={submit}
                     successMessage="Your email has been signed up to our newsletter."
                     errorMessage="Failed to process signup, please try again later.">
            <div className={classes.formRow}>
                <VaticleTextField value={firstName} setValue={setFirstName} label="First Name" required/>
                <VaticleTextField value={lastName} setValue={setLastName} label="Last Name" required/>
            </div>

            <div className={classes.formRow}>
                <VaticleTextField value={email} setValue={setEmail} label="Work Email" type="email" required/>
            </div>
        </VaticleForm>
    );
}
