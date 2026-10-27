import { isPlatformBrowser } from "@angular/common";
import { Directive, ElementRef, Input, AfterViewChecked, inject, PLATFORM_ID } from '@angular/core';
import Prism from "prismjs";

@Directive({
  selector: '[tdSyntaxHighlight]',
  standalone: true,
})
export class SyntaxHighlightDirective implements AfterViewChecked {
  @Input({ required: true }) code = '';
  @Input({ required: true }) language = '';
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  /** What is currently painted into the DOM, so repeat view checks cost two string compares */
  private renderedCode?: string;
  private renderedLanguage?: string;

  /**
   * Prism highlights by rewriting the element's innerHTML, which detaches the text node that the
   * template's `{{ code }}` interpolation is bound to. From then on Angular's updates land on an
   * orphaned node and never reach the page, so a snippet reused across a navigation would keep
   * showing the previous page's code. This directive therefore owns the element's content: it
   * repaints whenever the inputs no longer match what it last painted. Checking after every view
   * check (rather than in ngOnChanges) keeps it correct regardless of when Angular happens to
   * update the interpolation relative to the directive's own inputs.
   */
  ngAfterViewChecked() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.renderedCode === this.code && this.renderedLanguage === this.language) return;

    const codeElement: HTMLElement | null = this.el.nativeElement.querySelector('code');
    if (!codeElement) return;

    codeElement.textContent = this.code;
    Prism.highlightElement(codeElement);
    this.renderedCode = this.code;
    this.renderedLanguage = this.language;
  }
}
