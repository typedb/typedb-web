import { deploymentPageSchemas } from "./deployment";
import { genericPageSchemas } from "./generic";
import { basePageSchemas } from "./common";
import { eventsPageSchemas } from "./events";
import { featuresPageSchemas } from "./features";
import { homePageSchemas } from "./home";
import { introPageSchemas } from "./intro";
import { solutionPageSchemas } from "./solution";
import { webinarsPageSchemas } from "./webinars";
import { whitePapersPageSchema } from "./white-papers";
import { requestTechTalkPageSchema } from "./request-tech-talk";

export const pageSchemas = [
    ...basePageSchemas,
    ...deploymentPageSchemas,
    ...eventsPageSchemas,
    ...genericPageSchemas,
    ...featuresPageSchemas,
    ...homePageSchemas,
    ...introPageSchemas,
    ...solutionPageSchemas,
    ...webinarsPageSchemas,
    requestTechTalkPageSchema,
    whitePapersPageSchema,
];
