import React from 'react';
import { Route } from 'react-router';
import { AnimatedSwitch } from 'react-router-transition'

import Home from './components/page/home'
import About from './components/page/about'
import NoMatch from './components/page/404';

const Routes =  (
  <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
  >
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="*" component={NoMatch}/>
  </AnimatedSwitch>
);

export default Routes;
