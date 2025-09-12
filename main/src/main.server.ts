import "zone.js";
import 'zone.js/node';
import { DOMParser } from '@xmldom/xmldom';
import { bootstrapApplication } from '@angular/platform-browser';
import { getServerConfig } from "./config.server";
import { RootComponent } from "./root.component";

if (typeof global !== 'undefined') {
    (global as any).DOMParser = DOMParser;
}

// This is the entry point for the server-side rendering
export default async function bootstrap() {
  try {
    // Wait for both the server config and app config to be ready
    const serverConfig = await getServerConfig();

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
