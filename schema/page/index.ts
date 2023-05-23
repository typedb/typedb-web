import { genericPageSchemas } from "./generic";
import { basePageSchemas } from "./common";
import { featuresPageSchemas } from "./features";
import { homePageSchemas } from "./home";
import { introPageSchemas } from "./intro";
import { solutionPageSchemas } from "./solution";
import { webinarsPageSchemas } from "./webinars";

export const pageSchemas = [...basePageSchemas, ...genericPageSchemas, ...featuresPageSchemas, ...homePageSchemas, ...introPageSchemas, ...solutionPageSchemas, ...webinarsPageSchemas];
