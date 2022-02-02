import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header, Navigation } from './main';
import { Stats } from './stats';

import './index.css';

const wordleNumber = Math.floor((new Date().getTime() - new Date('January 31, 2022').getTime()) / (1000*60*60*24))+226;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Navigation wordleNumber={wordleNumber} />} />
        <Route exact path='/:wordleNumberParam' element={<Navigation />} />
      </Routes>
      <Routes>
        <Route exact path='/' element={<Stats wordleNumber={wordleNumber} />} />
        <Route exact path='/:wordleNumberParam' element={<Stats />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);