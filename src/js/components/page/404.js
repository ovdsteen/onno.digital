import React from 'react';

function NoMatch() {
  return (
    <div className="container">
      <div className="row">
        <article className="column column--12">
            <div className="column__inner">
              <header className="large-header">
                <h1 className="large-header__title h1">:(</h1>
                  <br/>
                <h2 className="large-header__subtitle h2">page not found</h2>
              </header>
            </div>
        </article>
      </div>
    </div>
  );
}

export default NoMatch;
