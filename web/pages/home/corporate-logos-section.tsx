import clsx from "clsx";
import React, { useEffect, useState } from "react";
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
    weight: number;
}

export const CorporateLogosSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageCorporateLogosStyles());

    const logos: CorporateLogoData[] = [{
        logo: FlipkartLogo,
        altText: "Flipkart",
        weight: 3,
    }, {
        logo: RocheLogo,
        altText: "Roche",
        weight: 3,
    }, {
        logo: GenentechLogo,
        altText: "Genentech",
        weight: 3,
    }, {
        logo: NestleLogo,
        altText: "Nestle",
        weight: 3,
    }, {
        logo: AstraZenecaLogo,
        altText: "AstraZeneca",
        weight: 3,
    }, {
        logo: EagleGenomicsLogo,
        altText: "Eagle Genomics",
        weight: 1,
    }, {
        logo: CapgeminiLogo,
        altText: "Capgemini",
        weight: 3,
    }, {
        logo: RheosMedicinesLogo,
        altText: "Rheos Medicines",
        weight: 1,
    }, {
        logo: TNOLogo,
        altText: "TNO",
        weight: 1,
    }, {
        logo: RollsRoyceLogo,
        altText: "Rolls-Royce",
        weight: 3,
    }, {
        logo: DigicustLogo,
        altText: "Digicust",
        weight: 1,
    }, {
        logo: RowzzyLogo,
        altText: "Rowzzy",
        weight: 1,
    }, {
        logo: OxfordPharmagenesisLogo,
        altText: "Oxford Pharmagenesis",
        weight: 3,
    }, {
        logo: ClearskyCybersecurityLogo,
        altText: "Clearsky Cybersecurity",
        weight: 2,
    }, {
        logo: TripudioLogo,
        altText: "Tripudio",
        weight: 3,
    }, {
        logo: AcchaLogo,
        altText: "Accha",
        weight: 1,
    }, {
        logo: WeLevelLogo,
        altText: "welevel.academy",
        weight: 1,
    }, {
        logo: TwoSixLogo,
        altText: "two six labs",
        weight: 1,
    }, {
        logo: QRGeneticsLogo,
        altText: "QR Genetics",
        weight: 1,
    }, {
        logo: DataSpartanLogo,
        altText: "Dataspartan",
        weight: 1,
    }, {
        logo: BioCortexLogo,
        altText: "BioCortex",
        weight: 1,
    }, {
        logo: MedasLogo,
        altText: "Medas Solutions",
        weight: 1,
    }, {
        logo: IceLabLogo,
        altText: "Ice Lab",
        weight: 1,
    }, {
        logo: AriwontoLogo,
        altText: "Ariwonto",
        weight: 1,
    }, {
        logo: AustinCapitalDataLogo,
        altText: "Austin Capital Data",
        weight: 1,
    }, {
        logo: GeminosLogo,
        altText: "Geminos",
        weight: 1,
    }, {
        logo: ZeissLogo,
        altText: "Zeiss",
        weight: 1,
    }, {
        logo: SixPointSixLogo,
        altText: "6point6",
        weight: 1,
    }, {
        logo: FIDELogo,
        altText: "Fide PBC",
        weight: 1,
    }, {
        logo: RAIRHealthLogo,
        altText: "RAIR Health",
        weight: 1,
    }];

    const [state, setState] = useState({
        visibleLogos: logos.slice(0, 15),
        hiddenLogos: logos.slice(15),
        transitionIndex: -1,
        spawning: false,
    });

    const updateState = (newState) => {
        setState(Object.assign({}, state, newState));
    };

    let spawningLogo, despawningLogo;

    useEffect(() => {
        setInterval(() => {
            performTransition();
        }, 2000);
    }, []);

    const performTransition = () => {
        const despawningIndex = Math.floor(Math.random() * state.visibleLogos.length);
        const spawningIndex = Math.floor(Math.random() * state.hiddenLogos.length);
        despawningLogo = state.visibleLogos[despawningIndex];
        spawningLogo = state.hiddenLogos[spawningIndex];
        updateState({
            spawning: false,
            transitionIndex: despawningIndex,
        });
        setTimeout(() => {
            const newVisibleLogos = [];
            const newHiddenLogos = [];
            state.visibleLogos[despawningIndex] = spawningLogo;
            newVisibleLogos.push(...state.visibleLogos);
            state.hiddenLogos[spawningIndex] = despawningLogo;
            newHiddenLogos.push(...state.hiddenLogos);
            updateState({
                spawning: true,
                transitionIndex: despawningIndex,
                visibleLogos: newVisibleLogos,
                hiddenLogos: newHiddenLogos,
            });
        }, 900);
    };

    const selectDespawnTarget = () => {
        const rand = Math.random();
        for (let i = 0; i < state.visibleLogos.length; i++) {

        }
    };

    return (
        <section className={clsx(className, classes.corporateLogos)}>
        {state.visibleLogos.map(({logo, altText}, idx) => (
            <div className={classes.corporateLogoContainer}>
                <CorporateLogo logo={logo} altText={altText} className={clsx(classes.corporateLogo, idx === state.transitionIndex && (state.spawning ? classes.corporateLogoFadeIn : classes.corporateLogoFadeOut))}/>
            </div>
        ))}
        </section>
    );
}

const CorporateLogo: React.FC<Partial<CorporateLogoData> & ClassProps> = ({logo, altText, className}) => {
    return <img src={logo} alt={altText} className={className}/>
}
