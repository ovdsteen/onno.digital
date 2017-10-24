import React from 'react';
import Slider from 'rc-slider';
import '../../../scss/blocks/_rc-slider.scss';

class Iot extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      value: 0
    };

  }

  componentDidMount() {
  }

  componentWillUnmount() {  
  }

  onSliderChange(value) {
    fetch('/api/iot/nodemcu', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        percentage: value
      })
    })
  }

  render() {

    const bgStyle = {
      backgroundImage: 'url(img/io.jpg)'
    };

    return (
      <section className="page iot color">
        <div className="container">
        <div className="row">
          <article className="column column--12">
              <div className="column__inner">
                <header className="large-header">
                  <h1 className="large-header__title h1">Iot</h1>
                </header>
                <div className="description">
                  <Slider onAfterChange={this.onSliderChange} />
                </div>
              </div>
          </article>
        </div>
      </div>
      <div className="background" style={bgStyle}></div>
      </section>
    );
  }
}

export default Iot;
