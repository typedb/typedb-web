import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { WebsiteModule } from './website.module';
import { environment } from './environment/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(WebsiteModule)
    .catch(err => console.error(err));
