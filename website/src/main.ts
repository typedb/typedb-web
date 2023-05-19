import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { installPrismTypeQL } from "./prism-typeql";

import { WebsiteModule } from './website.module';
import { environment } from './environment/environment';

if (environment.production) {
    enableProdMode();
}

installPrismTypeQL();

platformBrowserDynamic().bootstrapModule(WebsiteModule)
    .catch(err => console.error(err));
