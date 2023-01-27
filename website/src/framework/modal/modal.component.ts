import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: "modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
    @Input() width!: string;

    displayStyle: "none" | "block" = "none";
    displayModal: boolean = false;

    @Input() set display(value: boolean) {
        if (value) {
            this.displayModal = true;
            this.displayStyle = "block";
        } else {
            this.displayModal = false;
            this.displayStyle = "none";
        }
    }

    @Output() clickBackgroundEvent = new EventEmitter<boolean>();

    clickBackground = () => {
        this.clickBackgroundEvent.emit(true);
    }

    clickModal = (event: MouseEvent) => {
        event.stopPropagation();
    }
}
