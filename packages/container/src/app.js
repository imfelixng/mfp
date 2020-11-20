import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Header from './components/Header';

// Why??? Make to flexiable, 
// Container doesn't know what Framework which marketing using.
// import { mount } from 'marketing/MarketingApp';

import MakertingApp from './components/marketing-app';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

const App = () => {
    return (
        <StylesProvider generateClassName = {generateClassName}>
            <BrowserRouter>
                <div>
                    <Header />
                    <MakertingApp />
                </div>
            </BrowserRouter>
        </StylesProvider>
    )
};

export default App;