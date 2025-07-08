import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './main';

const serverConfigOverrides: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const serverConfig = mergeApplicationConfig(appConfig, serverConfigOverrides);
