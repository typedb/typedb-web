import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, Input, AfterViewInit, OnChanges, inject } from '@angular/core';
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

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.highlight();
  }

  ngOnChanges() {
    this.highlight();
  }

  private highlight() {
    if (!this.el.nativeElement) return;

    const pre = this.document.createElement('pre');
    const codeEl = this.document.createElement('code');
    codeEl.className = `language-${this.language}`;
    codeEl.textContent = this.code;

    pre.appendChild(codeEl);
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(pre);

    Prism.highlightElement(codeEl);
  }
}
