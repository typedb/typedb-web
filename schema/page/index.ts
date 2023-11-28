import { blogSchemas } from "./blog";
import { deploymentPageSchemas } from "./deployment";
import { basePageSchemas } from "./common";
import { eventsPageSchemas } from "./events";
import { featuresPageSchemas } from "./features";
import { genericPageSchemas } from "./generic";
import { homePageSchemas } from "./home";
import { learningCenterSchema } from "./learn";
import { legalDocumentSchema } from "./legal";
import { philosophyPageSchemas } from "./philosophy";
import { requestTechTalkPageSchema } from "./request-tech-talk";
import { servicesPageSchemas } from "./services";
import { solutionPageSchemas } from "./solution";
import { supportPageSchemas } from "./support";
import { lecturesPageSchemas } from "./lectures";
import { whitePapersPageSchema } from "./white-papers";
import { metaTagsSchemas } from "./meta-tags";

export const pageSchemas = [
    ...basePageSchemas,
    ...blogSchemas,
    ...deploymentPageSchemas,
    ...eventsPageSchemas,
    ...genericPageSchemas,
    ...featuresPageSchemas,
    ...homePageSchemas,
    learningCenterSchema,
    legalDocumentSchema,
    ...philosophyPageSchemas,
    ...servicesPageSchemas,
    ...solutionPageSchemas,
    ...supportPageSchemas,
    ...lecturesPageSchemas,
    requestTechTalkPageSchema,
    whitePapersPageSchema,
    ...metaTagsSchemas,
];
