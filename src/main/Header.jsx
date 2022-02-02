import React from "react";

import './header.css';

function Header(props) {

  return <div className='header-background'>
    <div className='wrapper mx-auto px-2'>
      <header className='d-flex justify-content-center py-2'>
        <div className='logo'>
          <span>WORDLE</span>
          <span>stat</span>
        </div>
        <div className='header-explain'>
          <a className='link-light'>what is this?</a>
        </div>
      </header>
    </div>
  </div>
  

}

export default Header;