import { onboardingSchemas } from "./onboarding";
import { cloudProviderSchemas } from "./provider";
import { geographySchemas } from "./geography";

export const cloudPlatformSchemas = [
    ...cloudProviderSchemas,
    ...geographySchemas,
    ...onboardingSchemas,
];
