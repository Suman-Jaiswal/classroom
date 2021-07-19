import React from "react";
import "./NavbarComponent.scss";
import logo from '../../assets/classroom-svgrepo-com.svg'

export default function NavbarComponent(props) {
    return (
        <nav className={'nav-return-wrapper'}>
            <div className="brand-container">
                <img src={logo} alt={'iiti-logo'}/>
                <span>Classroom</span>
            </div>

            <span>{props.response == null ? null : props.response.profileObj.name}</span>
        </nav>
    )
}
