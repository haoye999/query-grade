import React from 'react';
import { Link } from 'react-router-dom';
import './my-header.less';
import { throttle } from 'assets/js/util';

class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.handleScroll = throttle(this.handleScroll().bind(this), 50);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
  }

  handleScroll() {
    let lastTop = 0;

    return function() {
      if (window.scrollY > lastTop && this.state.show) {
        this.setState({
          show: false
        });
      } else if (window.scrollY < lastTop && !this.state.show) {
        this.setState({
          show: true
        });
      }

      lastTop = window.scrollY;
    };
  }

  render() {
    return (
      <div
        className={
          this.state.show ? 'my-header' : 'my-header my-header-disabled'
        }
      >
        <h1 className="title">成绩查询系统(中南大学)</h1>
        <div className="link-contianer">
          <Link to="/login/">登录</Link>
          <Link to="/query/">查询</Link>
          <Link to="/about/">关于</Link>
        </div>
      </div>
    );
  }
}

export default MyHeader;
