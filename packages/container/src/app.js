import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import { createBrowserHistory } from 'history';

import Header from './components/header';

// Why??? Make to flexiable, 
// Container doesn't know what Framework which marketing using.
// import { mount } from 'marketing/MarketingApp';

import Progress from './components/progress';

const MakertingAppLazy = lazy(() => import('./components/marketing-app'));
const AuthAppLazy = lazy(() => import('./components/auth-app'));
const DashboardAppLazy = lazy(() => import('./components/dashboard-app'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});


const history = createBrowserHistory();

const App = () => {
    const [isSignedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            if (isSignedIn) {
                history.push('/dashboard');
            } else {
                history.push('/');
            }
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => {
                        setSignedIn(false);
                    }} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthAppLazy onSignIn={() => setSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                { !isSignedIn && <Redirect to = "/" /> }
                                <DashboardAppLazy />
                            </Route>
                            <Route path="/" component={MakertingAppLazy} />
                        </Switch>
                    </Suspense>

                </div>
            </StylesProvider>
        </Router>
    )
};

export default App;