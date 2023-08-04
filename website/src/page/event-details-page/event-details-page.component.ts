import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { Observable, combineLatest, map, tap } from "rxjs";

import { Event, SanityEvent, eventSchemaName } from "typedb-web-schema";

import { PlainTextPipe } from "src/framework/text/plain-text.pipe";
import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";
import { ImageBuilder } from "src/service/image-builder.service";

@Component({
    selector: "td-event-details-page",
    templateUrl: "./event-details-page.component.html",
    styleUrls: ["./event-details-page.component.scss"],
})
export class EventDetailsPageComponent implements OnInit {
    event$!: Observable<Event | null>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private analytics: AnalyticsService,
        private contentService: ContentService,
        private idleMonitor: IdleMonitorService,
        private imageBuilder: ImageBuilder,
        private plainTextPipe: PlainTextPipe,
        private router: Router,
        private title: Title
    ) {}

    ngOnInit() {
        this.event$ = combineLatest([this.activatedRoute.paramMap, this.contentService.data]).pipe(
            map(([params, data]) => {
                const sanityEvents = data.getDocumentsByType(eventSchemaName) as SanityEvent[];
                const sanityEvent = sanityEvents.find((x) => x.slug.current === params.get("slug"));
                return sanityEvent ? Event.fromSanity(sanityEvent, data) : null;
            }),
            tap((event) => {
                if (event) {
                    this.title.setTitle(`${this.plainTextPipe.transform(event.title)} - TypeDB Events`);
                    this.analytics.hubspot.trackPageView();
                    setTimeout(() => {
                        this.idleMonitor.fireManualMyAppReadyEvent();
                    }, 10000);
                } else {
                    this.router.navigate(["404"], { skipLocationChange: true });
                }
            })
        );
    }

    getEventImageUrl(event: Event) {
        return this.imageBuilder.image(event.imageURL).width(494).url();
    }
}
