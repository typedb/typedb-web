import { AsyncPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
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

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../../framework/button/button.component";
import { EventDatePipe } from "../../framework/date/event-date.pipe";
import { EventDurationPipe } from "../../framework/date/event-duration.pipe";
import { FurtherLearningComponent } from "../../framework/further-learning/further-learning.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { PersonInfoComponent } from "../../framework/person/person.component";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-event-details-page",
    templateUrl: "./event-details-page.component.html",
    styleUrls: ["./event-details-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent,
        NgIf,
        HeadingWithHighlightsComponent,
        MatIconModule,
        NgSwitch,
        NgSwitchCase,
        AspectRatioComponent,
        ButtonComponent,
        RichTextComponent,
        NgFor,
        PersonInfoComponent,
        FurtherLearningComponent,
        AsyncPipe,
        EventDatePipe,
        EventDurationPipe,
    ],
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
