import { basePageSchemas } from "./common";
import { homePageSchemas } from "./home";
import { introPageSchemas } from "./intro";
import { useCasePageSchemas } from "./use-case";
import { webinarsPageSchemas } from "./webinars";

export const pageSchemas = [...basePageSchemas, ...homePageSchemas, ...introPageSchemas, ...useCasePageSchemas, ...webinarsPageSchemas];
