import React from "react";
import "./NavbarComponent.scss";
import logo from '../../assets/classroom-svgrepo-com.svg'

export default function NavbarComponent(props) {
    return (
        <nav className={'nav-return-wrapper'}>
                 <img src={logo} alt={'classroom-logo'}/>
                 <h2 className='brand h3'>Classroom</h2>
           
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
