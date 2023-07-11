import { footerSchemas } from "./footer";
import { siteBannerSchema } from "./site-banner";
import { topbarSchemas } from "./topbar";

export const navigationSchemas = [...footerSchemas, siteBannerSchema, ...topbarSchemas];
