import React from "react";
import { cyberSecurityData } from "./data/cyber-security";
import { knowledgeGraphsData } from "./data/knowledge-graphs";
import { lifeSciencesData } from "./data/life-sciences";
import { machineLearningData } from "./data/machine-learning";
import { UseCasePage } from "./use-case-page";

export const CyberSecurityPage: React.FC = () => <UseCasePage {...cyberSecurityData}/>
export const KnowledgeGraphsPage: React.FC = () => <UseCasePage {...knowledgeGraphsData}/>
export const LifeSciencesPage: React.FC = () => <UseCasePage {...lifeSciencesData}/>
export const MachineLearningPage: React.FC = () => <UseCasePage {...machineLearningData}/>
