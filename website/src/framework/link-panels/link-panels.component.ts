import { NgFor, NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { Lecture, LinkPanelWithIcon, ResourceLink } from "typedb-web-schema";

import { AspectRatioComponent } from "../aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../button/button.component";
import { LinkDirective } from "../link/link.directive";
import { PlainTextPipe } from "../text/plain-text.pipe";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-link-panels",
    templateUrl: "link-panels.component.html",
    styleUrls: ["link-panels.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, LinkDirective, NgIf, RichTextComponent],
})
export class LinkPanelsComponent {
    @Input() panels!: LinkPanelWithIcon[];
}

@Component({
    selector: "td-resource-panels",
    templateUrl: "resource-panels.component.html",
    styleUrls: ["link-panels.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgSwitch, NgSwitchCase, NgFor, LinkDirective, NgIf, RichTextComponent],
})
export class ResourcePanelsComponent {
    @Input() resources!: ResourceLink[];
    @Input() cols!: 3 | 4;
}

@Component({
    selector: "td-resource-panels-cols-2",
    templateUrl: "link-panels-cols-2.component.html",
    styleUrls: ["link-panels-cols-2.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, LinkDirective, RichTextComponent],
})
export class LinkPanelsCols2Component {
    @Input() resources!: ResourceLink[];
}

@Component({
    selector: "td-lecture-panels",
    templateUrl: "lecture-panels.component.html",
    styleUrls: ["lecture-panels.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, LinkDirective, NgIf, AspectRatioComponent, ButtonComponent, PlainTextPipe],
})
export class LecturePanelsComponent {
    @Input() lectures!: Lecture[];

    private _hoveredPanels = new Map<Lecture, boolean>();

    setPanelHovered(panel: Lecture, value: boolean) {
        this._hoveredPanels.set(panel, value);
    }

    isPanelHovered(panel: Lecture) {
        return this._hoveredPanels.get(panel) === true;
    }
}
