import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { CodeAdmonition } from "typedb-web-schema";

/** A note rendered directly beneath a code snippet's last line, e.g. the error the code produces */
@Component({
    selector: "td-code-admonition",
    template: `
        @if (admonition.title) {
            <div class="ca-title">{{ admonition.title }}</div>
        }
        <div class="ca-text">{{ admonition.text }}</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CodeAdmonitionComponent {
    @Input({ required: true }) admonition!: CodeAdmonition;

    @HostBinding("class") get clazz() {
        return `ca-${this.admonition.variant}`;
    }

    @HostBinding("attr.role") get role() {
        return this.admonition.variant === "info" ? "note" : "alert";
    }
}
