import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import App from './components/App'
import Home from './components/Home'

import { onAppEnter } from './firebase.jsx';


export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={onAppEnter}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home} />
    </Route>
  </Router>
);
