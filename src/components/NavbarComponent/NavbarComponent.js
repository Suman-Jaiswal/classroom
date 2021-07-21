import React from "react";
import { Link } from 'react-router-dom'
import "./NavbarComponent.scss";
import logo from '../../assets/classroom-svgrepo-com.svg'

export default function NavbarComponent({signOut, user}) {
    return (
        <nav className={'nav-return-wrapper'}>
            <div className="brand-container">
                <img src={logo} alt={'iiti-logo'} />
                <Link to={'/'}>Classroom</Link>
            </div>
            {
                user ? <span> <img src={user.photoURL} alt="" /> <span id='name'>{user.displayName}</span> {
                    user ? <button variant={'danger'} className='btn-sm' onClick={signOut} > Log Out</button> : null
                }</span> : null
            }
        </nav>
    )
}
