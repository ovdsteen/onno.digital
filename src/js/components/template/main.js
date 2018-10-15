import React from 'react';
import Routes from '../../routes'
import Header from '../layout/header';

class MainTemplate extends React.Component {

  render() {

    return (
      <div className="wrapper">
        <Header/>
        <div className="layout--full">
          <main className="main">
            {Routes}
          </main>
        </div>
      </div>
    );
  }
}

export default MainTemplate;
