import React from 'react';
import Hammer from'react-hammerjs';
import AboutData from '../../../data/about'
import CreateMarkup from '../../helpers/createmarkup'

class About extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      positionX: 0,
      windowWidth: window.innerWidth, // todo: media query
      widthSlide: 100, // only odd columns allowed // todo: dynanmisch ophalen + media query
      className: 'animating--no',
      currentSlide: 3,
      totalSlide: AboutData.items.length,
      breakpoints: {
        s: 768,
        m: 1024,
        l: 1440
      }
    };

  }

  // todo...Bounce/Throttle
  handleResize() {

    const windowInnerWidth = window.innerWidth;

    this.setState({
      widthSlide: this.calcColumn(windowInnerWidth,this.state.breakpoints)
    });

    this.setState({
      windowWidth: windowInnerWidth
    });

  }

  calcColumn(w,b){
    let columnNr = 100;
    if ( w > b['l'] ){
      columnNr = 20;
    }else  if ( w <  b['l'] + 1 &&
                w >  b['s'] + 1 ){
      columnNr = 33.33333;
    }
    return columnNr;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize()
    this.setActive(this.state.currentSlide);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  CvItemList(label,key){
    return <li key={key} dangerouslySetInnerHTML={CreateMarkup(label)}></li>
  }

  CvItemLink(prop){
    if (prop.link){
      return <a href={prop.link.url}>{prop.link.label}</a>;
    }
  }

  CvItem(prop,key){

    const style = {
      width: this.state.widthSlide+'%'
    };

    if (key === 0 ){
      let median = (Math.round(100/this.state.widthSlide)+1)/2;
      style['marginLeft'] = (median-1)*this.state.widthSlide+'%';
    }

    let list = prop.list.map((label,key) => {
      return this.CvItemList(label,key);
    });

    let CvItemLink = (<div>loading</div>)

    return (
      <article key={key} className="slide" style={style}>
        <div className="slide__inner">
          <header className="large-header">
              <h1 className="large-header__title h2">{prop.title}</h1>
              <h2 className="large-header__subtitle h4">{prop.subtitle}</h2>
          </header>
          <div className="description">
              <p>{prop.description}</p>
              <ul>
                {list}
              </ul>
              {this.CvItemLink(prop)}
          </div>
        </div>
      </article>
    )
  }

  handlePan(event){

    // remove css animation because we don't want it to be sluggish
    this.setState({className:'animating--no'});

    // deltaX to viewport width
    let deltaX = Math.round((event.deltaX/this.state.windowWidth)*100);
    //let deltaX = event.deltaX;

    // sum latest position with deltaX
    let translateX = this.state.positionX + deltaX;

    // transform position
    this.setState({style:{
      transform: 'translate3d('+translateX+'%,0,0)'
    }});

  }


  releasePan(event){

    // set css animation
    this.setState({className:'animating--yes'});

    // deltaX to viewport width
    let deltaX = Math.round((event.deltaX/this.state.windowWidth)*100);

    // set latest position
    let positionX =  this.state.positionX + deltaX;

    // calculate direction. Int: min and plus
    let direction = Math.round((positionX/this.state.widthSlide));

    // No items on begining
    if ( direction > 0 ){
      direction = 0
    }

    // No items on end
    if ( (Math.abs(direction)+1) >= this.state.totalSlide ){
      direction = - Math.abs(this.state.totalSlide - 1)
    }

    // remove min/plus and add one
    let currentSlide = Math.abs(direction) + 1;

    // set slidenummer
    this.setState({currentSlide:currentSlide});



    // calculate median
    // let median = (Math.round(100/this.state.widthSlide)+1)/2;

    // calculate slideposition
    let slidePosition = direction * this.state.widthSlide;

    this.setState({style:{
      transform: 'translate3d('+slidePosition+'%,0,0)'
    }});

    this.setState({
      positionX: slidePosition
    });

    this.setActive(this.state.currentSlide);

  }

  setActive(slideNr){

    /////////////// TODO: Bah

    const x = document.getElementsByClassName('slide');
    for (var i = 0; i < x.length; i++) x[i].classList.remove('slide--active');
    x[slideNr-1].classList.add('slide--active')

    var columnWidth = this.calcColumn(this.state.windowWidth,this.state.breakpoints)

    this.state.positionX = -Math.abs((this.state.currentSlide-1)*columnWidth);


    // this.setState({
    //   positionX: slidePosition
    // });
    this.setState({style:{
      transform: 'translate3d('+this.state.positionX+'%,0,0)'
    }});

    ///////////////

  }

  render() {

    let CVitems = AboutData.items.map((item,key) => {
      return this.CvItem(item,key);
    });


    return (
      <section className="page about">
        <Hammer direction={Hammer.DIRECTION_HORIZONTAL} onPan={this.handlePan.bind(this)} onPanEnd={this.releasePan.bind(this)}>
          <section className="slider">
            <div className={this.state.className} style={this.state.style}>
              {CVitems}
            </div>
          </section>
        </Hammer>
      </section>
    );
  }
}

export default About;
