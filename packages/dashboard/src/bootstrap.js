import { createApp } from 'vue';
import Dashboard from './components/dashboard';


const mount = (el,) => {
    const app = createApp(Dashboard);
    app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_dashboard--dev-root');
    if (devRoot) {
        // defaultHistory: Make change url when route for dashboard app in dev mode
        mount(devRoot);
    }
}

export {
    mount
}