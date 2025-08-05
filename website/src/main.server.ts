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
import 'zone.js/node';
import { DOMParser } from '@xmldom/xmldom';

if (typeof global !== 'undefined') {
    (global as any).DOMParser = DOMParser;
}

import { bootstrapApplication } from '@angular/platform-browser';
import { serverConfigPromise } from "./config.server";
import { RootComponent } from "./root.component";

// This is the entry point for the server-side rendering
export default async function bootstrap() {
  try {
    // Wait for both the server config and app config to be ready
    const serverConfig = await serverConfigPromise;

    // Merge the server and app configs
    const mergedConfig = {
      ...serverConfig,
      providers: [
        ...(serverConfig.providers || []),
      ]
    };

    // Bootstrap the application with the merged config
    return bootstrapApplication(RootComponent, mergedConfig);
  } catch (error) {
    console.error('Failed to bootstrap application:', error);
    throw error;
  }
}
