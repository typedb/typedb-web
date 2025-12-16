import { isPlatformBrowser } from "@angular/common";
import { Directive, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges, inject, PLATFORM_ID, afterNextRender, ApplicationRef } from '@angular/core';
import { filter, first } from "rxjs";

@Directive({
  selector: '[tdSyntaxHighlight]',
  standalone: true,
})
export class SyntaxHighlightDirective implements AfterViewInit, OnChanges {
  @Input({ required: true }) code = '';
  @Input({ required: true }) language = '';
  private el = inject(ElementRef);
  private appRef = inject(ApplicationRef);
  private platformId = inject(PLATFORM_ID);
  private hasHighlighted = false;

  ngAfterViewInit() {
    this.highlight();
    console.log('[SyntaxHighlightDirective] AfterViewInit highlight called.');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['code'] || changes['language']) && this.hasHighlighted) {
      console.log('[SyntaxHighlightDirective] Input changed, re-highlighting code block.');
      this.highlight();
    } else {
      console.log('[SyntaxHighlightDirective] Skipping highlight on initial input set.');
    }
  }

  private highlight() {
    if (!isPlatformBrowser(this.platformId)) return;

    const codeElement = this.el.nativeElement.querySelector('code');
    if (!codeElement) throw new Error('[SyntaxHighlightDirective] No <code> element found inside host element.');

    this.appRef.isStable.pipe(filter(x => x), first()).subscribe(() => {
      const Prism = (window as any)['Prism'];
      Prism.highlightElement(codeElement);
      console.log('[SyntaxHighlightDirective] Highlighted code block.');
    });

    this.hasHighlighted = true;
  }
}
