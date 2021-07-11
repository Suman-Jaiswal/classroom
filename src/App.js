import React, {useEffect, useState} from 'react'
import DashboardPage from './webpages/DashboardPage/DashboardPage';
import {Route} from 'react-router-dom'
import LandingPage from "./webpages/LandingPage/LandingPage";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import {RingLoader as Loader} from "react-spinners";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import firebase from "firebase";

toast.configure()

export function App() {

    const [loading, setLoading] = useState(true)

    const googleAuthProvider =
        new firebase.auth.GoogleAuthProvider()

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading)
        return <Loader loading={true} color={"#5a5a9f"} css={{position: "fixed", top: "50%", left: "50%"}}/>
    else {
        return (
            <div className="App">
                <NavbarComponent googleAuthProvider={googleAuthProvider}/>
                <Route exact path={'/'} render={() => (
                    <LandingPage googleAuthProvider={googleAuthProvider}/>
                )}/>
                <Route exact path={'/dashboard'} component={DashboardPage}/>
                <Route exact path={'/folders/:folderId'} component={DashboardPage}/>
            </div>
        )
    }
}
