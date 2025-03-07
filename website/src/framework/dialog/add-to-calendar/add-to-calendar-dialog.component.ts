import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
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
    standalone: true,
    imports: [MatDialogTitle, DialogCloseButtonComponent, MatDialogContent, ActionsComponent, MatProgressBarModule],
})
export class AddToCalendarDialogComponent implements OnInit {
    actions!: ActionButton[];
    isLoading = false;

    constructor(
        private calendarService: CalendarService,
        @Inject(MAT_DIALOG_DATA) public data: { event: EventBase },
        private dialogRef: MatDialogRef<AddToCalendarDialogComponent>,
    ) {}

    ngOnInit() {
        this.actions = [
            new LinkButton({
                style: "greenHollow",
                text: "Google",
                comingSoon: false,
                link: new Link({
                    type: "external",
                    opensNewTab: true,
                    destination: this.calendarService.googleCalendarURL(this.data.event),
                }),
            }),
            new LinkButton({
                style: "greenHollow",
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
