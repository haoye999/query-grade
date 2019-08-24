import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.less';

import Login from 'components/login/login';
import Query from 'components/query/query';
import About from 'components/about/about';
import MyHeader from 'components/my-header/my-header';
import Tips from 'components/tips/tips';

function App() {
  return (
    <Router>
      <div className='App'>
        <MyHeader />
        <Route path={'/login'} component={Login} />
        <Route path={['/query', '/']} exact component={Query} />
        <Route path={'/about'} component={About} />
      </div>
    </Router>
  );
}

export default App;
