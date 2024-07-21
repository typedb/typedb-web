import { AsyncPipe, NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { defer, filter, map, merge, Observable, shareReplay, startWith, Subject } from "rxjs";
import { ContentProsConsTab, MultiComparisonTabs } from "typedb-web-schema";

import { ContentPanelComponent } from "../content-panel/content-panel.component";
import { IllustrationComponent } from "../illustration/illustration.component";
import { ScrollShadowComponent } from "../scroll-shadow/scroll-shadow.component";
import { RichTextComponent } from "../text/rich-text.component";
import { sanitiseHtmlID } from "../util";
import { ProsConsComponent } from "./pros-cons.component";

@Component({
    selector: "td-multi-comparison-tabs",
    templateUrl: "multi-comparison-tabs.component.html",
    styleUrls: ["multi-comparison-tabs.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ScrollShadowComponent, NgClass, ContentPanelComponent, AsyncPipe, RichTextComponent, ProsConsComponent, IllustrationComponent],
})
export class MultiComparisonTabsComponent implements OnInit {
    @Input() tabs!: MultiComparisonTabs;
    @Input() setWindowHashOnTabClick = false;
    @HostBinding("class") clazz = "section";

    readonly selectedSecondaryTab$: Observable<ContentProsConsTab>;
    private _elementID!: string;
    private readonly secondaryTabClick$: Subject<ContentProsConsTab> = new Subject();

    constructor(
        private router: Router,
        private _el: ElementRef,
        activatedRoute: ActivatedRoute,
    ) {
        this.selectedSecondaryTab$ = defer(() =>
            merge(
                activatedRoute.fragment.pipe(
                    map((value) => this.tabs.secondaryTabs.find((x) => this.tabID(x) === value)),
                    filter((v): v is ContentProsConsTab => !!v),
                ),
                this.secondaryTabClick$,
            ).pipe(startWith(this.tabs.secondaryTabs[0]), shareReplay(1)),
        );
    }

    ngOnInit() {
        if (!this._el.nativeElement.id.length) {
            throw `${this.constructor.name}'s native HTML element must have an id set`;
        }
        this._elementID = this._el.nativeElement.id;
    }

    tabID(tab: ContentProsConsTab): string {
        return `${this._elementID}-${sanitiseHtmlID(tab.title)}`;
    }

    onTabClick(tab: ContentProsConsTab, event: Event) {
        event.preventDefault();
        if (event.currentTarget instanceof HTMLElement) {
            event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
        this.secondaryTabClick$.next(tab);

        if (this.setWindowHashOnTabClick) {
            this.router.navigate([], {
                fragment: this.tabID(tab),
                state: { preventScrollToAnchor: true },
            });
        }
    }
}
