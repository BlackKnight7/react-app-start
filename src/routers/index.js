import React, { Component } from 'react';
import {BrowserRouter as Router, Switch,Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import {PageLoading} from '../components'


const Home = Loadable({
    loader: () => import('../containers/HomeContainer'),
    loading: PageLoading
});


class RouteComponent extends Component {
    render() {
        return (
            <Switch>
                <Route  path="/" component={Home} />
            </Switch>
        )
    }
}

export default RouteComponent;


