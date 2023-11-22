import { Component, HostBinding } from "@angular/core";


@Component({
    selector: "td-feedback-button",
    template: "<a tdLink='?dialog=feedback'>Feedback</a>",
})
export class FeedbackButtonComponent {
    @HostBinding("class.td-feedback-button") hasFeedbackButtonClass = true;
}
