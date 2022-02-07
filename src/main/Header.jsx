import { useState } from 'react';
import { Modal } from 'react-bootstrap';

import './header.css';

function Header(props) {
  const [show, setShow] = useState(false);

  return <div className='header-background'>
    <div className='wrapper mx-auto px-2'>
      <header className='d-flex justify-content-center py-2'>
        <div className='logo'>
          <span>WORDLE</span>
          <span>stat</span>
        </div>
        <div className='header-explain'>
          <a className='link-light' onClick={() => setShow(true)} >what is this?</a>
        </div>
      </header>
    </div>

    <Modal show={show} onHide={() => setShow(false)} body-bg-variant='dark'>
      <Modal.Body style={{ backgroundColor: 'var(--bs-gray-700)'}}>
        WordleStat compiles wordle game results posted on Twitter and
        aggregates statistics about the given wordle, such as win rates
        and correct/incorrect guess distributions. A maximum of
        ~150 tweets are collected and processed every 10 minutes. We are not affiliated
        with Wordle itself.
      </Modal.Body>
    </Modal>
  </div>
  

}

export default Header;