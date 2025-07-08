import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { withRoutes } from "@angular/ssr";
import { serverRoutes } from "./app.routes.server";
import { appConfig } from './main';

const serverConfigOverrides: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const serverConfig = mergeApplicationConfig(appConfig, serverConfigOverrides);
