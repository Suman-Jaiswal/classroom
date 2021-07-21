import React from "react";
import "./NavbarComponent.scss";
import logo from '../../assets/classroom-svgrepo-com.svg'
import { Button } from "react-bootstrap";

export default function NavbarComponent({ signOut, user }) {
    return (
        <nav className={'nav-return-wrapper'}>
            <div className="brand-container">
                <img src={logo} alt={'iiti-logo'} />
                <span>Classroom</span>
            </div>
            {
                user ? <span>{user.displayName}</span> : null
            }

            {
                user ? <Button variant={'danger'} onClick={signOut} > Log Out</Button> : null
            }


        </nav>
    )
}
