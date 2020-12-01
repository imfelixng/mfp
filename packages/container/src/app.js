import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Header from './components/header';

// Why??? Make to flexiable, 
// Container doesn't know what Framework which marketing using.
// import { mount } from 'marketing/MarketingApp';

import Progress from './components/progress';

const MakertingAppLazy = lazy(() => import('./components/marketing-app'));
const AuthAppLazy = lazy(() => import('./components/auth-app'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

const App = () => {
    const [isSignedIn, setSignedIn] = useState(false);
    return (
        <StylesProvider generateClassName = {generateClassName}>
            <BrowserRouter>
                <div>
                    <Header isSignedIn = {isSignedIn} onSignOut = {() => {
                        setSignedIn(false);
                    }}/>
                    <Suspense fallback = {<Progress />}>
                        <Switch>
                            <Route path = "/auth">
                               {
                                    (props) => (
                                        <AuthAppLazy onSignIn = {() => {
                                            props.history.replace('/pricing');
                                            setSignedIn(true);
                                        }}/>
                                    )
                               }
                            </Route>
                            <Route path = "/" component = {MakertingAppLazy}/>
                        </Switch>
                    </Suspense>
                    
                </div>
            </BrowserRouter>
        </StylesProvider>
    )
};

export default App;