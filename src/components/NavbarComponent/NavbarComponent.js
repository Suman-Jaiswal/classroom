import React from "react";
import "./NavbarComponent.scss";
import logo from '../../assets/iitiW.webp'

export default function NavbarComponent() {

    return (
        <nav className={'nav-return-wrapper'}>
            <img src={logo} alt={'iiti-logo'}/>
            <div className={'nav-buttons-wrapper'}>
                <button name={'signInButton'}>Sign In</button>
            </div>
        </nav>
    )
}
