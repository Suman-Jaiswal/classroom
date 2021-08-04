import React from "react";
import {Link} from 'react-router-dom'
import "./NavbarComponent.scss";
import logo from '../../assets/brand.svg'

export default function NavbarComponent({signOut, user}) {
    return (
        <nav className={'nav-return-wrapper'}>
            <Link to={'/'} className={'brand-container'}>
                <img id="logo" src={logo} alt={'iiti-logo'}/>
                <span>Classroom</span>
            </Link>
            {
                user ?
                    <div className={'nav-right-wrapper'}>
                        <img src={user.photoURL}
                             alt={user.name}/>
                        {user ?
                            <button onClick={signOut}>Log Out</button>
                            : null
                        }
                    </div>
                    : null
            }
        </nav>
    )
}
