import { AsyncPipe, isPlatformBrowser, Location } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Inject, OnDestroy, PLATFORM_ID, ViewChild, ViewEncapsulation } from "@angular/core";
import { of, tap } from "rxjs";
import { sanitiseHtmlID } from "typedb-web-common/lib";
import { FeaturesPage, featuresPageSchemaName, SanityDataset, SanityFeaturesPage } from "typedb-web-schema";
import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { SmoothScrollDirective } from "../../framework/smooth-scroll/smooth-scroll.directive";
import { PageComponentBase } from "../page-component-base";

export type FeaturesNavbarItem = { text: string; slug?: string; href: string };

export interface NestedNavbarItem extends FeaturesNavbarItem {
    children?: (FeaturesNavbarItem & { sectionId?: string })[];
    sectionId?: string;
}

@Component({
    selector: "td-features-page",
    templateUrl: "./features-page.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        FeatureGridComponent, ConclusionPanelComponent, AsyncPipe, SectionCoreComponent,
        SmoothScrollDirective,
    ],
})
export class FeaturesPageComponent extends PageComponentBase<FeaturesPage> implements AfterViewInit, OnDestroy {
    @ViewChild('featuresContent') private featuresContent!: ElementRef<HTMLElement>;
    
    navbarItems: NestedNavbarItem[] = [];
    location = inject(Location);
    platformId = inject(PLATFORM_ID);
    private scrollHandler: EventListener | null = null;
    private activeSectionId: string | null = null;

    sanitiseGridId(sectionId: string, gridName: string): string {
        const sanitizedGridName = sanitiseHtmlID(gridName);
        const sanitizedSectionId = sanitiseHtmlID(sectionId);

        // If the sanitized grid name starts with the sanitized section ID, don't duplicate it
        if (sanitizedGridName.startsWith(sanitizedSectionId + '-')) {
            return sanitizedGridName;
        }

        return `${sanitizedSectionId}-${sanitizedGridName}`;
    }

    scrollToTop(event: Event): void {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Remove hash from URL
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.setupActiveSectionDetection();
        }
    }

    ngOnDestroy() {
        if (this.scrollHandler && isPlatformBrowser(this.platformId)) {
            window.removeEventListener('scroll', this.scrollHandler);
        }
    }

    private setupActiveSectionDetection() {
        if (!isPlatformBrowser(this.platformId)) return;

        // Clean up any existing scroll handler
        if (this.scrollHandler) {
            window.removeEventListener('scroll', this.scrollHandler);
            this.scrollHandler = null;
        }

        // Create a bound version of the handler
        const scrollHandler = (event: Event) => {
            if (!isPlatformBrowser(this.platformId)) return;
            
            // Get all section elements that are referenced in the TOC, including nested items
            const sectionElements = this.navbarItems.flatMap(item => {
                const sections = [];
                
                // Add the main TOC item
                if (item.href) {
                    const id = item.href.split('#')[1];
                    const element = document.getElementById(id);
                    if (element) {
                        sections.push({ id, element });
                    }
                }

                // Add any nested TOC items
                if (item.children) {
                    item.children.forEach(child => {
                        if (child.href) {
                            const id = child.href.split('#')[1];
                            const element = document.getElementById(id);
                            if (element) {
                                sections.push({ id, element });
                            }
                        }
                    });
                }

                return sections;
            });

            // Find the section closest to the top of the viewport
            let activeSection = null;
            let minDistance = 200; // Max distance from top to consider

            for (const {id, element} of sectionElements) {
                const rect = element.getBoundingClientRect();
                const scrollPadding = 112;
                const rectTop = rect.top - scrollPadding;
                const rectBottom = rect.bottom - scrollPadding;

                // Consider sections that are near the top of the viewport
                if (rectTop > -100 && rectTop < minDistance) {
                    minDistance = rectTop;
                    activeSection = id;
                }
                // Also consider sections that are at the top of the viewport but scrolled past
                else if (rectTop <= 0 && rectBottom > 0) {
                    activeSection = id;
                    break; // This is the active section
                }
            }
            
            if (activeSection && activeSection !== this.activeSectionId) {
                this.activeSectionId = activeSection;
                this.updateActiveTocItem();
            }
        };

        // Store the handler for cleanup
        this.scrollHandler = scrollHandler;

        // Initial check
        scrollHandler({} as Event);

        // Add scroll event listener
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    private updateActiveTocItem() {
        if (!this.activeSectionId || !isPlatformBrowser(this.platformId)) {
            return;
        }

        // Remove active class from all TOC items
        const tocLinks = document.querySelectorAll('.features-toc a');
        
        tocLinks.forEach(link => {
            link.classList.remove('td-active');
        });

        // Add active class to the corresponding TOC item
        const selector = `.features-toc a[href*="${this.activeSectionId}"]`;
        const activeLink = document.querySelector(selector);
        
        if (activeLink) {
            activeLink.classList.add('td-active');
        } else {
            console.warn('No matching TOC item found for section:', this.activeSectionId);
        }
    }

    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityFeaturesPage>(featuresPageSchemaName);
        return of(page ? new FeaturesPage(page, data) : null).pipe(
            tap((page) => {
                if (page) {
                    this.navbarItems = page.featureSections.map((section) => {
                        const children = section.featureGrids
                            .filter(grid => grid.title)
                            .map(grid => ({
                                text: grid.title!.toPlainText(),
                                href: `${this.location.path()}#${this.sanitiseGridId(section.sectionId, grid.name)}`,
                                sectionId: this.sanitiseGridId(section.sectionId, grid.name)
                            }));

                        return {
                            text: section.title.toPlainText(),
                            href: `${this.location.path()}#${section.sectionId}`,
                            sectionId: section.sectionId,
                            children: children.length > 0 ? children : undefined,
                        };
                    });

                    // Set initial active section based on URL hash
                    if (isPlatformBrowser(this.platformId) && window.location.hash) {
                        this.activeSectionId = window.location.hash.substring(1);
                        this.updateActiveTocItem();
                    }
                }
            })
        );
    }
}
