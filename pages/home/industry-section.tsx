import { homePageStyles } from "./home-styles";
import { VaticleButton } from "../common/ui/button/button";
import React, { useState } from "react";
import clsx from "clsx";
import SecurityIcon from "../assets/icons/security-icon.svg";
import FinanceIcon from "../assets/icons/finance-icon.svg";
import NLPIcon from "../assets/icons/nlp-icon.svg";
import { LifeSciencesIcon } from "../common/ui/images/life-sciences-icon";
import { vaticleTheme } from "../styles/theme";
import { RoboticsIcon } from "../common/ui/images/robotics-icon";
import { commonStyles } from "../common/ui/common-styles";
import { ClassProps } from "../common/class-props";

type IndustryName = "Health and Life Sciences" | "Defence & Security" | "Financial Services" | "Robotics" | "NLP";

export const IndustrySection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, commonStyles(), homePageStyles());
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

    // TODO: We should enforce that all sections have the same height - perhaps by laying them side by side
    return (
        <section className={className}>
            <h2 className={classes.h2}>{selectedIndustry}</h2>

            {selectedIndustry === "Health and Life Sciences" &&
            <>
                <p className={classes.largeText}>
                    From pharmaceutical R&D and biomedical research to frontline healthcare delivery, contemporary
                    health and life science industries rely on data to power insight and improve care. Using Vaticle
                    to effectively manage data can help organisations advance scientific research and deliver best
                    practice medicine.
                </p>
                <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore)}>Learn More</VaticleButton>
            </>}

            {selectedIndustry === "Defence & Security" &&
            <>
                <p className={classes.largeText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis purus pellentesque,
                    tincidunt nisi quis, vehicula purus. Nullam egestas dui nisi. Morbi ultrices lacus justo,
                    suscipit dictum justo suscipit ut. Mauris sed placerat justo. Aenean placerat vitae sapien
                    scelerisque rutrum. Etiam mollis odio lorem, ut sollicitudin massa auctor quis.
                </p>
                <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore)}>Learn More</VaticleButton>
            </>}

            {selectedIndustry === "Financial Services" &&
            <>
                <p className={classes.largeText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dictum massa nec est porta, eu congue
                    odio rhoncus. Nulla sed risus nisi. Donec et tincidunt sapien. Pellentesque in malesuada erat. Duis
                    tempor lacus a dui dapibus, eget sodales velit lacinia. Mauris at dignissim nisi. Nam quis convallis
                    quam, nec mollis lectus.
                </p>
                <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore)}>Learn More</VaticleButton>
            </>}

            {selectedIndustry === "Robotics" &&
            <>
                <p className={classes.largeText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta diam vitae nunc aliquet, id
                    dignissim nibh commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
                    ac turpis egestas. Maecenas interdum nunc accumsan tortor maximus ornare. In hac habitasse platea
                    dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </p>
                <VaticleButton size="small" type="secondary" className={clsx(classes.buttonAfterText, classes.learnMore)}>Learn More</VaticleButton>
            </>}

            {selectedIndustry === "NLP" &&
            <>
                <p className={classes.largeText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porta sapien luctus lacus
                    sollicitudin tincidunt. Vivamus ultricies massa vitae felis cursus, ac elementum erat tincidunt.
                    Aliquam urna augue, mollis ut cursus non, egestas egestas libero. Nullam eget rhoncus lorem.
                    Maecenas aliquam libero dui, in porta urna mollis eu.
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
    const classes = homePageStyles();

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
