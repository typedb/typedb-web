import { Component, DestroyRef, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { map, Observable, tap } from "rxjs";
import { Event, EventsPage, eventsPageSchemaName, SanityEventsPage } from "typedb-web-schema";

import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";
import { ImageBuilder } from "src/service/image-builder.service";
import { MetaTagsService } from "src/service/meta-tags.service";

@Component({
    selector: "td-events-page",
    templateUrl: "./events-page.component.html",
    styleUrls: ["./events-page.component.scss"],
})
export class EventsPageComponent implements OnInit {
    page$!: Observable<EventsPage | null>;

    constructor(
        private analytics: AnalyticsService,
        private contentService: ContentService,
        private destroyRef: DestroyRef,
        private idleMonitor: IdleMonitorService,
        private imageBuilder: ImageBuilder,
        private metaTags: MetaTagsService,
        private router: Router,
        private title: Title,
    ) {}

    ngOnInit() {
        this.page$ = this.contentService.data.pipe(
            map((data) => {
                const sanityEventsPage = data.getDocumentByID(eventsPageSchemaName) as SanityEventsPage | undefined;
                return sanityEventsPage ? new EventsPage(sanityEventsPage, data) : null;
            }),
            tap((page) => {
                if (page) {
                    this.title.setTitle(`TypeDB | ${page.title}`);
                    const { unregister } = this.metaTags.register(page.metaTags);
                    this.destroyRef.onDestroy(unregister);
                    this.analytics.hubspot.trackPageView();
                    setTimeout(() => {
                        this.idleMonitor.fireManualMyAppReadyEvent();
                    }, 20000);
                } else {
                    this.router.navigate(["404"], { skipLocationChange: true });
                }
            }),
        );
    }

    getEventListImageUrl(event: Event) {
        return this.imageBuilder.image(event.imageURL).width(731).url();
    }
}
