import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './my-header.less';

function MyHeader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    function handleScroll() {
      let lastTop = 0;
      return function () {
        if (window.scrollY > lastTop) {
          setShow(false);
        } else {
          setShow(true);
        }

        lastTop = window.scrollY;
      };
    }

    window.onscroll = handleScroll();
  }, []);

  return (
    <div
      className={`my-header ${show ? '' : 'my-header-disabled'}`}
    >
      <h1 className='title'>成绩查询系统(中南大学)</h1>
      <div className='link-contianer'>
        <Link to='/login/'>登录</Link>
        <Link to='/query/'>查询</Link>
        <Link to='/about/'>关于</Link>
      </div>
    </div>
  );
}

export default MyHeader;
