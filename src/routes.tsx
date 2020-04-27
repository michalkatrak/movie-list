import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Home} from './components/Home';
import {Detail} from './components/Detail';
import {Player} from './components/Player';
import {Search} from './components/Search';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/play/:showType/:id' component={Player} />
                <Route path='/search/:query' component={Search} />
                <Route path='/:showType/:id' component={Detail} />
                <Route path='/' component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
