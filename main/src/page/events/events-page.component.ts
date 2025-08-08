import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { of } from "rxjs";
import { sanitiseHtmlID } from "typedb-web-common/lib";
import { EventsPage, eventsPageSchemaName, LiveEvent, SanityDataset, SanityEventsPage } from "typedb-web-schema";

import { ContentService } from "src/service/content.service";
import { ImageBuilder } from "src/service/image-builder.service";
import { MetaTagsService } from "src/service/meta-tags.service";

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../../framework/button/button.component";
import { EventDatePipe } from "../../framework/date/event-date.pipe";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-events-page",
    templateUrl: "./events-page.component.html",
    styleUrls: ["./events-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AspectRatioComponent, RichTextComponent, ButtonComponent, AsyncPipe, EventDatePipe, PlainTextPipe,
        SectionCoreComponent
    ]
})
export class EventsPageComponent extends PageComponentBase<EventsPage> {
    constructor(
        private imageBuilder: ImageBuilder,
        activatedRoute: ActivatedRoute,
        router: Router,
        title: Title,
        metaTags: MetaTagsService,
        contentService: ContentService,
    ) {
        super(activatedRoute, router, title, metaTags, contentService);
    }

    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityEventsPage>(eventsPageSchemaName);
        return of(page ? new EventsPage(page, data) : null);
    }

    getEventListImageUrl(event: LiveEvent) {
        return event.imageURL ? this.imageBuilder.image(event.imageURL).width(731).url() : undefined;
    }

    eventDetailsButtonId(event: LiveEvent): string {
        return sanitiseHtmlID(`${event.title.toSectionID()}_view-details`);
    }
}
