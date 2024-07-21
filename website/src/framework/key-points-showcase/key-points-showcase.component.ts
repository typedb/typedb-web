import { AsyncPipe, NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { defer, filter, map, merge, Observable, shareReplay, startWith, Subject } from "rxjs";
import { ContentTextTab } from "typedb-web-schema";

import { ContentPanelComponent } from "../content-panel/content-panel.component";
import { ScrollShadowComponent } from "../scroll-shadow/scroll-shadow.component";
import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-key-points-showcase",
    templateUrl: "key-points-showcase.component.html",
    styleUrls: ["key-points-showcase.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ScrollShadowComponent, NgClass, ContentPanelComponent, AsyncPipe],
})
export class KeyPointsShowcaseComponent implements OnInit {
    @Input() tabs!: ContentTextTab[];
    @Input() setWindowHashOnTabClick = false;
    @HostBinding("class.section") hasSectionClass = true;

    readonly selectedTab$: Observable<ContentTextTab>;
    private _elementID!: string;
    private readonly tabClick$: Subject<ContentTextTab> = new Subject();

    constructor(
        private router: Router,
        private _el: ElementRef,
        activatedRoute: ActivatedRoute,
    ) {
        this.selectedTab$ = defer(() =>
            merge(
                activatedRoute.fragment.pipe(
                    map((value) => this.tabs.find((x) => this.tabID(x) === value)),
                    filter((v): v is ContentTextTab => !!v),
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

    tabID(tab: ContentTextTab): string {
        return `${this._elementID}-${sanitiseHtmlID(tab.title)}`;
    }

    onTabClick(tab: ContentTextTab, event: Event) {
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
