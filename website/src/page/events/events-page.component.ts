import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { of } from "rxjs";
import { EventsPage, eventsPageSchemaName, LiveEvent, SanityDataset, SanityEventsPage } from "typedb-web-schema";

import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";
import { ImageBuilder } from "src/service/image-builder.service";
import { MetaTagsService } from "src/service/meta-tags.service";

import { StandardPageComponent } from "../standard-page.component";

@Component({
    selector: "td-events-page",
    templateUrl: "./events-page.component.html",
    styleUrls: ["./events-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPageComponent extends StandardPageComponent<EventsPage> {
    constructor(
        private imageBuilder: ImageBuilder,
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
        const page = data.getDocumentByID<SanityEventsPage>(eventsPageSchemaName);
        return of(page ? new EventsPage(page, data) : null);
    }

    getEventListImageUrl(event: LiveEvent) {
        return this.imageBuilder.image(event.imageURL).width(731).url();
    }
}
