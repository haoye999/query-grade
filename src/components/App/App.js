import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.less';

import Login from 'components/login/login';
import Query from 'components/query/query';
import About from 'components/about/about';
import MyHeader from 'components/my-header/my-header';
import Tips from 'components/tips/tips';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tips: ''
    }
    this.setTips = this.setTips.bind(this);
  }

  setTips(tips, timeout=3000) {
    this.setState({
      tips
    });
    
    setTimeout(() => {
      this.setState({
        tips: ''
      })
    }, timeout);
  }

  render() {
    const { tips } = this.state;

    return (
      <Router>
        <div className="App">
          <MyHeader />
          <Tips tips={tips} />
          <Login setTips={this.setTips} />
          <Query setTips={this.setTips} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
