import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { Directive, ElementRef, Input, OnChanges, SimpleChanges, inject, PLATFORM_ID, afterNextRender } from '@angular/core';

@Directive({
  selector: '[tdSyntaxHighlight]',
  standalone: true,
})
export class SyntaxHighlightDirective implements OnChanges {
  @Input({ required: true }) code = '';
  @Input({ required: true }) language = '';
  private el = inject(ElementRef);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private hasRendered = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        if (!this.hasRendered) {
          this.highlight();
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['code'] || changes['language']) && this.hasRendered) {
      this.highlight();
    }
  }

  private highlight() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.el.nativeElement) return;

    const pre = this.document.createElement('pre');
    const codeEl = this.document.createElement('code');
    codeEl.className = `language-${this.language}`;
    codeEl.textContent = this.code;

    pre.appendChild(codeEl);
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(pre);

    const Prism = (window as any)['Prism'];
    if (Prism) {
      Prism.highlightElement(codeEl);
    }

    this.hasRendered = true;
  }
}
