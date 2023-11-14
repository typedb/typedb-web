import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import "typedb-web-common/lib/prism-components";

import { environment } from "./environment/environment";
import { WebsiteModule } from "./website.module";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(WebsiteModule)
    .catch((err) => console.error(err));
