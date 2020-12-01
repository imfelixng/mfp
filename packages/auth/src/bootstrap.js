import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './app';


const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath] // Set initial path with parent path name
    });
    if (onNavigate) {
        history.listen(onNavigate); // Listen route changed from container
    }

    ReactDOM.render(<App history={history} onSignIn = {onSignIn} />, el);

    return {
        onParentNavigate: ({ pathname: nextPathname }) => {
            const { pathname } = history.location;

            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth--dev-root');
    if (devRoot) {
        // defaultHistory: Make change url when route for auth app in dev mode
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

export {
    mount
}