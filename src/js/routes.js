import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import MainTemplate from './components/template/main'

import Home from './components/page/home'
import About from './components/page/about'
import Iot from './components/page/iot'
import NoMatch from './components/page/404';

const Routes =  (
  <Route component={MainTemplate}>
    <IndexRedirect to="/" />
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/iot" component={Iot} />
    <Route path="*" component={NoMatch}/>
  </Route>

);

export default Routes;
