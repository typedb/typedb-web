import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
    selector: "[tdOption]",
})
export class OptionDirective implements OnInit {
    @Input("tdOption") option?: string;

    constructor(private el: ElementRef<HTMLOptionElement>) {}

    ngOnInit() {
        if (!this.option) return;

        this.el.nativeElement.value = this.option;
        this.el.nativeElement.innerText = this.option;
    }
}
