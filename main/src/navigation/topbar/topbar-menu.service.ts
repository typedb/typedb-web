import { DestroyRef, Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

const DEFAULT_OFFSET = 300;

@Injectable({
    providedIn: "root",
})
export class TopbarMenuService {
    private offsetSubject = new BehaviorSubject(DEFAULT_OFFSET);

    get offset() {
        return this.offsetSubject.asObservable();
    }

    registerPageOffset(offset: number, destroyRef: DestroyRef) {
        destroyRef.onDestroy(() => this.offsetSubject.next(DEFAULT_OFFSET));
        this.offsetSubject.next(offset);
    }
}
