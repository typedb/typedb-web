import { deploymentPageSchemas } from "./deployment";
import { genericPageSchemas } from "./generic";
import { basePageSchemas } from "./common";
import { featuresPageSchemas } from "./features";
import { homePageSchemas } from "./home";
import { introPageSchemas } from "./intro";
import { solutionPageSchemas } from "./solution";
import { webinarsPageSchemas } from "./webinars";
import { whitePapersPageSchema } from "./white-papers";

export const pageSchemas = [
    ...basePageSchemas, ...deploymentPageSchemas, ...genericPageSchemas, ...featuresPageSchemas, ...homePageSchemas,
    ...introPageSchemas, ...solutionPageSchemas, ...webinarsPageSchemas, whitePapersPageSchema,
];
