import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Split from 'split.js';
import { keys } from 'lodash';

import vis from 'vis';

const Prism = require('prismjs');
const graqlHighlighter = require('helpers/prism-graql.js').graql;
const visualiserItems = require('config/visualiserItems');


class Visualiser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: keys(visualiserItems)[0],
      network: null,
    };
    this.change = this.change.bind(this);
    this.drawGraph = this.drawGraph.bind(this);
    this.initializeGraph = this.initializeGraph.bind(this);
  }

  componentDidMount() {
    Split(['#visualiser-code', '#visualiser-graph'], {
      sizes: [50, 50],
      gutterSize: 14,
      snapOffset: 0,      
      gutter: (index, direction) => {
        const gutter = document.createElement('div');
        const img = document.createElement('img');
        img.src = '/assets/img/split-toggle.png';
        img.ondrag = gutter.ondrag;
        gutter.className = `gutter gutter-${direction}`;
        gutter.appendChild(img);
        return gutter
      },
    })
    ;
    this.initializeGraph();
  }
  change(i) {
    this.setState({
      selected: i,
    }, this.drawGraph(visualiserItems[i].graph));
  }

  initializeGraph() {
    const container = this.graphContainer;    
    const g = {
      nodes: new vis.DataSet(),
      edges: new vis.DataSet(),
    }
    const options = {
      nodes: {
        borderWidth: 1,
        size: 10,
        color: {
          background: '#667fc9'
        },
        font: {
          color: '#000',

        },
        shape: 'box',
        fixed: true
      },
      edges: {
        color: 'white',
        arrows: 'to',
      },
    };
    const network = new vis.Network(container, g, options);
    network.on('resize', function() {
      network.fit();
    });
    this.setState({
      network: network,
    },this.drawGraph(visualiserItems[this.state.selected].graph, network));
  }

  drawGraph(dataset,alternateNetwork) {
    const network = alternateNetwork? alternateNetwork : this.state.network;
    const nodes = [];
    const edges = [];
    const container = this.graphContainer;
    dataset.nodes.map((item, index) => {
      nodes.push({
        id: index,
        group: item.type,
        label: item.text,
        x: (item.cx / 100 ) * container.offsetWidth,
        y: (item.cy / 100 ) * 514
      });
    });
    dataset.edges.map((item, index) => {
      edges.push({
        from: item.source,
        to: item.target,
        label: item.text
      });
    });
    const g = {
      nodes: new vis.DataSet(nodes),
      edges: new vis.DataSet(edges),
    };
    network.setData(g);
    network.redraw();
    network.fit();
  }

  render() {
    const code = Prism.highlight(visualiserItems[this.state.selected].code, graqlHighlighter)
    return (
      <div className="visualiser">
        <ul className=" visualiser__tabs__list">
          {
            keys(visualiserItems).map((item, index) => {
              const classes =  classNames({
                'visualiser__tabs__list__item': true,
                'visualiser__tabs__list__item--active': this.state.selected === item
              });
              return (
                <li className={classes} onClick={() => this.change(item)} key={`${index}__visualiser__key`}>{item}</li>
              )
            })
          }
        </ul>
        <div className=" visualiser__content">
          <div id="visualiser-code" className="visualiser__content__code">
             <pre>
                <code dangerouslySetInnerHTML={{__html: code}}/>
              </pre>
          </div>
          <div id="visualiser-graph" className="visualiser__content__graph" ref={(container) => this.graphContainer = container}>
          </div>
        </div>
      </div>
    )
  }
}

export default Visualiser;