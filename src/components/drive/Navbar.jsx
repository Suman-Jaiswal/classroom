import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function NavbarComponent() {
  return (
     <Navbar bg='light' expand='xlg'>
      <Navbar.Brand as={Link} to='/' className='mx-5'>
        Drive
      </Navbar.Brand>
      <Nav.Link as={Link} to='/user' className='mx-5'>
        Profile
      </Nav.Link>
     </Navbar>
  )
}
