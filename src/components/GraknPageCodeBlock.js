import React, { Component } from 'react';
import { keys } from 'lodash';
import classNames from 'classnames';

const graknCodeItems = require('config/graknCodeItems');

const Prism = require('prismjs');
const graqlHighlighter = require('helpers/prism-graql.js').graql;

class GraknPageCodeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: keys(graknCodeItems)[0]
    };
    this.change = this.change.bind(this);
  }

  change(i) {
    this.setState({
      selected: i,
    });
  }

  render() {
    const { selected } = this.state;
    const code = Prism.highlight(graknCodeItems[selected].code, graqlHighlighter);

    return (
      <div className="grakn-page-code">
        <div className="grakn-page-code__header">
          <span className="grakn-page-code__header__fake-btn" />
          <span className="grakn-page-code__header__fake-btn" />
          <span className="grakn-page-code__header__fake-btn" />
        </div>
        <div className="grakn-page-code__content">
          <div className="grakn-page-code__content__dets">
            <div className="grakn-page-code__content__dets__text">
              <span className="grakn-page-code__content__dets__text__header">{selected}</span>
              <span className="grakn-page-code__content__dets__text__paragraph">{graknCodeItems[selected].text}</span>
            </div>
            <div className="grakn-page-code__content__dets__buttons">
            {
              keys(graknCodeItems).map((item, index) => {
                const classes =  classNames({
                  'grakn-page-code__content__dets__buttons__item': true,
                  'grakn-page-code__content__dets__buttons__item--active': this.state.selected === item
                });
                return (
                  <span className={classes} onClick={() => this.change(item)} key={`${index}__visualiser__key`}>{index + 1}</span>
                )
              })
            }
            </div>
          </div>
          <div className="grakn-page-code__content__editor">
            <div className="grakn-page-code__content__editor__header">
              <span className="grakn-page-code__content__editor__header__fake-btn" />
              <span className="grakn-page-code__content__editor__header__fake-btn" />
              <span className="grakn-page-code__content__editor__header__fake-btn" />
              <span className="grakn-page-code__content__editor__header__file">{`${selected}.gql`}</span>
            </div>
            <div className="grakn-page-code__content__editor__content">
            <pre>
              <code dangerouslySetInnerHTML={{__html: code}}/>
            </pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GraknPageCodeBlock;