import { homePageIndustryStyles } from "./home-styles";
import { VaticleButton } from "../../common/button/button";
import React, { useState } from "react";
import clsx from "clsx";
import SecurityIcon from "../assets/icons/security.svg";
import FinanceIcon from "../assets/icons/finance.svg";
import { LifeSciencesIcon } from "../images/life-sciences-icon";
import { vaticleTheme } from "../../common/styles/theme";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { ClassProps } from "../../common/class-props";
import { TelecommunicationsIcon } from "../images/telecommunications-icon";
import { MachineLearningIcon } from "../images/machine-learning-icon";

type IndustryName = "Health & Life Sciences" | "Defence & Security" | "Financial Services" | "Telecommunications" | "Machine Learning";

interface Industry {
    name: IndustryName;
    icon: React.FC<any>;
    description: string;
}

export const IndustrySection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageIndustryStyles());

    const allIndustries: Industry[] = [{
        name: "Health & Life Sciences",
        icon: LifeSciencesIcon,
        description: `From pharmaceutical R&D and biomedical research to frontline healthcare delivery, contemporary
                    health and life science industries rely on data to power insight and improve care. Using Vaticle
                    to effectively manage data can help organisations advance scientific research and deliver best
                    practice medicine.`
    }, {
        name: "Defence & Security",
        icon: SecurityIcon,
        description: `As technology permeates deeper into every aspect of our lives—with constant digital footprints and
                    interconnected devices proliferating—the growth in potential damage and disruption from bad actors
                    grows. TypeDB allows firms to leverage their digital defences against increasingly sophisticated
                    cyber criminals.`
    }, {
        name: "Financial Services",
        icon: FinanceIcon,
        description: `Across the financial service industry, changes in technology, policy, and geopolitics have radically
                    altered the data landscape in the past few years. By taking advantage of Vaticle's cutting-edge
                    database technology, financial service firms can take full strategic advantage of the changing
                    data landscape.`
    }, {
        name: "Telecommunications",
        icon: TelecommunicationsIcon,
        description: `Lorem ipsum dolors sit amet, consectetur adipiscing elit. Ut porta diam vitae nunc aliquet, id
                    dignissim nibh commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
                    ac turpis egestas. Maecenas interdum nunc accumsan tortor maximus ornare. In hac habitasse platea
                    dictumst himenaeos.`
    }, {
        name: "Machine Learning",
        icon: MachineLearningIcon,
        description: `Heterogeneous data holds significant inherent context. TypeDB enables ML systems to leverage this 
                    context, and utilise this critical information to improve the accuracy and versatility of the ML models. 
                    TypeDB enables ML systems to accumulate and re-use highly contextual knowledge, and continuously build 
                    upon the knowledge base.`
    }];

    const [selectedIndustry, setSelectedIndustry] = useState<Industry>(allIndustries[0]);

    return (
        <section className={className}>
            <h1 className={classes.h1}>Empower your organisation to solve complex problems</h1>
            <h3 className={clsx(classes.h3, classes.textMarginLarge)}>{selectedIndustry.name}</h3>

            <p className={clsx(classes.industryDescription, classes.largeText)}>{selectedIndustry.description}</p>
            <VaticleButton size="small" type="secondary" disabled={true} comingSoon={true} className={clsx(classes.buttonAfterText, classes.learnMore)}>
                Learn More
            </VaticleButton>

            <div className={clsx(classes.sectionMarginSmall, classes.sectionToggleGroup)}>
            {allIndustries.map(industry => (
                <SectionToggle industry={industry} binding={setSelectedIndustry} selected={industry.name === selectedIndustry.name}/>
            ))}
            </div>
        </section>
    );
}

interface SectionToggleProps {
    industry: Industry;
    binding: (industry: Industry) => void;
    selected: boolean;
}

export const SectionToggle: React.FC<SectionToggleProps> = ({industry, binding, selected}) => {
    const classes = homePageIndustryStyles();

    return (
        <div className={classes.sectionToggle}>
            <div className={clsx(classes.sectionToggleIconContainer, selected && classes.sectionToggleIconContainerSelected)} onClick={() => binding(industry)}>
                <industry.icon color={selected ? vaticleTheme.palette.green[300] : "#FFF"}/>
            </div>
            <p className={classes.sectionToggleTitle}>{industry.name}</p>
        </div>
    );
}
