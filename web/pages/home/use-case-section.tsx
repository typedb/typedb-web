import { routes } from "../router";
import {homePageIndustryStyles} from "./home-styles";
import {VaticleButton} from "../../common/button/button";
import React, {useState} from "react";
import clsx from "clsx";
import LifeScienceIcon from "../../assets/icons/life-science.svg";
import SecurityIcon from "../../assets/icons/security.svg";
import TelecommunicationIcon from "../../assets/icons/telecommunication.svg";
import KnowledgeGraphsIcon from "../../assets/icons/knowledge-graphs.svg";
import MachineLearningIcon from "../../assets/icons/machine-learning.svg";
import {vaticleTheme} from "../../common/styles/theme";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {ClassProps} from "../../common/class-props";

type UseCaseName =
    "Knowledge Graphs"
    | "Machine Learning"
    | "Life Sciences"
    | "Cyber Security"
    | "Telecommunication";

interface UseCase {
    name: UseCaseName;
    icon: React.FC<any>;
    description: string;
    learnMoreRoute: string | undefined;
}

export const UseCaseSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), homePageIndustryStyles());

    const useCases: UseCase[] = [{
        name: "Cyber Security",
        icon: SecurityIcon,
        description: `In this internet era, cyber security means connecting anything and everything, to uncover pieces
                      of information that are deliberately hidden. TypeDB allows enterprises to easily aggregate, and
                      interrogate these networks in real-time and stay two-steps ahead of bad actors, while avoiding
                      critical, and costly mistakes.`,
        learnMoreRoute: routes.useCases.cyberSecurity,
    }, {
        name: "Knowledge Graphs",
        icon: KnowledgeGraphsIcon,
        description: `Knowledge Graphs (aka. Knowledge Bases) are systems that aggregate complex networks of facts to be 
                      interrogated semantically and logically. TypeDB enables engineers to model and aggregate disparate 
                      sources of data to become one unified Knowledge Graph, making it possible to infer new knowledge 
                      by its reasoning engine.`,
        learnMoreRoute: routes.useCases.knowledgeGraphs,
    }, {
        name: "Life Sciences",
        icon: LifeScienceIcon,
        description: `Systems biology produces a tremendous amount of heterogeneous data which are complex by nature and 
                      rich with semantics. TypeDB accelerates the knowledge discovery process in Life Sciences 
                      by simplifying the integration of data, contextualising newly generated insights, and explaining 
                      patterns in complex networks.`,
        learnMoreRoute: routes.useCases.lifeSciences,
    }, {
        name: "Machine Learning",
        icon: MachineLearningIcon,
        description: `Heterogeneous data holds significant inherent context. TypeDB enables ML systems to leverage this 
                      context, and utilise this critical information to improve the accuracy and versatility of ML
                      models. TypeDB enables ML systems to accumulate datasets as one centralised, reusable, and highly
                      contextualised knowledge base.`,
        learnMoreRoute: routes.useCases.machineLearning,
    }, {
        name: "Telecommunication",
        icon: TelecommunicationIcon,
        description: `The Telecommunications industry has the most complex networks of interconnected data points.
                      Modelling and querying these networks are challenging, and the cost of mistakes are too high.
                      TypeDB allows telecommunication providers to build robust models to capture entire networks of
                      systems that did not have visibility before.`,
        learnMoreRoute: undefined,
    }];

    const [selectedIndustry, setSelectedIndustry] = useState<UseCase>(useCases[1]);
    const comingSoon = selectedIndustry.learnMoreRoute == null;

    return (
        <section className={className}>
            <h1 className={classes.h1}>Empower your organisation <br className={classes.showTablet}/> to solve complex problems</h1>
            <h3 className={clsx(classes.h3, classes.textMargin)}>{selectedIndustry.name}</h3>

            <p className={classes.industryDescription}>{selectedIndustry.description}</p>
            <VaticleButton size="small" type="secondary" to={selectedIndustry.learnMoreRoute} disabled={comingSoon}
                           comingSoon={comingSoon} className={clsx(classes.learnMore, classes.contentMargin)}>
                Learn More
            </VaticleButton>

            <div className={clsx(classes.subsectionMargin, classes.sectionToggleGroupContainer)}>
                <div className={classes.sectionToggleGroup}>
                    {useCases.map(industry => (
                        <SectionToggle industry={industry} binding={setSelectedIndustry}
                                       selected={industry.name === selectedIndustry.name}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface SectionToggleProps {
    industry: UseCase;
    binding: (industry: UseCase) => void;
    selected: boolean;
}

export const SectionToggle: React.FC<SectionToggleProps> = ({industry, binding, selected}) => {
    const classes = homePageIndustryStyles();

    return (
        <div className={classes.sectionToggle}>
            <div
                className={clsx(classes.sectionToggleIconContainer, selected && classes.sectionToggleIconContainerSelected)}
                onClick={() => binding(industry)}>
                <industry.icon color={selected ? vaticleTheme.palette.green["1"] : "#FFF"}/>
            </div>
            <p className={clsx(classes.sectionToggleTitle)}>{industry.name}</p>
        </div>
    );
}
