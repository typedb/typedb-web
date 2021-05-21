import clsx from "clsx";
import React from "react";
import { vaticleStyles } from "vaticle-web-components/dist/styles/vaticle-styles";
import { homePageCorporateLogosStyles } from "./home-styles";
import { ClassProps } from "vaticle-web-components/dist/class-props";
import FlipkartLogo from "../assets/logos/flipkart.png";
import RocheLogo from "../assets/logos/roche.png";
import GenentechLogo from "../assets/logos/genentech.png";
import TNOLogo from "../assets/logos/tno.png";
import EagleGenomicsLogo from "../assets/logos/eagle-genomics.png";
import RAIRHealthLogo from "../assets/logos/rair-health.png";
import RheosMedicinesLogo from "../assets/logos/rheos-medicines.png";
import NestleHealthScienceLogo from "../assets/logos/nestle-health-science.png";

export const CorporateLogosSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageCorporateLogosStyles());

    return (
        <section className={clsx(className, classes.corporateLogos)}>
            <img src={FlipkartLogo} alt="Flipkart" className={classes.flipkartLogo}/>
            <img src={RocheLogo} alt="Roche" className={classes.rocheLogo}/>
            <img src={GenentechLogo} alt="Genentech" className={classes.genentechLogo}/>
            <img src={TNOLogo} alt="TNO" className={classes.tnoLogo}/>
            <img src={EagleGenomicsLogo} alt="Eagle Genomics" className={classes.eagleGenomicsLogo}/>
            <img src={RAIRHealthLogo} alt="RAIR Health" className={classes.rairHealthLogo}/>
            <img src={RheosMedicinesLogo} alt="Rheos Medicines" className={classes.rheosMedicinesLogo}/>
            <img src={NestleHealthScienceLogo} alt="Nestle Health Science" className={classes.nestleHealthScienceLogo}/>
        </section>
    );
}
