'use strict';

window.D3GRPH = {

    _data: {
        graphIds: [],
        nodeTypes: [
            "instance",
            "concept-type",
            "relation",
            "relation-type",
            "resource",
            "resource-type",
            "role-type",
            "meta"
        ],
        edgeTypes: [
            "default",
            "active",
            "alert"
        ],
        smallRadius: 14,
        mediumRadius: 27,
        largeRadius: 45,
        nodeColors: [
            "#a1d884",
            "#ff7878",
            "#77dd77",
            "#bfc0d1",
            "#a1d884",
            "#ff7878",
            "#ffb96d",
            "#5bc2e7"
        ],
        edgeColors: [
            "#bbbcbc",
            "#77dd77",
            "#ffbb71"
        ],
        edgeLabelColors: [
            "#ffffff",
            "#2e4e00",
            "#a95800"
        ]
    },

    dx: function (width, n) {
        return width * n;
    },

    dy: function (height, n) {
        return height * n;
    },

    getLinkUniqueId: function (graphid, link) {
        return graphid + "_link_" + link.source.index + "_" + link.target.index;
    },

    boundingRect: function(id) {
        return document.getElementById(id).getBoundingClientRect();
    },

    hypotenuseLength: function(rect) {
        return Math.sqrt(Math.pow(rect.top - rect.bottom, 2) + Math.pow(rect.right - rect.left, 2));
    },

    rotate: function(width, height, d) {
        if (d.target.x < d.source.x) {
            return "rotate(180, " + Math.abs(this.dx(width, d.source.x) + this.dx(width, d.target.x))/2 + ", " + Math.abs(this.dy(height, d.source.y) + this.dy(height, d.target.y))/2 + ")";
        }

        return "";
    },

    offset: function(width, height, d) {

        var data = this._data,
            sourceRadius = data.radius(d.source.type),
            targetRadius = data.radius(d.target.type),
            leftRadius = null,
            rightRadius = null;

        if (d.source.x < d.target.x) {
            leftRadius = sourceRadius;
            rightRadius = targetRadius;
        } else if (d.source.x > d.target.x) {
            leftRadius = targetRadius;
            rightRadius = sourceRadius;
        } else if (d.source.y < d.target.Y) {
            leftRadius = targetRadius;
            rightRadius = sourceRadius;
        } else {
            leftRadius = sourceRadius;
            rightRadius = targetRadius;
        }

        var length = Math.sqrt(Math.pow(this.dy(height, d.target.y) - this.dy(height, d.source.y), 2) + Math.pow(this.dx(width, d.target.x) - this.dx(width, d.source.x), 2)),
            percent = (((length - (leftRadius + rightRadius))/2 + leftRadius)/length) * 100;
    
        return percent + "%";
    },

    drawGraph: function(width, height) {

        var _this = this,
            bbox = null,
            rx = null,
            ry = null;

        d3.selectAll("g.node").attr("transform", function(d) {
            return "translate(" + _this.dx(width, d.x) + "," + _this.dy(height, d.y) + ")";
        });
        
        d3.selectAll(".edge")
            .attr("x1", function(d) { return _this.dx(width, d.source.x)})
            .attr("y1", function(d) { return _this.dy(height, d.source.y)})
            .attr("x2", function(d) { return _this.dx(width, d.target.x)})
            .attr("y2", function(d) { return _this.dy(height, d.target.y)});

        d3.selectAll(".edgepath").attr("d", function(d) {
            return "M" + _this.dx(width, d.source.x) + "," + _this.dy(height, d.source.y) + "L " + _this.dx(width, d.target.x) + "," + _this.dy(height, d.target.y);
        });

        d3.selectAll(".edgelabel").attr('transform', function(d,i) {
            if (d.target.x < d.source.x) {
                bbox = this.getBBox();
                rx = bbox.x + bbox.width/2;
                ry = bbox.y + bbox.height/2;

                return 'rotate(180 ' + Math.abs(_this.dx(width, d.source.x) + _this.dx(width, d.target.x))/2 + ' ' + Math.abs(_this.dy(height, d.source.y) + _this.dy(height, d.target.y))/2+')';
            } else {
                return 'rotate(0)';
            }
        });
    },

    resize: function(graphid, force) {
        var width = parseInt(d3.select("#graph_" + graphid).style('width')),
            height = parseInt(d3.select("#graph_" + graphid).style('height'));

        d3.select("svg").attr("width", width).attr("height", height);
        
        force.size([width, height]).start().stop();
        this.drawGraph(width, height);
    },

    buildGraph: function(obj) {

        // Use a timeout to allow the rest of the page to load first.
        var _this = this,
            data = this._data,
            width = obj.size.width,
            height = obj.size.height,
            graphid = obj.graph.id,

            svg = d3.select(obj.node).append("svg")
                .attr("id", function(d) { return "graph_" + graphid})
                .attr("width", width)
                .attr("height", height),

            force = d3.layout.force()
                .nodes(obj.graph.nodes)
                .links(obj.graph.edges)
                .size([width, height])
                .start()
                .stop();

        data.graphIds.push(graphid);

        // build the default arrow
        svg.append("svg:defs").append("svg:marker")
            .attr("id", "default-arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 23)
            .attr("markerWidth", 2)
            .attr("markerHeight", 2.5)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("stroke", "#bbbcbc")
            .style("fill", "#bbbcbc");

        // build the active arrow
        svg.append("svg:defs").append("svg:marker")
            .attr("id", "active-arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 23)
            .attr("markerWidth", 2)
            .attr("markerHeight", 2.5)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("stroke", "#77dd77")
            .style("fill", "#77dd77");

        // build the alert arrow
        svg.append("svg:defs").append("svg:marker")
            .attr("id", "alert-arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 23)
            .attr("markerWidth", 2)
            .attr("markerHeight", 2.5)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("stroke", "#FFBB71")
            .style("fill", "#FFBB71");

        // add the links
        var edges = svg.selectAll("line")
            .data(obj.graph.edges)
            .enter()
            .append("line")
            .attr("class", "edge")
            .attr("stroke", function(d) { return data.edgeColor(d.type)})
            .attr("stroke-width", 9)
            .attr("marker-end", function(d) { return d.type != null ? "url(#" + d.type + "-arrow)" : "url(#default-arrow)"}),

        // add the links and the arrows
            edgePaths = svg.selectAll(".edgepath")
            .data(obj.graph.edges)
            .enter()
            .append('path')
            .attr("id", function(d) { return _this.getLinkUniqueId(graphid, d); })
            .attr({
                'class': 'edgepath',
                'fill-opacity': 0,
                'stroke-opacity': 0,
                'fill': 'blue',
                'stroke': 'red'
            }),

        // add the link labels
            edgelabels = svg.selectAll(".edgelabel")
            .data(obj.graph.edges)
            .enter()
            .append("text")
            .attr("class", "edgelabel")
            .style("font", "9px sans-serif")
            .attr("id", function(d) { return _this.getLinkUniqueId(graphid, d) + "text"})
            .attr("transform", function(d) { return _this.rotate(width, height, d); })
            .attr("dy", "3");

        edgelabels.append("textPath")
            .attr("fill", function(d) { return data.edgeLabelColor(d.type)})
            .attr("xlink:href", function(d) { return "#" + _this.getLinkUniqueId(graphid, d); })
            .attr("startOffset", function(d) { return _this.offset(width, height, d) })
            .attr("text-anchor", "middle")
            .text(function(d) { return d.text.toUpperCase()});

        // define the nodes
        var nodes = svg.selectAll("g.node")
            .data(obj.graph.nodes)
            .enter().append("g")
            .attr("class", "node");

        // add the nodes
        nodes.append("circle")
            .attr("r", function(d) { return data.radius(d.type)})
            .style("fill", function(d) { return data.nodeColor(d.type)})
            .style("stroke", function(d) { return data.borderColor(d.type)})
            .style("stroke-width", 6);

        // add the node labels
        nodes.append("text")
            .attr("class", "textWrap")
            .style("text-anchor", "middle")
            .style("fill", "white")
            .style("font", "12px sans-serif")
            .text(function(d){ return d.text})
            .each(function(d){
                d3plus.textwrap()
                    .align("center")
                    .valign("middle")
                    .container(d3.select(this))
                    .draw();
            });

        d3.select(window).on("resize", function() {
            for (var i = 0; i < data.graphIds.length; i++) {
                _this.resize(data.graphIds[i], force);
            }
        });

        this.drawGraph(width, height);
    },

    init: function() {

        var data = this._data,
            nodeTypes = data.nodeTypes,
            nodeColors = data.nodeColors,
            edgeTypes = data.edgeTypes,
            edgeColors = data.edgeColors,
            edgeLabelColors = data.edgeLabelColors,
            mediumRadius = data.mediumRadius,
            smallRadius = data.smallRadius;

        data.nodeColor      = d3.scale.ordinal().domain(nodeTypes).range(nodeColors);
        data.borderColor    = d3.scale.ordinal().domain(nodeTypes).range(nodeColors);
        data.edgeColor      = d3.scale.ordinal().domain(edgeTypes).range(edgeColors);
        data.edgeLabelColor = d3.scale.ordinal().domain(edgeTypes).range(edgeLabelColors);
        data.radius         = d3.scale.ordinal().domain(nodeTypes)
                               .range([mediumRadius, mediumRadius, smallRadius, mediumRadius, mediumRadius, mediumRadius, mediumRadius]);
    }
};
