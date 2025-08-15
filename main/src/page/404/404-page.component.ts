import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsComponent } from "../../framework/actions/actions.component";
import { Link, LinkButton } from "typedb-web-schema";

@Component({
    selector: "td-404-page",
    templateUrl: "./404-page.component.html",
    styleUrls: ["./404-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ActionsComponent
    ]
})
export class _404PageComponent {
    actions = [
        new LinkButton({
            text: "Go to home page",
            style: "greenHollow",
            link: new Link({
                type: "route",
                destination: "/",
                opensNewTab: false
            }),
            comingSoon: false,
        }),
    ];
}
