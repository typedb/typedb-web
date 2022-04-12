import React from "react";
import { cyberSecurityData } from "./data/cyber-security";
import { lifeSciencesData } from "./data/life-sciences";
import { machineLearningData } from "./data/machine-learning";
import { UseCasePage } from "./use-case-page";

export const CyberSecurityPage: React.FC = () => <UseCasePage {...cyberSecurityData}/>
export const LifeSciencesPage: React.FC = () => <UseCasePage {...lifeSciencesData}/>
export const MachineLearningPage: React.FC = () => <UseCasePage {...machineLearningData}/>
