import { homePageIndustryStyles } from "./home-styles";
import { VaticleButton } from "../../common/button/button";
import React, { useState } from "react";
import clsx from "clsx";
import LifeScienceIcon from "../assets/icons/life-science.svg";
import SecurityIcon from "../assets/icons/security.svg";
import TelecommunicationIcon from "../assets/icons/telecommunication.svg";
import KnowledgeGraph from "../assets/icons/knowledge-graph.svg";
import MachineLearningIcon from "../assets/icons/machine-learning.svg";
import { vaticleTheme } from "../../common/styles/theme";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { ClassProps } from "../../common/class-props";

type IndustryName =  "Knowledge Graph" | "Machine Learning" | "Health & Life Science" | "Defence & Security" | "Telecommunication";

interface Industry {
    name: IndustryName;
    icon: React.FC<any>;
    description: string;
}

export const IndustrySection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageIndustryStyles());

    const allIndustries: Industry[] = [{
        name: "Knowledge Graph",
        icon: KnowledgeGraph,
        description: `Knowledge Graphs (aka. Knowledge Bases) are systems that aggregate complex networks of facts to be 
                    interrogated semantically and logically. TypeDB enables engineers to model and aggregate disparate 
                    sources of data to become one unified Knowledge Graph, as it encodes data for logical interpretation 
                    by its reasoning engine.`
    }, {
        name: "Machine Learning",
        icon: MachineLearningIcon,
        description: `Heterogeneous data holds significant inherent context. TypeDB enables ML systems to leverage this 
                    context, and utilise this critical information to improve the accuracy and versatility of ML models. 
                    TypeDB enables ML systems to accumulate datasets as one centralised, reusable, and highly contextualised 
                    knowledge base.`
    }, {
        name: "Health & Life Science",
        icon: LifeScienceIcon,
        description: `Systems biology produces a tremendous amount of heterogeneous data which are complex by nature and 
                    rich with semantics. TypeDB accelerates the knowledge discovery process in Health & Life Sciences 
                    by simplifying the integration of data, contextualising newly generated insights, and explaining 
                    patterns in complex networks.`
    }, {
        name: "Defence & Security",
        icon: SecurityIcon,
        description: `In this internet era, defence and security means connecting anything and everything, to uncover
                    pieces of information that are deliberately hidden. TypeDB allows defence organisations to easily aggregate, 
                    and interrogate these networks in real-time and stay two-steps ahead of bad actors, while avoiding critical, 
                    and costly mistakes.`
    }, {
        name: "Telecommunication",
        icon: TelecommunicationIcon,
        description: `The Telecommunications industry has the most complex networks of interconnected data points. Modelling 
                    and querying these networks are challenging, and the cost of mistakes are too high. TypeDB allows 
                    telecommunication providers to build robust models to capture entire networks of systems that did not have
                    visibility before.`
    }];

    const [selectedIndustry, setSelectedIndustry] = useState<Industry>(allIndustries[0]);

    return (
        <section className={className}>
            <h1 className={classes.h1}>Empower your organisation to solve complex problems</h1>
            <h3 className={clsx(classes.h3, classes.textMarginLarge)}>{selectedIndustry.name}</h3>

            <p className={clsx(classes.industryDescription, classes.largeText)}>{selectedIndustry.description}</p>
            <VaticleButton size="small" type="secondary" disabled comingSoon className={clsx(classes.learnMore, classes.contentMargin)}>
                Learn More
            </VaticleButton>

            <div className={clsx(classes.subsectionMargin, classes.sectionToggleGroup)}>
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
            <p className={clsx(classes.sectionToggleTitle)}>{industry.name}</p>
        </div>
    );
}
