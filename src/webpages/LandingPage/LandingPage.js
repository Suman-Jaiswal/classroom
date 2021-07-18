import React from 'react';
import heroImage from '../../assets/landing-page-hero-image.svg';
import './LandingPage.scss';
import {toast} from "react-toastify";
import {useHistory, Link} from "react-router-dom";
import firebase from "firebase";
import{ Button }from 'react-bootstrap'

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
            <h1 className={'dashboard-title'}>Welcome to IITI Classroom</h1>
            <section className={"landing-page-hero"}>
                <div className="landing-page-hero-left">
                    <h1>Book your appointments in a breeze.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet assumenda corporis
                        porro possimus totam! Autem consequatur, doloremque, earum explicabo id in maiores, maxime
                        nam
                        nisi officia quia similique voluptates!</p>
                    <button
                        className={'sign-button'}
                        onClick={handleSignInButtonClick}>
                        Sign In
                    </button>
                    <Button className='w-50' variant='success' as={Link} to='/dashboard' >Go to Dashboard {'>>'}</Button>
                </div>
                <img className={'hero-image'} src={heroImage} alt={'books'}/>
            </section>
        </div>
    );
}

export default LandingPage;