import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TopbarMobileService {
    openState = new BehaviorSubject(false);

    constructor() {}

    toggleOpenState() {
        this.openState.next(!this.openState.getValue());
    }

    setClosedState() {
        this.openState.next(false);
    }
}
