import React, {useState} from "react";
import {VaticleTextField} from "../../common/input/text-field";
import {VaticleSelect} from "../../common/select/select";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {urls} from "../../common/urls";
import { FormOption, VaticleForm } from "../../common/form/form";
import { formStyles } from "../../common/form/form-styles";
import { getCookieByName } from "../../common/util/cookie";
import { useCaseStyles } from "./use-case-styles";

interface WhitePaperFormProps {
    hubspotFormID: string;
    onSubmitDone: (res: Response) => any;
}

export const WhitePaperForm: React.FC<WhitePaperFormProps> = ({hubspotFormID, onSubmitDone}) => {
    const classes = Object.assign({}, vaticleStyles(), formStyles(), useCaseStyles());

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobFunction, setJobFunction] = useState("");

    const submit = async () => {
        const context: any = {
            "pageUri": window.location.href,
            "pageName": document.getElementsByTagName("title")[0].innerHTML,
        };
        const hutk = getCookieByName("hubspotutk");
        if (hutk) context.hutk = hutk;

        const res = await fetch(new Request(urls.hubspotForm.byID(hubspotFormID), {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "fields": [
                    {"name": "email", "value": email},
                    {"name": "firstname", "value": firstName},
                    {"name": "lastname", "value": lastName},
                    {"name": "company", "value": companyName},
                    {"name": "job_function", "value": jobFunction},
                ],
                "context": context
            }),
        }));

        onSubmitDone(res);
        return res;
    };

    return (
        <VaticleForm id="downloadForm" submitText="Download White Paper" onSubmit={submit} classes={{root: classes.whitePaperFormContainer, form: classes.whitePaperForm}}>
            <div className={classes.formRow}>
                <VaticleTextField name="first-name" autocomplete="given-name" value={firstName} setValue={setFirstName} label="First Name" required/>
            </div>

            <div className={classes.formRow}>
                <VaticleTextField name="last-name" autocomplete="family-name" value={lastName} setValue={setLastName} label="Last Name" required/>
            </div>

            <div className={classes.formRow}>
                <VaticleTextField name="email" autocomplete="email" value={email} setValue={setEmail} label="Work Email" type="email" required/>
            </div>

            <div className={classes.formRow}>
                <VaticleTextField name="company-name" autocomplete="organization" value={companyName} setValue={setCompanyName} label="Company Name" required/>
            </div>

            <div className={classes.formRow}>
                <VaticleSelect label="Job Function" value={jobFunction} setValue={setJobFunction}
                               inputName="job-function" inputID="contact-job-function" variant="filled">
                    <option disabled value="">Job Function</option>
                    <FormOption value="Tech Executive (CIO, CTO, VP Engineering, etc.)"/>
                    <FormOption value="Business Executive (CEO, COO, CMO, etc.)"/>
                    <FormOption value="Architect"/>
                    <FormOption value="Business Development / Alliance Manager"/>
                    <FormOption value="DBA"/>
                    <FormOption value="Technical Operations"/>
                    <FormOption value="Director / Development Manager"/>
                    <FormOption value="Product / Project Manager"/>
                    <FormOption value="Software Developer / Engineer"/>
                    <FormOption value="Business Analyst"/>
                    <FormOption value="Data Scientist"/>
                    <FormOption value="Academic (Student, Teacher, Professor)"/>
                    <FormOption value="Other"/>
                </VaticleSelect>
            </div>
        </VaticleForm>
    );
}
