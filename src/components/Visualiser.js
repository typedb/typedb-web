import React, { Component } from 'react';
import classNames from 'classnames';
import Split from 'split.js';
import { keys } from 'lodash';

const Prism = require('prismjs');
const graqlHighlighter = require('helpers/prism-graql.js').graql;
const visualiserItems = require('config/visualiserItems');


class Visualiser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: keys(visualiserItems)[0],
    };
    this.change = this.change.bind(this);
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
    });
  }
  change(i) {
    this.setState({
      selected: i,
    });
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
          <div id="visualiser-graph" className="visualiser__content__graph">
            Graph
          </div>
        </div>
      </div>
    )
  }
}

export default Visualiser;