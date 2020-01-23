import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
//import { createLogger } from 'redux-logger';

import App from './components/App';
import reducers from './reducers';

// Temp test code!
//import axios from 'axios';
//window.axios = axios;
// With this you can write axios.post('/api/survey', survey) in the browser console!

//const loggerMiddleware = createLogger();
//const store = createStore(reducers, {}, applyMiddleware(reduxThunk,loggerMiddleware))
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);
