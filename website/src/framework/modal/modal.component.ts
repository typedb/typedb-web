import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: "td-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
    @Input() width!: string;
    @Input() visible: boolean = false;

    @Output() clickBackgroundEvent = new EventEmitter<boolean>();

    get displayStyle() {
        return this.visible ? "block" : "none";
    }

    clickBackground = () => {
        this.clickBackgroundEvent.emit(true);
    }

    clickModal = (event: MouseEvent) => {
        event.stopPropagation();
    }
}
