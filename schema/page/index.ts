import { deploymentPageSchemas } from "./deployment";
import { basePageSchemas } from "./common";
import { eventsPageSchemas } from "./events";
import { featuresPageSchemas } from "./features";
import { genericPageSchemas } from "./generic";
import { homePageSchemas } from "./home";
import { introPageSchemas } from "./intro";
import { requestTechTalkPageSchema } from "./request-tech-talk";
import { servicesPageSchemas } from "./services";
import { solutionPageSchemas } from "./solution";
import { supportPageSchemas } from "./support";
import { webinarsPageSchemas } from "./webinars";
import { whitePapersPageSchema } from "./white-papers";
import { metaTagsSchemas } from "./meta-tags";

export const pageSchemas = [
    ...basePageSchemas,
    ...deploymentPageSchemas,
    ...eventsPageSchemas,
    ...genericPageSchemas,
    ...featuresPageSchemas,
    ...homePageSchemas,
    ...introPageSchemas,
    ...servicesPageSchemas,
    ...solutionPageSchemas,
    ...supportPageSchemas,
    ...webinarsPageSchemas,
    requestTechTalkPageSchema,
    whitePapersPageSchema,
    ...metaTagsSchemas,
];
