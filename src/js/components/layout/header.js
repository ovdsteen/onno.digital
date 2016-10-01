import React from 'react';

import Logo from '../blocks/logo';
import Navigation from '../blocks/navigation';

class TopBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        title: 'onno.digital'
    };
  }

  render() {
    return (
      <header className="header">
          <div className="container">
              <div className="row">
                  <div className="column column--6">
                      <Logo title={this.state.title} />
                  </div>
                  <div className="column column--6">
                      <Navigation/>
                  </div>
              </div>
          </div>
      </header>
    );
  }
}

export default TopBar;
