import React from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';

import './header.css';

function Header(props) {

  return <header>
    <Navbar className='justify-content-between mx-auto' variant='dark'>
      <Nav.Link href={`/${props.wordleNumber-1}`}>
        Prev
      </Nav.Link>
      <Navbar.Brand>
        WORDLESTAT
      </Navbar.Brand>
      <Nav.Link href={`/${props.wordleNumber+1}`}>
        Next
      </Nav.Link>
    </Navbar>
  </header>

}

export default Header;