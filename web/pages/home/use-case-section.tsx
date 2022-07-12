import { routes } from "../router";
import { ParagraphWithLinks } from "../usecase/paragraph-with-links";
import {homePageIndustryStyles} from "./home-styles";
import {VaticleButton} from "../../common/button/button";
import React, {useState} from "react";
import clsx from "clsx";
import LifeScienceIcon from "../../assets/icons/life-science.svg";
import SecurityIcon from "../../assets/icons/security.svg";
import RoboticsIcon from "../../assets/icons/robotics.svg";
import KnowledgeGraphsIcon from "../../assets/icons/knowledge-graphs.svg";
import MachineLearningIcon from "../../assets/icons/machine-learning.svg";
import {vaticleTheme} from "../../common/styles/theme";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {ClassProps} from "../../common/class-props";

type UseCaseName =
    "Cyber Security"
    | "Knowledge Graphs"
    | "Life Sciences"
    | "Machine Learning"
    | "Robotics";

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
        description: `[Knowledge Graphs](https://blog.vaticle.com/what-is-a-knowledge-graph-5234363bf7f5)
                      (aka. Knowledge Bases) are systems that aggregate complex networks of facts to be interrogated
                      semantically and logically. TypeDB enables engineers to model and aggregate disparate 
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
        name: "Robotics",
        icon: RoboticsIcon,
        description: `Robotics systems consume a lot of disparate data relating to real world objects, planning systems,
                      hardware data etc. This requires a database that can build models to accurately represent this
                      level of complexity and semantic richness. TypeDB allows organisations to build robust models that
                      enable robots to reason and become more autonomous.`,
        learnMoreRoute: routes.useCases.robotics,
    }];

    const [selectedUseCase, setSelectedUseCase] = useState<UseCase>(useCases[1]);
    const comingSoon = selectedUseCase.learnMoreRoute == null;

    return (
        <section className={className}>
            <h1 className={classes.h1}>Empower your organisation <br className={classes.showTablet}/> to solve complex problems</h1>
            <h3 className={clsx(classes.h3, classes.textMargin)}>{selectedUseCase.name}</h3>

            <ParagraphWithLinks className={classes.useCaseDescription} text={selectedUseCase.description}/>
            <VaticleButton size="small" type="secondary" to={selectedUseCase.learnMoreRoute} disabled={comingSoon}
                           comingSoon={comingSoon} className={clsx(classes.learnMore, classes.contentMargin)}>
                Learn More
            </VaticleButton>

            <div className={clsx(classes.subsectionMargin, classes.sectionToggleGroupContainer)}>
                <div className={classes.sectionToggleGroup}>
                    {useCases.map(useCase => (
                        <SectionToggle useCase={useCase} binding={setSelectedUseCase}
                                       selected={useCase.name === selectedUseCase.name}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface SectionToggleProps {
    useCase: UseCase;
    binding: (useCase: UseCase) => void;
    selected: boolean;
}

export const SectionToggle: React.FC<SectionToggleProps> = ({useCase, binding, selected}) => {
    const classes = homePageIndustryStyles();

    return (
        <div className={classes.sectionToggle}>
            <div
                className={clsx(classes.sectionToggleIconContainer, selected && classes.sectionToggleIconContainerSelected)}
                onClick={() => binding(useCase)}>
                <useCase.icon color={selected ? vaticleTheme.palette.green["1"] : "#FFF"}/>
            </div>
            <p className={clsx(classes.sectionToggleTitle)}>{useCase.name}</p>
        </div>
    );
}
