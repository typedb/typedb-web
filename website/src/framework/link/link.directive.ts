import { Directive, ElementRef, Input, OnChanges } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

import { Link } from "typedb-web-schema";

@Directive({
    selector: "[tdLink]",
})
export class LinkDirective implements OnChanges {
    @Input("tdLink") link?: Link | string;
    private resolvedLink!: Link;

    constructor(
        private el: ElementRef<HTMLAnchorElement>,
        private router: Router,
    ) {}

    ngOnChanges() {
        if (!this.link) return;
        this.resolvedLink = typeof this.link === "string" ? Link.fromAddress(this.link) : this.link;

        switch (this.resolvedLink.type) {
            case "external":
                this.constructHrefLink();
                break;
            case "route":
                this.constructRouterLink();
                break;
        }
    }

    private constructRouterLink() {
        const [pathWithQuery, fragment] = this.resolvedLink.destination.split("#");
        const [path, query] = pathWithQuery.split("?");

        const commands = path ? [path] : [];
        const navigationExtras: NavigationExtras = {
            queryParams: Object.fromEntries(new URLSearchParams(query).entries()),
            fragment,
        };

        this.el.nativeElement.href = this.router.createUrlTree(commands, navigationExtras).toString();
        this.el.nativeElement.tabIndex = 0;
        this.el.nativeElement.addEventListener("click", (e: MouseEvent) => {
            if (e.ctrlKey || e.metaKey) {
                return; // fall back to default browser behaviour (open in new tab)
            }
            e.preventDefault();
            this.router.navigate(commands, navigationExtras);
        });
    }

    private constructHrefLink() {
        this.el.nativeElement.href = this.resolvedLink.destination;
        this.el.nativeElement.target = this.resolvedLink.opensNewTab ? "_blank" : "";
    }
}
