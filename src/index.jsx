import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import { Header, Navigation, Error } from './main';
import { Stats } from './stats';

import './index.css';

const wordleNumber = Math.floor((new Date().getTime() - new Date('January 31, 2022').getTime()) / (1000*60*60*24))+226;

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
      <div className='wrapper mx-auto p-3'>
        <p>
          NOTICE: With Twitter <a className='text-info' href='https://twitter.com/TwitterDev/status/1621026986784337922'>shutting off its open API</a>, WordleStat,
          and numerous other free and fun side projects will no longer function
          starting on February 9th. If you liked this website, please consider checking out some of my
          other work at my personal website here: <a className='text-info' href='https://jamesli.io'>jamesli.io</a>
        </p>
      </div>
      <Routes>
        <Route exact path='/' element={<Stats wordleNumber={wordleNumber} />} />
        <Route exact path='/:wordleNumberParam' element={<Stats />} />
        <Route exact path='/not-found' element={<Error type='Not Found' description={`
          Either you're requesting future data, or you're asking for data too old for us to collect.
        `} />} />
        <Route exact path='/error' element={<Error type='Internal Server Error' />} />
      </Routes>
      <p className='text-center mt-5'>Email me: <a href='mailto:lookatnums@gmail.com' className='text-white'>lookatnums@gmail.com</a></p>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);