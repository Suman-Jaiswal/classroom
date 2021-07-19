import React from "react";
import "./NavbarComponent.scss";
import logo from '../../assets/iitiW.webp'

export default function NavbarComponent(props) {
    return (
        <nav className={'nav-return-wrapper'}>
            <div className="brand-container">
                 <img src={logo} alt={'iiti-logo'}/>
                 <h2 className='brand h3'>Classroom</h2>
            </div>
           
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
