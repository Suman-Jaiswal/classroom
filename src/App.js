import React, {useEffect, useState} from 'react'
import Dashboard from './components/drive/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading)
        return (<h1>Loading...</h1>)
    else {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        {/* drives */}
                        <Route exact path='/' component={Dashboard}/>
                        <Route exact path='/folders/:folderId' component={Dashboard}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
