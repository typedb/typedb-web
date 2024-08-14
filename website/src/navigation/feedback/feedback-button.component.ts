import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

import { LinkDirective } from "../../framework/link/link.directive";

@Component({
    selector: "td-feedback-button",
    template: `<a tdLink="?dialog=feedback" id="feedback-floating-button">Feedback</a>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [LinkDirective],
})
export class FeedbackButtonComponent {
    @HostBinding("class.td-feedback-button") hasFeedbackButtonClass = true;
}
