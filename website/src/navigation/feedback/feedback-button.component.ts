import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

@Component({
    selector: "td-feedback-button",
    template: `<a tdLink="?dialog=feedback">Feedback</a>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackButtonComponent {
    @HostBinding("class.td-feedback-button") hasFeedbackButtonClass = true;
}
