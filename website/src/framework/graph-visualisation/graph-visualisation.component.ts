import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild } from "@angular/core";
import { GraphVisualisation } from "typedb-web-schema";
import * as d3 from "d3-force";
// pixi.js-legacy 7.x causes an issue where dragging stops at the edge of the visualisation, which is not a nice UX
// pixi.js (non-legacy) causes an issue where all text is blurred
import * as PIXI from "pixi.js-legacy";
// @ts-ignore
import FontFaceObserver from "fontfaceobserver";
import { arrowhead, diamondIncomingLineIntersect, Ellipse, ellipseIncomingLineIntersect, midpoint, Point, Rect, rectIncomingLineIntersect } from "./geometry";
import { defaultGraphVisualisationTheme, defaultStyles, GraphVisualisationTheme } from "./theme";
import VertexEncoding = GraphVisualisation.VertexEncoding;

@Component({
    selector: "td-graph-visualisation",
    templateUrl: "graph-visualisation.component.html",
    styleUrls: ["graph-visualisation.component.scss"],
})
export class GraphVisualisationComponent implements AfterViewInit, OnDestroy {
    @Input() graph!: GraphVisualisation;
    @ViewChild("graphContainer") graphContainerEl!: ElementRef<HTMLElement>;
    onDestroy?: () => any;

    constructor(private _ngZone: NgZone) {}

    ngAfterViewInit() {
        const testGraph = new GraphVisualisation({
            id: "123",
            vertices: [{ label: "test", x: 100, y: 100, encoding: "entity", id: 1 }],
            edges: [],
        });
        this.onDestroy = this._ngZone.runOutsideAngular(() => {
            return renderGraph(this.graphContainerEl.nativeElement, this.graph, defaultGraphVisualisationTheme).destroy;
        });
    }

    ngOnDestroy() {
        if (this.onDestroy) this.onDestroy();
    }
}

/*
 Source: https://levelup.gitconnected.com/creating-a-force-graph-using-react-d3-and-pixijs-95616051aba
 */
type ForceGraphVertex = d3.SimulationNodeDatum & GraphVisualisation.Vertex;
type ForceGraphEdge = d3.SimulationLinkDatum<ForceGraphVertex> & GraphVisualisation.Edge;

declare namespace Renderer {
    export type Edge = ForceGraphEdge & { labelGFX?: PIXI.Text };
    export type VertexGFX = PIXI.Graphics & { vertex?: Vertex };
    export type Vertex = ForceGraphVertex & { gfx?: VertexGFX, width: number, height: number };
}

const edgeLabelMetrics: {[label: string]: PIXI.TextMetrics} = {};
const edgeLabelStyle: Partial<PIXI.ITextStyle> = {
    fontSize: defaultStyles.edgeLabel.fontSize,
    fontFamily: defaultStyles.fontFamily,
};

export function renderVertex(vertex: Renderer.Vertex, useFallbackFont: boolean, theme: GraphVisualisationTheme) {
    vertex.gfx = new PIXI.Graphics();
    vertex.gfx.lineStyle(0);
    const colors = theme.colors.numeric;
    vertex.gfx.beginFill(colors.vertexBackground);

    // TODO: Maybe, instead of repeating this work for each vertex, we should do it once and create a shared image to reuse
    switch (vertex.encoding) {
        case "entity":
            vertex.gfx.drawRoundedRect(-vertex.width / 2, -vertex.height / 2, vertex.width, vertex.height, 3);
            vertex.gfx.hitArea = new PIXI.RoundedRectangle(-vertex.width / 2, -vertex.height / 2, vertex.width, vertex.height, 3);
            break;
        case "relation":
            const leftArc = { x: 8, y: 4, r: 6 };
            const topArc = { x: 6, y: 3, r: 6 };
            vertex.gfx.moveTo(-vertex.width / 2 + leftArc.x, -leftArc.y);
            vertex.gfx.lineTo(-topArc.x, -vertex.height / 2 + topArc.y);
            vertex.gfx.arcTo(0, -vertex.height / 2, topArc.x, -vertex.height / 2 + topArc.y, topArc.r);
            vertex.gfx.lineTo(vertex.width / 2 - leftArc.x, -leftArc.y);
            vertex.gfx.arcTo(vertex.width / 2, 0, vertex.width / 2 - leftArc.x, leftArc.y, leftArc.r);
            vertex.gfx.lineTo(topArc.x, vertex.height / 2 - topArc.y);
            vertex.gfx.arcTo(0, vertex.height / 2, -topArc.x, vertex.height / 2 - topArc.y, topArc.r);
            vertex.gfx.lineTo(-vertex.width / 2 + leftArc.x, leftArc.y);
            vertex.gfx.arcTo(-vertex.width / 2, 0, -vertex.width / 2 + leftArc.x, -leftArc.y, leftArc.r);
            vertex.gfx.hitArea = new PIXI.Polygon([
                new PIXI.Point(-vertex.width / 2, 0),
                new PIXI.Point(0, -vertex.height / 2),
                new PIXI.Point(vertex.width / 2, 0),
                new PIXI.Point(0, vertex.height / 2)
            ]);
            break;
        case "attribute":
            vertex.gfx.drawEllipse(0, 0, vertex.width / 2, vertex.height / 2);
            vertex.gfx.hitArea = new PIXI.Ellipse(0, 0, vertex.width / 2, vertex.height / 2);
            break;
    }
    vertex.gfx.endFill();

    renderVertexLabel(vertex, useFallbackFont, theme);
}

export function renderVertexLabel(vertex: Renderer.Vertex, useFallbackFont: boolean, theme: GraphVisualisationTheme) {
    const colors = theme.colors.numeric;
    const text1 = new PIXI.Text(vertex.label, {
        fontSize: defaultStyles.vertexLabel.fontSize,
        fontFamily: useFallbackFont ? defaultStyles.fontFamilyFallback : defaultStyles.fontFamily,
        fill: colors[vertex.encoding],
    });
    text1.anchor.set(0.5);
    text1.resolution = window.devicePixelRatio;
    vertex.gfx!.addChild(text1 as any);
}

export function renderEdge(edge: Renderer.Edge, edgesGFX: PIXI.Graphics, theme: GraphVisualisationTheme) {
    const [source, target] = [edge.source as unknown as Renderer.Vertex, edge.target as unknown as Renderer.Vertex];
    const [lineSource, lineTarget] = [edgeEndpoint(target, source), edgeEndpoint(source, target)];
    const colors = theme.colors.numeric;
    const edgeColor = edge.highlight ? colors[edge.highlight] : colors.edge;

    if (lineSource && lineTarget && edgeLabelMetrics[edge.label]) {
        const { label } = edge;
        edgesGFX.lineStyle(1, edgeColor);
        const centrePoint = midpoint({ from: lineSource, to: lineTarget });
        const labelRect: Rect = {
            x: centrePoint.x - edgeLabelMetrics[label].width / 2 - 2,
            y: centrePoint.y - edgeLabelMetrics[label].height / 2 - 2,
            w: edgeLabelMetrics[label].width + 4,
            h: edgeLabelMetrics[label].height + 4,
        };
        if (edge.labelGFX) edge.labelGFX.position.set(centrePoint.x, centrePoint.y);
        edgesGFX.moveTo(lineSource.x, lineSource.y);
        const linePart1Target = rectIncomingLineIntersect(lineSource, labelRect);
        if (linePart1Target) edgesGFX.lineTo(linePart1Target.x, linePart1Target.y);
        const linePart2Source = rectIncomingLineIntersect(lineTarget, labelRect);
        if (linePart2Source) {
            edgesGFX.moveTo(linePart2Source.x, linePart2Source.y);
            edgesGFX.lineTo(lineTarget.x, lineTarget.y);
        }

        // Draw arrowhead
        const arrow = arrowhead({ from: lineSource, to: lineTarget });
        if (arrow) {
            edgesGFX.moveTo(arrow[0].x, arrow[0].y);
            edgesGFX.beginFill(edgeColor);
            const points: PIXI.Point[] = [];
            for (const pt of arrow) points.push(new PIXI.Point(pt.x, pt.y));
            edgesGFX.drawPolygon(points);
            edgesGFX.endFill();
        }
    }
}

export function computeEdgeLabelMetrics(edge: Renderer.Edge) {
    if (!edgeLabelMetrics[edge.label]) {
        const linkLabel = new PIXI.Text(edge.label, edgeLabelStyle);
        edgeLabelMetrics[edge.label] = PIXI.TextMetrics.measureText(edge.label, linkLabel.style as any);
    }
}

export function renderEdgeLabel(edge: Renderer.Edge, useFallbackFont: boolean, theme: GraphVisualisationTheme) {
    const fontFamily = useFallbackFont ? defaultStyles.fontFamilyFallback : defaultStyles.fontFamily;

    const text1 = new PIXI.Text(edge.label, {
        fontSize: defaultStyles.edgeLabel.fontSize,
        fontFamily,
        fill: edge.highlight ? theme.colors.numeric[edge.highlight] : theme.colors.numeric.edge,
    });
    text1.anchor.set(0.5);
    text1.resolution = window.devicePixelRatio;
    edge.labelGFX = text1;
}

/*
 * Find the endpoint of an edge drawn from `source` to `target`
 */
export function edgeEndpoint(source: Renderer.Vertex, target: Renderer.Vertex): false | {x: number, y: number} {
    switch (target.encoding) {
        case "entity":
        case "relation":
            const targetRect: Rect = {
                x: target.x - target.width / 2 - 4, y: target.y - target.height / 2 - 4,
                w: target.width + 8, h: target.height + 8
            };
            if (["entity", "entityType", "thingType"].includes(target.encoding)) {
                return rectIncomingLineIntersect(source as Point, targetRect);
            } else {
                return diamondIncomingLineIntersect(source as Point, targetRect);
            }
        case "attribute":
            const targetEllipse: Ellipse = { x: target.x, y: target.y, hw: target.width / 2 + 2, hh: target.height / 2 + 2 };
            return ellipseIncomingLineIntersect(source as Point, targetEllipse);
    }
}

function createD3ForceSimulation(vertices: Renderer.Vertex[], edges: Renderer.Edge[], width: number, height: number) {
    const vertexTargetPositions = vertices.map(x => ({ x: x.x, y: x.y }));
    const simulation = d3.forceSimulation(vertices)
        .force("link", d3.forceLink(edges) // This force provides links between nodes
            .id((d: any) => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
            .distance(function (d: any) {
                const source = {
                        x: width * d.source.x / 100,
                        y: height * d.source.y / 100,
                    },
                    target = {
                        x: width * d.target.x / 100,
                        y: height * d.target.y / 100,
                    };

                return Math.sqrt(Math.pow(source.x - target.x, 2) + Math.pow(source.y - target.y, 2));
            })
        )
        .force("collide", d3.forceCollide(65))
        .force("charge", d3.forceManyBody().strength(-100)) // This adds repulsion (if it's negative) between nodes.
        .force("x1", d3.forceX().x((d: any) => width * d.x / 100).strength(1)).force("x2", d3.forceX().x((d: any) => width * d.x / 100).strength(1))
        .force("y1", d3.forceY().y((d: any) => height * d.y / 100).strength(1)).force("y2", d3.forceY().y((d: any) => height * d.y / 100).strength(1))
        .force("x3", d3.forceX().x((d: any) => width * d.x / 100).strength(.33))
        .force("y3", d3.forceY().y((d: any) => height * d.y / 100).strength(.33))
        .velocityDecay(0.8);

    vertices.forEach((vertex, idx) => {
        vertex.x = vertexTargetPositions[idx].x * width / 100;
        vertex.y = vertexTargetPositions[idx].y * height / 100;
    });
    return simulation;
}

const vertexSize: { [encoding in VertexEncoding]: { width: number, height: number } } = {
    entity: { width: 125, height: 40 },
    relation: { width: 100, height: 62},
    attribute: { width: 125, height: 40 },
}

export function renderGraph(container: HTMLElement, graphData: GraphVisualisation, theme: GraphVisualisationTheme) {
    const [width, height] = [container.offsetWidth, container.offsetHeight];
    const edges: Renderer.Edge[] = graphData.edges.map((d) => Object.assign({}, d));
    const vertices: Renderer.Vertex[] = graphData.vertices.map((d) => Object.assign({}, d, vertexSize[d.encoding])) as any;
    let dragged = false;

    PIXI.settings.ROUND_PIXELS = true;
    const app = new PIXI.Application({ width, height, autoDensity: true, backgroundAlpha: 0, resolution: devicePixelRatio });
    container.innerHTML = "";
    container.appendChild(app.view as any);

    const simulation = createD3ForceSimulation(vertices, edges, width, height);
    const ubuntuMono = new FontFaceObserver("Ubuntu Mono") as { load: () => Promise<any> };

    function onDragStart(this: any, evt: any) {
        simulation.alphaTarget(0.3).restart();
        this.isDown = true;
        this.eventData = evt.data;
        this.alpha = 0.75;
        this.dragging = true;
        console.log(this);
    }

    function onDragEnd(this: any, gfx: any) {
        simulation.alphaTarget(0);
        gfx.alpha = 1;
        gfx.dragging = false;
        gfx.isOver = false;
        gfx.eventData = null;
        delete this.fx;
        delete this.fy;
    }

    function onDragMove(this: any, gfx: any) {
        if (gfx.dragging) {
            dragged = true;
            const newPosition = gfx.eventData.getLocalPosition(gfx.parent);
            this.fx = newPosition.x;
            this.fy = newPosition.y;
        }
    }

    const edgesGFX = new PIXI.Graphics();
    renderGraphElements();

    async function renderGraphElements() {
        let useFallbackFont = false;
        try {
            await ubuntuMono.load();
        } catch (e) {
            useFallbackFont = true;
        }

        app.stage.addChild(edgesGFX as any);

        edges.forEach((edge) => {
            computeEdgeLabelMetrics(edge);
            renderEdgeLabel(edge, useFallbackFont, theme);
            app.stage.addChild(edge.labelGFX! as any);
        });

        vertices.forEach((vertex) => {
            const boundDragMove = onDragMove.bind(vertex);
            const boundDragEnd = onDragEnd.bind(vertex);
            renderVertex(vertex, useFallbackFont, theme);

            vertex.gfx!
                .on('click', (e: Event) => {
                    if (!dragged) {
                        e.stopPropagation();
                    }
                    dragged = false;
                })
                .on('mousedown', onDragStart)
                .on('mouseup', () => boundDragEnd(vertex.gfx))
                .on('mouseupoutside', () => boundDragEnd(vertex.gfx))
                .on('mousemove', () => boundDragMove(vertex.gfx));
            vertex.gfx!.interactive = true;
            vertex.gfx!.buttonMode = true;

            app.stage.addChild(vertex.gfx! as any);
        });
    }

    const onTick = () => {
        vertices.forEach((vertex) => {
            let { x, y, gfx } = vertex;
            // console.log(`Setting vertex position to {${x}, ${y}`);
            gfx?.position.set(x, y);
        });

        for (let i = edgesGFX.children.length - 1; i >= 0; i--) {
            edgesGFX.children[i].destroy();
        }

        edgesGFX.clear();
        edgesGFX.removeChildren();
        edges.forEach((edge) => {
            renderEdge(edge, edgesGFX, theme);
        });
    }

    // Listen for tick events to render the nodes as they update in your Canvas or SVG.
    simulation.on("tick", onTick);

    return {
        destroy: () => {
            simulation.stop();
            vertices.forEach((vertex) => {
                vertex.gfx?.clear();
            });
            edgesGFX.clear();
            app.destroy();
        }
    };
}
