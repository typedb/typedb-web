// import React, { Component } from 'react';
// import classNames from 'classnames';
// import { keys } from 'lodash';
// import _ from 'lodash';
//
// import vis from 'vis-grakn';
//
// const Prism = require('prismjs');
// const graqlHighlighter = require('helpers/prism-graql.js').graql;
// const visualiserItems = require('config/visualiserItems');
//
// class Visualiser extends Component<{media: any}> {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selected: keys(visualiserItems)[0],
//             network: null,
//         };
//         this.change = this.change.bind(this);
//         this.drawGraph = this.drawGraph.bind(this);
//         this.initializeGraph = this.initializeGraph.bind(this);
//     }
//
//     componentDidMount() {
//         this.initializeGraph();
//         window.addEventListener('resize', this.drawGraph);
//     }
//
//     componentDidUpdate(prevProps) {
//         if ((this.props.media.is.extraSmall && !prevProps.media.is.extraSmall) || (!this.props.media.is.extraSmall && prevProps.media.is.extraSmall)) {
//             this.initializeGraph();
//         }
//     }
//     componentWillUnmount() {
//         window.removeEventListener('resize', this.drawGraph);
//     }
//
//     change(i) {
//         this.setState({
//             selected: i,
//         }, function() {
//             this.drawGraph()
//         });
//     }
//
//     initializeGraph() {
//         const container = this.graphContainer;
//         const g = {
//             nodes: new vis.DataSet(),
//             edges: new vis.DataSet(),
//         }
//         const options = {
//             autoResize: false,
//             interaction:{
//                 dragNodes:false,
//                 dragView: false,
//                 hideEdgesOnDrag: false,
//                 hideNodesOnDrag: false,
//                 hover: false,
//                 hoverConnectedEdges: false,
//                 keyboard: {
//                     enabled: false,
//                     speed: {x: 10, y: 10, zoom: 0.02},
//                     bindToWindow: true
//                 },
//                 multiselect: false,
//                 navigationButtons: false,
//                 selectable: false,
//                 selectConnectedEdges: false,
//                 tooltipDelay: 300,
//                 zoomView: false
//             },
//             physics:{
//                 enabled: true,
//                 // forceAtlas2Based: {
//                 //   gravitationalConstant: -50,
//                 //   centralGravity: 0.015,
//                 //   springConstant: 0.03,
//                 //   springLength: 200,
//                 //   damping: 0.3,
//                 //   avoidOverlap: 0.4
//                 // },
//                 // repulsion: {
//                 //   centralGravity: 0.2,
//                 //   springLength: 200,
//                 //   springConstant: 0.2,
//                 //   nodeDistance: 150,
//                 //   damping: 0.3
//                 // },
//                 // solver: 'forceAtlas2Based',
//             },
//             nodes: {
//                 borderWidth: 0,
//                 font: {
//                     color: '#2f3544',
//                     size: this.props.media && this.props.media.is.extraSmall? 8 : 16,
//                     face: 'Ubuntu'
//
//                 },
//                 fixed: true,
//             },
//             edges: {
//                 color: {
//                     color: '#576484'
//                 },
//                 dashes: false,
//                 arrows: 'to',
//                 width: 2,
//                 smooth: {
//                     enabled: false
//                 },
//                 font: {
//                     color: '#7182ae',
//                     size: this.props.media && this.props.media.is.extraSmall? 10 : 16,
//                     face: 'Ubuntu',
//                     strokeWidth: 0,
//                     background: '#3b4254'
//
//                 },
//             },
//             groups: {
//                 entity: {
//                     shape: 'box',
//                     color: {
//                         background: '#3dce8c'
//                     },
//                     margin: {
//                         top: 10,
//                         bottom: 10,
//                         left: 20,
//                         right: 20
//                     },
//                     chosen: {
//                         node: function(values, id, selected, hovering) {
//                             values.color = '#3dce8c';
//                         }
//                     }
//                 },
//                 'entity-type': {
//                     shape: 'box',
//                     color: {
//                         background: '#3dce8c'
//                     },
//                     margin: {
//                         top: 10,
//                         bottom: 10,
//                         left: 20,
//                         right: 20
//                     },
//                     chosen: {
//                         node: function(values, id, selected, hovering) {
//                             values.color = '#3dce8c';
//                         }
//                     }
//                 },
//                 relationship: {
//                     shape: 'diamond',
//                     color: {
//                         background: '#8f82fc'
//                     },
//                     margin: 5,
//                     chosen: {
//                         node: function(values, id, selected, hovering) {
//                             values.color = '#8f82fc';
//                         }
//                     }
//                 },
//                 'relationship-type': {
//                     shape: 'diamond',
//                     color: {
//                         background: '#8f82fc'
//                     },
//                     margin: 1,
//                     chosen: {
//                         node: function(values, id, selected, hovering) {
//                             values.color = '#8f82fc';
//                         }
//                     }
//                 },
//                 attribute: {
//                     shape: 'ellipse',
//                     color: {
//                         background: '#f3bd5f'
//                     },
//                     margin: 10,
//                     chosen: {
//                         node: function(values, id, selected, hovering) {
//                             values.color = '#f3bd5f';
//                         }
//                     }
//                 },
//                 'attribute-type': {
//                     shape: 'ellipse',
//                     color: {
//                         background: '#f3bd5f'
//                     },
//                     margin: 10,
//                     chosen: {
//                         node: function(values, id, selected, hovering) {
//                             values.color = '#f3bd5f';
//                         }
//                     }
//                 }
//             }
//         };
//         const network = new vis.Network(container, g, options);
//
//         this.setState({
//             network: network,
//         },function() {
//             setTimeout(this.drawGraph, 1000);
//         });
//
//         this.handleSliderEvents();
//     }
//
//     handleSliderEvents(){
//         // Move slider code
//         const handle = document.getElementById('handle');
//         const slider = document.getElementById('slider');
//         const visualiserCode = document.getElementById('visualiser-code');
//         const visualiserGraph = document.getElementById('visualiser-graph');
//         const visualiserContent = document.getElementById('visualiser-content');
//
//         // When page loaded set visualiserCode width value so that all the following transitions won't be laggy
//         window.onload = function () { visualiserCode.style.width = (visualiserCode.offsetWidth-50)+'px'; }
//
//
//         const handleMouseMove = (e) =>{
//             const x = e.pageX - visualiserCode.getBoundingClientRect().left; // offsetleft
//             visualiserCode.style.width = (x-45)+'px';
//         };
//
//         const throttledHandler = _.throttle(handleMouseMove, 30, { 'leading': false });
//
//         // When user clicks on handle bind handleMouseMove
//         const handleMouseDown  = ()=>{
//             document.addEventListener('mousemove', throttledHandler, false);
//             document.addEventListener('touchmove', throttledHandler, false);
//         };
//
//         const resizeVisualiserCode = (percentage) => {
//             // adding a class which has an eased transition
//             visualiserCode.classList.add("auto-slide");
//             visualiserCode.style.width = (visualiserContent.offsetWidth * (percentage/100))+'px';
//             setTimeout(()=>{ visualiserCode.classList.remove("auto-slide"); }, 250);
//         };
//
//         // When clicking on area with code, slider will slide to the right to open up space for the code
//         visualiserCode.addEventListener('click', () => resizeVisualiserCode(75));
//         // When clicking on area with graph, slider will slide to the left to open up space for the graph
//         visualiserGraph.addEventListener('click', () => resizeVisualiserCode(8));
//
//
//         handle.addEventListener('mousedown', handleMouseDown, false);
//         slider.addEventListener('mousedown', handleMouseDown, false);
//
//         handle.addEventListener('touchstart', handleMouseDown, false);
//         slider.addEventListener('touchstart', handleMouseDown, false);
//
//         document.onmouseup = (e) => {
//             document.removeEventListener('mousemove', throttledHandler, false);
//         };
//         document.ontouchend = (e) => {
//             document.removeEventListener('touchmove', throttledHandler, false);
//         };
//     }
//
//     drawGraph() {
//         const network = this.state.network;
//         const dataset = visualiserItems[this.state.selected].graph;
//         const nodes = [];
//         const edges = [];
//         const container = this.graphContainer;
//         let width = 900;
//         let height = 514;
//         if (container.clientWidth && container.clientWidth < width) {
//             width = container.offsetWidth;
//         }
//         dataset.nodes.map((item, index) => {
//             nodes.push({
//                 id: index,
//                 group: item.type,
//                 label: item.text,
//                 x: ((item.cx - 20) / 100 ) * width ,
//                 y: (item.cy  / 100 ) * height
//             });
//         });
//         dataset.edges.map((item, index) => {
//             edges.push({
//                 from: item.source,
//                 to: item.target,
//                 label: item.text
//             });
//         });
//         const g = {
//             nodes: new vis.DataSet(nodes),
//             edges: new vis.DataSet(edges),
//         };
//         network.setData(g);
//         network.setSize(width, height);
//         network.redraw();
//     }
//
//     render() {
//         const code = Prism.highlight(visualiserItems[this.state.selected].code, graqlHighlighter);
//
//         return (
//             <div className="visualiser">
//                 <ul className=" visualiser__tabs__list">
//                     {
//                         keys(visualiserItems).map((item, index) => {
//                             const classes =  classNames({
//                                 'visualiser__tabs__list__item': true,
//                                 'visualiser__tabs__list__item--active': this.state.selected === item
//                             });
//                             return (
//                                 <li className={classes} onClick={() => this.change(item)} key={`${index}__visualiser__key`}>{item}</li>
//                             )
//                         })
//                     }
//                 </ul>
//                 <div className="visualiser__content" id="visualiser-content">
//                     <div className="visualiser__content__code">
//           <pre>
//             1
//             2
//             3
//             4
//             5
//             6
//             7
//             8
//             9
//             10
//             11
//             12
//             13
//             14
//             15
//             16
//             17
//             18
//             19
//             20
//             21
//             22
//             23
//             25
//             26
//             27
//             28
//             </pre>
//                         <pre id="visualiser-code"><code dangerouslySetInnerHTML={{__html: code}}/></pre>
//                         <div id="slider" className="visualiser__content__code__slider">
//                             <div id="handle" className="visualiser__content__code__slider__handle">
//                                 <img src="/assets/img/split-toggle.png" draggable="false"/>
//                             </div>
//                         </div>
//                     </div>
//                     <div id="visualiser-graph" className="visualiser__content__graph" ref={(container) => this.graphContainer = container}>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
