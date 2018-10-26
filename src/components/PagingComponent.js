import React , { Component } from 'react';
import classNames from 'classnames';

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
    this.setupAuto = this.setupAuto.bind(this);
  }

  componentDidMount() {
    this.initialisePages();
    if(this.props.auto) {
      this.setupAuto();
    }
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
      activePage: 1,
    });
  }

  nextPage() {
    if (this.state.activePage < this.state.pages) {
      this.setState({
        activePage: this.state.activePage + 1
      });
    }
    else {
      this.setState({
        activePage: 1,
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

  setupAuto() {
    const next = this.nextPage;
    const intervalTime = this.props.timeOut? this.props.timeOut : 5000;
    setInterval(function() {
      next();
    }, intervalTime);
  }

  render () {
    const lowerBound = (this.state.activePage-1)*this.state.stepSize;
    const upperBound = ((this.state.activePage-1)*this.state.stepSize)+this.state.stepSize;
    const overrideClasses = this.props.className || '';
    const classes = [overrideClasses, 'paging-component'].join(" ");
    const leftButtonClasses = classNames({
      'paging-component__button': true,
      'paging-component__button--left': true,
      'paging-component__button--hidden': this.state.pages == 1,
      'paging-component__button--invisible': this.props.auto
    });
    const rightButtonClasses = classNames({
      'paging-component__button': true,
      'paging-component__button--right': true,
      'paging-component__button--hidden': this.state.pages == 1,
      'paging-component__button--invisible': this.props.auto
    });
    const contentClasses = classNames({
      "paging-component__content": true,
      "paging-component__content--full": this.state.pages == 1,
    })
    return (
      <div className={classes}>
        <button className={leftButtonClasses} onClick={() => this.prevPage()} disabled={this.state.activePage == 1}>
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </button>
        <div className={contentClasses}>
          {
            this.props.children.map((item, index) => {
              const childClasses = classNames(
                item.props.className,
                {
                  'paging-component__content__item--active': index < upperBound && index >= lowerBound,
                  [item.props.className + "--active"]: index < upperBound && index >= lowerBound,
                  'paging-component__content__item': true,
                });
                const newChild = React.cloneElement(
                  item,
                  {className: childClasses,
                    key: `${index}__${item.props.className.split(' ').join('_')}`
                  }
                );
              return newChild;
            })
          }
        </div>
          <button className={rightButtonClasses} onClick={() => this.nextPage()}  disabled={this.state.activePage == this.state.pages}>
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </button>
      </div>
    )
  }
};
export default PagingComponent;