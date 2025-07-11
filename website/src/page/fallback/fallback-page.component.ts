import { ChangeDetectionStrategy, Component } from "@angular/core";

import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";

@Component({
    selector: "td-fallback-page",
    template: `<article></article>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class FallbackPageComponent {}
