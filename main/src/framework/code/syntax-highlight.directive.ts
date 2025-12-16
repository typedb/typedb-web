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
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['code'] || changes['language']) && this.hasHighlighted) {
      this.highlight();
    }
  }

  private highlight() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    } 

    const codeElement = this.el.nativeElement.querySelector('code');
    if (!codeElement) throw new Error('[SyntaxHighlightDirective] No <code> element found inside host element.');

    const Prism = (window as any)['Prism'];
    Prism.highlightElement(codeElement);

    setTimeout(() => {
      const codeElement = this.el.nativeElement.querySelector('code');
      if (codeElement) {
        Prism.highlightElement(codeElement);
      }
    }, 200);

    this.hasHighlighted = true;
  }
}
