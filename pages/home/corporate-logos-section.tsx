import clsx from "clsx";
import React from "react";
import { commonStyles } from "../common/ui/common-styles";
import { homePageStyles } from "./home-styles";
import { ClassProps } from "../common/class-props";
import FlipkartLogo from "../assets/logos/flipkart.png";
import RocheLogo from "../assets/logos/roche.png";
import ChinaMerchantsBankLogo from "../assets/logos/china-merchants-bank.png";
import GenentechLogo from "../assets/logos/genentech.png";
import TNOLogo from "../assets/logos/tno.png";
import EagleGenomicsLogo from "../assets/logos/eagle-genomics.png";
import RAIRHealthLogo from "../assets/logos/rair-health.png";
import RheosMedicinesLogo from "../assets/logos/rheos-medicines.png";

export const CorporateLogosSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, commonStyles(), homePageStyles());

    return (
        <section className={clsx(className, classes.corporateLogos)}>
            <img src={FlipkartLogo} alt="Flipkart" className={classes.flipkartLogo}/>
            <img src={RocheLogo} alt="Roche" className={classes.rocheLogo}/>
            <img src={ChinaMerchantsBankLogo} alt="China Merchants Bank" className={classes.chinaMerchantsBankLogo}/>
            <img src={GenentechLogo} alt="Genentech" className={classes.genentechLogo}/>
            <img src={TNOLogo} alt="TNO" className={classes.tnoLogo}/>
            <img src={EagleGenomicsLogo} alt="Eagle Genomics" className={classes.eagleGenomicsLogo}/>
            <img src={RAIRHealthLogo} alt="RAIR Health" className={classes.rairHealthLogo}/>
            <img src={RheosMedicinesLogo} alt="Rheos Medicines" className={classes.rheosMedicinesLogo}/>
        </section>
    );
}
