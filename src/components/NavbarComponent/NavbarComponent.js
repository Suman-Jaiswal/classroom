import React from "react";
import "./NavbarComponent.scss";
import logo from '../../assets/iitiW.webp'
import firebase from "firebase";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

export default function NavbarComponent(props) {

    const history = useHistory()

    function handleSignInButtonClick() {
        firebase.auth().signInWithPopup(props.googleAuthProvider)
            .then(() => {
                history.push('/dashboard')
            })
            .catch(() => {
                toast.error('Sorry, login failed!')
            })
    }

    return (
        <nav className={'nav-return-wrapper'}>
            <div className="brand-container">
                 <img src={logo} alt={'iiti-logo'}/>
                 <h2 className='brand h3'>Classroom</h2>
            </div>
           
            <div className={'nav-buttons-wrapper'}>
                <button
                    className={'sign-button'}
                    onClick={handleSignInButtonClick}>
                    Sign In
                </button>
            </div>
        </nav>
    )
}
