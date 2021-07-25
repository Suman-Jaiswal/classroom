import React from "react";
import { Link } from 'react-router-dom'
import "./NavbarComponent.scss";
import logo from '../../assets/brand.svg'
import SearchButton from "../drive/SearchButton";

export default function NavbarComponent({ signOut, user }) {
    return (
        <nav className={'nav-return-wrapper'}>
            <div className="brand-container">
                <img id="logo" src={logo} alt={'iiti-logo'} />
                <Link to={'/'}>Classroom</Link>
            </div>
            {
                user ?
                <div className="nav-right-wrapper">
                        <SearchButton/>
                        <img src={user.photoURL} alt="" />
                        <span id='name'>{user.displayName}</span>
                        {user ?
                            <button className='sign-button' onClick={signOut}> Log Out</button>
                            : null
                        }
                    </div>
                    : null
            }
        </nav>
    )
}
