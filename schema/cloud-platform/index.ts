import { loginSchemas } from "./login";
import { onboardingSchemas } from "./onboarding";
import { cloudProviderSchemas } from "./provider";
import { geographySchemas } from "./geography";
import { announcementSchemas } from "./announcement";

export const cloudPlatformSchemas: any[] = [
    ...cloudProviderSchemas,
    ...geographySchemas,
    ...loginSchemas,
    ...onboardingSchemas,
    ...announcementSchemas,
];
