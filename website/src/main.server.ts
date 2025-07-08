import { bootstrapApplication } from '@angular/platform-browser';
import { serverConfig } from "./config.server";
import { RootComponent } from "./root.component";

const bootstrap = () => bootstrapApplication(RootComponent, serverConfig);

export default bootstrap;
