import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { corporateLogosStyles, corporateLogosStyleVars as styleVars } from "./home-styles";
import { ClassProps } from "../../common/class-props";
import SixPointSixLogo from "../assets/logos/purple/6point6.png";
import AcchaLogo from "../assets/logos/purple/accha.png";
import AriwontoLogo from "../assets/logos/purple/ariwonto.png";
import AstraZenecaLogo from "../assets/logos/purple/astrazeneca.png";
import AustinCapitalDataLogo from "../assets/logos/purple/austin-capital-data.png";
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
import WeLevelLogo from "../assets/logos/purple/welevel.png";
import ZessLogo from "../assets/logos/purple/zess.png";

interface CorporateLogoData {
    logo: string;
    altText: string;
    weight: number;
}

export const CorporateLogosSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), corporateLogosStyles());

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
        weight: 2,
    }, {
        logo: CapgeminiLogo,
        altText: "Capgemini",
        weight: 3,
    }, {
        logo: RheosMedicinesLogo,
        altText: "Rheos Medicines",
        weight: 2,
    }, {
        logo: TNOLogo,
        altText: "TNO",
        weight: 2,
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
        weight: 2,
    }, {
        logo: ClearskyCybersecurityLogo,
        altText: "Clearsky Cybersecurity",
        weight: 2,
    }, {
        logo: TripudioLogo,
        altText: "Tripudio",
        weight: 2,
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
        logo: ZessLogo,
        altText: "Zess",
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

    const cellWidth = () => styleVars.cellWidth[window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop"];
    const cellSpacing = () => styleVars.rowSpacing[window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop"]
    const availableWidth = () => Math.min(window.innerWidth - 40, 1160);
    const computeRowSize = () => Math.floor((availableWidth() + cellSpacing()) / (cellWidth() + cellSpacing()));
    const [rowSize, setRowSize] = useState(computeRowSize());

    const visibleItemCount = (rowSize: number) => {
        if (rowSize === 4) return 16;
        else if (rowSize === 2) return 14;
        else return 15;
    }

    const [logoState, setLogoState] = useState({
        visibleLogos: logos.slice(0, visibleItemCount(computeRowSize())),
        hiddenLogos: logos.slice(visibleItemCount(computeRowSize())),
        transitionIndex: -1,
        spawning: false,
    });

    const updateLogoState = (newLogoState) => {
        setLogoState(Object.assign({}, logoState, newLogoState));
    };

    // TODO: This code is very fragile. We need to figure out the true interaction between local vars, React state
    //       vars, setTimeout, and window resize events and use that to build a maintainable component. Or we can
    //       check if such a prebuilt component exists on the Web.
    useEffect(() => {
        const newRowSize = computeRowSize();
        if (newRowSize != rowSize) {
            setRowSize(newRowSize);
            const delta = visibleItemCount(newRowSize) - visibleItemCount(rowSize);
            if (!delta) return;
            updateLogoState({
                spawning: false,
                transitionIndex: -1,
                visibleLogos: logos.slice(0, visibleItemCount(computeRowSize())),
                hiddenLogos: logos.slice(visibleItemCount(computeRowSize())),
            });
        }
    }, [window.innerWidth]);

    let despawningIndex, spawningIndex, spawningLogo, despawningLogo;

    const transitionInterval = 2000;

    useEffect(() => {
        const interval = setInterval(() => {
            beginTransition();
        }, transitionInterval);
        let interval2;
        const timeout = setTimeout(() => {
            interval2 = setInterval(() => {
                endTransition();
            }, transitionInterval);
        }, 900);
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
            clearInterval(interval2);
        }
    }, [rowSize]);

    const beginTransition = () => {
        despawningIndex = selectDespawnIndex();
        spawningIndex = Math.floor(Math.random() * logoState.hiddenLogos.length);
        despawningLogo = logoState.visibleLogos[despawningIndex];
        spawningLogo = logoState.hiddenLogos[spawningIndex];

        updateLogoState({
            spawning: false,
            transitionIndex: despawningIndex,
            suppressTransition: false,
        });
    };

    const endTransition = () => {
        const newVisibleLogos = [];
        const newHiddenLogos = [];
        logoState.visibleLogos[despawningIndex] = spawningLogo;
        newVisibleLogos.push(...logoState.visibleLogos);
        logoState.hiddenLogos[spawningIndex] = despawningLogo;
        newHiddenLogos.push(...logoState.hiddenLogos);
        updateLogoState({
            spawning: true,
            transitionIndex: despawningIndex,
            visibleLogos: newVisibleLogos,
            hiddenLogos: newHiddenLogos,
        });
    };

    const selectDespawnIndex: () => number = () => {
        let n = Math.random() * logoState.visibleLogos.reduce((total, next) => total + (1 / next.weight), 0);
        for (let i = 0; i < logoState.visibleLogos.length; i++) {
            const logo = logoState.visibleLogos[i];
            if ((1 / logo.weight) > n) return i;
            else n -= (1 / logo.weight);
        }
        return 0; // probably best to return something in case of a rounding error
    };

    return (
        <section className={clsx(className, classes.corporateLogos)}>
        {logoState.visibleLogos.map(({logo, altText}, idx) => (
            <div className={classes.corporateLogoContainer}>
                <CorporateLogo logo={logo} altText={altText} className={clsx(classes.corporateLogo, idx === logoState.transitionIndex && (logoState.spawning ? classes.corporateLogoFadeIn : classes.corporateLogoFadeOut))}/>
            </div>
        ))}
        </section>
    );
}

const CorporateLogo: React.FC<Partial<CorporateLogoData> & ClassProps> = ({logo, altText, className}) => {
    return <img src={logo} alt={altText} className={className}/>
}
