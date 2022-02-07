import React from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import './navigation.css';

function Navigation(props) {

  const { wordleNumberParam } = useParams();
  const wordleNumber = +(wordleNumberParam ?? props.wordleNumber);

  const wordleDate = new Date('February 1, 2022');
  wordleDate.setDate(wordleNumber - 227 + wordleDate.getDate());

  const disablePrevNav = wordleDate.getTime() <= new Date('January 30, 2022').getTime();
  const disableNextNav = wordleDate.getTime() >= new Date().getTime();

  return <div className='nav-background'>
    <div className='wrapper mx-auto'>
      <Navbar className='justify-content-between align-center mx-auto px-2' variant='dark'>
        <Nav.Link href={`/${wordleNumber - 1}`} className={disablePrevNav ? 'text-muted' : 'text-info'} disabled={disablePrevNav} >
          <span className='fas fa-chevron-left' /> {wordleNumber - 1}
        </Nav.Link>
        <Nav.Item className='d-flex flex-column text-center'>
          <div className='d-border-box'>
            {wordleNumber}
          </div>
          <div className='nav-date'>
            {wordleDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}
          </div >
        </Nav.Item>
        <Nav.Link href={`/${wordleNumber + 1}`} className={disableNextNav ? 'text-muted' : 'text-info'} disabled={disableNextNav} >
          {wordleNumber + 1} <span className='fas fa-chevron-right' /> 
        </Nav.Link>
      </Navbar>
    </div>
  </div>

}

export default Navigation;