import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './asset/style/index.css';
import './asset/style/grid.scss'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
