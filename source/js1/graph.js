var w = 900,
    h = 400,
    r = 15,
    maxRadius = 50,
    linkDistance = 200,
    padding = 6,
    colors = d3.scale.category10(),
    nodeColors = {
        color1: "#a1d884",
        color2: "#ff7878",
        color3: "#77dd77",
        color4: "#bfc0d1",
        color5: "#a1d884",
        color6: "#ff7878",
        color7: "#ffb96d",
        color8: "#5bc2e7"
    },
    edgeColors = {
        gray: "#bbbcbc",
        lightGreen: "#77dd77",
        paleGreen: "#ffbb71"
    },

    dataset = {
        nodes: [
            {
                name: "Adam is a twat",
                color: nodeColors['color1'],
                r: 30,
                cx: (w/100) * 15,
                cy: (h/100) * 20
            },
            {
                name: "Bob is a fucking idiot",
                color: nodeColors['color1'],
                r: 50,
                cx: (w/100) * 35,
                cy: (h/100) * 20
            },
            {
                name: "Carrie is a nice girl",
                color: nodeColors['color1'],
                r: 20,
                cx: (w/100) * 60,
                cy: (h/100) * 20
            },
            {
                name: "Donovan loves to drink milk",
                color: nodeColors['color1'],
                r: 20,
                cx: (w/100) * 80,
                cy: (h/100) * 20
            },
            {
                name: "Edward goes to school",
                color: nodeColors['color1'],
                r: 50,
                cx: (w/100) * 25,
                cy: (h/100) * 50
            },
            {
                name: "Felicity is dead",
                color: nodeColors['color1'],
                r: 30,
                cx: (w/100) * 50,
                cy: (h/100) * 50
            },
            {
                name: "George won't come to the party",
                color: nodeColors['color1'],
                r: 20,
                cx: (w/100) * 65,
                cy: (h/100) * 50
            },
            {
                name: "Hannah Montana",
                color: nodeColors['color1'],
                r: 30,
                cx: (w/100) * 15,
                cy: (h/100) * 80
            },
            {
                name: "Iris is funny as hell",
                color: nodeColors['color1'],
                r: 50,
                cx: (w/100) * 55,
                cy: (h/100) * 80
            },
            {
                name: "Jerry, oh ha-ha-ha",
                color: nodeColors['color1'],
                r: 20,
                cx: (w/100) * 80,
                cy: (h/100) * 80
            }
        ],
        edges: [
            {source: 0, target: 4, value: 150, color: edgeColors['gray']},
            {source: 4, target: 1, value: 150, color: edgeColors['gray']},
            {source: 1, target: 5, value: 150, color: edgeColors['lightGreen']},
            {source: 2, target: 1, value: 150, color: edgeColors['gray']},
            {source: 2, target: 3, value: 150, color: edgeColors['paleGreen']},
            {source: 3, target: 6, value: 150, color: edgeColors['gray']},
            {source: 8, target: 6, value: 150, color: edgeColors['lightGreen']},
            {source: 9, target: 6, value: 150, color: edgeColors['paleGreen']},
            {source: 4, target: 7, value: 150, color: edgeColors['gray']}
        ]
    },

    svg = d3.select("[data-splitter='slides']").select('[data-slide="right"]').append("svg").attr({"width":w,"height":h}),
    
    force = d3.layout.force()
        .nodes(dataset.nodes)
        .links(dataset.edges)
        .size([w,h])
        //.linkDistance([linkDistance])
        .linkDistance(function(d) { return  d.value; })
        .charge(0)
        .gravity(0)
        .start(),
    
    edges = svg.selectAll("line")
        .data(dataset.edges)
        .enter()
        .append("line")
        .attr("id",function(d,i) {return 'edge'+i})
        .attr('marker-end','url(#arrowhead)')
        .style("stroke", function(d) { return d.color; })
        .style("pointer-events", "none"),
    
    nodes = svg.selectAll("circle")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr({
            "r": function(d) { return d.r; }/*,
            "cx": function(d) { return d.pos ? (w / 100) * d.pos.x : 0 },
            "cy": function(d) { return d.pos ? (h / 100) * d.pos.y : 0 }*/
        })
        .style("stroke",function(d,i){return d.color;})
        .style("fill","#383838")
        .call(force.drag),
    
    nodelabels = svg.selectAll(".nodelabel") 
        .data(dataset.nodes)
        .enter()
        .append("text")
        .attr({
            //"x":function(d){return d.x;},
            "text-anchor": "middle",
            "x": 0,
            //"y":function(d){return d.y;},
            "y": 0,
            "class":"nodelabel",
            "fill": "#ffffff",
            "stroke-width": 0,
            "stroke":"transparent"})
        .text(function(d){return d.name;}),
    
    edgepaths = svg.selectAll(".edgepath")
        .data(dataset.edges)
        .enter()
        .append('path')
        .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
            'class': 'edgepath',
            //'fill-opacity': 0,
            //'stroke-opacity': 0,
            'stroke-width': 0,
            'fill': 'transparent',
            'stroke': 'transparent',
        'id':function(d,i) {return 'edgepath'+i}})
        .style("pointer-events", "none"),

    edgelabels = svg.selectAll(".edgelabel")
        .data(dataset.edges)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attr({'class':'edgelabel',
            'id':function(d,i){return 'edgelabel'+i},
            'dx': 0,
            'dy': -5,
            'font-size': 10,
            'fill': '#aaa'});

edgelabels.append('textPath')
    .attr('xlink:href',function(d, i) {return '#edgepath'+i})
    .style("pointer-events", "none")
    .attr("startOffset", '50%')
    .attr("text-anchor", "middle")
    .text(function(d, i){return 'label '+i});

svg.append('defs').append('marker')
    .attr({'id':'arrowhead',
        'viewBox':'-0 -5 10 10',
        'refX': 23,
        'refY': 0,
        //'markerUnits':'strokeWidth',
        'orient':'auto',
        'markerWidth': 10,
        'markerHeight': 10,
        'xoverflow':'visible'})
    .append('svg:path')
        .attr('d', 'M 0,-5 L 7,0 L 0,5')
        .attr('fill', 'transparent')
        .attr('stroke','#ccc');

// Move nodes toward cluster focus.
function gravity(alpha) {
  return function(d) {
    d.y += (d.cy - d.y) * alpha;
    d.x += (d.cx - d.x) * alpha;
  };
}

// Resolve collisions between nodes.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.radius + maxRadius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1, // ems
        y = text.attr("y"),
        //dy = parseFloat(text.attr("dy")),
        dy = 0,
        tspan = text.text(null)/*.append("tspan")*//*.attr("dx", 0)*//*.attr("dy", y)*//*.attr("dy", dy + "em")*/;
    
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan")/*.attr("x", 0).attr("y", y)*/.attr({
            "x": 0,
            "y": 0,
            "dy": ++lineNumber * lineHeight + dy + "em"
        }).text(word);
      }
    }
  });
}

setTimeout(function() {
    svg
        .selectAll(".nodelabel")
        .call(wrap, r);
}, 25);
 
force.on("tick", function(e) {
    nodes
        .each(gravity(.2 * e.alpha))
        .each(collide(.5))
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        /*.attr({
            "cx":function(d){
                return d.x = Math.max(r, Math.min(w - r, d.x));
            },
            "cy":function(d){
                return d.y = Math.max(r, Math.min(h - r, d.y));
            }
        })*/;
    
    edges
        .attr({
            "x1": function(d){return d.source.x;},
            "y1": function(d){return d.source.y;},
            "x2": function(d){return d.target.x;},
            "y2": function(d){return d.target.y;}
        });


    nodelabels
        .attr("transform", function(d) { return "translate(" + d.x + "," + (d.y - this.getBoundingClientRect().height/2) + ")"; })
        /*.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y + r/4; })*/;

    edgepaths
        .attr('d', function(d) {
            var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
            //console.log(d)
            return path;
        });

    edgelabels
        .attr('transform', function(d, i) {
            if (d.target.x < d.source.x) {
                bbox = this.getBBox();
                rx = bbox.x + bbox.width/2;
                ry = bbox.y + bbox.height/2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            } else {
                return 'rotate(0)';
            }
        });
});