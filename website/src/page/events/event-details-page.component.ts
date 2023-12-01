import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { map } from "rxjs";
import { LiveEvent, liveEventSchemaName, SanityDataset, SanityLiveEvent } from "typedb-web-schema";

import { PlainTextPipe } from "src/framework/text/plain-text.pipe";
import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";
import { ImageBuilder } from "src/service/image-builder.service";
import { MetaTagsService } from "src/service/meta-tags.service";

import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-event-details-page",
    templateUrl: "./event-details-page.component.html",
    styleUrls: ["./event-details-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsPageComponent extends PageComponentBase<LiveEvent> {
    constructor(
        private imageBuilder: ImageBuilder,
        private plainTextPipe: PlainTextPipe,
        activatedRoute: ActivatedRoute,
        analytics: AnalyticsService,
        router: Router,
        title: Title,
        idleMonitor: IdleMonitorService,
        metaTags: MetaTagsService,
        contentService: ContentService,
    ) {
        super(activatedRoute, analytics, router, title, idleMonitor, metaTags, contentService);
    }

    protected override getPage(data: SanityDataset) {
        const sanityEvents = data.getDocumentsByType<SanityLiveEvent>(liveEventSchemaName);
        return this.activatedRoute.paramMap.pipe(
            map((params) => {
                const sanityEvent = sanityEvents.find((x) => x.slug.current === params.get("slug"));
                return sanityEvent ? LiveEvent.fromSanity(sanityEvent, data) : null;
            }),
        );
    }

    protected override onPageReady(page: LiveEvent): void {
        super.onPageReady(page);

        this.title.setTitle(`TypeDB Event: ${this.plainTextPipe.transform(page.title)}`);
    }

    getEventImageUrl(event: LiveEvent) {
        return this.imageBuilder.image(event.imageURL).width(494).url();
    }
}
