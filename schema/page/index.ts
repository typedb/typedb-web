import { basePageSchemas } from "./common";
import { featuresPageSchemas } from "./features";
import { homePageSchemas } from "./home";
import { introPageSchemas } from "./intro";
import { useCasePageSchemas } from "./use-case";
import { webinarsPageSchemas } from "./webinars";

export const pageSchemas = [...basePageSchemas, ...featuresPageSchemas, ...homePageSchemas, ...introPageSchemas, ...useCasePageSchemas, ...webinarsPageSchemas];
