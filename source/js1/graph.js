'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Graph = {

    _data: {
        graphs: {},
        maxNodeRadius: 60,
        minEdgeFont: 8,
        maxEdgeFont: 10,
        minNodeFont: 8,
        maxNodeFont: 12,
        nodePadding: 5,
        colors: {
            'default':       '#bbbcbc',
            'instance':      '#a1d884',
            'concept-type':  '#ff7878',
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

    resizeFont: function(graphName, svgElement, type, postRender) {
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

        if (fontSize > data['max' + type + 'Font']) {
            fontSize = data['max' + type + 'Font'];
        }

        newStyle.push('font-size: ' + fontSize + 'px;');

        if (postRender && fontSize < data['min' + type + 'Font']) {
            newStyle.push('display: none;');
        }

        return newStyle.join(' ');
    },

    redraw: function(pointer) {

        var _this = this,
            data = this._data,
            graphs = this._data.graphs,
            graph = null;

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
                            'style': function(d) {
                                return _this.resizeFont(key, d, 'Node', false);
                            },
                            'lable-width': function(d) {
                                return (_this.getBiggerSide(key)/100 * d.r) / Math.sqrt(2);
                            }
                        })
                        .call(_this.wrap);

                    graph.nodeLabelsInitialised = true;
                }, 25);
            }

            graph.force.size([graph.width, graph.height]).start();

            if (pointer === key) {
                break;
            }
        }
    },

    offsetEdge: function(graph, d) {

        var data = this._data,
            side = graph.width > graph.height ? graph.width : graph.height,
            sourceR = side/100 * d.source.r/2,
            targetR = side/100 * d.target.r/2,
            sourceCirc = sourceR * 2 * Math.PI,
            targetCirc = targetR * 2 * Math.PI,
            stRatio = sourceCirc/targetCirc,

            diffX = d.target.y - d.source.y,
            diffY = d.target.x - d.source.x,

            angle = (Math.atan2(diffY, diffX) + (Math.PI/2)),

            x1 = d.source.x - (sourceR * Math.cos(angle)),
            y1 = d.source.y + (sourceR * Math.sin(angle)),
            x2 = d.target.x + (targetR * Math.cos(angle)),
            y2 = d.target.y - (targetR * Math.sin(angle));

        return {x1: x1, y1: y1, x2: x2, y2: y2};
    },

    gravity: function(graph, alpha) {

        var data = this._data;
        
        return function(d) {
            d.x += ((graph.width/100) * d.cx - d.x) * alpha;
            d.y += ((graph.height/100) * d.cy - d.y) * alpha;
        };
    },

    collide: function(graph, alpha) {

        var data = this._data,
            quadtree = d3.geom.quadtree(graph.nodes);
    
        return function(d) {
            var r = d.radius + data.maxNodeRadius + data.nodePadding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;

            quadtree.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
                        r = d.radius + quad.point.radius + (d.color !== quad.point.color) * data.nodePadding;
    
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

    wrap: function(text) {
    
        text.each(function() {
            var text = d3.select(this),
                width = parseInt(text.attr('lable-width'), 10),
                words = text.text().split(/\s+/).reverse(),
                word = null,
                line = [],
                lineNumber = 0,
                lineHeight = 1, // ems
                y = text.attr('y'),
                tspan = text.text(null).append("tspan").attr({
                    'x': 0,
                    'y': 0,
                    'dy': ++lineNumber * lineHeight + 'em'
                });

            if (words.length === 1) {
                tspan.text(words[0]);
                return;
            }

            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(' '));
    
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(' '));
                    line = [word];
                    tspan = text.append('tspan').attr({
                        'x': 0,
                        'y': 0,
                        'dy': ++lineNumber * lineHeight + 'em'
                    }).text(word);
                }
            }
        });
    },

    getBiggerSide: function(name) {
        var data = this._data,
            graph = data.graphs[name];

        return graph.width > graph.height ? graph.width : graph.height;
    },

    addArrowheads: function(graphName, types) {

        var data = this._data,
            graph = data.graphs[graphName];

        graph.defs = graph.svg.append('defs');

        for (var i = 0; i < types.length; i++) {
            graph.defs.append('marker')
                .attr({'id': graphName + '_' + types[i] + '-arrowhead',
                    'viewBox': '-0 -5 10 10',
                    'refX': 7,
                    'refY': 0,
                    'orient': 'auto',
                    'markerWidth': 10,
                    'markerHeight': 10,
                    'xoverflow': 'visible'
                })
                .append('svg:path')
                    .attr({
                        'd': 'M 0,-5 L 7,0 L 0,5',
                        'stroke': data.colors[types[i]]
                    });
        }
    },

    init: function(htmlNode, dataset) {

        var _this = this,
            data = this._data,
            newGraph = null,
            graphName = 'graph' + Object.keys(data.graphs).length;

        data.graphs[graphName] = {};
        newGraph = data.graphs[graphName];
        newGraph.nodeLabelsInitialised = false;

        newGraph.container = d3.select(htmlNode);
        newGraph.width = newGraph.container[0][0].offsetWidth;
        newGraph.height = newGraph.container[0][0].offsetHeight;

        newGraph.svg = newGraph.container
            .append('svg')
            .attr({
                'width': newGraph.width,
                'height': newGraph.height
            });

        newGraph.force = d3.layout.force()
            .nodes(dataset.nodes)
            .links(dataset.edges)
            .size([newGraph.width, newGraph.height])
            .linkDistance(function(d) {
                var source = {
                        x: (data.graphs[graphName].width/100) * d.source.cx,
                        y: (data.graphs[graphName].height/100) * d.source.cy
                    },
                    target = {
                        x: (data.graphs[graphName].width/100) * d.target.cx,
                        y: (data.graphs[graphName].height/100) * d.target.cy
                    };
                
                return Math.sqrt(Math.pow(source.x - target.x, 2) + Math.pow(source.y - target.y, 2));
            })
            .charge(0)
            .gravity(newGraph, 0)
            .start();

        newGraph.edges = newGraph.svg.selectAll('line')
            .data(dataset.edges)
            .enter()
            .append('line')
            .attr({
                'id': function(d, i) {
                    return graphName + '_edge_' + i;
                },
                'marker-end': function(d) {
                    return 'url(#' + graphName + '_' + (d.type || 'default') + '-arrowhead)';
                },
                'style': function(d) {
                    return 'stroke: ' + data.colors[d.type || 'default'];
                }
            });

        newGraph.nodes = newGraph.svg.selectAll('circle')
            .data(dataset.nodes)
            .enter()
            .append('circle')
            .attr({
                'r': function(d) {
                    return _this.getBiggerSide(graphName)/100 * (d.r/2);
                },
                'style': function(d) {
                    return 'stroke: ' + data.colors[d.type] + '; ' + 'fill: ' + data.colors['dark-bg'];
                }
            })
            .call(newGraph.force.drag);

        newGraph.nodelabels = newGraph.svg.selectAll('.nodelabel')
            .data(dataset.nodes)
            .enter()
            .append('text')
            .attr({
                'text-anchor': 'middle',
                'x': 0,
                'y': 0,
                'class': 'nodelabel',
                'fill': function(d) {
                    return data.colors[d.type];
                },
                'lable-width': function(d) {
                    return (_this.getBiggerSide(graphName)/100 * d.r) / Math.sqrt(2);
                },
                'style': function(d) {
                    return _this.resizeFont(graphName, d, 'Node', false);
                }
            })
            .text(function(d) {
                return d.text;
            });

        newGraph.edgepaths = newGraph.svg.selectAll('.edgepath')
            .data(dataset.edges)
            .enter()
            .append('path')
            .attr({
                'd': function(d) {
                    return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                },
                'class': 'edgepath',
                'id': function(d, i) {
                    return graphName + '_edgepath_' + i;
                }
            });

        newGraph.edgelabels = newGraph.svg.selectAll('.edgelabel')
            .data(dataset.edges)
            .enter()
            .append('text')
            .attr({
                'class': 'edgelabel',
                'id': function(d, i) {
                    return graphName + '_edgelabel_' + i;
                },
                'dx': 0,
                'dy': -5,
                'fill': function(d) {
                    return data.colors[d.type || 'default'];
                }
            });

        newGraph.edgelabels
            .append('textPath')
            .attr({
                'xlink:href': function(d, i) {
                    return '#' + graphName + '_edgepath_' + i;
                },
                'startOffset': '50%',
                'text-anchor': 'middle'
            })
            .text(function(d, i) {
                return d.text;
            });

        this.addArrowheads(graphName, ['default', 'relation']);

        setTimeout(function() {
            if (htmlNode.offsetWidth > 0 || htmlNode.offsetHeight > 0) {
                newGraph.svg
                    .selectAll('.nodelabel')
                    .call(_this.wrap);

                newGraph.nodeLabelsInitialised = true;
            }
        }, 25);

        newGraph.force.on('tick', function(e) {

            newGraph.nodes
                .each(_this.gravity(newGraph, 0.2 * e.alpha))
                .each(_this.collide(newGraph, 0.5))
                .attr({
                    'r': function(d) {
                        return _this.getBiggerSide(graphName)/100 * (d.r/2);
                    },
                    'cx': function(d) {
                        return d.x;
                    },
                    'cy': function(d) {
                        return d.y;
                    }
                });

            newGraph.edges
                .each(function(d) {
                    var altCoords = _this.offsetEdge(newGraph, d);
                    
                    d3.select(this).attr({
                        'x1': altCoords.x1,
                        'y1': altCoords.y1,
                        'x2': altCoords.x2,
                        'y2': altCoords.y2
                    });
                });

            newGraph.nodelabels
                .attr('transform', function(d) {
                    return 'translate(' + d.x + ', ' + (d.y - this.getBoundingClientRect().height/2) + ')';
                });

            if (newGraph.nodeLabelsInitialised) {
                newGraph.nodelabels
                    .attr('style', function(d) {
                        return _this.resizeFont(graphName, d, 'Node', true);
                    });
            }

            newGraph.edgepaths
                .attr('d', function(d) {
                    var altCoords = _this.offsetEdge(newGraph, d);
                    return 'M ' + altCoords.x1 + ' ' + altCoords.y1 + ' L ' + altCoords.x2 + ' ' + altCoords.y2;
                });

            newGraph.edgelabels
                .attr({
                    'transform': function(d, i) {
                        if (d.target.x < d.source.x) {
                            var bbox = this.getBBox(),
                                rx = bbox.x + bbox.width/2,
                                ry = bbox.y + bbox.height/2;
                            
                            return 'rotate(180 ' + rx + ' ' + ry + ')';
                        } else {
                            return 'rotate(0)';
                        }
                    },
                    'style': function(d) {
                        return _this.resizeFont(graphName, d, 'Edge', true);
                    }
                });
        });
    }
};