import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import RouteComponent from './routers'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import './asset/style/App.css';
import reducers from './store/reducers/index'


const store = createStore(reducers,applyMiddleware(thunk));


class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter base='/'>
                    <RouteComponent/>
                </BrowserRouter>
            </div>
        </Provider>


    );
  }
}

export default App;
