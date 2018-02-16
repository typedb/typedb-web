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
              <div className="grakn-page-code__content__dets__text__paragraph" dangerouslySetInnerHTML={{__html: graknCodeItems[selected].text}} />
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
                1
                2
                3
                4
                5
                6
                7
                8
                9
                10
                11
                12
                13
                14
                15
                16
                17 18 19 20 21 22 23 
              </pre>
              <pre>
                <code dangerouslySetInnerHTML={{__html: code}}/>
              </pre>
            </div>
            <div className="grakn-page-code__content__editor__footer">
              <img src="assets/svg/grakn-code-block.svg" className="grakn-page-code__content__editor__footer__img" />
              <span className="grakn-page-code__content__editor__footer__text">Graql</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GraknPageCodeBlock;