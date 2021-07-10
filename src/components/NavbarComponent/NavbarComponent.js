import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function NavbarComponent(props) {
    return (
        <Navbar bg='light' expand='xlg'>
            <Navbar.Brand as={Link} to='/' className='mx-5'>
                Classroom
            </Navbar.Brand>
            <Nav.Link className='mx-5'>
                {props.signInButton}
            </Nav.Link>
            <Nav.Link as={Link} to='/profile' className='mx-5'>
                View Profile
            </Nav.Link>
        </Navbar>
    )
}
