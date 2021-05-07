/*
 Source: https://levelup.gitconnected.com/creating-a-force-graph-using-react-d3-and-pixijs-95616051aba
 */

import * as d3 from "d3";
import * as PIXI from "pixi.js";
// @ts-ignore
import FontFaceObserver from "fontfaceobserver";
import { Viewport } from 'pixi-viewport';
import { arrowhead, midpoint, Rect, rectIncomingLineIntersect } from "./geometry";

const forceGraph = {

    _data: {
        graphs: {},
        maxNodeRadius: 60,
            minEdgeFont: 8,
            maxEdgeFont: 12,
            minNodeFont: 8,
            maxNodeFont: 12,
            nodePadding: 5,
            colors: {
            'default':       '#bbbcbc',
                'instance':      '#a1d884',
                'entity-type':  '#ff7878',
                'relation':      '#77dd77',
                'relation-type': '#bfc0d1',
                'resource':      '#a1d884',
                'resource-type': '#ff7878',
                'role-type':     '#ffb96d',
                'meta':          '#5bc2e7',
                'dark-bg':       '#383838',
                'light-bg':      '#ffffff'
        }
    },

    /**
     * Changes the font size depending pn the viewport size
     *
     * @param {string} graphName - The graph name to resize
     * @param {object} svgElement - The svg element with the text
     * @param {string} type - The SVG object type, either node or edge
     */

    resizeFont: function(graphName: any, svgElement: { r: number; }, type: "Node" | "Edge") {
        var data = this._data,
            newStyle = [],
            fontSize = null;

        switch(type) {
            case 'Node':
                fontSize = this.getBiggerSide(graphName)/100 * svgElement.r/8;
                break;
            case 'Edge':
                fontSize = this.getBiggerSide(graphName)/100 * 1.3;
                break;
        }

        // @ts-ignore
        if (fontSize > data['max' + type + 'Font']) {
            // @ts-ignore
            fontSize = data['max' + type + 'Font'];
        }

        newStyle.push('font-size: ' + fontSize + 'px;');

        /*if (postRender && fontSize < data['min' + type + 'Font']) {
            newStyle.push('display: none;');
        }*/

        return newStyle.join(' ');
    },

    /**
     * Stops updating the graph. Used when the graph is not visible
     *
     * @param {string} pointer - The graph name to stop
     */

    stop: function(pointer: string | number) {
        // @ts-ignore
        this._data.graphs[pointer].force.stop();
    },

    /**
     * Forces graph to redraw. Used when the viewport has changed
     *
     * @param {string} pointer - The graph name to redraw
     */

    redraw: function(pointer: string) {

        var _this = this,
            graphs: any = this._data.graphs,
            graph: any = null;

        for (var key in graphs) {
            if (pointer && pointer !== key) {
                continue;
            }

            graph = graphs[key];

            graph.width = graph.container[0][0].offsetWidth;
            graph.height = graph.container[0][0].offsetHeight;
            graph.container.select('svg').attr({
                'width': graph.width,
                'height': graph.height
            });

            if (!graph.nodeLabelsInitialised) {
                setTimeout(function() {
                    graph.svg
                        .selectAll('.nodelabel')
                        .attr({
                            'style': function(d: { r: number; }) {
                                return _this.resizeFont(key, d, 'Node');
                            },
                            'lable-width': function(d: { r: number; }) {
                                return (_this.getBiggerSide(key)/100 * d.r) / Math.sqrt(2);
                            }
                        })
                        // .call(_this.wrap);

                    graph.nodeLabelsInitialised = true;
                }, 25);
            }

            graph.force.size([graph.width, graph.height]).start();

            if (pointer === key) {
                break;
            }
        }
    },

    /**
     * Calculates the offset for the graph edge, because we need those arrows to point into those circles
     *
     * @param {object} graph - The graph object
     * @param {object} d - The graph node object
     */

    offsetEdge: function(graph: any, d: any) {

        var side = graph.width > graph.height ? graph.width : graph.height,
            sourceR = side/100 * d.source.r/2,
            targetR = side/100 * d.target.r/2,

            diffX = d.target.y - d.source.y,
            diffY = d.target.x - d.source.x,

            angle = (Math.atan2(diffY, diffX) + (Math.PI/2)),

            x1 = d.source.x - (sourceR * Math.cos(angle)),
            y1 = d.source.y + (sourceR * Math.sin(angle)),
            x2 = d.target.x + (targetR * Math.cos(angle)),
            y2 = d.target.y - (targetR * Math.sin(angle));

        return {x1: x1, y1: y1, x2: x2, y2: y2};
    },

    /**
     * I think it's used while processing collisions
     * Was found somewhere online and just copied over
     *
     * @param {object} graph - The graph object
     * @param {number} alpha - A value used to position nodes properly
     */

    gravity: function(graph: any, alpha: number) {

        return function(d: any) {
            d.x += ((graph.width/100) * d.cx - d.x) * alpha;
            d.y += ((graph.height/100) * d.cy - d.y) * alpha;
        };
    },

    /**
     * Used to process node collisions
     *
     * @param {object} graph - The graph object
     * @param {number} alpha - A value used to position nodes properly
     */

    collide: function(graph: any, alpha: number) {

        var data = this._data,
            quadtree = d3.quadtree(graph.nodes);

        return function(d: any) {
            var r = d.radius + data.maxNodeRadius + data.nodePadding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;

            quadtree.visit(function(quad: any, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
                        r = d.radius + quad.point.radius + (d.color !== quad.point.color ? 1 : 0) * data.nodePadding;

                    if (l < r) {
                        l = (l - r) / (l * alpha);
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }

                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    },

    /**
     * Used to break the nodes' text to be inscribed without overflowing
     *
     * @param {string} text - The label text
     */

    // wrap: function(text: any) {
    //
    //     text.each(function() {
    //         var text = d3.select(this),
    //             width = parseInt(text.attr('lable-width'), 10),
    //             words = text.text().split(/\s+/).reverse(),
    //             word = null,
    //             line = [],
    //             lineNumber = 0,
    //             lineHeight = 1, // ems
    //             y = text.attr('y'),
    //             tspan = text.text(null).append("tspan").attr({
    //                 'x': 0,
    //                 'y': 0,
    //                 'dy': ++lineNumber * lineHeight + 'em'
    //             });
    //
    //         if (words.length === 1) {
    //             tspan.text(words[0]);
    //             return;
    //         }
    //
    //         while (word = words.pop()) {
    //             line.push(word);
    //             tspan.text(line.join(' '));
    //
    //             if (tspan.node().getComputedTextLength() > width) {
    //                 line.pop();
    //                 tspan.text(line.join(' '));
    //                 line = [word];
    //                 tspan = text.append('tspan').attr({
    //                     'x': 0,
    //                     'y': 0,
    //                     'dy': ++lineNumber * lineHeight + 'em'
    //                 }).text(word);
    //             }
    //         }
    //     });
    // },

    /**
     * Gets the bigger graph block side. Used to resize graph properly
     *
     * @param {string} name - The graph name
     */

    getBiggerSide: function(name: any) {
        var data = this._data,
            graph = (data.graphs as any)[name];

        return graph.width > graph.height ? graph.width : graph.height;
    },

    /**
     * Adds arrowhead definitions to the SVG
     *
     * @param {string} graphName - The graph name
     * @param {array} types - A list of arrowhead types to add
     */

    // addArrowheads: function(graphName, types) {
    //
    //     var data = this._data,
    //         graph = data.graphs[graphName];
    //
    //     graph.defs = graph.svg.append('defs');
    //
    //     for (var i = 0; i < types.length; i++) {
    //         graph.defs.append('marker')
    //             .attr({'id': graphName + '_' + types[i] + '-arrowhead',
    //                 'viewBox': '-0 -5 10 10',
    //                 'refX': 7,
    //                 'refY': 0,
    //                 'orient': 'auto',
    //                 'markerWidth': 10,
    //                 'markerHeight': 10,
    //                 'xoverflow': 'visible'
    //             })
    //             .append('svg:path')
    //             .attr({
    //                 'd': 'M 2,-3 L 7,0 L 2,3',
    //                 'stroke': data.colors[types[i]]
    //             });
    //     }
    // },

    /**
     * Initialises the graph using the html node to draw graph into and the dataset
     *
     * @param {object} dataset - The dataset used to build the graph
     */

    init: function(dataset: any) {

        var _this = this,
            data = this._data as any,
            newGraph: any = null,
            graphName = 'graph' + Object.keys(data.graphs).length;

        data.graphs[graphName] = {};
        newGraph = data.graphs[graphName];
        newGraph.nodeLabelsInitialised = false;

        // newGraph.container = d3.select(htmlNode);
        // newGraph.width = newGraph.container[0][0].offsetWidth;
        // newGraph.height = newGraph.container[0][0].offsetHeight;
        //
        // newGraph.svg = newGraph.container
        //     .append('svg')
        //     .attr({
        //         'width': newGraph.width,
        //         'height': newGraph.height
        //     });

        const simulation = d3.forceSimulation()
            .nodes(dataset.nodes)
            .force("link", d3.forceLink(dataset.edges)
                .distance(function(d: any) {
                var source = {
                        x: (data.graphs[graphName].width/100) * d.source.cx,
                        y: (data.graphs[graphName].height/100) * d.source.cy
                    },
                    target = {
                        x: (data.graphs[graphName].width/100) * d.target.cx,
                        y: (data.graphs[graphName].height/100) * d.target.cy
                    };

                return Math.sqrt(Math.pow(source.x - target.x, 2) + Math.pow(source.y - target.y, 2));
            }))
            // .charge(0)
            .force("gravity", forceGraph.gravity as any);

        // newGraph.force.start();

        // newGraph.edges = newGraph.svg.selectAll('line')
        //     .data(dataset.edges)
        //     .enter()
        //     .append('line')
        //     .attr({
        //         'id': function(d, i) {
        //             return graphName + '_edge_' + i;
        //         },
        //         'marker-end': function(d) {
        //             return 'url(#' + graphName + '_' + (d.type || 'default') + '-arrowhead)';
        //         },
        //         'style': function(d) {
        //             return 'stroke: ' + data.colors[d.type || 'default'];
        //         }
        //     });

        // newGraph.nodes = newGraph.svg.selectAll('circle')
        //     .data(dataset.nodes)
        //     .enter()
        //     .append('circle')
        //     .attr({
        //         'r': function(d) {
        //             return _this.getBiggerSide(graphName)/100 * (d.r/2);
        //         },
        //         'style': function(d) {
        //             return 'stroke: ' + data.colors[d.type] + '; ' + 'fill: ' + data.colors['dark-bg'];
        //         }
        //     })
        //     .call(newGraph.force.drag);
        //
        // newGraph.nodelabels = newGraph.svg.selectAll('.nodelabel')
        //     .data(dataset.nodes)
        //     .enter()
        //     .append('text')
        //     .attr({
        //         'text-anchor': 'middle',
        //         'x': 0,
        //         'y': 0,
        //         'class': 'nodelabel',
        //         'fill': function(d) {
        //             return data.colors[d.type];
        //         },
        //         'lable-width': function(d) {
        //             return (_this.getBiggerSide(graphName)/100 * d.r) / Math.sqrt(2);
        //         },
        //         'style': function(d) {
        //             return _this.resizeFont(graphName, d, 'Node', false);
        //         }
        //     })
        //     .text(function(d) {
        //         return d.text;
        //     });
        //
        // newGraph.edgepaths = newGraph.svg.selectAll('.edgepath')
        //     .data(dataset.edges)
        //     .enter()
        //     .append('path')
        //     .attr({
        //         'class': 'edgepath',
        //         'id': function(d, i) {
        //             return graphName + '_edgepath_' + i;
        //         }
        //     });
        //
        // newGraph.edgelabels = newGraph.svg.selectAll('.edgelabel')
        //     .data(dataset.edges)
        //     .enter()
        //     .append('text')
        //     .attr({
        //         'class': 'edgelabel',
        //         'id': function(d, i) {
        //             return graphName + '_edgelabel_' + i;
        //         },
        //         'dx': 0,
        //         'dy': -5,
        //         'fill': function(d) {
        //             return data.colors[d.type || 'default'];
        //         }
        //     });
        //
        // newGraph.edgelabels
        //     .append('textPath')
        //     .attr({
        //         'xlink:href': function(d, i) {
        //             return '#' + graphName + '_edgepath_' + i;
        //         },
        //         'startOffset': '50%',
        //         'text-anchor': 'middle'
        //     })
        //     .text(function(d, i) {
        //         return d.text;
        //     });
        //
        // this.addArrowheads(graphName, ['default', 'relation']);

        // if (htmlNode.offsetWidth > 0 || htmlNode.offsetHeight > 0) {
        //     setTimeout(function() {
        //         newGraph.svg
        //             .selectAll('.nodelabel')
        //             // .call(_this.wrap);
        //
        //         newGraph.nodeLabelsInitialised = true;
        //     }, 25);
        //
        //     newGraph.force.start();
        // }

        simulation.on('tick', function() {

            (simulation.nodes as any)
                .each(_this.gravity(newGraph, 0.25))
                .each(_this.collide(newGraph, 0.5))
                .attr({
                    'r': function(d: any) {
                        return _this.getBiggerSide(graphName)/100 * (d.r/2);
                    },
                    'cx': function(d: any) {
                        return d.x;
                    },
                    'cy': function(d: any) {
                        return d.y;
                    }
                });

            newGraph.edges
                .each(function(d: any) {
                    var altCoords = _this.offsetEdge(newGraph, d);

                    d.attr({
                        'x1': altCoords.x1,
                        'y1': altCoords.y1,
                        'x2': altCoords.x2,
                        'y2': altCoords.y2
                    });
                });

            newGraph.nodelabels
                .attr('transform', function(d: any) {
                    return 'translate(' + d.x + ', ' + (d.y - d.getBoundingClientRect().height/2) + ')';
                });

            // if (newGraph.nodeLabelsInitialised) {
            //     newGraph.nodelabels
            //         .attr('style', function(d: any) {
            //             return _this.resizeFont(graphName, d, 'Node', true);
            //         });
            // }

            newGraph.edgepaths
                .attr('d', function(d: any) {
                    var altCoords = _this.offsetEdge(newGraph, d);
                    return 'M ' + altCoords.x1 + ' ' + altCoords.y1 + ' L ' + altCoords.x2 + ' ' + altCoords.y2;
                });

            newGraph.edgelabels
                .attr({
                    'transform': function(d: any) {
                        if (d.target.x < d.source.x) {
                            var bbox = this.getBBox(),
                                rx = bbox.x + bbox.width/2,
                                ry = bbox.y + bbox.height/2;

                            return 'rotate(180 ' + rx + ' ' + ry + ')';
                        } else {
                            return 'rotate(0)';
                        }
                    },
                    'style': function(d: any) {
                        return _this.resizeFont(graphName, d, 'Edge');
                    }
                });
        });

        return simulation;
    }
};


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
        worldWidth: width,
        worldHeight: height,
        passiveWheel: false,

        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });
    const baseWidth = 660;
    if (width < baseWidth) viewport.scaled = width / baseWidth; // TODO: currently doesn't update when screen is resized and made bigger

    app.stage.addChild(viewport);

    // activate plugins
    // viewport.drag().pinch().wheel().decelerate().clampZoom({ minWidth: width, minHeight: height });

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
        // .force("charge", d3.forceManyBody().strength(-100)) // This adds repulsion (if it's negative) between nodes.
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX().x((d: any) => 6.6 * d.cx).strength(.25))
        .force("y", d3.forceY().y((d: any) => 3.2 * d.cy).strength(.25))
        // .force("x", (d) => {
        //     console.log(`d = ${d}`);
        //     d3.forceX(3.3 * d.cx).strength(0.25)
        // })
        // .force("y", (d: any) => d3.forceY(1.6 * d.cy).strength(0.25));
        // .force("collision", d3.forceCollide().radius(70).iterations(2))
        // .velocityDecay(0.8);

    // simulation.on("end", () => {
    //     simulation.force("link", null);
    //     simulation.force("charge", null);
    //     simulation.force("center", null);
    //     simulation.force("collision", null);
    // });

    // const simulation = forceGraph.init({nodes: nodes, links: links});

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
        console.log("TICKED")
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
