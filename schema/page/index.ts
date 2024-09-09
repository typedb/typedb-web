import { blogSchemas } from "./blog";
import { deploymentPageSchemas } from "./deployment";
import { basePageSchemas } from "./common";
import { eventsPageSchemas } from "./events";
import { featuresPageSchemas } from "./features";
import { genericPageSchemas } from "./generic";
import { homePageSchemas } from "./home";
import { learnPageSchemas } from "./learn";
import { legalDocumentSchema } from "./legal";
import { philosophyPageSchemas } from "./philosophy";
import { requestTechTalkPageSchema } from "./request-tech-talk";
import { servicesPageSchemas } from "./services";
import { solutionPageSchemas } from "./solution";
import { supportPageSchemas } from "./support";
import { lecturesPageSchemas } from "./lectures";
import { papersPageSchema } from "./papers";
import { metaTagsSchemas } from "./meta-tags";

export const pageSchemas: any[] = [
    ...basePageSchemas,
    ...blogSchemas,
    ...deploymentPageSchemas,
    ...eventsPageSchemas,
    ...genericPageSchemas,
    ...featuresPageSchemas,
    ...homePageSchemas,
    ...learnPageSchemas,
    legalDocumentSchema,
    ...philosophyPageSchemas,
    ...servicesPageSchemas,
    ...solutionPageSchemas,
    ...supportPageSchemas,
    ...lecturesPageSchemas,
    requestTechTalkPageSchema,
    papersPageSchema,
    ...metaTagsSchemas,
];
