export class ParagraphWithHighlights {
    readonly spans: { text: string, highlight: boolean }[];

    constructor(data: any) {
        this.spans = (data[0].children as any[])
            .filter(block => block._type === "span")
            .map(block => ({ text: block.text as string, highlight: (block.marks as string[]).includes("strong") }));
    }
}
