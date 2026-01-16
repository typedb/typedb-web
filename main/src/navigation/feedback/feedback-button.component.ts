import { ChangeDetectionStrategy, Component, HostBinding, inject, ViewEncapsulation } from "@angular/core";

import { DialogService } from "src/service/dialog.service";

@Component({
    selector: "td-feedback-button",
    template: `<a (click)="dialog.openFeedbackDialog()" id="feedback-floating-button">Feedback</a>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class FeedbackButtonComponent {
    @HostBinding("class.td-feedback-button") hasFeedbackButtonClass = true;
    dialog = inject(DialogService);
}
