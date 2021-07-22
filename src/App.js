import React, { useEffect, useState } from 'react'
import DashboardPage from './webpages/DashboardPage/DashboardPage';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom'
import LandingPage from "./webpages/LandingPage/LandingPage";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import { PulseLoader as Loader } from "react-spinners";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import firebase, { auth } from './fbConfig'

toast.configure()

export function App() {

    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(() => auth.currentUser)
    console.log(user)

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.useDeviceLanguage();
        try {
            await auth.signInWithPopup(provider).then(
                data => {
                    const check = data.user.email.indexOf('@iiti.ac.in')
                    if (check > -1) {
                        toast.success('Logged in Successfully')
                        history.push('/dashboard')
                    }
                    else {
                        signOut()
                        toast.error('This website is restricted to its organisation only. Use domain "@iiti.ac.in"')
                    }
                }
            )


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
        return  <Loader loading={true} size={15} css={{position: "absolute", top: "calc(50% - 7.5px)", left: "calc(50% - 7.5px)"}} />
    } else {
        return (
            <div className="App">

                <NavbarComponent signOut={signOut} user={user} />

                <Switch>

                    <Route exact path={'/'} render={() => (
                        <LandingPage signInWithGoogle={signInWithGoogle} user={user} />
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
