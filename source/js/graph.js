
var width, height, graphid;

var smallRadius = 14;
var mediumRadius = 27;
var largeRadius = 45;
var nodeTypes = ["instance", "concept-type", "relation", "relation-type", "resource", "resource-type", "meta"];
var edgeTypes = ["default", "active"];


nodeColors     = ["#a1d884", "#ff7878",/*"#77dd77",*/ "#77dd77", "#bfc0d1", "#a1d884",/*"#5bc2e7",*/ "#ff7878", "#5bc2e7"];

edgeColors = ["#bbbcbc", "#77dd77"]
edgeLabelColors = ["#fff", "#2E4E00"]

var nodeColor = d3.scale.ordinal()
  .domain(nodeTypes)
  .range(nodeColors);

var borderColor = d3.scale.ordinal()
  .domain(nodeTypes)
  .range(nodeColors/*Dark*/);

var edgeColors = d3.scale.ordinal()
  .domain(edgeTypes)
  .range(edgeColors);

var edgeLabelColors = d3.scale.ordinal()
  .domain(edgeTypes)
  .range(edgeLabelColors);

var radius = d3.scale.ordinal()
  .domain(nodeTypes)
  .range([mediumRadius, mediumRadius, smallRadius, mediumRadius, mediumRadius, mediumRadius, mediumRadius]);

var dx = function (n){
  return width * n;
}

var dy = function (n){
  return height * n;
}

function getLinkUniqueId(link){
  return graphid + "_link_" + link.source.index + "_" + link.target.index;
}

var boundingRect = function(id){
  return document.getElementById(id).getBoundingClientRect()
}

var hypotenuseLength = function(rect){
  return Math.sqrt(Math.pow(rect.top - rect.bottom, 2) + Math.pow(rect.right - rect.left, 2));
}

var rotate = function(d){
  if(d.target.x < d.source.x){
    return "rotate(180, " + Math.abs(dx(d.source.x) + dx(d.target.x)) / 2  + ", " + Math.abs(dy(d.source.y) + dy(d.target.y)) / 2 + ")";
  }
  return "";
}

var offset = function(d){
  var sourceRadius = radius(d.source.type);
  var targetRadius = radius(d.target.type);

  if(d.source.x < d.target.x){
      var leftRadius = sourceRadius;
      var rightRadius = targetRadius;
  }
  else if(d.source.x > d.target.x){
      var leftRadius = targetRadius;
      var rightRadius = sourceRadius;
  }
  else if(d.source.y < d.target.Y){
      var leftRadius = targetRadius;
      var rightRadius = sourceRadius;
  }
  else{
      var leftRadius = sourceRadius;
      var rightRadius = targetRadius;
  }

  var length = Math.sqrt(Math.pow(dy(d.target.y) - dy(d.source.y), 2) + Math.pow(dx(d.target.x) - dx(d.source.x), 2));

  var percent = (((length - (leftRadius + rightRadius))/2 + leftRadius)/length) * 100;
  return percent + "%";
}

var drawGraph = function(){
  d3.selectAll("g.node")
  .attr("transform", function(d) {
    return "translate(" +
      dx(d.x) + "," +
      dy(d.y) + ")"; 
  });

  d3.selectAll(".edge")
    .attr("x1", function(d) { return dx(d.source.x)})
    .attr("y1", function(d) { return dy(d.source.y)})
    .attr("x2", function(d) { return dx(d.target.x)})
    .attr("y2", function(d) { return dy(d.target.y)});

  d3.selectAll(".edgepath").attr("d", function(d) {
    return "M" + dx(d.source.x) + "," + dy(d.source.y) + "L " + dx(d.target.x) + "," + dy(d.target.y);
  });

  d3.selectAll(".edgelabel")
    .attr('transform',function(d,i){
      if (d.target.x<d.source.x){
          bbox = this.getBBox();
          rx = bbox.x+bbox.width/2;
          ry = bbox.y+bbox.height/2;
          return 'rotate(180 '+Math.abs(dx(d.source.x) + dx(d.target.x)) / 2+' '+Math.abs(dy(d.source.y) + dy(d.target.y)) / 2+')';
          }
      else {
          return 'rotate(0)';
          }
    });
};

var resize = function(force){
  width = parseInt(d3.select("#graph_" + graphid).style('width'));
  height = parseInt(d3.select("#graph_" + graphid).style('height'));
console.log(d3.select("svg"));

  d3.select("svg")
    .attr("width", width)
    .attr("height", height);

  force.size([width , height]).start().stop();
  drawGraph();
}

var buildGraph = function(obj){

  // Use a timeout to allow the rest of the page to load first.
  width = obj.size.width,
  height = obj.size.height,
  graphid = obj.graph.id;

  var svg = d3.select(obj.node).append("svg")
    .attr("id", function(d){ return "graph_" + graphid})
    .attr("width", width)
    .attr("height", height);

  var force = d3.layout.force()
    .nodes(obj.graph.nodes)
    .links(obj.graph.edges)
    .size([width, height])
    .start()
    .stop();

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

    // add the links
    var edges = svg.selectAll("line")
      .data(obj.graph.edges)
      .enter()
      .append("line")
      .attr("class", "edge")
      .attr("stroke", function(d){ return edgeColors(d.type)})
      .attr("stroke-width", 9)
      .attr("marker-end", function(d){ return d.type != null ? "url(#" + d.type + "-arrow)" : "url(#default-arrow)"});

    // add the links and the arrows
    var edgePaths = svg.selectAll(".edgepath")
      .data(obj.graph.edges)
      .enter()
      .append('path')
      .attr("id", function(d){ return getLinkUniqueId(d); })
      .attr({'class':'edgepath',
             'fill-opacity':0,
             'stroke-opacity':0,
             'fill':'blue',
             'stroke':'red'
      })

    // add the link labels
    var edgelabels = svg.selectAll(".edgelabel")
      .data(obj.graph.edges)
      .enter()
      .append("text")
      .attr("class", "edgelabel")
      .style("font", "9px sans-serif")
      .attr("id", function(d){ return getLinkUniqueId(d) + "text"})
      .attr("transform", function(d){ return rotate(d); })
      .attr("dy", "3")
      
    edgelabels.append("textPath")
      .attr("fill", function(d){ return edgeLabelColors(d.type)})
      .attr("xlink:href", function(d) { return "#" + getLinkUniqueId(d); })
      .attr("startOffset", function(d){ return offset(d) })
      .attr("text-anchor", "middle")
      .text(function(d){ return d.text.toUpperCase()});

    // define the nodes
    var nodes = svg.selectAll("g.node")
      .data(obj.graph.nodes)
      .enter().append("g")
      .attr("class", "node");

    // add the nodes
    nodes.append("circle")
      .attr("r", function(d){ return radius(d.type)})
      .style("fill", function(d){ return nodeColor(d.type)})
      .style("stroke", function(d){ return borderColor(d.type)})
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

//if (!document.getElementById('section-platform-full')) {
    d3.select(window)
      .on("resize", function(){
        resize(force)
    });
//}

    drawGraph()
}