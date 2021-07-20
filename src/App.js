import React, {useEffect, useState} from 'react'
import DashboardPage from './webpages/DashboardPage/DashboardPage';
import {Route, useHistory} from 'react-router-dom'
import LandingPage from "./webpages/LandingPage/LandingPage";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import {HashLoader as Loader} from "react-spinners";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

toast.configure()

export function App() {

    const [loading, setLoading] = useState(true)
    const [response, setResponse] = useState(null)

    const history = useHistory()
    const CLIENT_ID = '394247690551-qrhqonr04pohlgcg44s7hrp1u7or4qi2.apps.googleusercontent.com'
    const signInButton =
        <GoogleLogin
            clientId={CLIENT_ID}
            onSuccess={handleSignInSuccess}
            onFailure={handleSignInFailure}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
                <button className={'sign-button'}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}>
                    Sign In
                </button>
            )}
        />
    const signOutButton =
        <GoogleLogout
            clientId={CLIENT_ID}
            onLogoutSuccess={handleSignOutSuccess}
            onFailure={handleSignOutFailure}
            render={renderProps => (
                <button className={'sign-button'}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}>
                    Sign Out
                </button>
            )}
        />

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])

    function handleSignInSuccess(response) {
        setResponse(response)
        history.push('/dashboard')
    }

    function handleSignInFailure() {
        toast.error('Sign In failed!')
    }

    function handleSignOutSuccess() {
        setResponse(null)
        history.push('/')
    }

    function handleSignOutFailure() {
        toast.error('An error occurred!')
        history.push('/')
    }

    if (loading) {
        return <Loader loading={true} size={100} color={"#0ff0f0"} css={{position: "absolute", left: "calc(50% - 50px)", top: "calc(50% - 50px)" }}/>
    } else {
        return (
            <div className="App">
                <NavbarComponent
                    signInButton={signInButton}
                    signOutButton={signOutButton}
                    response={response}
                />
                <Route exact path={'/'} render={() => (
                    <LandingPage
                        signInButton={signInButton}
                        response={response}
                    />
                )}/>
                <Route exact path={'/dashboard'} render={() => (
                    <DashboardPage
                        response={response}
                    />
                )}/>
                <Route exact path={'/folders/:folderId'} render={() => (
                    <DashboardPage
                        response={response}
                    />
                )}/>
            </div>
        )
    }
}
