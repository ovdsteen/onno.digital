import React from 'react';
import { RouteTransition } from 'react-router-transition';

import Header from '../layout/header';

class MainTemplate extends React.Component {

  render() {

    return (
      <div className="wrapper">
        <Header/>
        <div className="layout--full">
          <main className="main">
            <RouteTransition
              pathname={location.pathname}
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }} >
            { this.props.children }
            </RouteTransition>
          </main>
        </div>
      </div>
    );
  }
}

export default MainTemplate;
