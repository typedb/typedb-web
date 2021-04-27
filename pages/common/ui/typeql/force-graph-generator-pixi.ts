import * as d3 from "d3";
import * as PIXI from "pixi.js";
// @ts-ignore
import FontFaceObserver from "fontfaceobserver";
import { Viewport } from 'pixi-viewport';
import { arrowhead, Point, Rect, rectIncomingLineIntersect } from "./geometry";

export function runForceGraphPixi(container: Element, linksData: any[], nodesData: any[], nodeHoverTooltip: any) {
    const links = linksData.map((d) => Object.assign({}, d));
    const nodes = nodesData.map((d) => Object.assign({}, d));

    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;
    let dragged = false;

    container.innerHTML = "";

    // Add the tooltip element to the graph
    const tooltip = document.querySelector("#graph-tooltip");
    if (!tooltip) {
        const tooltipDiv = document.createElement("div");
        // tooltipDiv.classList.add(classes.tooltip);
        tooltipDiv.style.opacity = "0";
        tooltipDiv.id = "graph-tooltip";
        document.body.appendChild(tooltipDiv);
    }
    const div = d3.select("#graph-tooltip");

    const addTooltip = (hoverTooltip: any, d: { name: any; }, x: any, y: number) => {
        div
            .transition()
            .duration(200)
            .style("opacity", 0.9);
        div
            .html(hoverTooltip(d))
            .style("left", `${x}px`)
            .style("top", `${y - 28}px`);
    };

    const removeTooltip = () => {
        div.transition().duration(200).style("opacity", 0);
    };

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
        worldWidth: width * 4,
        worldHeight: height * 4,
        passiveWheel: false,

        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    app.stage.addChild(viewport);

    // activate plugins
    viewport.drag().pinch().wheel().decelerate().clampZoom({ minWidth: width / 4, minHeight: height / 4 });

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links) // This force provides links between nodes
            .id((d: any) => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
            .distance(70)
        )
        .force("charge", d3.forceManyBody().strength(-100)) // This adds repulsion (if it's negative) between nodes.
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(70).iterations(2))
        .velocityDecay(0.8);

    /*
     Implementation
     */

    let visualLinks = new PIXI.Graphics();
    viewport.addChild(visualLinks);

    nodes.forEach((node: {name: string, gfx: PIXI.Graphics}) => {
        const boundDrag = onDragMove.bind(node);
        const { name } = node;
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

        // show tooltip when mouse is over node
        node.gfx.on('mouseover', (mouseData: any) => {
            addTooltip(nodeHoverTooltip,
                { name },
                mouseData.data.originalEvent.pageX,
                mouseData.data.originalEvent.pageY
            );
        });

        // make circle half-transparent when mouse leaves
        node.gfx.on('mouseout',() => {
            removeTooltip();
        });

        const font = new FontFaceObserver("Ubuntu Mono");
        font.load().then(() => {
            const text = new PIXI.Text(name, {
                fontSize: 16,
                fontFamily: "Ubuntu Mono",
                fill: '#09022F',
            });
            text.anchor.set(0.5);
            text.resolution = 2;
            node.gfx.addChild(text);
        });
    });

    const ticked = () => {
        nodes.forEach((node) => {
            let { x, y, gfx } = node;
            gfx.position = new PIXI.Point(x, y);
        });

        for (let i = visualLinks.children.length - 1; i >= 0; i--) {
            visualLinks.children[i].destroy();
        }

        visualLinks.clear();
        visualLinks.removeChildren();
        visualLinks.alpha = 1;

        links.forEach((link) => {
            const { source, target } = link;
            visualLinks.lineStyle(1, 0x91B3FF);
            visualLinks.moveTo(source.x, source.y);
            const targetRect: Rect = {x: target.x - 50, y: target.y - 16, w: 100, h: 32};
            const lineTarget: Point | false = rectIncomingLineIntersect(source, targetRect);
            if (lineTarget) {
                visualLinks.lineTo(lineTarget.x, lineTarget.y);
                const arrow = arrowhead({ from: source, to: lineTarget });
                if (arrow) {
                    console.log(arrow);
                    visualLinks.moveTo(arrow[0].x, arrow[0].y);
                    visualLinks.beginFill(0x91B3FF);
                    const points: PIXI.Point[] = [];
                    for (const pt of arrow) points.push(new PIXI.Point(pt.x, pt.y));
                    visualLinks.drawPolygon(points);
                    visualLinks.endFill();
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
            visualLinks.clear();
        }
    };
}
