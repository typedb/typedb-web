import React, {useState} from "react";
import {contactFormStyles} from "./contact-styles";
import {ClassProps} from "../../common/class-props";
import clsx from "clsx";
import {VaticleTextField} from "../../common/input/text-field";
import {VaticleSelect} from "../../common/select/select";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {FormControlLabel} from "@material-ui/core";
import {VaticleCheckbox} from "../../common/input/checkbox";
import {urls} from "../../common/urls";
import { FormOption, VaticleForm } from "../../common/form/form";
import { formStyles } from "../../common/form/form-styles";

export const ContactForm: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), formStyles(), contactFormStyles());

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobFunction, setJobFunction] = useState("");

    const helpTopics = ["Products & Services", "Support", "Consulting", "Sales", "Training",
        "Careers", "PR & Analyst Relations"] as const;

    const [selectedHelpTopics, setSelectedHelpTopics] = useState(helpTopics.reduce(
        (obj, topic) => ({...obj, [topic]: false}), {}) as { [key in typeof helpTopics[number]]: boolean });

    const toggleHelpTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedHelpTopics({...selectedHelpTopics, [event.target.name]: event.target.checked});
    };

    const [tellUsMore, setTellUsMore] = useState("");

    const submit = () => {
        const supportRequestMultiCheckbox = Object.keys(selectedHelpTopics)
            .filter(topic => selectedHelpTopics[topic])
            .map(topic => topic.toLowerCase().replace("&", "and"))
            .map(formattedTopic => {
                return {
                    "name": "support_request__multi_check_box_",
                    "value": formattedTopic,
                };
            });

        return fetch(new Request(urls.hubspot.contactForm, {
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
                    {"name": "company", "value": companyName},
                    {"name": "job_function", "value": jobFunction},
                    {"name": "support_request__full_details_", value: tellUsMore},
                ].concat(supportRequestMultiCheckbox),
                "context": {
                    "pageUri": window.location.href,
                    "pageName": document.getElementsByTagName("title")[0].innerHTML,
                },
            }),
        }));
    };

    return (
        <VaticleForm classes={{root: className}} id="contact-form" submitText="Get in touch" onSubmit={submit}
                     successMessage="Your message has been sent." errorMessage="Your message failed to send, please try again later.">
            <div className={classes.formRow}>
                <VaticleTextField value={firstName} setValue={setFirstName} label="First Name" required/>
                <VaticleTextField value={lastName} setValue={setLastName} label="Last Name" required/>
            </div>

            <div className={classes.formRow}>
                <VaticleTextField value={email} setValue={setEmail} label="Work Email" type="email" required/>
                <VaticleTextField value={companyName} setValue={setCompanyName} label="Company Name" required/>
            </div>

            <div className={classes.formRow}>
                <div className={classes.formCell}>
                    <VaticleSelect label="Job function" value={jobFunction} setValue={setJobFunction}
                                   inputName="job-function" inputID="contact-job-function" variant="filled">
                        <option disabled value="">Job function</option>
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

                    <div className={classes.helpTopics}>
                        <p className={clsx(classes.mediumText)}>What can we help you with?</p>
                        <div className={classes.helpTopicsLists}>
                            <div className={classes.helpTopicsList}>
                                {helpTopics.slice(0, 4).map(topic => (
                                    <FormControlLabel classes={{root: classes.formControlLabel}} label={topic}
                                                      control={<VaticleCheckbox checked={selectedHelpTopics[topic]}
                                                                                onChange={toggleHelpTopic}
                                                                                name={topic}/>}/>
                                ))}
                            </div>
                            <div className={classes.helpTopicsList}>
                                {helpTopics.slice(4).map(topic => (
                                    <FormControlLabel classes={{root: classes.formControlLabel}} label={topic}
                                                      control={<VaticleCheckbox checked={selectedHelpTopics[topic]}
                                                                                onChange={toggleHelpTopic}
                                                                                name={topic}/>}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <VaticleTextField value={tellUsMore} setValue={setTellUsMore}
                                  label="Tell us more about how we can help" multiline/>
            </div>
        </VaticleForm>
    );
}
