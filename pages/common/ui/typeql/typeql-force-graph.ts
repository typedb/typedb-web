/*
 Source: https://levelup.gitconnected.com/creating-a-force-graph-using-react-d3-and-pixijs-95616051aba
 */

import * as d3 from "d3";
import * as PIXI from "pixi.js";
// @ts-ignore
import FontFaceObserver from "fontfaceobserver";
import { Viewport } from 'pixi-viewport';
import { arrowhead, midpoint, Rect, rectIncomingLineIntersect } from "./geometry";

export function runTypeQLForceGraph(container: Element, edgesData: any[], verticesData: any[]) {
    const links = edgesData.map((d) => Object.assign({}, d));
    const nodes = verticesData.map((d) => Object.assign({}, d));

    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;
    let dragged = false;

    container.innerHTML = "";

    function onDragStart(this: any, evt: any) {
        viewport.plugins.pause('drag');
        simulation.alphaTarget(0.3).restart();
        this.isDown = true;
        this.eventData = evt.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    function onDragEnd(this: any, evt: any) {
        evt.stopPropagation();
        if(!evt.active) simulation.alphaTarget(0);
        this.alpha = 1;
        this.dragging = false;
        this.isOver = false;
        this.eventData = null;
        viewport.plugins.resume('drag');
    }

    function onDragMove(this: any, gfx: any) {
        if (gfx.dragging) {
            dragged = true;
            const newPosition = gfx.eventData.getLocalPosition(gfx.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }

    const app = new PIXI.Application({ width, height, antialias: !0, backgroundAlpha: 0, resolution: 1 });
    container.appendChild(app.view);

    // create viewport
    const viewport = new Viewport({
        screenWidth: width,
        screenHeight: height,
        worldWidth: width / 10,
        worldHeight: height / 10,
        passiveWheel: false,

        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });
    const baseWidth = 660;
    if (width < baseWidth) viewport.scaled = width / baseWidth; // TODO: currently doesn't update when screen is resized and made bigger

    app.stage.addChild(viewport);

    // activate plugins
    viewport.drag({ factor: .33 })
        .pinch({ factor: .5 })
        .clampZoom({ minScale: .4, maxScale: 2.5 })
        .wheel()
        .decelerate();

    // CURRENT SIMULATION CODE
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links) // This force provides links between nodes
            .id((d: any) => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
            .distance(function(d: any) {
                var source = {
                        x: (6.6) * d.source.cx,
                        y: (3.2) * d.source.cy
                    },
                    target = {
                        x: (6.6) * d.target.cx,
                        y: (3.2) * d.target.cy
                    };

                return Math.sqrt(Math.pow(source.x - target.x, 2) + Math.pow(source.y - target.y, 2));
            })
        )
        .force("charge", d3.forceManyBody().strength(-10)) // This adds repulsion (if it's negative) between nodes.
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX().x((d: any) => 6.6 * d.cx).strength(.25))
        .force("y", d3.forceY().y((d: any) => 3.2 * d.cy).strength(.25))
        // .force("collision", d3.forceCollide().radius(30).iterations(2))
        // .velocityDecay(0.8);

    // simulation.on("end", () => {
    //     simulation.force("link", null);
    //     simulation.force("charge", null);
    //     simulation.force("center", null);
    //     simulation.force("collision", null);
    // });

    /*
     Implementation
     */

    let linksGFX = new PIXI.Graphics();
    viewport.addChild(linksGFX);

    const ubuntuMono = new FontFaceObserver("Ubuntu Mono");

    nodes.forEach((node: {text: string, gfx: PIXI.Graphics}) => {
        const boundDrag = onDragMove.bind(node);
        const { text } = node;
        node.gfx = new PIXI.Graphics();
        node.gfx.lineStyle(0);
        node.gfx.beginFill(0xFFA9E8);
        node.gfx.drawRoundedRect(-50, -16, 100, 32, 3);
        node.gfx.endFill();
        node.gfx
            // events for click
            .on('click', (e: Event) => {
                if (!dragged) {
                    e.stopPropagation();
                }
                dragged = false;
            })
            .on('mousedown', onDragStart)
            // events for drag end
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            // events for drag move
            .on('mousemove', () => boundDrag(node.gfx));

        viewport.addChild(node.gfx);

        node.gfx.interactive = true;
        node.gfx.buttonMode = true;

        // create hit area, needed for interactivity
        node.gfx.hitArea = new PIXI.RoundedRectangle(-50, -16, 100, 32, 3);

        ubuntuMono.load().then(() => {
            const text1 = new PIXI.Text(text, {
                fontSize: 16,
                fontFamily: "Ubuntu Mono",
                fill: '#09022F',
            });
            text1.anchor.set(0.5);
            text1.resolution = 2;
            node.gfx.addChild(text1);
        });
    });

    const edgeLabelStyle: Partial<PIXI.ITextStyle> = {
        fontSize: 14,
        fontFamily: "Ubuntu Mono",
        fill: '#91B3FF',
    };
    const subLabel = new PIXI.Text("sub", edgeLabelStyle);
    const subLabelMetrics = PIXI.TextMetrics.measureText("sub", subLabel.style as any);
    console.log(subLabelMetrics);

    const ticked = () => {
        nodes.forEach((node) => {
            let { x, y, gfx } = node;
            gfx.position = new PIXI.Point(x, y);
        });

        for (let i = linksGFX.children.length - 1; i >= 0; i--) {
            linksGFX.children[i].destroy();
        }

        linksGFX.clear();
        linksGFX.removeChildren();

        links.forEach((link) => {
            const { source, target } = link;
            linksGFX.lineStyle(1, 0x91B3FF);
            const sourceRect: Rect = {x: source.x - 54, y: source.y - 20, w: 108, h: 40};
            const targetRect: Rect = {x: target.x - 54, y: target.y - 20, w: 108, h: 40};
            const lineSource = rectIncomingLineIntersect(target, sourceRect);
            const lineTarget = rectIncomingLineIntersect(source, targetRect);
            if (lineSource && lineTarget) {
                // Draw edge label
                const centrePoint = midpoint({from: lineSource, to: lineTarget});
                const edgeLabel = new PIXI.Text("sub", edgeLabelStyle);
                edgeLabel.resolution = 2;
                edgeLabel.anchor.set(0.5);
                edgeLabel.position.set(centrePoint.x, centrePoint.y);
                linksGFX.addChild(edgeLabel);

                // Draw line parts
                const labelRect: Rect = {
                    x: centrePoint.x - subLabelMetrics.width / 2 - 2,
                    y: centrePoint.y - subLabelMetrics.height / 2 - 2,
                    w: subLabelMetrics.width + 4,
                    h: subLabelMetrics.height + 4,
                };
                linksGFX.moveTo(lineSource.x, lineSource.y);
                const linePart1Target = rectIncomingLineIntersect(lineSource, labelRect);
                if (linePart1Target) linksGFX.lineTo(linePart1Target.x, linePart1Target.y);
                const linePart2Source = rectIncomingLineIntersect(lineTarget, labelRect);
                if (linePart2Source) {
                    linksGFX.moveTo(linePart2Source.x, linePart2Source.y);
                    linksGFX.lineTo(lineTarget.x, lineTarget.y);
                }

                // Draw arrowhead
                const arrow = arrowhead({ from: lineSource, to: lineTarget });
                if (arrow) {
                    linksGFX.moveTo(arrow[0].x, arrow[0].y);
                    linksGFX.beginFill(0x91B3FF);
                    const points: PIXI.Point[] = [];
                    for (const pt of arrow) points.push(new PIXI.Point(pt.x, pt.y));
                    linksGFX.drawPolygon(points);
                    linksGFX.endFill();
                }
            }
        });
    }

    // Listen for tick events to render the nodes as they update in your Canvas or SVG.
    simulation.on("tick", ticked);

    return {
        destroy: () => {
            simulation.stop();
            nodes.forEach((node) => {
                node.gfx.clear();
            });
            linksGFX.clear();
        }
    };
}
