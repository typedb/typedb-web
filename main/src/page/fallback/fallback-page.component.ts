import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "td-fallback-page",
    template: `<article></article>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class FallbackPageComponent {}
