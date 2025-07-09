// import { bootstrapApplication } from '@angular/platform-browser';
// import { serverConfig } from "./config.server";
// import { RootComponent } from "./root.component";
//
// const bootstrap = () => {
//     // throw new Error("main.server.ts: bootstrapApplication");
//     return bootstrapApplication(RootComponent, serverConfig);
// }
//
// export default bootstrap;

import "zone.js";
import { bootstrapApplication } from '@angular/platform-browser';
import { serverConfig } from "./config.server";
// import { App } from './app/app';
// import { config } from './app/app.config.server';
import { RootComponent } from "./root.component";

const bootstrap = () => bootstrapApplication(RootComponent, serverConfig);

export default bootstrap;
