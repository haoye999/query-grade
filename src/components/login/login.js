import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './login.less';

import { getToken } from 'api/token';

/**
 * props: 
 *  title
 *  setTips
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xh: '',
      pwd: '',
      msg: '',
      redirect: false
    };
    this.submitHandle = this.submitHandle.bind(this);
    this.handleXhChange = this.handleXhChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
  }

  handleXhChange(e) {
    this.setState({ xh: e.target.value });
  }

  handlePwdChange(e) {
    this.setState({ pwd: e.target.value });
  }

  submitHandle(e) {
    e.preventDefault();

    let msg = '';

    getToken(this.state.xh, this.state.pwd)
      .then(data => {
        msg = data.msg;
        if (data.flag) {
          localStorage.setItem('token', data.token);
          this.setState({
            redirect: true
          });
        }
      })
      .finally(() => this.props.setTips(msg));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/query" />
    }

    return (
      <Route
        path="/login"
        render={() => (
          <div className="login">
            <h1 className="title">
              {this.props.title || '请使用中南大学教务管理系统账号与密码登录'}
            </h1>
            <form className="login-form" onSubmit={this.submitHandle}>
              <div className="field">
                <input
                  type="text"
                  name="xh"
                  placeholder="学号"
                  value={this.state.xh}
                  onChange={this.handleXhChange}
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="pwd"
                  placeholder="密码"
                  value={this.state.pwd}
                  onChange={this.handlePwdChange}
                />
              </div>
              <button className="login-button">登录</button>
            </form>
          </div>
        )}
      />
    );
  }
}

export default Login;
