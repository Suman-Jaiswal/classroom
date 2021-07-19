import React from "react";
import "./NavbarComponent.scss";
import logo from '../../assets/iitiW.webp'

export default function NavbarComponent(props) {
    return (
        <nav className={'nav-return-wrapper'}>
            <img src={logo} alt={'iiti-logo'}/>
            <div className={'nav-buttons-wrapper'}>
                {
                    props.response === null?
                        props.signInButton
                        :
                        props.signOutButton
                }
            </div>
        </nav>
    )
}
