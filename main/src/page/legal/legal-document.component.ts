import { AsyncPipe, DOCUMENT, isPlatformBrowser } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import Prism from "prismjs";
import { map, Observable, of, shareReplay, switchMap } from "rxjs";
import { LegalDocument } from "typedb-web-schema";

import { RichTextComponent } from "../../framework/text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";

@Component({
    selector: "td-legal-document",
    templateUrl: "./legal-document.component.html",
    styleUrls: ["./legal-document.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [HeadingWithHighlightsComponent, RichTextComponent, AsyncPipe]
})
export class LegalDocumentComponent implements OnInit {
    private readonly platformId = inject(PLATFORM_ID);
    private document = inject(DOCUMENT);
    document$!: Observable<LegalDocument | null>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private content: ContentService,
        private metaTags: MetaTagsService,
        private title: Title,
    ) {}

    ngOnInit() {
        this.document$ = this.activatedRoute.paramMap.pipe(
            map((params) => ({ slug: params.get("slug") })),
            switchMap(({ slug }) => (slug ? this.content.getLegalDocumentBySlug(slug) : of(null))),
            shareReplay(),
        );
        this.document$.subscribe({
            next: (doc) => {
                if (doc) {
                    this.title.setTitle(doc.title.toPlainText());
                    this.metaTags.register(doc.metaTags);
                    if (isPlatformBrowser(this.platformId)) {
                        setTimeout(() => {
                            (window as any)["Prism"].highlightAll();
                        }, 0);
                        this.document.querySelectorAll("article a[rel*='noreferrer']").forEach((el) => {
                            el.setAttribute("rel", "noopener");
                        });
                    }
                } else {
                    this.content.handleContentNotFound();
                }
            },
            error: (err) => {
                console.error('Error loading legal document:', err);
                this.content.handleContentNotFound();
            },
        });
    }
}
