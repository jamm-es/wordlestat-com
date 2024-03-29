import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import { Header, Navigation, Error } from './main';
import { Stats } from './stats';

import './index.css';

// const wordleNumber = Math.floor((new Date().getTime() - new Date('January 31, 2022').getTime()) / (1000*60*60*24))+226;
const wordleNumber = 720;

ReactDOM.render(
  <React.StrictMode>
    <Helmet titleTemplate='%s | WordleStat' >
      <title>Today's Stats</title>
      <meta 
        name='description' 
        content="Compare your wordle game with global overall results. Win rates, guess frequency, difficulty, comparisons, and average Wordle letter and row outcome analysis and statistics for today's Wordle"
      />
    </Helmet>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Navigation wordleNumber={wordleNumber} />} />
        <Route exact path='/not-found' />
        <Route exact path='/error' />
        <Route exact path='/:wordleNumberParam' element={<Navigation />} />
      </Routes>
      <Routes>
        <Route exact path='/' element={<Stats wordleNumber={wordleNumber} />} />
        <Route exact path='/:wordleNumberParam' element={<Stats />} />
        <Route exact path='/not-found' element={<Error type='Not Found' description={`
          Either you're requesting future data, or you're asking for data too old for us to collect.
        `} />} />
        <Route exact path='/error' element={<Error type='Internal Server Error' />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);