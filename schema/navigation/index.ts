import { footerSchemas } from "./footer";
import { siteBannerSchemas } from "./site-banner";
import { topbarSchemas } from "./topbar";

export const navigationSchemas: any[] = [...footerSchemas, ...siteBannerSchemas, ...topbarSchemas];
