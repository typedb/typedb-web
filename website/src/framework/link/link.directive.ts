import { Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Link } from "typedb-web-schema";

@Directive({
    selector: "[tdLink]",
})
export class LinkDirective implements OnInit {
    @Input("tdLink") link?: Link;
    path!: string;
    query!: string;

    constructor(private el: ElementRef<HTMLAnchorElement>, private _router: Router) {}

    ngOnInit() {
        if (!this.link) return;

        const [path, query] = this.link!.destination.split("?");
        this.path = path;
        this.query = query;

        switch (this.link.type) {
            case "external":
                this.constructHrefLink();
                break;
            case "route":
                this.constructRouterLink();
                break;
        }

        this._router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                this.updateHTMLElementHref();
            }
        });
    }

    constructRouterLink() {
        this.el.nativeElement.tabIndex = 0;
        this.updateHTMLElementHref();
        this.el.nativeElement.addEventListener("click", (e: MouseEvent) => {
            if (e.ctrlKey || e.metaKey) {
                return; // fall back to default browser behaviour (open in new tab)
            }
            e.preventDefault();
            if (!this.query) {
                this._router.navigate([this.link!.destination]);
            } else {
                const queryParams = Object.fromEntries(new URLSearchParams(this.query).entries());
                if (!this.path) {
                    this._router.navigate([], { queryParams });
                } else {
                    this._router.navigate([this.path], { queryParams });
                }
            }
        });
    }

    updateHTMLElementHref() {
        if (this.path) {
            this.el.nativeElement.href = this.link!.destination;
        } else {
            this.el.nativeElement.href = `${this._router.url}?${this.query}`;
        }
    }

    constructHrefLink() {
        this.el.nativeElement.href = this.link!.destination;
        this.el.nativeElement.target = this.link!.opensNewTab ? "_blank" : "";
    }
}
