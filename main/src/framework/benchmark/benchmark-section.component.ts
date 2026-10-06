import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { BenchmarkChart, BenchmarkRow, BenchmarkSection } from "typedb-web-schema";
import { SectionCoreComponent } from "../section/section-core.component";

/** The section's text beside a card of bar charts. One segment draws a bar per row; several draw stacked bars */
@Component({
    selector: "td-benchmark-section",
    templateUrl: "benchmark-section.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [SectionCoreComponent],
})
export class BenchmarkSectionComponent {
    @Input({ required: true }) section!: BenchmarkSection;

    @HostBinding("class") readonly clazz = "section";

    isStacked(chart: BenchmarkChart): boolean {
        return chart.segments.length > 1;
    }

    summary(chart: BenchmarkChart, row: BenchmarkRow): { text: string; tone: string }[] {
        return chart.segments
            .map((segment, i) => ({ segment, value: row.values[i] }))
            .filter((x) => x.segment.summaryLabel && x.value !== undefined)
            .map((x) => ({ text: `${this.format(x.value)} ${x.segment.summaryLabel}`, tone: x.segment.tone }));
    }

    describe(chart: BenchmarkChart, row: BenchmarkRow): string {
        return `${row.label}: ` + chart.segments.map((x, i) => `${x.name} ${this.format(row.values[i] || 0)}`).join(", ");
    }

    format(value: number): string {
        return `${value}%`;
    }
}
