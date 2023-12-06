import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

@Component({
    selector: "td-feedback-button",
    template: `<a tdLink="?dialog=feedback">Feedback</a>`,
    styleUrls: ["feedback-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackButtonComponent {
    @HostBinding("class.td-feedback-button") hasFeedbackButtonClass = true;
}
