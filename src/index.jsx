import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App'
import reducer from './reducer'
import { setDraft } from './actions'
import { createStore } from 'redux';
import { Provider } from 'react-redux';


function getId() {
  let idFromParam = (new URLSearchParams(window.location.search)).get('id');
  if (idFromParam) {
    return idFromParam
  }
  const logs = require('./akr');
  const ids = Object.keys(logs);
  return idFromParam || ids[Math.floor(Math.random() * ids.length)];  
}


const store = createStore(reducer, reducer({}, setDraft(getId())));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);