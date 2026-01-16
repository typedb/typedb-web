import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { ActionsComponent } from "../../framework/actions/actions.component";
import { Link, LinkButton } from "typedb-web-schema";

@Component({
    selector: "td-404-page",
    templateUrl: "./404-page.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        ActionsComponent
    ]
})
export class _404PageComponent {
    actions = [
        new LinkButton({
            id: "home",
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
