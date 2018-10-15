import React from 'react';
import Hammer from'react-hammerjs';
import AboutData from '~/static/data/about'
import CreateMarkup from '../../helpers/createmarkup'


class About extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      positionX: 0,
      windowWidth: window.innerWidth,
      widthSlide: 100, // only odd columns allowed
      className: 'animating--no',
      currentSlide: 3,
      totalSlide: AboutData.items.length,
      isScrolling: false,
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
      widthSlide: this.calcColumn(windowInnerWidth)
    });

    this.setState({
      windowWidth: windowInnerWidth
    });

    this.setActive(this.state.currentSlide)

  }

  calcColumn(){
    let columnNr = 100;
    if ( this.state.windowWidth > this.state.breakpoints['l'] ){
      columnNr = 20;
    } else  if ( this.state.windowWidth <  this.state.breakpoints['l'] + 1 &&
                this.state.windowWidth >  this.state.breakpoints['s'] + 1 ){
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

  aboutItemList(label,key){
    if (typeof label === 'object'){
      ////todo
      let tmp='';
      for (const key in label ){
        tmp += '<span class="type type__'+key+'">'+label[key]+'</span>';
      }
      return ( <li key={key} dangerouslySetInnerHTML={CreateMarkup(tmp)}></li>)
      ////todo
    }else{
      return <li key={key} dangerouslySetInnerHTML={CreateMarkup(label)}></li>
    }

  }

  aboutItemLink(prop){
    if (prop.link){
      return <a href={prop.link.url}>{prop.link.label}</a>;
    }
  }

  handlePaginationClick(key){

    this.setActive(key + 1);

  }

  aboutPaginationItem(item,key){

    const classMod = (key+1) === this.state.currentSlide ? ' slider__pagination__item--active' : '';

    return <li key={key} onClick={this.handlePaginationClick.bind(this,key)} className={`slider__pagination__item ${classMod}`} ></li>;
  }

  aboutPagination(items){
    let list = items.map( (item,key) => {
      return this.aboutPaginationItem(item,key);
    })
    return (
        <ul className="slider__pagination">
          {list}
        </ul>
      );
  }

  handleItemClick (event){
    console.log('ja');

    console.log('srcEvent',event.preventDefault());
    // let parent = event.target.parentNode
    // if (parent.nodeName !== 'ARTICLE'){
    //   console.log('hallo');
    //     parent = parent.parentNode
    // }
    // console.log('parent',parent);
    //this.setActive(key + 1);
  }

  imageFigure(image){
    const style = {
      backgroundImage: 'url('+image+')'
    }
    return (<figure className="slide__figure">
              <div className="slide__image" style={style}>Image</div>
            </figure>);
  }

  aboutItem(prop,key){

    const style = {
      width: this.state.widthSlide+'%'
    };

    if (key === 0 ){
      let median = (Math.round(100/this.state.widthSlide)+1)/2;
      style['marginLeft'] = (median-1)*this.state.widthSlide+'%';
    }

    let list = prop.list.map((label,key) => {
      return this.aboutItemList(label,key);
    });

    let image;
    if (prop.image) {
      image = this.imageFigure(prop.image);
    }


    const classMod = (key+1) === this.state.currentSlide ? ' slide--active' : '';

    return (
      <article key={key} className={`slide${classMod}`} style={style} onClick={this.handleItemClick.bind(this,key)}>
        <div className="slide__inner">
          <header className="slide__header">
              <h1 className="slide__title h2">{prop.title}</h1>
              <h2 className="slide__subtitle h4">{prop.subtitle}</h2>
          </header>
          { image }
          <div className="slide__description">
            <div dangerouslySetInnerHTML={CreateMarkup(prop.description)} />
          </div>
          <ul className="slide__items">
            {list}
          </ul>
          {this.aboutItemLink(prop)}
        </div>
      </article>
    )
  }


  handlePanStart(event){

    if (event.additionalEvent === 'panup' || event.additionalEvent === 'pandown') {
        this.setState({
          isScrolling: true
        });
    }

  }

  handlePan(event){

    // remove css animation because we don't want it to be sluggish
    this.setState({
      className:'animating--no'
    });

    if (!this.state.isScrolling) {

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

  }


  releasePan(event){

    // set css animation and reset scroll
    this.setState({
      className:'animating--yes',
      isScrolling: false
    });

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

    // // set slidenummer
    // this.setState({
    //   currentSlide:currentSlide
    // });

    // calculate slideposition
    // let slidePosition = direction * this.state.widthSlide;

    // this.setState({style:{
    //   transform: 'translate3d('+slidePosition+'%,0,0)'
    // }});

    // this.setState({
    //   positionX: slidePosition
    // });

    this.setActive(currentSlide);

  }

  setActive(slideNr){

    var columnWidth = this.calcColumn(this.state.windowWidth)
    let positionX = -Math.abs((slideNr-1)*columnWidth);

    this.setState({
      className:'animating--yes',
      currentSlide:slideNr, // set slidenummer
      positionX: positionX,
      style:{
        transform: 'translate3d('+positionX+'%,0,0)'
      }
    });

  }

  render() {

    let AboutItems = AboutData.items.map((item,key) => {
      return this.aboutItem(item,key);
    });

    let direction = 'DIRECTION_ALL';

    return (
      <section className="page about">
        <Hammer
          direction={direction}
          onTap={this.handleItemClick.bind(this)}
          onPanStart={this.handlePanStart.bind(this)}
          onPan={this.handlePan.bind(this)}
          onPanEnd={this.releasePan.bind(this)}
        >
          <section className="slider">
            <div className={`slider__slides ${this.state.className}`} style={this.state.style}>
              {AboutItems}
            </div>
          </section>
        </Hammer>
        {this.aboutPagination(AboutData.items)}
      </section>
    );
  }
}

export default About;
