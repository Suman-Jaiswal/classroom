import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import heroImage from '../../assets/landing-page-hero-image.svg';
import './LandingPage.scss';

const circle1Radius = 150
const circle2Radius = 100

function LandingPage({signInWithGoogle, user}) {
    return (
        <div className={'landing-page-return-wrapper'}>
            <div className="hero-section-wrapper">
                <div style={{
                    top: -0.5 * circle2Radius,
                    right: -0.5 * circle2Radius,
                    height: 2 * circle2Radius,
                    width: 2 * circle2Radius,
                    background: "linear-gradient(to right top, #2193b0, #6dd5ed)"
                }}
                     className={'hero-circle'}/>
                <div style={{
                    left: -0.25 * circle1Radius,
                    bottom: -0.25 * circle1Radius,
                    height: 2 * circle1Radius,
                    width: 2 * circle1Radius,
                    background: "linear-gradient(to right top, #cc2b5e, #753a88)"
                }}
                     className={'hero-circle'}/>
                <div style={{
                    top: -0.5 * circle2Radius,
                    left: "25%",
                    height: 2 * circle2Radius,
                    width: 2 * circle2Radius,
                    background: "linear-gradient(to right top, #de6262, #ffb88c)"
                }}
                     className={'hero-circle'}/>
                <div style={{
                    top: '50%',
                    left: '50%',
                    height: 2 * circle2Radius,
                    width: 2 * circle2Radius,
                    background: "linear-gradient(to right top, #56ab2f, #a8e063)"
                }}
                     className={'hero-circle'}/>
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
                                        className={'awesome-link'}>
                                    Sign In {'>>'}
                                </Button>
                        }

                    </div>
                    <img className={'hero-image'} src={heroImage} alt={'student'}/>
                </section>
            </div>
        </div>
    )
}

export default LandingPage;
