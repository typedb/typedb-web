import { isPlatformBrowser } from "@angular/common";
import { Directive, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges, inject, PLATFORM_ID } from '@angular/core';

@Directive({
  selector: '[tdSyntaxHighlight]',
  standalone: true,
})
export class SyntaxHighlightDirective implements AfterViewInit, OnChanges {
  @Input({ required: true }) code = '';
  @Input({ required: true }) language = '';
  private el = inject(ElementRef);
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
    if (!isPlatformBrowser(this.platformId)) return;

    const codeElement = this.el.nativeElement.querySelector('code');
    if (!codeElement) return;

    const Prism = (window as any)['Prism'];
    if (Prism) {
      Prism.highlightElement(codeElement);
    }

    this.hasHighlighted = true;
  }
}
