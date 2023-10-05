import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { WebsiteModule } from "./website.module";
import { environment } from "./environment/environment";

import { installPrismTypeQL } from "./prism-typeql";
import { installPrismBash } from "./prism-bash";
import "prismjs/components/prism-cypher";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";

if (environment.production) {
    enableProdMode();
}

installPrismTypeQL();
installPrismBash();

platformBrowserDynamic()
    .bootstrapModule(WebsiteModule)
    .catch((err) => console.error(err));
