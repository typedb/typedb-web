import { actionSchemas } from "./action";
import { colorSchema } from "./color";
import { customCssSchema } from "./custom-css";
import { formSchemas } from "./form";
import { keyPointSchemas } from "./key-point";
import { organisationSchema } from "./organisation";
import { pageSchemas } from "./page";
import { visualComponentSchemas } from "./visual-component";
import { websiteNavSchemas } from "./website-nav";

export const schemaTypes = [
    ...actionSchemas, colorSchema, customCssSchema, ...formSchemas, ...keyPointSchemas, organisationSchema,
    ...pageSchemas, ...visualComponentSchemas, ...websiteNavSchemas
];
