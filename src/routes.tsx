import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Home} from './components/Home';
import {Detail} from './components/Detail';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/:showType/:id' component={Detail} />
                <Route path='/' component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
