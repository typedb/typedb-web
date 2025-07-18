import { blogSchemas } from "./blog";
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
import { useCasePageSchemas } from "./use-case";

export const pageSchemas: any[] = [
    ...basePageSchemas, ...blogSchemas, ...eventsPageSchemas, ...featuresPageSchemas,
    ...genericPageSchemas, ...homePageSchemas, ...learnPageSchemas, ...lecturesPageSchemas, legalDocumentSchema,
    ...metaTagsSchemas, papersPageSchema, ...philosophyPageSchemas, ...pricingPageSchemas, requestTechTalkPageSchema,
    ...servicesPageSchemas, ...solutionPageSchemas, ...startupProgramPageSchemas, ...supportPageSchemas,
    ...useCasePageSchemas,
];
