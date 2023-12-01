import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { defer, filter, map, merge, Observable, shareReplay, startWith, Subject } from "rxjs";
import { ContentTextPanel } from "typedb-web-schema";

import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-content-tabs",
    templateUrl: "content-tabs.component.html",
    styleUrls: ["content-tabs.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentTabsComponent implements OnInit {
    @Input() tabs!: ContentTextPanel[];
    @Input() setWindowHashOnTabClick = false;

    readonly selectedTab$: Observable<ContentTextPanel>;
    private _elementID!: string;
    private readonly tabClick$: Subject<ContentTextPanel> = new Subject();

    constructor(
        private router: Router,
        private _el: ElementRef,
        activatedRoute: ActivatedRoute,
    ) {
        this.selectedTab$ = defer(() =>
            merge(
                activatedRoute.fragment.pipe(
                    map((value) => this.tabs.find((x) => this.tabID(x) === value)),
                    filter((v): v is ContentTextPanel => !!v),
                ),
                this.tabClick$,
            ).pipe(startWith(this.tabs[0]), shareReplay(1)),
        );
    }

    ngOnInit() {
        if (!this._el.nativeElement.id.length) {
            throw `${this.constructor.name}'s native HTML element must have an id set`;
        }
        this._elementID = this._el.nativeElement.id;
    }

    tabID(tab: ContentTextPanel): string {
        return `${this._elementID}-${sanitiseHtmlID(tab.title)}`;
    }

    onTabClick(tab: ContentTextPanel, event: Event) {
        event.preventDefault();
        if (event.currentTarget instanceof HTMLElement) {
            event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
        this.tabClick$.next(tab);

        if (this.setWindowHashOnTabClick) {
            this.router.navigate([], {
                fragment: this.tabID(tab),
                state: { preventScrollToAnchor: true },
            });
        }
    }
}
