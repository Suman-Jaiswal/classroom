import React from 'react';
import heroImage from '../../assets/landing-page-hero-image.svg';
import './LandingPage.scss';
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import firebase from "firebase";

function LandingPage(props) {

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
        <div className={'landing-page-return-wrapper'}>
            <section className={"landing-page-hero"}>
                <div className="landing-page-hero-left">
                    <h1>Classroom is not limited to four walls.</h1>
                    <p>Welcome, This is the place where you can find all your
                        study material and class notes. You can prepare yourself
                        for upcoming quizes using the sample paper. Take a look
                        at the notification bar to know the recent update.
                        Log In to view the resources.
                    </p>
                    <button
                        className={'sign-button'}
                        onClick={handleSignInButtonClick}>
                        Sign In
                    </button>
                </div>
                <img className={'hero-image'} src={heroImage} alt={'books'}/>
            </section>
        </div>
    );
}

export default LandingPage;