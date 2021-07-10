import React, {useEffect, useState} from 'react'
import DashboardPage from './webpages/DashboardPage/DashboardPage';
import {Route, useHistory} from 'react-router-dom'
import LandingPage from "./webpages/LandingPage/LandingPage";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import GoogleLogin from "react-google-login";
import {RingLoader as Loader} from "react-spinners";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function App() {

    const [loading, setLoading] = useState(true)

    const signInButton = <GoogleLogin
        clientId="168810541226-9ag30btibb1jh8bv512f82rpp481hemc.apps.googleusercontent.com"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
    />
    const history = useHistory()

    useEffect(() => {
        setLoading(false)
    }, [])

    function handleLoginSuccess() {
        history.push('/dashboard')
    }

    function handleLoginFailure() {
        toast.error('Sorry, login failed!')
    }

    if (loading)
        return <Loader loading={true} color={"#5a5a9f"} css={{position: "fixed", top: "50%", left: "50%"}}/>
    else {
        return (
            <div className="App">
                <NavbarComponent signInButton={signInButton}/>
                <Route exact path={'/'} render={() => (
                    <LandingPage signInButton={signInButton}/>
                )}/>
                <Route exact path={'/dashboard'} component={DashboardPage}/>
                <Route exact path={'/folders/:folderId'} component={DashboardPage}/>
            </div>
        )
    }
}

export default App;
