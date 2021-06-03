import React, { useEffect, useState } from "react";
import { contactFormStyles } from "./contact-styles";
import { ClassProps } from "../../../common/class-props";
import clsx from "clsx";
import { VaticleTextField } from "../../../common/input/text-field";
import { VaticleSelect } from "../../../common/select/select";
import { vaticleStyles } from "../../../common/styles/vaticle-styles";
import { FormControlLabel } from "@material-ui/core";
import { VaticleCheckbox } from "../../../common/input/checkbox";
import { VaticleButton } from "../../../common/button/button";
import { config } from "../../config/config";

export const ContactForm: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), contactFormStyles());

    const [selectedJobFunction, setSelectedJobFunction] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedDevelopmentStage, setSelectedDevelopmentStage] = useState("");
    const [selectedAreasOfInterest, setSelectedAreasOfInterest] = useState({
        training: false,
        migration: false,
        deployment: false,
        licensing: false,
        modelling: false,
        customAPI: false,
        support: false,
        cloud: false,
    });

    const getTellUsMoreLabel = () => window.matchMedia("(max-width: 1023px)").matches
        ? "Tell us more about how we can help you"
        : "Tell us a little bit more about how we can help you";

    const [tellUsMore, setTellUsMore] = useState(getTellUsMoreLabel());

    const toggleAreaOfInterest = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAreasOfInterest({...selectedAreasOfInterest, [event.target.name]: event.target.checked});
    };

    useEffect(() => {
        const updateText = () => {
            setTellUsMore(getTellUsMoreLabel());
        };
        window.addEventListener("resize", updateText);
        return () => window.removeEventListener("resize", updateText);
    }, []);

    const submit = () => {
        // TODO: implement this with real data!
        // fetch(new Request(`https://api.hsforms.com/submissions/v3/integration/submit/4332244/57919d26-b0ed-4837-9b3d-490b5a683a36/`, {
        //     method: "POST",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         "fields": [
        //             { "name": "firstname", "value": "Jeff" },
        //             { "name": "lastname", "value": "Test" },
        //             { "name": "email", "value": "jeff@vaticle.com" },
        //             { "name": "company", "value": "Vaticle" },
        //             { "name": "job_function", "value": "software engineer" },
        //         ],
        //         "context": {
        //             "pageUri": window.location.href,
        //             "pageName": document.getElementsByTagName("title")[0].innerHTML,
        //         },
        //     }),
        // }))
        //     .then(res => res.json())
        //     .then(result => console.log(result))
        //     .catch(err => {
        //         console.error(err);
        //         throw err;
        //     });
    };

    return (
        <div className={clsx(classes.root, className)}>
            <form className={classes.form}>
                <div className={classes.formRow}>
                    <VaticleTextField label="First Name"/>
                    <VaticleTextField label="Last Name"/>
                </div>

                <div className={classes.formRow}>
                    <VaticleTextField label="Email" type="email"/>
                    <VaticleTextField label="Company"/>
                </div>

                <div className={classes.formRow}>
                    <VaticleSelect label="Job function" value={selectedJobFunction} setValue={setSelectedJobFunction} inputName="job-function" inputID="contact-job-function" variant="filled">
                        <option disabled value="">Job function</option>
                        <option value="software engineer">Software Engineer</option>
                        <option value="director">Director / Development Manager</option>
                        <option value="it operations">IT/Dev Operations</option>
                        <option value="software architect">Software Architect</option>
                        <option value="dba">DBA</option>
                        <option value="product manager">Product / Project Manager</option>
                        <option value="consultant">Consultant</option>
                        <option value="tech executive">Technology Executive (CTO, CIO, VP of Eng, etc.)</option>
                        <option value="business executive">Business Executive (CEO, COO, CMO, etc.)</option>
                        <option value="business development">Business Development Manager</option>
                        <option value="academic">Academic (Student, Teacher, Professor)</option>
                        <option value="other">Other</option>
                    </VaticleSelect>

                    <VaticleSelect label="Stage of development" value={selectedDevelopmentStage} setValue={setSelectedDevelopmentStage} inputName="development-stage" inputID="contact-development-stage" variant="filled">
                        <option disabled value="">Stage of development</option>
                        <option value="discovery">Discovery phase</option>
                        <option value="installed">Just installed</option>
                        <option value="development">Development</option>
                        <option value="testing">Testing and Optimisation</option>
                        <option value="production"> Live in production</option>
                    </VaticleSelect>
                </div>

                <div className={classes.formRow}>
                    <div className={classes.formCell}>
                        <VaticleSelect label="Product" value={selectedProduct} setValue={setSelectedProduct} inputName="product" inputID="contact-product" variant="filled">
                            <option disabled value="">Product</option>
                            <option value="core">TypeDB Core</option>
                            <option value="kgms">TypeDB Cluster</option>
                            <option value="workbase">TypeDB Workbase</option>
                            <option value="services">Professional Services</option>
                        </VaticleSelect>
                        <div className={classes.areasOfInterest}>
                            <p className={clsx(classes.mediumText, classes.areasOfInterestCaption)}>Select all areas you're interested in:</p>
                            <div className={classes.areasOfInterestLists}>
                                <div className={classes.areasOfInterestList}>
                                    <FormControlLabel label="Training" control={<VaticleCheckbox checked={selectedAreasOfInterest.training} onChange={toggleAreaOfInterest} name="training"/>}/>
                                    <FormControlLabel label="Migration" control={<VaticleCheckbox checked={selectedAreasOfInterest.migration} onChange={toggleAreaOfInterest} name="migration"/>}/>
                                    <FormControlLabel label="Deployment" control={<VaticleCheckbox checked={selectedAreasOfInterest.deployment} onChange={toggleAreaOfInterest} name="deployment"/>}/>
                                    <FormControlLabel label="Licensing" control={<VaticleCheckbox checked={selectedAreasOfInterest.licensing} onChange={toggleAreaOfInterest} name="licensing"/>}/>
                                </div>
                                <div className={classes.areasOfInterestList}>
                                    <FormControlLabel label="Modelling" control={<VaticleCheckbox checked={selectedAreasOfInterest.modelling} onChange={toggleAreaOfInterest} name="modelling"/>}/>
                                    <FormControlLabel label="Custom API" control={<VaticleCheckbox checked={selectedAreasOfInterest.customAPI} onChange={toggleAreaOfInterest} name="customAPI"/>}/>
                                    <FormControlLabel label="Support" control={<VaticleCheckbox checked={selectedAreasOfInterest.support} onChange={toggleAreaOfInterest} name="support"/>}/>
                                    <FormControlLabel label="Cloud" control={<VaticleCheckbox checked={selectedAreasOfInterest.cloud} onChange={toggleAreaOfInterest} name="cloud"/>}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <VaticleTextField label={tellUsMore} multiline/>
                </div>

                <div className={clsx(classes.mainActionList, classes.buttonAfterText)}>
                    <VaticleButton size="small" type="primary" onClick={submit}>Get in touch</VaticleButton>
                </div>

                <aside className={clsx(classes.smallText, classes.buttonCaption)}>By submitting your personal data, you consent to emails from Vaticle. See our <a>Privacy Policy</a>.</aside>
            </form>
        </div>
    );
}
