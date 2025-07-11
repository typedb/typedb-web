
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

import { Lecture, LinkPanel, ResourceLink } from "typedb-web-schema";

import { AspectRatioComponent } from "../aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../button/button.component";
import { LinkDirective } from "../link/link.directive";
import { PlainTextPipe } from "../text/plain-text.pipe";
import { RichTextComponent } from "../text/rich-text.component";
import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-link-panels",
    templateUrl: "link-panels.component.html",
    styleUrls: ["link-panels.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LinkDirective, RichTextComponent]
})
export class LinkPanelsComponent {
    @Input() panels!: LinkPanel[];
    @Input({ required: true }) sectionId!: string;
    @HostBinding("class") clazz = "section";

    panelID(panel: LinkPanel) {
        return `${this.sectionId}_${sanitiseHtmlID(panel.title)}`;
    }
}

@Component({
    selector: "td-resource-panels",
    templateUrl: "resource-panels.component.html",
    styleUrls: ["resource-panels.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LinkDirective, RichTextComponent]
})
export class ResourcePanelsComponent {
    @Input() resources!: ResourceLink[];
    @Input() cols!: 3 | 4;
    @Input({ required: true }) sectionId!: string;

    panelID(resource: ResourceLink) {
        return `${this.sectionId}_${sanitiseHtmlID(resource.title)}`;
    }
}

@Component({
    selector: "td-resource-panels-cols-2",
    templateUrl: "link-panels-cols-2.component.html",
    styleUrls: ["link-panels-cols-2.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LinkDirective, RichTextComponent]
})
export class LinkPanelsCols2Component {
    @Input() resources!: ResourceLink[];
    @Input({ required: true }) sectionId!: string;

    panelID(resource: ResourceLink) {
        return `${this.sectionId}_${sanitiseHtmlID(resource.title)}`;
    }
}

@Component({
    selector: "td-lecture-panels",
    templateUrl: "lecture-panels.component.html",
    styleUrls: ["lecture-panels.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LinkDirective, AspectRatioComponent, ButtonComponent, PlainTextPipe]
})
export class LecturePanelsComponent {
    @Input() lectures!: Lecture[];
    @Input({ required: true }) sectionId!: string;

    private _hoveredPanels = new Map<Lecture, boolean>();

    setPanelHovered(panel: Lecture, value: boolean) {
        this._hoveredPanels.set(panel, value);
    }

    isPanelHovered(panel: Lecture) {
        return this._hoveredPanels.get(panel) === true;
    }

    panelID(lecture: Lecture) {
        return `${this.sectionId}_${lecture.title.toSectionID()}`;
    }
}
