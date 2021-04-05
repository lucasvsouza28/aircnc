import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import New from './pages/New';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route
                path="/"
                component={Login}
                exact={true} />
            <Route
                path="/dashboard"
                component={Dashboard} />
            <Route
                path="/new"
                component={New} />
        </BrowserRouter>
    );
}