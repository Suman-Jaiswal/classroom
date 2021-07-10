import React, {useEffect, useState} from 'react'
import Dashboard from './components/drive/Dashboard';
import {Route} from 'react-router-dom'
import LandingPage from "./webpages/LandingPage/LandingPage";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import GoogleLogin from "react-google-login";
import {RingLoader as Loader} from "react-spinners";

function App() {

    const [loading, setLoading] = useState(true)

    const signInButton = <GoogleLogin
        clientId="168810541226-9ag30btibb1jh8bv512f82rpp481hemc.apps.googleusercontent.com"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
    />

    useEffect(() => {
        setLoading(false)
    }, [])

    function handleLoginSuccess(response) {

    }

    function handleLoginFailure(err) {
        console.log(err)
    }

    if (loading)
        return <Loader loading={true} color={"#5a5a9f"} css={{position: "fixed", top: "50%", left: "50%"}}/>
    else {
        return (
            <div className="App">
                <NavbarComponent signInButton={signInButton}/>
                <Route exact path={'/'} component={LandingPage}/>
                <Route exact path={'/dashboard'} component={Dashboard}/>
                <Route exact path={'/folders/:folderId'} component={Dashboard}/>
            </div>
        )
    }
}

export default App;
