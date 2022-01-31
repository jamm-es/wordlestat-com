import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header, Footer } from './main';
import { Stats } from './stats';

import './index.css';

const wordleNumber = Math.floor((new Date().getTime() - new Date('January 31, 2022').getTime()) / (1000*60*60*24))+226;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Header wordleNumber={wordleNumber} />} />
        <Route exact path='/:wordleNumber' element={<Header />} />
      </Routes>
      <Routes>
        <Route exact path='/' element={<Stats wordleNumber={wordleNumber} />} />
        <Route exact path='/:wordleNumber' element={<Stats />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);