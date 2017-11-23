import React, { Component } from 'react';
import classNames from 'classnames';

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
      </div>
    )
  }
}

export default Visualiser;