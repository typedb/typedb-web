import {Component, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'page-container',
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent {
    @Input() topBarTemplateRef!: TemplateRef<any>;
    @Input() sideBarTemplateRef!: TemplateRef<any>;
}
