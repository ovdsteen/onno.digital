import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainTemplate from './js/components/template/main'

import './scss/main.scss';


ReactDOM.render(
  <BrowserRouter>
    <MainTemplate/>
  </BrowserRouter>,
  document.getElementById('app')
);
