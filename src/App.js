import React, { useEffect, useState } from 'react'
import DashboardPage from './webpages/DashboardPage/DashboardPage';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom'
import LandingPage from "./webpages/LandingPage/LandingPage";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import { HashLoader as Loader } from "react-spinners";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import firebase, { auth } from './fbConfig'

toast.configure()

export function App() {

    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(() => auth.currentUser)


    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.useDeviceLanguage();
        try {
            await auth.signInWithPopup(provider)
            history.push('/dashboard')
        } catch (error) {
            console.error(error);
        }

    };


    const signOut = async () => {
        try {
            await firebase.auth().signOut();
            history.push('/')
        } catch (error) {
            console.log(error.message);
        }
    };


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
        return unsubscribe
    });


    if (loading) {
        return <Loader loading={true} size={100} color={"#0ff0f0"} css={{ position: "absolute", left: "calc(50% - 50px)", top: "calc(50% - 50px)" }} />
    } else {
        return (
            <div className="App">

                <NavbarComponent signOut={signOut} user={user} />

                <Switch>

                    <Route exact path={'/'} render={() => (
                        <LandingPage signInWithGoogle={signInWithGoogle} />
                    )} />

                    <Route exact path={'/dashboard'} render={() => user ? (
                        <DashboardPage user={user} />
                    ) : <Redirect to={'/'} />} />

                    <Route exact path={'/folders/:folderId'} render={() => user ? (
                        <DashboardPage user={user} />
                    ) : <Redirect to={'/'} />} />

                </Switch>

            </div>
        )
    }
}
