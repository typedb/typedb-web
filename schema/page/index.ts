import { deploymentPageSchemas } from "./deployment";
import { basePageSchemas } from "./common";
import { eventsPageSchemas } from "./events";
import { featuresPageSchemas } from "./features";
import { genericPageSchemas } from "./generic";
import { homePageSchemas } from "./home";
import { introPageSchemas } from "./intro";
import { requestTechTalkPageSchema } from "./request-tech-talk";
import { servicePageSchemas } from "./service";
import { solutionPageSchemas } from "./solution";
import { supportPageSchemas } from "./support";
import { webinarsPageSchemas } from "./webinars";
import { whitePapersPageSchema } from "./white-papers";

export const pageSchemas = [
    ...basePageSchemas,
    ...deploymentPageSchemas,
    ...eventsPageSchemas,
    ...genericPageSchemas,
    ...featuresPageSchemas,
    ...homePageSchemas,
    ...introPageSchemas,
    ...servicePageSchemas,
    ...solutionPageSchemas,
    ...supportPageSchemas,
    ...webinarsPageSchemas,
    requestTechTalkPageSchema,
    whitePapersPageSchema,
];
