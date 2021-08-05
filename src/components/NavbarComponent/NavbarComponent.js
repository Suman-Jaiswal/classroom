import React from "react";
import {Link} from 'react-router-dom'
import "./NavbarComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

export default function NavbarComponent({signOut, user}) {
    return (
        <nav className={'nav-return-wrapper'}>
            <Link to={'/'} className={'brand-container'}>
                <img id="logo" src={'/img/logo.png'} alt={''}/>
                <span>Classroom</span>
            </Link>
            {
                user ?
                    <div className={'nav-right-wrapper'}>
                        <img src={user.photoURL}
                             alt={user.name}/>
                        {user ?
                            <Button variant='outline-dark' onClick={signOut}>
                                <FontAwesomeIcon icon={faPowerOff}/>
                                </Button>
                            : null
                        }
                    </div>
                    : null
            }
        </nav>
    )
}
