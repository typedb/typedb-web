import { homePageIndustryStyles } from "./home-styles";
import { VaticleButton } from "vaticle-web-components/dist/button/button";
import React, { useState } from "react";
import clsx from "clsx";
import SecurityIcon from "../assets/icons/security.svg";
import FinanceIcon from "../assets/icons/finance.svg";
import NLPIcon from "../assets/icons/nlp.svg";
import { LifeSciencesIcon } from "vaticle-web-components/dist/images/life-sciences-icon";
import { vaticleTheme } from "vaticle-web-components/dist/styles/theme";
import { RoboticsIcon } from "vaticle-web-components/dist/images/robotics-icon";
import { vaticleStyles } from "vaticle-web-components/dist/styles/vaticle-styles";
import { ClassProps } from "vaticle-web-components/dist/class-props";

type IndustryName = "Health and Life Sciences" | "Defence & Security" | "Financial Services" | "Robotics" | "NLP";

export const IndustrySection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageIndustryStyles());
    const [selectedIndustry, setSelectedIndustry] = useState<IndustryName>("Health and Life Sciences");

    const isSelected = (industry: IndustryName) => {
        return selectedIndustry === industry;
    }

    // TODO: Restructure to follow Cluster section's model
    const allIndustries: [IndustryName, React.FC<any>][] = [
        ["Health and Life Sciences", LifeSciencesIcon],
        ["Defence & Security", SecurityIcon],
        ["Financial Services", FinanceIcon],
        ["Robotics", RoboticsIcon],
        ["NLP", NLPIcon],
    ];

    return (
        <section className={className}>
            <h2 className={classes.h2}>{selectedIndustry}</h2>

            {selectedIndustry === "Health and Life Sciences" &&
            <>
                <p className={clsx(classes.industryDescription, classes.largeText)}>
                    From pharmaceutical R&D and biomedical research to frontline healthcare delivery, contemporary
                    health and life science industries rely on data to power insight and improve care. Using Vaticle
                    to effectively manage data can help organisations advance scientific research and deliver best
                    practice medicine.
                </p>
                <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore)}>Learn More</VaticleButton>
            </>}

            {selectedIndustry === "Defence & Security" &&
            <>
                <p className={clsx(classes.industryDescription, classes.largeText)}>
                    As technology permeates deeper into every aspect of our lives—with constant digital footprints and
                    interconnected devices proliferating—the growth in potential damage and disruption from bad actors
                    grows. TypeDB allows firms to leverage their digital defences against increasingly sophisticated
                    cyber criminals.
                </p>
                <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore)}>Learn More</VaticleButton>
            </>}

            {selectedIndustry === "Financial Services" &&
            <>
                <p className={clsx(classes.industryDescription, classes.largeText)}>
                    Across the financial service industry, changes in technology, policy, and geopolitics have radically
                    altered the data landscape in the past few years. By taking advantage of Vaticle's cutting-edge
                    database technology, financial service firms can take full strategic advantage of the changing
                    data landscape.
                </p>
                <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore)}>Learn More</VaticleButton>
            </>}

            {selectedIndustry === "Robotics" &&
            <>
                <p className={clsx(classes.industryDescription, classes.largeText)}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta diam vitae nunc aliquet, id
                    dignissim nibh commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
                    ac turpis egestas. Maecenas interdum nunc accumsan tortor maximus ornare. In hac habitasse platea
                    dictumst himenaeos.
                </p>
                <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore)}>Learn More</VaticleButton>
            </>}

            {selectedIndustry === "NLP" &&
            <>
                <p className={clsx(classes.industryDescription, classes.largeText)}>
                    As devices have become more intelligent, the way we interact with them evolved to natural language
                    through conversation. TypeDB is the ideal platform for developing chat bots because it is capable of
                    interpreting complex and ambiguous questions by performing inference over your data.
                </p>
                <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore)}>Learn More</VaticleButton>
            </>}

            <div className={clsx(classes.sectionMarginSmall, classes.sectionToggleGroup)}>
                {allIndustries.map(([title, icon]) => (
                    <SectionToggle title={title} icon={icon} binding={setSelectedIndustry} selected={isSelected(title)}/>
                ))}
            </div>
        </section>
    );
}

interface SectionToggleProps {
    title: IndustryName;
    icon: React.FC<React.SVGAttributes<SVGElement>>;
    binding: (title: IndustryName) => void;
    selected: boolean;
}

export const SectionToggle: React.FC<SectionToggleProps> = ({title, icon, binding, selected}) => {
    const classes = homePageIndustryStyles();

    return (
        <div className={classes.sectionToggle}>
            <div className={clsx(classes.sectionToggleIconContainer, selected ? classes.sectionToggleIconContainerSelected : undefined)} onClick={() => binding(title)}>
                {React.createElement(icon, {
                    color: selected ? vaticleTheme.palette.green[300] : "#FFF"
                })}
            </div>
            <p className={classes.sectionToggleTitle}>{title}</p>
        </div>
    );
}
