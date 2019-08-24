import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import message from 'components/message';
import { getToken } from 'api/token';

import './login.less';

function Login(props) {
  const [xh, setXh] = useState('');
  const [pwd, setPwd] = useState('');
  const title = '请使用中南大学教务管理系统账号与密码登录';

  function handleXhChange(e) {
    setXh(e.target.value);
  }

  function handlePwdChange(e) {
    setPwd(e.target.value);
  }

  function submitHandle(e) {
    e.preventDefault();
    getToken(xh, pwd)
      .then(data => {
        if (data.flag === '1') {
          localStorage.setItem('token', data.token);
          props.history.push('/query');
        } else {
          setXh('');
          setPwd('');
        }
        message.success(data.msg);
      })
      .catch((ex) => message.error(ex.message));
  }

  return (
    <div className='login'>
      <h1 className='title'>{title}</h1>
      <form className='login-form' onSubmit={submitHandle}>
        <div className='field'>
          <input
            type='text'
            name='xh'
            placeholder='学号'
            value={xh}
            onChange={handleXhChange}
          />
        </div>
        <div className='field'>
          <input
            type='password'
            name='pwd'
            placeholder='密码'
            value={pwd}
            onChange={handlePwdChange}
          />
        </div>
        <button className='login-button'>登录</button>
      </form>
    </div>
  );
}

export default withRouter(Login);