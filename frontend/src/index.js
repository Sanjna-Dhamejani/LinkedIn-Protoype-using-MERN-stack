import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import '../node_modules/font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';

import reducer from './reducers/reducer';

import {createStore} from 'redux';

import {Provider} from 'react-redux';
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const store = createStore(combineReducers({
    reducer:reducer,
    form: formReducer
  }),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
 window.store=store

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
 