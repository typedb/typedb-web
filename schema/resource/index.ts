import { articleSchemas } from "./article";
import { genericResourceSchema } from "./generic";
import { liveEventSchema } from "./live-event";
import { webinarSchemas } from "./webinar";
import { whitePaperSchema } from "./white-paper";

export const resourceSchemas = [...articleSchemas, genericResourceSchema, liveEventSchema, ...webinarSchemas, whitePaperSchema];
