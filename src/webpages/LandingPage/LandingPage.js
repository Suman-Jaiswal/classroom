import React from 'react';
import heroImage from '../../assets/landing-page-hero-image.svg';
import './LandingPage.scss';

function LandingPage(props) {
    return (
        <div className={'landing-page-return-wrapper'}>
            <section className={"landing-page-hero"}>
                <div className="landing-page-hero-left">
                    <h1>Book your appointments in a breeze.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet assumenda corporis
                        porro possimus totam! Autem consequatur, doloremque, earum explicabo id in maiores, maxime
                        nam
                        nisi officia quia similique voluptates!</p>
                    {props.signInButton}
                </div>
                <img className={'hero-image'} src={heroImage} alt={'student'}/>
            </section>
        </div>
    )
}

export default LandingPage;