import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ActionButton, EventBase, Link, LinkButton } from "typedb-web-schema";
import { CalendarService } from "../../../service/calendar.service";
import { ActionsComponent } from "../../actions/actions.component";
import { DialogCloseButtonComponent } from "../close-button/dialog-close-button.component";

@Component({
    selector: "td-add-to-calendar-dialog",
    templateUrl: "./add-to-calendar-dialog.component.html",
    styleUrls: ["./add-to-calendar-dialog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatDialogTitle, DialogCloseButtonComponent, MatDialogContent, ActionsComponent, MatProgressBarModule]
})
export class AddToCalendarDialogComponent implements OnInit {
    actions!: ActionButton[];
    isLoading = false;
    readonly data = inject<{ event: EventBase }>(MAT_DIALOG_DATA);

    constructor(
        private calendarService: CalendarService,
        private dialogRef: MatDialogRef<AddToCalendarDialogComponent>,
    ) {}

    ngOnInit() {
        this.actions = [
            new LinkButton({
                style: "secondary",
                text: "Google",
                comingSoon: false,
                link: new Link({
                    type: "external",
                    opensNewTab: true,
                    destination: this.calendarService.googleCalendarURL(this.data.event),
                }),
            }),
            new LinkButton({
                style: "secondary",
                text: "Apple / Outlook",
                comingSoon: false,
                download: { filename: `${this.data.event.slug}.ics` },
                link: new Link({
                    type: "external",
                    opensNewTab: true,
                    destination: this.calendarService.icsFileURL(this.data.event),
                }),
            }),
        ];
    }
}
