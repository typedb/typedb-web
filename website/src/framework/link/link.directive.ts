import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Link } from "typedb-web-schema";

@Directive({
    selector: "[tdLink]",
})
export class LinkDirective implements OnInit {
    @Input("tdLink") link!: Link;

    constructor(private el: ElementRef<HTMLAnchorElement>, private router: Router) {}

    ngOnInit() {
        switch (this.link.type) {
            case "autoDetect":
                try {
                    new URL(this.link.destination);
                    this.constructHrefLink(this.el);
                } catch {
                    this.constructRouterLink(this.el);
                }
                break;
            case "external":
                this.constructHrefLink(this.el);
                break;
            case "route":
                this.constructRouterLink(this.el);
                break;
        }
    }

    constructRouterLink(el: ElementRef<HTMLAnchorElement>) {
        el.nativeElement.addEventListener("click", () => {
            this.router.navigate([this.link.destination]);
        });
    }

    constructHrefLink(el: ElementRef<HTMLAnchorElement>) {
        el.nativeElement.href = this.link.destination;
        el.nativeElement.target = this.link.opensNewTab ? "_blank" : "";
    }
}
