import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { keys } from 'lodash';
import { connect } from 'react-redux';

import vis from 'vis';
import Resizable from 're-resizable';

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
    this.initializeGraph();
    window.addEventListener('resize', this.drawGraph);
  }

  componentDidUpdate(prevProps) {
    if ((this.props.media.is.extraSmall && !prevProps.media.is.extraSmall) || (!this.props.media.is.extraSmall && prevProps.media.is.extraSmall)) {
      this.initializeGraph();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.drawGraph);
  }

  change(i) {
    this.setState({
      selected: i,
    }, function() {
      this.drawGraph()
    });
  }

  initializeGraph() {
    const container = this.graphContainer;
    const g = {
      nodes: new vis.DataSet(),
      edges: new vis.DataSet(),
    }
    const options = {
      autoResize: false,
      interaction: {
        selectable: false,
        zoomView: false,
        dragView: false
      },
      nodes: {
        borderWidth: 0,
        font: {
          color: '#2f3544',
          size: this.props.media && this.props.media.is.extraSmall? 8 : 16,
          face: 'Ubuntu'

        },
        margin: this.props.media && this.props.media.is.extraSmall? 2 : 10,
        fixed: true
      },
      edges: {
        color: {
          color: '#576484'
        },
        dashes: [2,5],
        arrows: 'to',
        width: 2,
        smooth: {
          enabled: false
        },
        font: {
          color: '#7182ae',
          size: this.props.media && this.props.media.is.extraSmall? 10 : 16,
          face: 'Ubuntu',
          strokeWidth: 0,
          background: '#3b4254'

        },
      },
      groups: {
        entity: {
          shape: 'box',
          color: {
            background: '#46cd90'
          },
        },
        'entity-type': {
          shape: 'box',
          color: {
            background: '#46cd90'
          },
        },
        relationship: {
          shape: 'diamond',
          size: this.props.media && this.props.media.is.extraSmall? 20 : 50,          
          color: {
            background: '#667fc9'
          },
          font: {
            vadjust: this.props.media && this.props.media.is.extraSmall? -30 : -65           
          }
        },
        'relationship-type': {
          shape: 'diamond',
          size: this.props.media && this.props.media.is.extraSmall? 30 : 50,
          color: {
            background: '#667fc9'
          },
          font: {
            vadjust: this.props.media && this.props.media.is.extraSmall? -40 : -65
          }
        },
        attribute: {
          shape: 'ellipse',
          color: {
            background: '#f3bd60'
          }
        },
        'attribute-type': {
          shape: 'ellipse',
          color: {
            background: '#f3bd60'
          }
        }
      }
    };
    const network = new vis.Network(container, g, options);

    this.setState({
      network: network,
    },function() {
      setTimeout(this.drawGraph, 1000);
    });
  }

  drawGraph() {
    const network = this.state.network;
    const dataset = visualiserItems[this.state.selected].graph;
    const nodes = [];
    const edges = [];
    const container = this.graphContainer;
    let width = 900;
    let height = 514;
    if (container.clientWidth && container.clientWidth < width) {
      width = container.offsetWidth;
    }
    dataset.nodes.map((item, index) => {
      nodes.push({
        id: index,
        group: item.type,
        label: item.text,
        x: ((item.cx - 15) / 100 ) * width ,
        y: (item.cy  / 100 ) * height
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
    network.setSize(width, height);
    network.redraw();
  }

  render() {
    const code = Prism.highlight(visualiserItems[this.state.selected].code, graqlHighlighter);

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
          <Resizable 
            id="visualiser-code" 
            className="visualiser__content__code"
            enable={{top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            defaultSize= {{
              width: '50%',
              height: '100%'
            }}
            minWidth='5%'
            maxWidth='95%'
            handleWrapperClass="resizer__handle"
            >
            <pre>
                <code dangerouslySetInnerHTML={{__html: code}}/>
              </pre>
          </Resizable>          
          <div id="visualiser-graph" className="visualiser__content__graph" ref={(container) => this.graphContainer = container}>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    media: state.browser
  }
);

export default connect(mapStateToProps, null)(Visualiser);