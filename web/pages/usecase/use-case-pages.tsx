import React from "react";
import { lifeSciencesData } from "./data/life-sciences";
import { precisionMedicineData } from "./data/precision-medicine";
import { UseCasePage } from "./use-case-page";

export const LifeSciencesPage: React.FC = () => <UseCasePage {...lifeSciencesData}/>
export const PrecisionMedicinePage: React.FC = () => <UseCasePage {...precisionMedicineData}/>
