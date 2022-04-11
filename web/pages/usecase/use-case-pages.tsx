import React from "react";
import { lifeSciencesData } from "./data/life-sciences";
import { machineLearningData } from "./data/machine-learning";
import { UseCasePage } from "./use-case-page";

export const LifeSciencesPage: React.FC = () => <UseCasePage {...lifeSciencesData}/>
export const MachineLearningPage: React.FC = () => <UseCasePage {...machineLearningData}/>
