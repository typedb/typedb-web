import { ChangeDetectionStrategy, Component } from "@angular/core";

import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";

@Component({
    selector: "td-404-page",
    templateUrl: "./404-page.component.html",
    styleUrls: ["./404-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PageBackgroundComponent],
})
export class _404PageComponent {
}
