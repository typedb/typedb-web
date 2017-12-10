import React , { Component } from 'react';

class PagingComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      pages: 0,
      activePage: 1,
      stepSize: 0,
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.initialisePages = this.initialisePages.bind(this);
  }

  componentDidMount() {
    this.initialisePages();
    window.addEventListener('resize', this.initialisePages);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.initialisePages);
  }

  componentDidUpdate(oldProps) {
    if (this.props.children.length !== oldProps.children.length) {
      initialisePages();
    }
  }

  initialisePages() {
    const childrenLength = this.props.children.length;
    let stepSize = 3;
    if (window.innerWidth <= 700) {
      stepSize = 1;
    }
    else if (window.innerWidth <= 992) {
      stepSize = 2;
    }
    const pages = Math.ceil(childrenLength / stepSize);
    this.setState({
      pages,
      stepSize,
    });
  }

  nextPage() {
    if (this.state.activePage < this.state.pages) {
      this.setState({
        activePage: this.state.activePage + 1
      });
    }
  }

  prevPage() {
    if (this.state.activePage > 1) {
      this.setState({
        activePage: this.state.activePage - 1
      });
    }
  }

  render () {
    const pageElements = this.props.children.slice((this.state.activePage-1)*this.state.stepSize, ((this.state.activePage-1)*this.state.stepSize)+this.state.stepSize);
    const overrideClasses = this.props.className || '';
    const classes = [overrideClasses, 'paging-component'].join(" ");
    return (
      <div className={classes}>
        <button className="paging-component__button paging-component__button--left" onClick={() => this.prevPage()} disabled={this.state.activePage == 1}>
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </button>
        <div className="paging-component__content">
          {
            pageElements.map((item, index) => {
              return item;
            })
          }
        </div>
        <button className="paging-component__button paging-component__button--right" onClick={() => this.nextPage()}  disabled={this.state.activePage == this.state.pages}>
          <i className="fa fa-chevron-right" aria-hidden="true" />
        </button>
      </div>
    )
  }
};
export default PagingComponent;