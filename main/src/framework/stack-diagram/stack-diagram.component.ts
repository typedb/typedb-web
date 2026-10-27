import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";
import { StackDiagram } from "typedb-web-schema";

/** Two or more stacks side by side, showing where something sits in each product's architecture */
@Component({
    selector: "td-stack-diagram",
    templateUrl: "stack-diagram.component.html",
    styleUrl: "stack-diagram.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class StackDiagramComponent {
    @Input({ required: true }) diagram!: StackDiagram;
}
