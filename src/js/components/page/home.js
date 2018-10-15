import React from 'react';
import { Link } from 'react-router-dom'
import CreateMarkup from '../../helpers/createmarkup'
import HomeData from '~/static/data/home.json'

function Home() {

  const bgStyle = {
    backgroundImage: 'url(' + HomeData.background + ')'
  };

  return (
    <section className="page homepage">
      <div className="container">
        <div className="row">
          <article className="column column--12">
              <div className="column__inner">
                <header className="large-header">
                  <h1 className="large-header__title h1" dangerouslySetInnerHTML={CreateMarkup(HomeData.title)} />
                  <h2 className="large-header__subtitle h2">{HomeData.subtitle}</h2>
                </header>
                <div className="description">
                  <p>{HomeData.description}</p>
                   <Link to="about" className="more" >Meer</Link>
                </div>
              </div>
          </article>
        </div>
      </div>
      <div className="background" style={bgStyle}></div>
    </section>
  );

}

export default Home;
