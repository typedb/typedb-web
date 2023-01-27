import {Component} from "@angular/core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "spinning-wheel",
    templateUrl: "spinning-wheel.component.html",
    styleUrls: ["./spinning-wheel.component.scss"],
})
export class SpinningWheelComponent {
    faSpinner = faSpinner;
}
