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
import { pricingPageSchemas } from "./pricing";
import { requestTechTalkPageSchema } from "./request-tech-talk";
import { servicesPageSchemas } from "./services";
import { solutionPageSchemas } from "./solution";
import { startupProgramPageSchemas } from "./startup-program";
import { supportPageSchemas } from "./support";
import { lecturesPageSchemas } from "./lectures";
import { papersPageSchema } from "./papers";
import { metaTagsSchemas } from "./meta-tags";

export const pageSchemas: any[] = [
    ...basePageSchemas, ...blogSchemas, ...deploymentPageSchemas, ...eventsPageSchemas, ...featuresPageSchemas,
    ...genericPageSchemas, ...homePageSchemas, ...learnPageSchemas, ...lecturesPageSchemas, legalDocumentSchema,
    ...metaTagsSchemas, papersPageSchema, ...philosophyPageSchemas, ...pricingPageSchemas, requestTechTalkPageSchema,
    ...servicesPageSchemas, ...solutionPageSchemas, ...startupProgramPageSchemas, ...supportPageSchemas,
];
