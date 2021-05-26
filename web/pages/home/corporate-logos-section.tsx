import clsx from "clsx";
import React from "react";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { homePageCorporateLogosStyles } from "./home-styles";
import { ClassProps } from "../../common/class-props";
import SixPointSixLogo from "../assets/logos/purple/6point6.png";
import AcchaLogo from "../assets/logos/purple/accha.png";
import AriwontoLogo from "../assets/logos/purple/ariwonto.png";
import AstraZenecaLogo from "../assets/logos/purple/astrazeneca.png";
import AustinCapitalDataLogo from "../assets/logos/purple/austin-capital-data.png";
import BayerLogo from "../assets/logos/purple/bayer.png";
import BioCortexLogo from "../assets/logos/purple/biocortex.png";
import CapgeminiLogo from "../assets/logos/purple/capgemini.png";
import ClearskyCybersecurityLogo from "../assets/logos/purple/clearsky-cybersecurity.png";
import DataSpartanLogo from "../assets/logos/purple/dataspartan.png";
import DigicustLogo from "../assets/logos/purple/digicust.png";
import EagleGenomicsLogo from "../assets/logos/purple/eagle-genomics.png";
import FIDELogo from "../assets/logos/purple/fide.png";
import FlipkartLogo from "../assets/logos/purple/flipkart.png";
import GeminosLogo from "../assets/logos/purple/geminos.png";
import GenentechLogo from "../assets/logos/purple/genentech.png";
import IBMLogo from "../assets/logos/purple/ibm.png";
import IceLabLogo from "../assets/logos/purple/ice-lab.png";
import MedasLogo from "../assets/logos/purple/medas.png";
import NestleLogo from "../assets/logos/purple/nestle.png";
import OxfordPharmagenesisLogo from "../assets/logos/purple/oxford-pharmagenesis.png";
import QRGeneticsLogo from "../assets/logos/purple/qr-genetics.png";
import RAIRHealthLogo from "../assets/logos/purple/rair-health.png";
import RheosMedicinesLogo from "../assets/logos/purple/rheos-medicines.png";
import RocheLogo from "../assets/logos/purple/roche.png";
import RollsRoyceLogo from "../assets/logos/purple/rolls-royce.png";
import RowzzyLogo from "../assets/logos/purple/rowzzy.png";
import TNOLogo from "../assets/logos/purple/tno.png";
import TripudioLogo from "../assets/logos/purple/tripudio.png";
import TwoSixLogo from "../assets/logos/purple/twosix.png";
import UCSFLogo from "../assets/logos/purple/ucsf.png";
import WeLevelLogo from "../assets/logos/purple/welevel.png";
import ZeissLogo from "../assets/logos/purple/zeiss.png";

interface CorporateLogoData {
    logo: string;
    altText: string;
}

export const CorporateLogosSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageCorporateLogosStyles());

    const logos: CorporateLogoData[] = [{
        logo: FlipkartLogo,
        altText: "Flipkart",
    }, {
        logo: RocheLogo,
        altText: "Roche",
    }, {
        logo: GenentechLogo,
        altText: "Genentech",
    }, {
        logo: NestleLogo,
        altText: "Nestle",
    }, {
        logo: AstraZenecaLogo,
        altText: "AstraZeneca",
    }, {
        logo: EagleGenomicsLogo,
        altText: "Eagle Genomics",
    }, {
        logo: RAIRHealthLogo,
        altText: "RAIR Health",
    }, {
        logo: RheosMedicinesLogo,
        altText: "Rheos Medicines",
    }, {
        logo: TNOLogo,
        altText: "TNO",
    }, {
        logo: RollsRoyceLogo,
        altText: "Rolls-Royce",
    }, {
        logo: DigicustLogo,
        altText: "Digicust",
    }, {
        logo: RowzzyLogo,
        altText: "Rowzzy",
    }, {
        logo: OxfordPharmagenesisLogo,
        altText: "Oxford Pharmagenesis",
    }, {
        logo: ClearskyCybersecurityLogo,
        altText: "Clearsky Cybersecurity",
    }, {
        logo: TripudioLogo,
        altText: "Tripudio",
    }, {
        logo: AcchaLogo,
        altText: "Accha",
    }, {
        logo: WeLevelLogo,
        altText: "welevel.academy",
    }, {
        logo: TwoSixLogo,
        altText: "two six labs",
    }, {
        logo: QRGeneticsLogo,
        altText: "QR Genetics",
    }, {
        logo: DataSpartanLogo,
        altText: "Dataspartan",
    }, {
        logo: BioCortexLogo,
        altText: "BioCortex",
    }, {
        logo: MedasLogo,
        altText: "Medas Solutions",
    }, {
        logo: IceLabLogo,
        altText: "Ice Lab",
    }, {
        logo: AriwontoLogo,
        altText: "Ariwonto",
    }, {
        logo: AustinCapitalDataLogo,
        altText: "Austin Capital Data",
    }, {
        logo: GeminosLogo,
        altText: "Geminos",
    }, {
        logo: ZeissLogo,
        altText: "Zeiss",
    }, {
        logo: SixPointSixLogo,
        altText: "6point6",
    }, {
        logo: FIDELogo,
        altText: "Fide PBC",
    }, {
        logo: CapgeminiLogo,
        altText: "Capgemini",
    }];

    return (
        <section className={clsx(className, classes.corporateLogos)}>
        {logos.map(({logo, altText}) => (
            <CorporateLogo logo={logo} altText={altText} className={classes.corporateLogo}/>
        ))}
        </section>
    );
}

const CorporateLogo: React.FC<CorporateLogoData & ClassProps> = ({logo, altText, className}) => {
    return <img src={logo} alt={altText} className={className}/>
}
