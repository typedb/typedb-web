import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Link } from "typedb-web-schema";

@Directive({
    selector: "[tdLink]",
})
export class LinkDirective implements OnInit {
    @Input("tdLink") link?: Link;

    constructor(private el: ElementRef<HTMLAnchorElement>, private router: Router) {}

    ngOnInit() {
        if (!this.link) return;

        switch (this.link.type) {
            case "external":
                this.constructHrefLink(this.el);
                break;
            case "route":
                this.constructRouterLink(this.el);
                break;
        }
    }

    constructRouterLink(el: ElementRef<HTMLAnchorElement>) {
        el.nativeElement.tabIndex = 0;
        const [path, query] = this.link!.destination.split("?");
        if (path) {
            el.nativeElement.href = this.link!.destination;
        } else {
            el.nativeElement.href = `?${query}`;
        }
        el.nativeElement.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            if (!query) {
                this.router.navigate([this.link!.destination]);
            } else {
                const queryParams = Object.fromEntries(new URLSearchParams(query).entries());
                if (!path) {
                    this.router.navigate([], { queryParams });
                } else {
                    this.router.navigate([path], { queryParams });
                }
            }
        });
    }

    constructHrefLink(el: ElementRef<HTMLAnchorElement>) {
        el.nativeElement.href = this.link!.destination;
        el.nativeElement.target = this.link!.opensNewTab ? "_blank" : "";
    }
}
