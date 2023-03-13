import { actionSchemas } from "./action";
import { colorSchema } from "./color";
import { formSchemas } from "./form";
import { keyPointSchemas } from "./keyPoint";
import { organisationSchema } from "./organisation";
import { pageSchemas } from "./page";
import { visualComponentSchemas } from "./visual-component";
import { websiteNavSchemas } from "./websiteNav";

export const schemaTypes = [
    ...actionSchemas, colorSchema, ...formSchemas, ...keyPointSchemas, organisationSchema, ...pageSchemas,
    ...visualComponentSchemas, ...websiteNavSchemas
];
