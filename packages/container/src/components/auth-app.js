import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { mount } from 'auth/AuthApp';

export default ({ onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            // Connect to location from marketing app
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname }= history.location;
                if (pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            },
            onSignIn: onSignIn
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref = {ref} />
};