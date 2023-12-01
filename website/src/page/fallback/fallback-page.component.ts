import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "td-fallback-page",
    template: `<article tdPageBackground></article>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FallbackPageComponent {}
