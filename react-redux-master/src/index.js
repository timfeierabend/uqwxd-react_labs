import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import myReducers from './reducers';
import {legacy_createStore as createStore} from 'redux';

// Create the store
const myStore = createStore(myReducers);

// This will console log the current state every time the state changes
myStore.subscribe(() => console.log(myStore.getState()));

// Wrapping the App inside the Provider, ensures that the states in the store are
// available throughout the application
ReactDOM.render(<Provider store={myStore}><App/></Provider>, document.getElementById('root'));