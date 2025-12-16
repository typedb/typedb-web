import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { Directive, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges, inject, PLATFORM_ID } from '@angular/core';
import * as Prism from 'prismjs';

@Directive({
  selector: '[tdSyntaxHighlight]',
  standalone: true,
})
export class SyntaxHighlightDirective implements AfterViewInit, OnChanges {
  @Input({ required: true }) code = '';
  @Input({ required: true }) language = '';
  private el = inject(ElementRef);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private hasRendered = false;

  ngAfterViewInit() {
    if (!this.hasRendered) {
      this.highlight();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['code'] || changes['language']) && this.hasRendered) {
      this.highlight();
    }
  }

  private highlight() {
    // Skip if not in browser
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.el.nativeElement) return;

    const pre = this.document.createElement('pre');
    const codeEl = this.document.createElement('code');
    codeEl.className = `language-${this.language}`;
    codeEl.textContent = this.code;

    pre.appendChild(codeEl);
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(pre);

    Prism.highlightElement(codeEl);
    this.hasRendered = true;
  }
}
