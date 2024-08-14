import { AsyncPipe } from "@angular/common";
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

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../../framework/button/button.component";
import { EventDatePipe } from "../../framework/date/event-date.pipe";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/section/title-body-actions-section.component";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { sanitiseHtmlID } from "../../framework/util";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-events-page",
    templateUrl: "./events-page.component.html",
    styleUrls: ["./events-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    PageBackgroundComponent,
    TitleBodyActionsSectionComponent,
    AspectRatioComponent,
    RichTextComponent,
    ButtonComponent,
    AsyncPipe,
    EventDatePipe,
    PlainTextPipe
],
})
export class EventsPageComponent extends PageComponentBase<EventsPage> {
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

    eventDetailsButtonId(event: LiveEvent): string {
        return sanitiseHtmlID(`${event.title.toSectionID()}_view-details`);
    }
}
