import React from "react";
import { Link } from 'react-router-dom'
import "./NavbarComponent.scss";

export default function NavbarComponent({signOut, user}) {
    return (
        <nav className={'nav-return-wrapper'}>
            <div className="brand-container">
                <img id="logo" src="/img/brand.svg" alt={'iiti-logo'} />
                <Link to={'/'}>Classroom</Link>
            </div>
            {
                user ? <span> <img src={user.photoURL} alt="" /> <span id='name'>{user.displayName}</span> {
                    user ? <button className='sign-button' onClick={signOut} > Log Out</button> : null
                }</span> : null
            }
        </nav>
    )
}
