import React, { Component } from 'react';
import classNames from 'classnames';
import Split from 'split.js';

const graphs = [
  {
    key: 'Movies'
  },
  {
    key: 'Titles'
  },
  {
    key: 'Casts'
  },
  {
    key: 'Horror'
  },
  {
    key: 'Directorship'
  },
];

class Visualiser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    Split(['#visualiser-code', '#visualiser-graph'], {
      sizes: [50, 50],
      gutterSize: 14,
      gutter: (index, direction) => {
        const gutter = document.createElement('div');
        const img = document.createElement('img');
        img.src = '/assets/img/split-toggle.png';
        img.ondrag = gutter.ondrag;
        gutter.className = `gutter gutter-${direction}`;
        gutter.appendChild(img);
        return gutter
      }
    });
  }
  change(i) {
    this.setState({
      selected: i,
    });
  }

  render() {
    return (
      <div className="visualiser">
        <ul className=" visualiser__tabs__list">
          {
            graphs.map((item, index) => {
              const classes =  classNames({
                'visualiser__tabs__list__item': true,
                'visualiser__tabs__list__item--active': this.state.selected === index
              });
              return (
                <li className={classes} onClick={() => this.change(index)} key={`${index}__visualiser__key`}>{item.key}</li>
              )
            })
          }
        </ul>
        <div className=" visualiser__content">
          <div id="visualiser-code" className="visualiser__content__code">
            CODE CODE CODE
          </div>
          <div id="visualiser-graph" className="visualiser__content__graph">
            Graph Graph
          </div>
        </div>
      </div>
    )
  }
}

export default Visualiser;