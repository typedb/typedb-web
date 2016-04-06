
var width, height, graphid;

var smallRadius = 14;
var mediumRadius = 27;
var largeRadius = 45;
var nodeTypes = ["instance","concept-type","relation","relation-type","resource","resource-type", "meta"];
var edgeTypes = ["default", "active"];

// var types2 = ["instance", "concept", "relation", "relationship", "concept-type", "relation-type"];

//            green,    darkgreen,orange,   red,      blue,     darkblue, purple,
//            green,    darkgreen,orange,   red,      blue,     darkblue, purple,
nodeColors     = ["77dd77", "3CB68E", "FFBF57", "FA72A7", "5bc2e7", "747DF2", "BF77F3"];
nodeColorsDark = ["61BC60", "008B5D", "FFA81C", "F73882", "46A5C7", "4854ED", "A15FD1"];

edgeColors = ["#DADADA", "#CAEA9C"]
edgeLabelColors = ["#54585a", "#2E4E00"]

var nodeColor = d3.scale.ordinal()
  .domain(nodeTypes)
  .range(nodeColors);

var borderColor = d3.scale.ordinal()
  .domain(nodeTypes)
  .range(nodeColorsDark);

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

var rotate = function(d){
  if(d.target.x < d.source.x){
    return "rotate(180, " + Math.abs(dx(d.source.x) + dx(d.target.x)) / 2  + ", " + Math.abs(dy(d.source.y) + dy(d.target.y)) / 2 + ")";
  }
  return "";
}

var boxRotation = function(d, boundingbox){
  var adjacent = Math.abs(dx(d.target.x) - dx(d.source.x));
  var opposite = Math.abs(dy(d.target.y) - dy(d.source.y));

  var radians = Math.atan(opposite/adjacent);
  var degrees = radians * (180 / Math.PI);

  if((!(dx(d.target.x) < dx(d.source.x)) && dy(d.target.y) < dy(d.source.y)) || 
    (dx(d.target.x) < dx(d.source.x) && !(dy(d.target.y) < dy(d.source.y)))){
    degrees = -1 * degrees;
  }

  var xRot = boundingbox.left + hypotenuseLength(boundingbox)/4
  var yRot = boundingbox.top + hypotenuseLength(boundingbox)/4

  return "rotate(" + degrees + ", " + xRot + ", " + yRot + ")";;
}

var boundingRect = function(id){
  return document.getElementById(id).getBoundingClientRect()
}

var hypotenuseLength = function(rect){
  return Math.sqrt(Math.pow(rect.top - rect.bottom, 2) + Math.pow(rect.right - rect.left, 2));
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

var buildGraph = function(obj){

  // Use a timeout to allow the rest of the page to load first.
  width = obj.size.width,
  height = obj.size.height,
  graphid = obj.graph.id;

  var svg = d3.select(obj.node).append("svg")
    .attr("width", width)
    .attr("height", height);

  var force = d3.layout.force()
    .nodes(obj.graph.nodes)
    .links(obj.graph.edges)
    .size([width, height])
    .start()
    .stop();

  // build the grey arrow
  svg.append("svg:defs").append("svg:marker")
    .attr("id", "default-arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 23)
    .attr("markerWidth", 2)
    .attr("markerHeight", 2.5)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("stroke", "#DADADA")
    .style("fill", "#DADADA")
    

  // build the dark grey arrow
  svg.append("svg:defs").append("svg:marker")
    .attr("id", "active-arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 23)
    .attr("markerWidth", 2)
    .attr("markerHeight", 2.5)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("stroke", "#CAEA9C")
     .style("fill", "#CAEA9C")
  

  // define the links
  var links = svg.selectAll("g.link")
    .data(obj.graph.edges)
    .enter().append("g")
    .attr("class", "link")

  // add the links and the arrows
  links.append("path")
    .attr("stroke", function(d){ return edgeColors(d.type)})
    .attr("stroke-width", 9)
    .attr("id", function(d){ return getLinkUniqueId(d); })
    .attr("marker-end", function(d){ return d.type != null ? "url(#" + d.type + "-arrow)" : "url(#default-arrow)"})
    .attr("d", function(d) {
      return "M" + dx(d.source.x) + "," + dy(d.source.y) + "L " + dx(d.target.x) + "," + dy(d.target.y);
    });

  // add the link labels
  links.append("text")
    .attr("id", function(d){ return getLinkUniqueId(d) + "text"})
    .attr("dy", "3")
    .attr("transform", function(d){ return rotate(d); })
    .append("textPath")
    .attr("stroke", function(d){ return edgeLabelColors(d.type)})
    .attr("xlink:href", function(d) { return "#" + getLinkUniqueId(d); })
    .attr("startOffset", function(d){ return offset(d) })
    .attr("text-anchor", "middle")
    .text(function(d){ return d.text.toUpperCase()})

  // links
  //   .insert("rect", "* ~ text")
  //   .attr("x", function(d){ 
  //     return boundingRect(getLinkUniqueId(d) + "text").left - hypotenuseLength(boundingRect(getLinkUniqueId(d) + "text"))/4//((boundingRect(getLinkUniqueId(d) + "text").right - boundingRect(getLinkUniqueId(d) + "text").left)/2)
  //   })
  //   .attr("y", function(d){ 
  //     return boundingRect(getLinkUniqueId(d) + "text").top - hypotenuseLength(boundingRect(getLinkUniqueId(d) + "text"))/4
  //   })
  //   .attr("transform", function(d){ return boxRotation(d, boundingRect(getLinkUniqueId(d) + "text")); })
  //   .attr("width", function(d){ return hypotenuseLength(boundingRect(getLinkUniqueId(d) + "text"));})
  //   .attr("height", function(d){ return boundingRect(getLinkUniqueId(d) + "text").height ;})
  //   .attr("fill", "white")
    // .attr("stroke", "black")

  // define the nodes
  var nodes = svg.selectAll("g.node")
    .data(obj.graph.nodes)
    .enter().append("g")
    .attr("class", "node")

  // add the nodes
  nodes.append("circle")
    .attr("r", function(d){ return radius(d.type)})
    .attr("id", function(d){ return "circle_" + d.id})
    .style("stroke", function(d){ return borderColor(d.type)})
    .style("stroke-width", 3)
    .style("fill", function(d){ return nodeColor(d.type)})

  // add the node labels
  nodes.append("text")
    .attr("class", "textWrap")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text(function(d){ return d.text})
    .each(function(d){
      d3plus.textwrap()
      .align("center")
      .valign("middle")
      .container(d3.select(this))
      .draw();
    });

  nodes.attr("transform", function(d) {
    return "translate(" +
      dx(d.x) + "," +
      dy(d.y) + ")"; })

}