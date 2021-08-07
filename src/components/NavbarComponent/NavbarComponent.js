import React, {useState} from "react";
import {Link} from 'react-router-dom'
import "./NavbarComponent.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import ReactTooltip from "react-tooltip";

export default function NavbarComponent({signOut, user}) {

    const [tooltipReference, setTooltipReference] = useState(null)

    return (
        <nav className={'nav-return-wrapper'}>
            <Link to={'/'} className={'brand-container'}>
                <img id="logo" src={'/img/logo.png'} alt={''}/>
                <span>Classroom</span>
            </Link>

            {user ?
                <div className={'nav-right-wrapper'}>
                    <img src={user.photoURL}
                         alt={user.name}/>
                    <p ref={ref => setTooltipReference(ref)}
                       data-tip='Log Out'
                       data-place='left'
                       data-offset="{'top': -5, 'left': -10}"/>
                    <ReactTooltip/>
                    <Button variant='outline-danger'
                            onClick={signOut}>
                        <FontAwesomeIcon
                            icon={faPowerOff}
                            onMouseEnter={() => ReactTooltip.show(tooltipReference)}
                            onMouseLeave={() => ReactTooltip.hide(tooltipReference)}/>
                    </Button>
                </div>
                : null}
        </nav>)
}
