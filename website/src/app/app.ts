import { afterNextRender, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'td-typedb-web',
    imports: [CommonModule, RouterOutlet],
    template: "<router-outlet/>",
})
export class App {
    title = 'angular-routing';
    footerUrl = 'https://www.ganatan.com';
    footerLink = 'www.ganatan.com';

    constructor() {
        afterNextRender(() => {
            console.info("Hello World");
            const navMain = document.getElementById('navbarCollapse');
            if (navMain) {
                navMain.onclick = function onClick() {
                    if (navMain) {
                        navMain.classList.remove("show");
                    }
                }
            }
        });
    }
}