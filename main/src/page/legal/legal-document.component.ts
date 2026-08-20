import { AsyncPipe, DOCUMENT } from "@angular/common";
import { afterNextRender, ChangeDetectionStrategy, Component, inject, Injector, OnInit, ViewEncapsulation } from "@angular/core";
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
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [HeadingWithHighlightsComponent, RichTextComponent, AsyncPipe]
})
export class LegalDocumentComponent implements OnInit {
    private document = inject(DOCUMENT);
    private readonly injector = inject(Injector);
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
                    // Both the highlight pass and the rel fix-up read the rendered
                    // document, so both must wait for the next render rather than a
                    // macrotask that can beat <td-rich-text> to the DOM.
                    afterNextRender(() => {
                        Prism.highlightAll();
                        this.document.querySelectorAll("article a[rel*='noreferrer']").forEach((el) => {
                            el.setAttribute("rel", "noopener");
                        });
                    }, { injector: this.injector });
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
