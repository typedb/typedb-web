import { Directive, ElementRef, Input, AfterViewInit, OnChanges } from '@angular/core';
import * as Prism from 'prismjs';

@Directive({
  selector: '[tdSyntaxHighlight]',
  standalone: true,
})
export class SyntaxHighlightDirective implements AfterViewInit, OnChanges {
  @Input({ required: true }) code = '';
  @Input({ required: true }) language = '';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.highlight();
  }

  ngOnChanges() {
    this.highlight();
  }

  private highlight() {
    if (!this.el.nativeElement) return;

    const pre = document.createElement('pre');
    const codeEl = document.createElement('code');
    codeEl.className = `language-${this.language}`;
    codeEl.textContent = this.code.trim();

    pre.appendChild(codeEl);
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(pre);

    Prism.highlightElement(codeEl);
  }
}
