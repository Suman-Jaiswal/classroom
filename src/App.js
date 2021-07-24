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
    const [location, setLocation] = useState('')
    const [user, setUser] = useState(() => auth.currentUser)

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.useDeviceLanguage();
        try {
            await auth.signInWithPopup(provider).then(
                data => {
                    const check = data.user.email.indexOf('@iiti.ac.in')
                    if (check > -1) {
                        setTimeout(() => {
                            if (location !== '') {
                                history.push(location)
                            }
                            else {
                                history.push('/dashboard')
                            }
                        }, 100);

                        toast.success('Logged in Successfully')
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
    })


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
        return unsubscribe
    })

    if (loading) {
        return <Loader loading={true} size={15} css={{ position: "absolute", top: "50%", left: "calc(50% - 25px)" }} />
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

                    <Route exact path={'/folders/:folderId'} render={() => {
                        if (user) {
                            return <DashboardPage user={user} />
                        }
                        else {
                            setLocation(window.location.pathname)
                            return <Redirect to={'/'} />
                        }
                    }
                    } />

                </Switch>

            </div>
        )
    }
}
