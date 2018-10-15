import React from 'react';
import { Link } from 'react-router-dom'

function Logo(props) {
  return <h1 className="h5 logo">
      <Link to='' >{props.title}</Link>
    </h1>;
}

export default Logo;
