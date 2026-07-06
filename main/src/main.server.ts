import "zone.js";
import 'zone.js/node';
import { DOMParser } from '@xmldom/xmldom';
import { DOCUMENT } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { threadId } from 'node:worker_threads';
import { getServerConfig } from "./config.server";
import { RootComponent } from "./root.component";

if (typeof global !== 'undefined') {
    (global as any).DOMParser = DOMParser;
}

// Per-route memory reporting for diagnosing OOMs during prerendering (enabled via CI_MEM_LOG).
// heapUsed/heapTotal are per-isolate, i.e. per render worker; rss is shared by the whole build process.
const memLogEnabled = typeof process !== 'undefined' && !!process.env['CI_MEM_LOG'];

function logMemory(phase: string, route: string): void {
    if (!memLogEnabled) return;
    const mb = (bytes: number) => `${Math.round(bytes / 1048576)}MB`;
    const mem = process.memoryUsage();
    console.log(
        `[mem] worker=${threadId} ${phase} route=${route} ` +
        `heapUsed=${mb(mem.heapUsed)} heapTotal=${mb(mem.heapTotal)} rss=${mb(mem.rss)}`
    );
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
    const appRef = await bootstrapApplication(RootComponent, mergedConfig);
    if (memLogEnabled) {
        const route = appRef.injector.get(DOCUMENT).location?.pathname ?? "?";
        logMemory("bootstrapped", route);
        // onDestroy fires after the page has been rendered and serialized - heap growth
        // that persists here (compared to other routes) points at the memory-hungry pages.
        appRef.onDestroy(() => logMemory("rendered", route));
    }
    return appRef;
  } catch (error) {
    console.error('Failed to bootstrap application:', error);
    throw error;
  }
}
