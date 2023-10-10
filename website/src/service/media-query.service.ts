import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";

import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class MediaQueryService {
    isMobile = this._breakpointObserver.observe(["(max-width:767px)"]).pipe(map((value) => value.matches));

    constructor(private _breakpointObserver: BreakpointObserver) {}
}
