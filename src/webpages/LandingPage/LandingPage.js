import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import heroImage from '../../assets/landing-page-hero-image.svg';
import './LandingPage.scss';

function LandingPage({ signInWithGoogle, user }) {
    document.body.style.background = `url('/img/background.svg') fixed no-repeat`
    document.body.style.backgroundSize = `cover`
    return (
        <div className={'landing-page-return-wrapper'}>
            <section className={"landing-page-hero"}>
                <div className="landing-page-hero-left">
                    <h1>Welcome to IITI Classroom.</h1>
                    <p>Classroom is not limited to four walls. This is the place where you can find all your
                        study material and class notes. You can prepare yourself
                        for upcoming quizzes using the sample paper.
                        Log In to view the resources.</p>
                    {
                        user ?
                            <Link to='/dashboard'
                                className={'awesome-link'}>
                                Go to Dashboard {'>>'}
                            </Link>
                            :
                            <Button variant='transparent'
                                onClick={signInWithGoogle}
                                className={'awesome-link'}
                                style={{ outline: 'none', boxShadow: 'none' }}>
                                Sign In
                            </Button>
                    }

                </div>
                <img className={'hero-image'} src={heroImage} alt={'student'} />
            </section>
        </div>
    )
}

export default LandingPage;
